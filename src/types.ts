export interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'General' | 'Academic' | 'Exam' | 'Holiday' | 'Event';
  date: string;
  isUrgent?: boolean;
}

export interface AdmissionApplication {
  id: string;
  studentName: string;
  guardianName: string;
  email: string;
  phone: string;
  gradeApplied: string;
  previousSchool: string;
  submissionDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  documents: {
    birthCertificate: boolean;
    academicTranscript: boolean;
    transferCertificate: boolean;
  };
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'Unread' | 'Replied';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface EventCalendarItem {
  id: string;
  title: string;
  date: string;
  type: 'Sports' | 'Cultural' | 'Exam' | 'Holiday' | 'General';
  description: string;
}

export interface ExamResult {
  studentId: string;
  studentName: string;
  grade: string;
  term: string;
  subjects: {
    subject: string;
    marks: number;
    grade: string;
  }[];
  attendance: string;
  remarks: string;
}
