export type SkillCategory = 
  | 'all'
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'aiml'
  | 'tools'
  | 'databases';

export interface Skill {
  name: string;
  category: SkillCategory;
  icon: string; // Lucide icon name or tech keyword
  level?: 'Expert' | 'Advanced' | 'Proficient' | 'Familiar';
  tags?: string[];
  featured?: boolean;
}

export type ProjectCategory = 'all' | 'Full Stack' | 'AI / ML' | 'Web Apps' | 'Tools / Cloud';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problemSolved?: string;
  solution?: string;
  keyFeatures?: string[];
  technologies: string[];
  category: 'Full Stack' | 'AI / ML' | 'Web Apps' | 'Tools / Cloud';
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  image: string;
  featured?: boolean;
  metrics?: { label: string; value: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Contract' | 'Freelance' | 'Leadership';
  startDate: string;
  endDate: string; // e.g. "Present" or "Aug 2024"
  current?: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  certificateUrl?: string;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  grade?: string;
  description?: string;
  relevantCoursework?: string[];
  activities?: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  tags: string[];
}

export interface StatItem {
  label: string;
  value: string;
  suffix?: string;
  description?: string;
}

export interface QuickFact {
  icon: string;
  title: string;
  description: string;
}

export interface Profile {
  name: string;
  preferredName?: string;
  headline: string;
  roles: string[]; // for typewriter animation
  shortIntro: string;
  aboutBio: string[];
  location: string;
  email: string;
  phone?: string;
  avatarUrl: string;
  resumeUrl: string;
  openToWork: boolean;
  stats: StatItem[];
  careerInterests: string[];
  currentlyLearning: string[];
  quickFacts: QuickFact[];
}

export interface SocialLink {
  platform: 'GitHub' | 'LinkedIn' | 'Twitter' | 'Instagram' | 'Email' | 'Discord';
  url: string;
  username: string;
  icon: string;
  isPrimary?: boolean;
}
