import type { Education } from '../types';

export const educationData: Education[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science & Engineering",
    institution: "National Institute of Technology / Engineering University",
    location: "India",
    startDate: "2021",
    endDate: "2025",
    grade: "8.6 / 10.0 CGPA",
    description: "Focused on core computer science foundations, algorithm design, software engineering methodologies, machine learning, and distributed computing.",
    relevantCoursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (Java/C++)",
      "Database Management Systems (DBMS)",
      "Operating Systems & Linux",
      "Computer Networks",
      "Artificial Intelligence & Machine Learning",
      "Web Technologies & Cloud Computing",
      "Software Engineering & Agile Methodologies"
    ],
    activities: [
      "Core Member of the University Coding & Algorithmic Society",
      "Lead Organizer for Technical Workshops & Hackathons",
      "Finalist in Inter-College CodeSprint Challenge"
    ]
  },
  {
    id: "edu-2",
    degree: "Senior Secondary School (Class XII)",
    field: "Science Stream (Physics, Chemistry, Mathematics & CS)",
    institution: "Senior Secondary School",
    location: "India",
    startDate: "2019",
    endDate: "2021",
    grade: "92.4%",
    description: "Graduated with distinction with top academic honors in Mathematics and Computer Science.",
    relevantCoursework: [
      "Advanced Mathematics & Calculus",
      "Computer Science (Python & C++)",
      "Physics & Mechanics"
    ]
  }
];
