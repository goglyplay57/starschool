import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { DEFAULT_NOTICES } from "./src/data.ts";
import { Notice, AdmissionApplication, ContactInquiry } from "./src/types.ts";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = 3000;

// Dynamic In-Memory Store for School Operations (resets on restart, persistent during runtime)
let noticesList: Notice[] = [...DEFAULT_NOTICES];
let admissionsList: AdmissionApplication[] = [
  {
    id: "ADM-1001",
    studentName: "Clara Vance",
    guardianName: "David Vance",
    email: "david.vance@example.com",
    phone: "555-0192",
    gradeApplied: "Grade 9",
    previousSchool: "St. Mary Prep",
    submissionDate: "2026-07-15",
    status: "Approved",
    documents: { birthCertificate: true, academicTranscript: true, transferCertificate: true }
  },
  {
    id: "ADM-1002",
    studentName: "Jonathan Thorne",
    guardianName: "Elizabeth Thorne",
    email: "ethorne@example.com",
    phone: "555-0143",
    gradeApplied: "Kindergarten",
    previousSchool: "None",
    submissionDate: "2026-07-18",
    status: "Pending",
    documents: { birthCertificate: true, academicTranscript: false, transferCertificate: false }
  }
];
let inquiriesList: ContactInquiry[] = [
  {
    id: "INQ-2001",
    name: "Rachel Green",
    email: "rgreen@example.com",
    subject: "Scholarship opportunities for Athletics",
    message: "Hi, my daughter is an regional competitive swimmer. Does Oakridge offer sports scholarships?",
    date: "2026-07-16",
    status: "Unread"
  }
];

// Lazy-loaded Gemini AI client to protect against server startup crashes if key is omitted
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the workspace Secrets/environment. Please configure it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// ==========================================
// API ENDPOINTS
// ==========================================

// 1. Notice Board APIs
app.get("/api/notices", (req, res) => {
  res.json(noticesList);
});

app.post("/api/notices", (req, res) => {
  const { title, content, category, isUrgent } = req.body;
  if (!title || !content || !category) {
    res.status(400).json({ error: "Missing required notice fields." });
    return;
  }
  const newNotice: Notice = {
    id: `not-${Date.now()}`,
    title,
    content,
    category,
    date: new Date().toISOString().split("T")[0],
    isUrgent: !!isUrgent
  };
  noticesList.unshift(newNotice);
  res.status(201).json(newNotice);
});

app.delete("/api/notices/:id", (req, res) => {
  const { id } = req.params;
  noticesList = noticesList.filter(n => n.id !== id);
  res.json({ success: true, message: "Notice deleted successfully." });
});

// 2. Admission Application APIs
app.get("/api/admissions", (req, res) => {
  res.json(admissionsList);
});

app.post("/api/admissions", (req, res) => {
  const { studentName, guardianName, email, phone, gradeApplied, previousSchool, documents } = req.body;
  if (!studentName || !guardianName || !email || !phone || !gradeApplied) {
    res.status(400).json({ error: "Missing required admission application fields." });
    return;
  }
  const newApplication: AdmissionApplication = {
    id: `ADM-${Math.floor(1000 + Math.random() * 9000)}`,
    studentName,
    guardianName,
    email,
    phone,
    gradeApplied,
    previousSchool: previousSchool || "None",
    submissionDate: new Date().toISOString().split("T")[0],
    status: "Pending",
    documents: {
      birthCertificate: !!documents?.birthCertificate,
      academicTranscript: !!documents?.academicTranscript,
      transferCertificate: !!documents?.transferCertificate,
    }
  };
  admissionsList.unshift(newApplication);
  res.status(201).json(newApplication);
});

app.patch("/api/admissions/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const application = admissionsList.find(a => a.id === id);
  if (!application) {
    res.status(404).json({ error: "Application not found." });
    return;
  }
  if (status) application.status = status;
  res.json(application);
});

// 3. Contact Inquiries APIs
app.get("/api/inquiries", (req, res) => {
  res.json(inquiriesList);
});

app.post("/api/inquiries", (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: "Missing required inquiry fields." });
    return;
  }
  const newInquiry: ContactInquiry = {
    id: `INQ-${Math.floor(2000 + Math.random() * 8000)}`,
    name,
    email,
    subject,
    message,
    date: new Date().toISOString().split("T")[0],
    status: "Unread"
  };
  inquiriesList.unshift(newInquiry);
  res.status(201).json(newInquiry);
});

app.patch("/api/inquiries/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const inquiry = inquiriesList.find(i => i.id === id);
  if (!inquiry) {
    res.status(404).json({ error: "Inquiry not found." });
    return;
  }
  if (status) inquiry.status = status;
  res.json(inquiry);
});

// 4. Gemini Multi-Turn Conversational Assistant with Dynamic High Thinking Mode
app.post("/api/chat", async (req, res) => {
  const { messages, role, thinking } = req.body;

  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: "Messages array is required." });
    return;
  }

  try {
    const ai = getGeminiClient();

    // Map custom role to detailed system directives
    let systemInstruction = "You are an automated conversational assistant for Oakridge Academy.";
    if (role === "Counselor") {
      systemInstruction = "You are the Senior Admissions Counselor at Oakridge Academy. Guide prospective parents & pupils through admission processes, school fees ($12,500 to $19,500 per year), academic curricula, and required onboarding paperwork (birth certificates, transcripts). Maintain an warm, encouraging, professional, and descriptive persona.";
    } else if (role === "Mentor") {
      systemInstruction = "You are a friendly Academic Mentor at Oakridge Academy. Assist pupils with study recommendations, review our course syllabus structures (K-5, 6-8 middle school, and 9-12 high school prep), exam regulations, and outline high-potential research strategies. Keep replies highly structured, informative, and inspiring.";
    } else {
      systemInstruction = "You are the Oakridge Academy Helpdesk Assistant. You answer general questions about Oakridge Academy (founded 2001, Dr. Elizabeth Thorne as Principal, 1,250+ students). Assist with campus timings, calendar events (sports gala, scientific exhibition, national holidays), visual gallery archives, and school security protocols. Answer warmly, precisely, and professional.";
    }

    // Standard vs High-Thinking Model Selections
    // When thinking is requested, we use the reasoning-focused gemini-3.1-pro-preview
    // For standard operations, gemini-3.5-flash is our fast general model
    const selectedModel = thinking ? "gemini-3.1-pro-preview" : "gemini-3.5-flash";

    const contents = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    const config: any = {
      systemInstruction,
    };

    if (thinking) {
      config.thinkingConfig = {
        thinkingLevel: ThinkingLevel.HIGH
      };
    }

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "An error occurred during Gemini reasoning." });
  }
});

// ==========================================
// VITE DEV SERVER & PRODUCTION ASSET BINDINGS
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
