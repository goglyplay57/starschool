import { Notice, EventCalendarItem, ExamResult } from './types';

export const SCHOOL_NAME = "STAR SCHOOL";
export const PRINCIPAL_NAME = "Dr. Elizabeth Thorne, PhD";

export const SCHOOL_STATS = [
  { label: "Active Students", value: "1,250+" },
  { label: "Expert Faculty", value: "85+" },
  { label: "Years of Excellence", value: "25" },
  { label: "Academic Programs", value: "12" },
];

export const SCHOOL_HISTORY = `Founded in 2001, STAR SCHOOL has spent a quarter of a century fostering academic distinction and moral integrity. Starting as a modest primary school, STAR SCHOOL evolved into a state-of-the-art college preparatory academy. Our picturesque campus, situated on 25 rolling acres, serves as an inspiring sanctuary of learning for students from Kindergarten through Grade 12. We are fully accredited and consistently ranked among the top independent institutions in the region.`;

export const VISION_MISSION = {
  vision: "To cultivate compassionate, curious, and courageous global leaders who are equipped to navigate, enrich, and positively transform an ever-changing world.",
  mission: "STAR SCHOOL is dedicated to providing an intellectually rigorous, inclusive education that balances STEM mastery, cultural richness, physical wellness, and ethical leadership within a nurturing and state-of-the-art learning environment."
};

export const PRINCIPAL_MESSAGE = {
  short: "Welcome to STAR SCHOOL. We are committed to nurturing not only intellectual giants but empathetic, ethically grounded citizens of the world. Our holistic approach ensures that every child discovers their unique voice and passion.",
  full: `Dear Students, Parents, and Visitors,

Welcome to STAR SCHOOL, where excellence meets purpose. Over the past 25 years, our mission has been to ignite a lifelong passion for discovery and to cultivate leaders of character. We believe that education extends far beyond the margins of a textbook; it lives in the inquisitive questions asked in our laboratories, the collaborative creativity in our makerspaces, the sportsmanship on our fields, and the empathy demonstrated in our service projects.

In today's fast-moving global landscape, our focus on integrating cutting-edge STEM curriculums with rich humanities, arts, and competitive athletics provides our students with a robust foundation. We pride ourselves on our inclusive and supportive community, where our world-class faculty knows every child's name, strengths, and aspirations.

I invite you to explore our campus, engage with our community, and discover the STAR SCHOOL difference.

Warmest regards,
Dr. Elizabeth Thorne, PhD
Principal, STAR SCHOOL`
};

export const FACULTY_MEMBERS = [
  {
    name: "Dr. Elizabeth Thorne",
    role: "Principal",
    degree: "PhD in Educational Leadership, Stanford University",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
  },
  {
    name: "Marcus Sterling",
    role: "Vice Principal & Head of Academics",
    degree: "M.Ed in Curriculum Design, Harvard University",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300"
  },
  {
    name: "Prof. Clara Higgins",
    role: "Head of Sciences Department",
    degree: "M.S. in Organic Chemistry, MIT",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300"
  },
  {
    name: "David Vance",
    role: "Head of Mathematics & Computer Science",
    degree: "B.S. in Software Engineering, Carnegie Mellon",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
  },
  {
    name: "Sarah Lindqvist",
    role: "Head of Humanities & Literature",
    degree: "M.A. in English Literature, Oxford University",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300"
  }
];

export const CAMPUS_FACILITIES = [
  {
    title: "Advanced Science Wing",
    description: "Fully-equipped physics, chemistry, and biology laboratories designed for university-level experimental research.",
    image: "https://images.unsplash.com/photo-1517860135737-3751531a224c?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Centennial Library",
    description: "A hybrid digital and catalogued library hosting over 35,000 volumes, private study pods, and digital archive terminals.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Athletics Complex & Pool",
    description: "Includes an Olympic-sized indoor swimming pool, FIFA-standard turf fields, basketball courts, and a strength training center.",
    image: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Smart Classroom Pods",
    description: "Ergonomically designed classrooms equipped with multi-touch interactive displays, dynamic audio arrays, and ambient eye-comfort lighting.",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Visual & Performing Arts Center",
    description: "A 450-seat proscenium arch theater, acoustically treated music rehearsal rooms, and a well-lit fine arts loft.",
    image: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&q=80&w=600"
  }
];

export const CURRICULUM_INFO = {
  primary: {
    title: "Primary Years Programme (K - Grade 5)",
    focus: "Focuses on inquiry-based learning, foundational literacy, numeracy, critical thinking, visual arts, and foreign language introduction.",
    subjects: ["English Language Arts", "Mathematics", "Inquiry Science", "Social Studies", "Art & Music", "Elementary Spanish/French", "Physical Education"]
  },
  middle: {
    title: "Middle School Program (Grades 6 - 8)",
    focus: "Bridging foundational skills with analytical reasoning. Students engage in design technology, laboratory science, and elective exploration.",
    subjects: ["Pre-Algebra / Algebra I", "Integrated Sciences", "World History", "English Language & Literature", "Coding & STEM Labs", "Secondary Language", "Performing Arts Elective"]
  },
  high: {
    title: "High Prep College Curriculum (Grades 9 - 12)",
    focus: "A rigorous curriculum designed for university readiness. Featuring Advanced Placement (AP) courses, college counselling, and independent senior capstone theses.",
    subjects: ["Calculus AB/BC & Statistics", "AP Physics, Chemistry & Biology", "English Capstone & Rhetoric", "US & European History", "Advanced Computer Science (Python/AI)", "Fine Arts Portfolio", "Ethical Leadership Seminars"]
  }
};

