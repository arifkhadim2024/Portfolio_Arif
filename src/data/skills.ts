import type { Skill } from '../types';

export const skillsData: Skill[] = [
  // Programming Languages
  { name: "TypeScript", category: "languages", icon: "Code2", level: "Advanced", featured: true },
  { name: "JavaScript (ES6+)", category: "languages", icon: "FileCode", level: "Advanced", featured: true },
  { name: "Python", category: "languages", icon: "Terminal", level: "Advanced", featured: true },
  { name: "C / C++", category: "languages", icon: "Cpu", level: "Proficient" },
  { name: "Java", category: "languages", icon: "Coffee", level: "Proficient" },
  { name: "SQL", category: "languages", icon: "Database", level: "Advanced" },

  // Frontend Development
  { name: "React.js", category: "frontend", icon: "Atom", level: "Advanced", featured: true },
  { name: "Next.js", category: "frontend", icon: "Layers", level: "Proficient", featured: true },
  { name: "Tailwind CSS", category: "frontend", icon: "Palette", level: "Advanced", featured: true },
  { name: "HTML5 & Semantic UI", category: "frontend", icon: "Globe", level: "Advanced" },
  { name: "CSS3 / Modern SASS", category: "frontend", icon: "Layout", level: "Advanced" },
  { name: "Redux Toolkit", category: "frontend", icon: "Workflow", level: "Proficient" },
  { name: "Framer Motion", category: "frontend", icon: "Move", level: "Advanced" },

  // Backend Development & APIs
  { name: "Node.js", category: "backend", icon: "Server", level: "Advanced", featured: true },
  { name: "Express.js", category: "backend", icon: "Network", level: "Advanced" },
  { name: "FastAPI", category: "backend", icon: "Zap", level: "Proficient", featured: true },
  { name: "RESTful API Design", category: "backend", icon: "Share2", level: "Advanced" },
  { name: "GraphQL", category: "backend", icon: "GitGraph", level: "Familiar" },
  { name: "WebSockets", category: "backend", icon: "Radio", level: "Proficient" },

  // AI / Machine Learning
  { name: "Machine Learning (Scikit)", category: "aiml", icon: "Brain", level: "Advanced", featured: true },
  { name: "PyTorch", category: "aiml", icon: "Flame", level: "Proficient", featured: true },
  { name: "TensorFlow / Keras", category: "aiml", icon: "Boxes", level: "Proficient" },
  { name: "Pandas & NumPy", category: "aiml", icon: "Binary", level: "Advanced" },
  { name: "Computer Vision (OpenCV)", category: "aiml", icon: "Eye", level: "Proficient" },
  { name: "LLM & OpenAI APIs", category: "aiml", icon: "Sparkles", level: "Advanced", featured: true },

  // Databases
  { name: "PostgreSQL", category: "databases", icon: "Database", level: "Advanced", featured: true },
  { name: "MongoDB", category: "databases", icon: "Table", level: "Advanced" },
  { name: "Redis", category: "databases", icon: "Zap", level: "Proficient" },
  { name: "Supabase", category: "databases", icon: "Cloud", level: "Advanced" },
  { name: "MySQL", category: "databases", icon: "Database", level: "Proficient" },

  // Tools & Cloud / DevOps
  { name: "Git & GitHub", category: "tools", icon: "GitBranch", level: "Advanced", featured: true },
  { name: "Docker", category: "tools", icon: "Box", level: "Proficient", featured: true },
  { name: "VS Code", category: "tools", icon: "Code", level: "Advanced" },
  { name: "Postman", category: "tools", icon: "Send", level: "Advanced" },
  { name: "Linux / Bash", category: "tools", icon: "Terminal", level: "Proficient" },
  { name: "Vercel / Netlify", category: "tools", icon: "CloudUpload", level: "Advanced" },
  { name: "Figma (UI Design)", category: "tools", icon: "Figma", level: "Proficient" }
];

export const skillCategories = [
  { id: 'all', label: 'All Skills' },
  { id: 'languages', label: 'Languages' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'aiml', label: 'AI / Machine Learning' },
  { id: 'databases', label: 'Databases' },
  { id: 'tools', label: 'Tools & DevOps' },
] as const;
