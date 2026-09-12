import type { Education } from '../types';

export const educationData: Education[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science & Engineering",
    institution: "Adamas University",
    location: "India",
    startDate: "2023",
    endDate: "Present",
    grade: "7.41 / 10.0 CGPA",
    description: "Currently pursuing a Bachelor of Technology in Computer Science & Engineering at Adamas University and studying in the 7th semester. Developing strong foundations in programming, data structures, databases, software development, artificial intelligence, and modern web technologies.",
    relevantCoursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Artificial Intelligence & Machine Learning",
      "Web Development",
      "Software Engineering"
    ],
    activities: []
  },
  {
    id: "edu-2",
    degree: "Higher Secondary (Class XII)",
    field: "Science — PCMB",
    institution: "Udaipur English Medium Higher Secondary School",
    location: "India",
    startDate: "2021",
    endDate: "2023",
    grade: "68%",
    description: "Completed higher secondary education in the Science stream with Physics, Chemistry, Mathematics, and Biology (PCMB).",
    relevantCoursework: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Biology"
    ]
  },
  {
    id: "edu-3",
    degree: "Secondary School (Class X)",
    field: "General Education",
    institution: "Udaipur English Medium Higher Secondary School",
    location: "India",
    startDate: "2020",
    endDate: "2021",
    grade: "78%",
    description: "Completed secondary school education with 78% marks.",
    relevantCoursework: [
      "Mathematics",
      "Science",
      "English",
      "Social Science",
      "Computer Studies"
    ]
  }
];
