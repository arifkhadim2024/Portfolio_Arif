import type { Certificate } from '../types';

export const certificatesData: Certificate[] = [
  {
    id: "cert-1",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "2024",
    credentialId: "AWS-CLF-8934271",
    credentialUrl: "https://aws.amazon.com/verification",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    tags: ["Cloud Architecture", "AWS Core Services", "Security & IAM", "Serverless"]
  },
  {
    id: "cert-2",
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI & Coursera",
    issueDate: "2023",
    credentialId: "COURSERA-DL-98214",
    credentialUrl: "https://coursera.org/verify/specialization",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    tags: ["Neural Networks", "Convolutional Networks", "RNNs & Transformers", "TensorFlow"]
  },
  {
    id: "cert-3",
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta (Facebook)",
    issueDate: "2023",
    credentialId: "META-FED-554109",
    credentialUrl: "https://coursera.org/verify/professional-cert/meta-frontend",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    tags: ["React Advanced", "JavaScript ES6", "UI/UX Principles", "Version Control"]
  },
  {
    id: "cert-4",
    title: "PostgreSQL & Database Engineering",
    issuer: "freeCodeCamp",
    issueDate: "2023",
    credentialId: "FCC-RDBMS-7721",
    credentialUrl: "https://freecodecamp.org/certification",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
    tags: ["SQL Optimization", "Relational Modeling", "Database Transactions", "PostgreSQL"]
  },
  {
    id: "cert-5",
    title: "Algorithmic Problem Solving & Data Structures",
    issuer: "HackerRank",
    issueDate: "2023",
    credentialId: "HR-GOLD-DSA-3012",
    credentialUrl: "https://hackerrank.com/certificates",
    image: "https://images.unsplash.com/photo-1516116211227-bbc00bd2130e?auto=format&fit=crop&w=800&q=80",
    tags: ["Gold Level Problem Solving", "Algorithms", "Optimization", "Time Complexity"]
  }
];