export const DEPARTMENTS = [
  { name: "Sciences", head: "Prof. Clara Higgins", count: "14 Faculty Members" },
  { name: "Mathematics & CS", head: "David Vance", count: "12 Faculty Members" },
  { name: "Humanities & History", head: "Sarah Lindqvist", count: "16 Faculty Members" },
  { name: "Languages & Arts", head: "Jean-Pierre Laurent", count: "18 Faculty Members" },
  { name: "Physical Education", head: "Coach Ryan Mitchell", count: "8 Faculty Members" },
];

export const SPORTS_CLUBS = {
  sports: [
    { name: "STAR SCHOOL Hawks Soccer Team", achievements: "State Varsity Champions 2024 & 2025", image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=400" },
    { name: "Competitive Swim Team", achievements: "Individual Gold Medals in 100m Freestyle & Butterfly", image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=400" },
    { name: "Basketball Varsity", achievements: "Regional Finalists, 2025 League Cup", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=400" },
  ],
  clubs: [
    { name: "STEM & Robotics Guild", info: "Builds vex-robots and represents the school in national tournaments.", icon: "cpu" },
    { name: "Model United Nations (MUN)", info: "Debating global diplomacy, economics, and policy-making.", icon: "globe" },
    { name: "Symphony Orchestra", info: "A 60-piece student ensemble playing classical and contemporary movements.", icon: "music" },
    { name: "Debating & Forensics League", info: "Competitive rhetoric and analytical debate championships.", icon: "message-square" },
    { name: "Eco-Warriors Alliance", info: "Spearheading community recycling, sustainable gardens, and conservation drives.", icon: "leaf" },
    { name: "Digital Arts & Journalism", info: "Publishing the monthly 'STAR SCHOOL Gazette' and student-run podcasts.", icon: "camera" }
  ]
};

export const FEE_STRUCTURE = [
  { grade: "Kindergarten - Grade 2", tuition: "$12,500 / Yr", activityFee: "$450 / Yr", materialsFee: "$300 / Yr" },
  { grade: "Grades 3 - 5", tuition: "$14,000 / Yr", activityFee: "$500 / Yr", materialsFee: "$350 / Yr" },
  { grade: "Grades 6 - 8 (Middle School)", tuition: "$16,500 / Yr", activityFee: "$650 / Yr", materialsFee: "$400 / Yr" },
  { grade: "Grades 9 - 12 (High Prep)", tuition: "$19,500 / Yr", activityFee: "$800 / Yr", materialsFee: "$500 / Yr" },
];

export const REQUIRED_DOCUMENTS = [
  "Copy of Student's Birth Certificate or Passport",
  "Official Academic Transcripts for the last 2 academic years",
  "Character Certificate / Letter of Recommendation from the previous institution",
  "Immunization & Health Clearance Records",
  "Two passport-sized recent photographs of the applicant",
  "Proof of Residency (Utility Bill or Lease Agreement)"
];

export const FAQs = [
  { q: "What is the teacher-to-student ratio at STAR SCHOOL?", a: "We maintain an average ratio of 1:12, ensuring personalized instruction, close academic guidance, and thorough mentoring." },
  { q: "Do you offer school transportation?", a: "Yes, we provide fully-vetted, air-conditioned school buses with active GPS tracking and on-board attendants across major residential routes." },
  { q: "Are scholarships or financial aid packages available?", a: "STAR SCHOOL offers both merit-based scholarships (for academic excellence, outstanding sportsmanship, or artistic mastery) and need-based financial aid. Applications open in December." },
  { q: "What security measures are in place on campus?", a: "Our campus is fully enclosed with 24/7 security personnel, comprehensive CCTV surveillance, gated keycard-entry systems, and standard visitor background screening protocols." },
  { q: "How is the technology integrated in learning?", a: "Every smart classroom features dynamic, multi-touch interactive whiteboards, high-speed campus-wide WiFi, and personal Chromebook or iPad programs from Grade 4 onwards." }
];

export const DEFAULT_NOTICES: Notice[] = [
  {
    id: "not-1",
    title: "Mid-Term Examinations Schedule Announced",
    content: "The official schedules for the Fall Mid-Term examinations are now posted. Exams will commence from October 12th, 2026. Please check your respective grade portal for exam syllabus guidelines, timings, and classroom allocations.",
    category: "Exam",
    date: "2026-09-18",
    isUrgent: true
  },
  {
    id: "not-2",
    title: "Annual Sports Gala 2026 - Registrations Open",
    content: "The STAR SCHOOL Annual Sports Gala is scheduled for November 5th-7th. Students can register for track & field, swimming, relay races, soccer matches, and chess tournaments at the Athletics Office starting today. Registrations close on October 15th.",
    category: "Event",
    date: "2026-09-15"
  },
  {
    id: "not-3",
    title: "Admissions for Academic Year 2027 Now Open",
    content: "We are pleased to announce that registrations and online application forms for the upcoming academic year (2027-2028) are officially active. Prospectus packs can be downloaded from our Admissions page or collected from the main office.",
    category: "General",
    date: "2026-09-10"
  },
  {
    id: "not-4",
    title: "Teacher-Parent Association Conference (TPA)",
    content: "Our quarterly Teacher-Parent Association Conference is scheduled for this Saturday, September 26th from 9:00 AM to 1:00 PM. Parents are highly encouraged to visit classrooms, review assignments, and coordinate directly with teachers.",
    category: "Academic",
    date: "2026-09-08"
  },
  {
    id: "not-5",
    title: "Observance of Autumn National Holiday",
    content: "In observance of the upcoming Autumn national holiday, the school campus will remain closed on Friday, October 2nd. Regular classes will resume promptly on Monday, October 5th.",
    category: "Holiday",
    date: "2026-09-01"
  }
];

export const CALENDAR_EVENTS: EventCalendarItem[] = [
  { id: "ev-1", title: "Autumn Semester Begins", date: "2026-09-01", type: "General", description: "Campus doors open for the start of the 2026-27 academic session." },
  { id: "ev-2", title: "National Holiday Observance", date: "2026-10-02", type: "Holiday", description: "School Closed. Admin office closed." },
  { id: "ev-3", title: "Fall Mid-Term Exams", date: "2026-10-12", type: "Exam", description: "Standardized grading examinations for grades 4 through 12." },
  { id: "ev-4", title: "Science & Robotics Fair", date: "2026-10-24", type: "Cultural", description: "Annual scientific project showcase in the school pavilion." },
  { id: "ev-5", title: "Sports Gala Opening Ceremonies", date: "2026-11-05", type: "Sports", description: "Three days of track, field, and indoor sports tournaments." }
];

export const MOCK_EXAM_RESULTS: ExamResult[] = [
  {
    studentId: "STU-2026-101",
    studentName: "Benjamin Miller",
    grade: "Grade 9",
    term: "Fall Mid-Term Exam 2026",
    subjects: [
      { subject: "Advanced Mathematics", marks: 92, grade: "A" },
      { subject: "Chemistry & Physics", marks: 88, grade: "A-" },
      { subject: "English Literature", marks: 95, grade: "A+" },
      { subject: "World History", marks: 91, grade: "A" },
      { subject: "Intro to Python Programming", marks: 98, grade: "A+" }
    ],
    attendance: "96%",
    remarks: "Benjamin displays highly superior critical reasoning and exemplary work habits. An outstanding academic performance."
  },
  {
    studentId: "STU-2026-102",
    studentName: "Sophia Rodriguez",
    grade: "Grade 11",
    term: "Fall Mid-Term Exam 2026",
    subjects: [
      { subject: "AP Calculus AB", marks: 84, grade: "B+" },
      { subject: "AP Biology", marks: 91, grade: "A" },
      { subject: "English Rhetoric", marks: 94, grade: "A" },
      { subject: "US History", marks: 89, grade: "A-" },
      { subject: "Advanced Fine Arts Portfolio", marks: 96, grade: "A+" }
    ],
    attendance: "94%",
    remarks: "Sophia demonstrates deep focus and spectacular artistic expression. She is highly encouraged to sustain her rigor in advanced mathematics."
  },
  {
    studentId: "STU-2026-103",
    studentName: "Liam Vance",
    grade: "Grade 8",
    term: "Fall Mid-Term Exam 2026",
    subjects: [
      { subject: "Algebra I", marks: 76, grade: "B-" },
      { subject: "Integrated Science Lab", marks: 82, grade: "B" },
      { subject: "Language Arts", marks: 85, grade: "B+" },
      { subject: "Geography & Society", marks: 80, grade: "B" },
      { subject: "STEM Electronics Lab", marks: 89, grade: "A-" }
    ],
    attendance: "91%",
    remarks: "Liam is an enthusiastic participator in lab and STEM contexts. With active concentration on self-study routines, his mathematics grade will expand steadily."
  }
];

export const GALLERY_ITEMS = [
  { title: "Inaugural Assembly 2026", category: "Campus", url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600" },
  { title: "Vex Robotics Showcase", category: "Events", url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600" },
  { title: "State Soccer Finals", category: "Sports", url: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=600" },
  { title: "Principal's Welcoming Speech", category: "Campus", url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600" },
  { title: "Organic Chemistry Practical", category: "Events", url: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=600" },
  { title: "Varsity Swimming Relay", category: "Sports", url: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=600" }
];
