import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: "neurovision-ai",
    title: "NeuroVision AI",
    tagline: "Multi-Modal AI Diagnostic & Medical Image Analysis Suite",
    description: "An intelligent healthcare computer vision platform that leverages deep learning to detect anomalies in radiological imaging and generate automated clinical insights.",
    problemSolved: "Clinicians face heavy diagnostic workloads and high image volumes, creating potential bottlenecks and delay in critical condition diagnoses.",
    solution: "Developed an end-to-end deep learning pipeline combining PyTorch CNNs and Vision Transformers with a responsive React dashboard, achieving 94.6% validation accuracy and instant visual saliency heatmaps.",
    keyFeatures: [
      "Convolutional Neural Network & ViT models for multi-class classification",
      "Interactive Grad-CAM saliency heatmaps for explainable AI predictions",
      "FastAPI asynchronous backend with batch inference queuing",
      "Real-time patient scan review dashboard with dark-mode optimized viewing"
    ],
    technologies: ["PyTorch", "Python", "FastAPI", "React", "TypeScript", "Tailwind CSS", "Docker"],
    category: "AI / ML",
    githubUrl: "https://github.com/arifkhadim2024/NEUROVISION-AI",
    liveUrl: "https://neurovision-ai-mri.vercel.app/",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    featured: true,
    metrics: [
      { label: "Accuracy", value: "94.6%" },
      { label: "Latency", value: "<180ms" },
      { label: "Scans Processed", value: "10k+" }
    ]
  },
  {
    id: "devflow-nexus",
    title: "DevFlow Nexus",
    tagline: "Real-Time Collaborative Developer Workspace & Code Studio",
    description: "A synchronized developer productivity ecosystem featuring collaborative live code editing, markdown documentation sharing, team whiteboard canvas, and integrated task tracking.",
    problemSolved: "Remote development teams struggle with context switching between disjointed chat tools, code editors, and documentation hubs.",
    solution: "Engineered a unified workspace using WebSockets and CRDTs for sub-millisecond character sync, Redis for state caching, and PostgreSQL for robust entity management.",
    keyFeatures: [
      "Sub-50ms latency collaborative Monaco code editor with live presence cursors",
      "Interactive infinite whiteboard canvas with real-time vector sync",
      "Role-based access control and encrypted project workspaces",
      "Markdown knowledge-base with live preview and code snippet execution"
    ],
    technologies: ["React", "TypeScript", "Node.js", "WebSockets", "Redis", "PostgreSQL", "Tailwind CSS"],
    category: "Full Stack",
    githubUrl: "https://github.com/arifkhadim2024/DevFlow-Nexus",
    liveUrl: "https://dev-flow-nexus-frontend.vercel.app/dashboard",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
    featured: true,
    metrics: [
      { label: "Sync Latency", value: "<45ms" },
      { label: "Concurrent Users", value: "500+" },
      { label: "Test Coverage", value: "92%" }
    ]
  },
  {
    id: "pulse-commerce",
    title: "Pulse Commerce",
    tagline: "Ultra-Fast Headless E-Commerce with AI Product Recommendations",
    description: "A lightning-fast, modern e-commerce storefront with real-time inventory management, personalized AI-powered product recommendations, and Stripe checkout integration.",
    problemSolved: "Traditional monolithic e-commerce platforms suffer from slow page loads, bloated assets, and impersonal static product catalogs that hurt conversion.",
    solution: "Constructed a headless architecture with instant optimistic UI updates, vector-based recommendation scoring, and automated order fulfillment webhooks.",
    keyFeatures: [
      "Sub-second page navigation with optimistic cart management",
      "Vector embeddings for personalized 'Users Also Bought' recommendations",
      "Stripe payment gateway with 3D Secure verification",
      "Admin analytics panel with revenue charts and stock alerts"
    ],
    technologies: ["React", "TypeScript", "Supabase", "Tailwind CSS", "Stripe API", "Vite"],
    category: "Full Stack",
    githubUrl: "https://github.com/arifkhadim2024/pulse-commerce",
    liveUrl: "https://pulse-commerce.demo.app",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    featured: true,
    metrics: [
      { label: "Lighthouse Score", value: "99/100" },
      { label: "Conversion Lift", value: "+28%" },
      { label: "Avg Load Time", value: "0.6s" }
    ]
  },
  {
    id: "cloudpulse-monitor",
    title: "CloudPulse Monitor",
    tagline: "Microservices Observability & Performance Metrics Dashboard",
    description: "A lightweight cloud observability tool that tracks server CPU/memory telemetry, API endpoint latency distribution, error budgets, and uptime alerting in real time.",
    problemSolved: "Heavyweight enterprise observability tools are often over-engineered, slow to boot, and prohibitively expensive for mid-sized engineering stacks.",
    solution: "Designed a high-throughput telemetry collector using Go and Node.js micro-agents feeding time-series data into a responsive interactive charting dashboard.",
    keyFeatures: [
      "Live time-series chart streaming with customizable refresh intervals",
      "Configurable threshold alerts with Slack and Webhook triggers",
      "Container health status and Docker daemon metrics tracking",
      "Exportable incident report summaries with latency percentile graphs"
    ],
    technologies: ["React", "TypeScript", "Node.js", "Docker", "Chart.js", "Tailwind CSS"],
    category: "Tools / Cloud",
    githubUrl: "https://github.com/arifkhadim2024/cloudpulse-monitor",
    liveUrl: "https://cloudpulse.demo.app",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    metrics: [
      { label: "Throughput", value: "5k req/s" },
      { label: "Memory Footprint", value: "32MB" }
    ]
  },
  {
    id: "algorhythm-visualizer",
    title: "Algorhythm Visualizer",
    tagline: "Interactive Algorithm & Data Structure Sandbox with Audio Feedback",
    description: "An educational interactive visualizer exploring sorting algorithms, graph pathfinding (Dijkstra, A*), and dynamic programming with step-by-step playback and auditory feedback.",
    problemSolved: "Computer science students and engineers frequently struggle with abstract algorithmic concepts without intuitive visual and step-by-step step execution.",
    solution: "Built a custom HTML5 canvas visualization engine with variable execution speeds, sound synthesis for swaps, and comprehensive time complexity breakdowns.",
    keyFeatures: [
      "Visual step-through for 8+ sorting algorithms and 4+ pathfinding graphs",
      "Interactive maze generation and obstacle drawing tools",
      "Web Audio API sound synthesis synchronized with array comparisons",
      "Side-by-side pseudocode highlight tracking the active instruction"
    ],
    technologies: ["TypeScript", "React", "Canvas API", "Web Audio API", "Tailwind CSS"],
    category: "Web Apps",
    githubUrl: "https://github.com/arifkhadim2024/algorhythm-visualizer",
    liveUrl: "https://algorhythm.demo.app",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    metrics: [
      { label: "GitHub Stars", value: "120+" },
      { label: "Active Users", value: "2.4k" }
    ]
  },
  {
    id: "pulsefit-ai",
    title: "PULSEFIT AI",
    tagline: "AI-Powered Fitness, Workout & Biomechanics Platform",
    description:
      "A comprehensive AI-powered fitness platform designed to help users discover exercises, generate personalized workouts, track training progress, understand muscle engagement, and receive intelligent fitness guidance through an interactive digital experience.",
    problemSolved:
      "People often struggle to create structured workout routines, understand which exercises target specific muscles, track their progress consistently, and maintain proper exercise form.",
    solution:
      "Built an interactive fitness ecosystem that combines an extensive exercise library, muscle-focused workout discovery, AI-assisted workout planning, progress tracking, nutrition features, gamification, and intelligent biomechanics guidance in a unified platform.",
    keyFeatures: [
      "AI-assisted personalized workout generation",
      "Interactive muscle anatomy and exercise discovery",
      "Extensive exercise library with detailed movement information",
      "Workout tracking and progress analytics",
      "AI-powered biomechanics and exercise guidance",
      "Nutrition and fitness planning features",
      "Gamification and achievement-based progress tracking",
      "Admin dashboard for managing fitness content"
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "AI APIs"
    ],
    category: "AI / ML",
    githubUrl: "https://github.com/arifkhadim2024/PULSEFIT-AI",
    liveUrl: "https://pulsefit-ai-gilt.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80",
    featured: true,
    metrics: [
      { label: "Exercise Library", value: "117+" },
      { label: "AI Features", value: "Multiple" },
      { label: "Platform", value: "Full Stack" }
    ]
  },

  {
    id: "mediscan",
    title: "MediScan",
    tagline: "AI-Powered Healthcare & Medical Analysis Platform",
    description:
      "An intelligent healthcare application designed to make medical information and analysis more accessible through AI-powered features, image-based analysis, and a user-friendly digital healthcare interface.",
    problemSolved:
      "Accessing and understanding medical information can be complicated for users, while healthcare workflows often involve large amounts of information that require efficient digital tools for analysis and interpretation.",
    solution:
      "Developed MediScan as an AI-assisted healthcare platform that combines modern web technologies with computer vision, OCR, and intelligent analysis capabilities to create a more accessible medical information and analysis workflow.",
    keyFeatures: [
      "AI-powered medical image and information analysis",
      "Computer vision-based image processing",
      "OCR-based medical text extraction",
      "Intelligent medical information analysis",
      "User-friendly healthcare dashboard",
      "Responsive interface for accessing medical insights"
    ],
    technologies: [
      "Python",
      "AI / ML",
      "Computer Vision",
      "OCR",
      "React",
      "TypeScript",
      "Tailwind CSS"
    ],
    category: "AI / ML",
    githubUrl: "https://github.com/arifkhadim2024/mediscan",
    liveUrl: "https://mediscan-eight-eta.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    featured: true,
    metrics: [
      { label: "Domain", value: "Healthcare AI" },
      { label: "Computer Vision", value: "Yes" },
      { label: "OCR", value: "Integrated" }
    ]
  },

  {
    id: "cine-verse",
    title: "Cine-Verse",
    tagline: "Modern Movie Discovery & Entertainment Platform",
    description:
      "A modern movie discovery platform that allows users to explore movies, search for titles, discover entertainment content, and interact with movie information through a responsive and visually engaging interface.",
    problemSolved:
      "Movie discovery platforms can become difficult to navigate when users have to search through large collections of content without an intuitive way to discover and explore movies.",
    solution:
      "Built Cine-Verse as an engaging movie discovery experience focused on intuitive navigation, movie exploration, search functionality, and a responsive interface that makes entertainment content easy to browse.",
    keyFeatures: [
      "Movie search and discovery",
      "Detailed movie information",
      "Interactive movie browsing experience",
      "Responsive user interface",
      "Modern entertainment-focused design",
      "Dynamic content presentation"
    ],
    technologies: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Vite",
      "Movie API"
    ],
    category: "Web Apps",
    githubUrl: "https://github.com/arifkhadim2024/Cine-verse",
    liveUrl: "https://cine-verse-blond.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80",
    featured: true,
    metrics: [
      { label: "Project Type", value: "Web App" },
      { label: "Interface", value: "Responsive" },
      { label: "Domain", value: "Entertainment" }
    ]
  },

  {
    id: "ai-resume-matcher",
    title: "AI Resume Matcher",
    tagline: "Intelligent Resume & Job Description Matching System",
    description:
      "An AI and NLP-powered application that analyzes resumes against job descriptions to identify relevant skills, measure compatibility, highlight skill gaps, and help users understand how well their profile aligns with a target role.",
    problemSolved:
      "Job seekers often struggle to determine whether their resume matches a particular job description and which skills or keywords they need to improve for better alignment with a role.",
    solution:
      "Developed an intelligent resume analysis system that processes resume and job-description text using NLP and machine-learning techniques to calculate similarity, identify relevant skills, detect gaps, and provide actionable insights.",
    keyFeatures: [
      "Resume and job description text analysis",
      "TF-IDF-based feature extraction",
      "Cosine similarity-based matching",
      "Skill matching and skill-gap identification",
      "Resume compatibility scoring",
      "Machine-learning-based analysis",
      "Interactive results and recommendations"
    ],
    technologies: [
      "Python",
      "Machine Learning",
      "NLP",
      "Scikit-learn",
      "TF-IDF",
      "Cosine Similarity",
      "Streamlit"
    ],
    category: "AI / ML",
    githubUrl: "https://github.com/arifkhadim2024/AI-Resume-Matcher",
    liveUrl: "https://ai-resume-matcher-tszdxlceiozcvzmpxond5k.streamlit.app/",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
    featured: true,
    metrics: [
      { label: "Domain", value: "NLP / AI" },
      { label: "Matching", value: "Resume ↔ JD" },
      { label: "Analysis", value: "Skill Gaps" }
    ]
  },
  {
    id: "salary-predictor",
    title: "Salary Predictor",
    tagline: "Machine Learning Model for Tech Salary Benchmarking & Forecasting",
    description:
      "A predictive machine learning application developed during the Industrial Internship at Ardent Computech Pvt. Ltd., designed to predict software industry salaries based on years of experience, job role, education, and technical skill sets.",
    problemSolved:
      "Software developers and tech talent face compensation ambiguity across differing roles and experience tiers without transparent predictive benchmarks.",
    solution:
      "Implemented a comprehensive ML pipeline in Python using Scikit-learn with exploratory data analysis, feature engineering, categorical encoding, and regression modeling.",
    keyFeatures: [
      "Exploratory Data Analysis (EDA) and distribution preprocessing",
      "Feature engineering and categorical variable encoding",
      "Multiple regression models evaluated for minimum RMSE and maximum R² score",
      "Interactive prediction module for instant compensation forecasting"
    ],
    technologies: [
      "Python",
      "Data Science",
      "Machine Learning",
      "Scikit-learn",
      "Pandas",
      "NumPy"
    ],
    category: "AI / ML",
    githubUrl: "https://github.com/arifkhadim2024",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    featured: true,
    metrics: [
      { label: "Domain", value: "Predictive ML" },
      { label: "Internship Project", value: "Ardent Computech" },
      { label: "Framework", value: "Scikit-Learn" }
    ]
  }
];




export const projectCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'Full Stack', label: 'Full Stack' },
  { id: 'AI / ML', label: 'AI & Machine Learning' },
  { id: 'Web Apps', label: 'Web Applications' },
  { id: 'Tools / Cloud', label: 'Tools & Cloud' },
] as const;
