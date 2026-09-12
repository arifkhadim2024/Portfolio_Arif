import type { Experience } from '../types';

export const experienceData: Experience[] = [
  {
    id: "exp-1",
    role: "Full-Stack Developer Intern",
    company: "TechNova Solutions",
    companyUrl: "https://example.com",
    location: "Remote / Hybrid",
    type: "Internship",
    startDate: "Jan 2024",
    endDate: "Jun 2024",
    current: false,
    description: "Contributed to building responsive web applications, RESTful microservices, and automated testing suites in an agile engineering team.",
    achievements: [
      "Engineered reusable React component libraries and integrated Tailwind CSS design system, improving frontend page load speed by 35%.",
      "Developed and documented 12+ RESTful API endpoints in Node.js and Express with JWT authentication and role-based permissions.",
      "Collaborated in bi-weekly sprints, daily standups, and conducted code reviews for team pull requests on GitHub.",
      "Authored unit and integration test suites achieving 88% coverage on mission-critical payment workflows."
    ],
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "Git"],
    certificateUrl: "https://example.com/certificate"
  },
  {
    id: "exp-2",
    role: "Open Source Contributor & Technical Lead",
    company: "University Developer Club",
    location: "Campus",
    type: "Leadership",
    startDate: "Aug 2023",
    endDate: "Present",
    current: true,
    description: "Mentored aspiring developers, organized hands-on hackathons, and spearheaded collaborative open-source web projects.",
    achievements: [
      "Mentored 60+ junior students in modern JavaScript, Git version control, and full-stack software development fundamentals.",
      "Organized annual 24-hour campus hackathon with over 200 participants and industry sponsors.",
      "Led development of the student chapter portal, automating event registrations and certificate distribution."
    ],
    technologies: ["JavaScript", "Python", "React", "Git", "Community Mentorship"]
  }
];
