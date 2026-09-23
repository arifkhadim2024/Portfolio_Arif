export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  problemSolved: string;
  solution: string;
  keyFeatures: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  videoUrl?: string;
  metrics: { label: string; value: string }[];
  featured: boolean;
}

export interface CategoryTheme {
  primary: string;
  secondary: string;
  badgeClass: string;
  glowClass: string;
  borderHover: string;
  borderActive: string;
  gradientOverlay: string;
  arrowBg: string;
  arrowText: string;
  metricBorder: string;
  metricText: string;
}

export const getCategoryTheme = (category: string): CategoryTheme => {
  switch (category) {
    case '3D & AI/ML':
      return {
        primary: '#22D3EE',
        secondary: '#7C3AED',
        badgeClass: 'bg-[#22D3EE]/20 text-[#22D3EE] border-[#22D3EE]/50 shadow-[0_0_15px_rgba(34,211,238,0.35)]',
        glowClass: 'shadow-[0_15px_40px_-10px_rgba(34,211,238,0.35)]',
        borderHover: 'hover:border-[#22D3EE]/80',
        borderActive: 'border-[#22D3EE]/40',
        gradientOverlay: 'from-[#0B0819] via-[#0B0819]/50 to-transparent',
        arrowBg: 'group-hover:bg-[#22D3EE]',
        arrowText: 'group-hover:text-[#0B0819]',
        metricBorder: 'border-[#22D3EE]/40 bg-[#22D3EE]/10',
        metricText: 'text-[#22D3EE]',
      };
    case 'AI / ML':
      return {
        primary: '#A855F7',
        secondary: '#EC4899',
        badgeClass: 'bg-[#7C3AED]/25 text-[#D8B4FE] border-[#A855F7]/50 shadow-[0_0_15px_rgba(168,85,247,0.35)]',
        glowClass: 'shadow-[0_15px_40px_-10px_rgba(124,58,237,0.35)]',
        borderHover: 'hover:border-[#A855F7]/80',
        borderActive: 'border-[#A855F7]/40',
        gradientOverlay: 'from-[#0B0819] via-[#0B0819]/50 to-transparent',
        arrowBg: 'group-hover:bg-gradient-signature',
        arrowText: 'group-hover:text-white',
        metricBorder: 'border-[#A855F7]/40 bg-[#7C3AED]/10',
        metricText: 'text-[#D8B4FE]',
      };
    case 'Full Stack':
      return {
        primary: '#F472B6',
        secondary: '#8B5CF6',
        badgeClass: 'bg-[#F472B6]/20 text-[#F472B6] border-[#F472B6]/50 shadow-[0_0_15px_rgba(244,114,182,0.35)]',
        glowClass: 'shadow-[0_15px_40px_-10px_rgba(244,114,182,0.35)]',
        borderHover: 'hover:border-[#F472B6]/80',
        borderActive: 'border-[#F472B6]/40',
        gradientOverlay: 'from-[#0B0819] via-[#0B0819]/50 to-transparent',
        arrowBg: 'group-hover:bg-[#F472B6]',
        arrowText: 'group-hover:text-[#0B0819]',
        metricBorder: 'border-[#F472B6]/40 bg-[#F472B6]/10',
        metricText: 'text-[#F472B6]',
      };
    case 'Web Apps':
      return {
        primary: '#FB923C',
        secondary: '#F43F5E',
        badgeClass: 'bg-[#FB923C]/20 text-[#FB923C] border-[#FB923C]/50 shadow-[0_0_15px_rgba(251,146,60,0.35)]',
        glowClass: 'shadow-[0_15px_40px_-10px_rgba(251,146,60,0.35)]',
        borderHover: 'hover:border-[#FB923C]/80',
        borderActive: 'border-[#FB923C]/40',
        gradientOverlay: 'from-[#0B0819] via-[#0B0819]/50 to-transparent',
        arrowBg: 'group-hover:bg-[#FB923C]',
        arrowText: 'group-hover:text-[#0B0819]',
        metricBorder: 'border-[#FB923C]/40 bg-[#FB923C]/10',
        metricText: 'text-[#FB923C]',
      };
    case 'Tools / Cloud':
      return {
        primary: '#A3E635',
        secondary: '#06B6D4',
        badgeClass: 'bg-[#A3E635]/20 text-[#A3E635] border-[#A3E635]/50 shadow-[0_0_15px_rgba(163,230,53,0.35)]',
        glowClass: 'shadow-[0_15px_40px_-10px_rgba(163,230,53,0.35)]',
        borderHover: 'hover:border-[#A3E635]/80',
        borderActive: 'border-[#A3E635]/40',
        gradientOverlay: 'from-[#0B0819] via-[#0B0819]/50 to-transparent',
        arrowBg: 'group-hover:bg-[#A3E635]',
        arrowText: 'group-hover:text-[#0B0819]',
        metricBorder: 'border-[#A3E635]/40 bg-[#A3E635]/10',
        metricText: 'text-[#A3E635]',
      };
    default:
      return {
        primary: '#7C3AED',
        secondary: '#22D3EE',
        badgeClass: 'bg-[#7C3AED]/20 text-[#22D3EE] border-[#7C3AED]/50 shadow-[0_0_15px_rgba(124,58,237,0.35)]',
        glowClass: 'shadow-[0_15px_40px_-10px_rgba(124,58,237,0.35)]',
        borderHover: 'hover:border-[#7C3AED]/80',
        borderActive: 'border-[#7C3AED]/40',
        gradientOverlay: 'from-[#0B0819] via-[#0B0819]/50 to-transparent',
        arrowBg: 'group-hover:bg-gradient-signature',
        arrowText: 'group-hover:text-white',
        metricBorder: 'border-[#7C3AED]/40 bg-[#7C3AED]/10',
        metricText: 'text-[#22D3EE]',
      };
  }
};

export const getCategoryBadgeStyle = (category: string): string => {
  return getCategoryTheme(category).badgeClass;
};

export const getTechTagStyle = (tech: string): string => {
  const lower = tech.toLowerCase();
  if (lower.includes('react') || lower.includes('next') || lower.includes('three') || lower.includes('webgl') || lower.includes('frontend')) {
    return 'bg-[#22D3EE]/15 text-[#22D3EE] border-[#22D3EE]/40 hover:bg-[#22D3EE]/25';
  }
  if (lower.includes('python') || lower.includes('pytorch') || lower.includes('tensorflow') || lower.includes('ai') || lower.includes('ml')) {
    return 'bg-[#A855F7]/15 text-[#D8B4FE] border-[#A855F7]/40 hover:bg-[#A855F7]/25';
  }
  if (lower.includes('node') || lower.includes('express') || lower.includes('fastapi') || lower.includes('backend') || lower.includes('mongo') || lower.includes('sql')) {
    return 'bg-[#A3E635]/15 text-[#BEF264] border-[#A3E635]/40 hover:bg-[#A3E635]/25';
  }
  if (lower.includes('cloud') || lower.includes('docker') || lower.includes('aws') || lower.includes('devops') || lower.includes('kubernetes')) {
    return 'bg-[#38BDF8]/15 text-[#7DD3FC] border-[#38BDF8]/40 hover:bg-[#38BDF8]/25';
  }
  if (lower.includes('tailwind') || lower.includes('css') || lower.includes('design') || lower.includes('gsap') || lower.includes('motion')) {
    return 'bg-[#F472B6]/15 text-[#F472B6] border-[#F472B6]/40 hover:bg-[#F472B6]/25';
  }
  return 'bg-[#FB923C]/15 text-[#FB923C] border-[#FB923C]/40 hover:bg-[#FB923C]/25';
};

export interface SkillItem {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'aiml' | 'databases' | 'tools';
  level: string;
  icon: string;
  featured?: boolean;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
  image: string;
  tags: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  grade: string;
  description: string;
  relevantCoursework: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
  certificateUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  casingLabel: string;
  description: string;
  skills: string[];
  iconType: string;
}

export interface ValueItem {
  id: string;
  stylizedTitle: string; // e.g. "Partner—ship", "tranS—parency", "Easy—going", "revision—less"
  subtitle: string;
  description: string;
  points: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export const portfolioData = {
  name: "Arif Mohammed Khadim",
  preferredName: "Arif",
  monogram: "AK",
  headline: "Software Engineer & Developer: Full-Stack, AI/ML, Cloud",
  role: "Software Engineer & Full-Stack Developer",
  email: "arifkhadim9436@gmail.com",
  phone: "+91 87310 89098",
  location: "India",
  cin: "07046758",
  avatarUrl: "/editorial-portrait.jpg",
  resumeUrl: "/resume.pdf",
  formEndpoint: "https://formspree.io/f/xzezbygl",
  
  hero: {
    greeting: "HI, I’M ARIF, I develop",
    mainHeadline: "The Perfect Website",
    subheadlineDay: "for your business",
    subheadlineNight: "by night",
    bylineDay: "By Arif Khadim",
    bylineNight: "AI & Full-Stack Engineer",
    badgeLabel: "AK",
    switchBioDay: "I strive to elevate your digital presence to a level that is blisteringly fast, robustly engineered, and pixel-perfect down to every microscopic interaction.",
    switchBioNight: "As an AI/ML enthusiast and Full-Stack engineer, I architect neural simulation digital twins, high-concurrency real-time apps, and spatial 3D web systems.",
    paragraph: "Every digital product deserves a bespoke solution — whether it’s high-throughput AI inference pipelines, real-time collaboration engines, or silky smooth fluid interfaces that turn casual visitors into loyal champions."
  },

  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/arif-mohammed-khadim/", label: "lINKEDIN" },
    { name: "GitHub", url: "https://github.com/arifkhadim2024", label: "gITHUB" },
    { name: "Twitter", url: "https://x.com/Arif__khadim", label: "x / tWITTER" },
    { name: "Instagram", url: "https://www.instagram.com/arif__khadim/", label: "iNSTAGRAM" },
    { name: "Email", url: "mailto:arifkhadim9436@gmail.com", label: "mAIL" },
  ],

  budgetOptions: [
    "Please select one..",
    "$3K - $5K",
    "$6K - $10K",
    "$11K - $15K",
    "$16K - $19K",
    "$20+"
  ],

  stats: [
    { label: "Projects Completed", value: "15+" },
    { label: "Tech Stack Mastered", value: "20+" },
    { label: "Industry Certifications", value: "6+" },
    { label: "Code Commits", value: "500+" }
  ],

  values: [
    {
      id: "partnership",
      stylizedTitle: "Partner—ship",
      subtitle: "True Collaborative Engineering",
      description: "I don't just write code and disappear. I act as an embedded technical partner who cares as deeply about your business metrics, conversion funnels, and brand reputation as you do.",
      points: [
        "Transparent sprint milestones and async loom check-ins",
        "Direct communication with zero intermediary telephone games",
        "Long-term architectural reliability that scales seamlessly"
      ]
    },
    {
      id: "transparency",
      stylizedTitle: "tranS—parency",
      subtitle: "No Black Boxes, Pure Clarity",
      description: "Every line of code, technical tradeoff, third-party dependency, and architectural decision is explained with radical honesty and documented with meticulous care.",
      points: [
        "Live staging preview environments for every pull request",
        "Clear estimation and real-time task board visibility",
        "Clean, open TypeScript source code with zero vendor lock-in"
      ]
    },
    {
      id: "easygoing",
      stylizedTitle: "Easy—going",
      subtitle: "Zero Friction, Maximum Momentum",
      description: "Working together should be invigorating, not exhausting. I bring high technical rigor paired with an empathetic, friendly, and solution-oriented attitude to every discussion.",
      points: [
        "Proactive problem solving before small roadblocks become fires",
        "Adaptive workflow tailored to your team's preferred tooling",
        "Calm, level-headed execution even during tight launch deadlines"
      ]
    },
    {
      id: "revisionless",
      stylizedTitle: "revision—less",
      subtitle: "Pixel-Faithful On First Delivery",
      description: "By obsessively establishing systematic design tokens, responsive fluid viewport scales, and rigorous cross-browser testing upfront, we eliminate endless rounds of tedious revisions.",
      points: [
        "Design systems mapped directly to reusable atomic components",
        "Zero layout shift, 60fps animations, and 90+ Lighthouse scores",
        "Thorough automated type checking and linting pipelines"
      ]
    }
  ] as ValueItem[],

  projects: [
    {
      id: "neurosense-wsn",
      title: "NeuroSense WSN",
      subtitle: "ANN-Optimized & PSO-Hybrid 3D Wireless Sensor Network Simulation",
      category: "3D & AI/ML",
      description: "An advanced scientific 3D Wireless Sensor Network (WSN) digital twin and optimization suite. It leverages Artificial Neural Networks (ANN) for intelligent node clustering and Particle Swarm Optimization (PSO) for energy-efficient multi-hop packet routing across 100 autonomous sensor nodes.",
      problemSolved: "WSN deployments in remote spatial environments suffer from premature energy depletion, hot-spot bottleneck failures, and suboptimal spatial coverage when using static routing algorithms.",
      solution: "Engineered a hybrid ANN-PSO telemetry framework that dynamically elects cluster heads based on residual energy density and computes optimal multi-hop transmission paths, extending overall network operational lifetime by +38.5% with 99.4% packet delivery reliability.",
      keyFeatures: [
        "100 autonomous sensor node 3D spatial simulation with live energy telemetry",
        "ANN-driven cluster head election and spatial sensing coverage optimization",
        "PSO-Hybrid multi-hop packet routing with dynamic RF pathfinding",
        "Interactive 4-view 3D camera system (Top, Perspective, Sink, Network) with node raycasting HUD",
        "Real-time packet transmission modeling (Sensor → Cluster Head → Base Station Sink)"
      ],
      techStack: ["Three.js", "Python", "ANN Clustering", "PSO Routing", "TypeScript", "WebGL", "React", "Tailwind CSS"],
      githubUrl: "https://github.com/arifkhadim2024/NeuroSense-WSN",
      liveUrl: "https://github.com/arifkhadim2024/NeuroSense-WSN",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      metrics: [
        { label: "Nodes Simulated", value: "100 Nodes" },
        { label: "Lifetime Gain", value: "+38.5%" },
        { label: "Packet Delivery", value: "99.4%" }
      ]
    },
    {
      id: "neurovision-ai",
      title: "NeuroVision AI",
      subtitle: "Multi-Modal AI Diagnostic & Medical Image Analysis Suite",
      category: "AI / ML",
      description: "An intelligent healthcare computer vision platform that leverages deep learning to detect anomalies in radiological MRI imaging and generate automated clinical insights with instant visual saliency heatmaps.",
      problemSolved: "Clinicians face heavy diagnostic workloads and high image volumes, creating potential bottlenecks and delay in critical condition diagnoses.",
      solution: "Developed an end-to-end deep learning pipeline combining PyTorch CNNs and Vision Transformers with a responsive React dashboard, achieving 94.6% validation accuracy and sub-180ms inference latency.",
      keyFeatures: [
        "Convolutional Neural Network & ViT models for multi-class classification",
        "Interactive Grad-CAM saliency heatmaps for explainable AI predictions",
        "FastAPI asynchronous backend with batch inference queuing",
        "Real-time patient scan review dashboard with dark-mode optimized viewing"
      ],
      techStack: ["PyTorch", "Python", "FastAPI", "React", "TypeScript", "Tailwind CSS", "Docker"],
      githubUrl: "https://github.com/arifkhadim2024/NEUROVISION-AI",
      liveUrl: "https://neurovision-ai-mri.vercel.app/",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
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
      subtitle: "Real-Time Collaborative Developer Workspace & Code Studio",
      category: "Full Stack",
      description: "A synchronized developer productivity ecosystem featuring collaborative live code editing, markdown documentation sharing, team whiteboard canvas, and integrated task tracking.",
      problemSolved: "Remote development teams struggle with context switching between disjointed chat tools, code editors, and documentation hubs.",
      solution: "Engineered a unified workspace using WebSockets and CRDTs for sub-50ms character sync, Redis for state caching, and PostgreSQL for robust entity management.",
      keyFeatures: [
        "Sub-50ms latency collaborative Monaco code editor with live presence cursors",
        "Interactive infinite whiteboard canvas with real-time vector sync",
        "Role-based access control and encrypted project workspaces",
        "Markdown knowledge-base with live preview and code snippet execution"
      ],
      techStack: ["React", "TypeScript", "Node.js", "WebSockets", "Redis", "PostgreSQL", "Tailwind CSS"],
      githubUrl: "https://github.com/arifkhadim2024/DevFlow-Nexus",
      liveUrl: "https://dev-flow-nexus-frontend.vercel.app/dashboard",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
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
      subtitle: "Ultra-Fast Headless E-Commerce with AI Product Recommendations",
      category: "Full Stack",
      description: "A lightning-fast, modern e-commerce storefront with real-time inventory management, personalized AI-powered product recommendations, and Stripe checkout integration.",
      problemSolved: "Traditional monolithic e-commerce platforms suffer from slow page loads, bloated assets, and impersonal static product catalogs that hurt conversion.",
      solution: "Constructed a headless architecture with instant optimistic UI updates, vector-based recommendation scoring, and automated order fulfillment webhooks.",
      keyFeatures: [
        "Sub-second page navigation with optimistic cart management",
        "Vector embeddings for personalized 'Users Also Bought' recommendations",
        "Stripe payment gateway with 3D Secure verification",
        "Admin analytics panel with revenue charts and stock alerts"
      ],
      techStack: ["React", "TypeScript", "Supabase", "Tailwind CSS", "Stripe API", "Vite"],
      githubUrl: "https://github.com/arifkhadim2024/pulse-commerce",
      liveUrl: "https://pulse-commerce.demo.app",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      metrics: [
        { label: "Lighthouse Score", value: "99/100" },
        { label: "Conversion Lift", value: "+28%" },
        { label: "Avg Load Time", value: "0.6s" }
      ]
    },
    {
      id: "pulsefit-ai",
      title: "PULSEFIT AI",
      subtitle: "AI-Powered Fitness, Workout & Biomechanics Platform",
      category: "AI / ML",
      description: "A comprehensive AI-powered fitness platform designed to help users discover exercises, generate personalized workouts, track training progress, understand muscle engagement, and receive intelligent fitness guidance.",
      problemSolved: "People often struggle to create structured workout routines, understand which exercises target specific muscles, and track progress consistently.",
      solution: "Built an interactive fitness ecosystem that combines an extensive exercise library (117+ exercises), muscle-focused workout discovery, AI-assisted planning, and nutrition tracking in a unified platform.",
      keyFeatures: [
        "AI-assisted personalized workout generation",
        "Interactive muscle anatomy and exercise discovery",
        "Extensive exercise library with 117+ movements",
        "Workout tracking and biomechanics guidance",
        "Gamification and achievement-based milestones"
      ],
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "AI APIs"],
      githubUrl: "https://github.com/arifkhadim2024/PULSEFIT-AI",
      liveUrl: "https://pulsefit-ai-gilt.vercel.app/",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      metrics: [
        { label: "Exercise Library", value: "117+ Exercises" },
        { label: "AI Generator", value: "Integrated" },
        { label: "Platform", value: "Full Stack" }
      ]
    },
    {
      id: "mediscan",
      title: "MediScan",
      subtitle: "AI-Powered Healthcare & Medical Analysis Platform",
      category: "AI / ML",
      description: "An intelligent healthcare application designed to make medical information and analysis more accessible through AI-powered features, computer vision image processing, and OCR text extraction.",
      problemSolved: "Accessing and understanding medical information can be complicated, while healthcare workflows involve vast document volumes requiring digital extraction tools.",
      solution: "Developed MediScan as an AI-assisted healthcare dashboard combining modern web technologies with computer vision, OCR, and intelligent analysis capabilities.",
      keyFeatures: [
        "AI-powered medical image and document analysis",
        "Computer vision-based image processing filters",
        "OCR-based medical prescription text extraction",
        "User-friendly clinical intelligence dashboard"
      ],
      techStack: ["Python", "AI / ML", "Computer Vision", "OCR", "React", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com/arifkhadim2024/mediscan",
      liveUrl: "https://mediscan-eight-eta.vercel.app/",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
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
      subtitle: "Modern Movie Discovery & Entertainment Platform",
      category: "Web Apps",
      description: "A modern movie discovery platform that allows users to explore movies, search titles, discover entertainment content, and interact with cinematic information through an intuitive interface.",
      problemSolved: "Movie discovery platforms can become difficult to navigate when users have to search through large collections without smooth filtering.",
      solution: "Built Cine-Verse focused on fast movie search, rich metadata presentation, responsive layouts, and modern entertainment design.",
      keyFeatures: [
        "Instant live movie search and keyword filtering",
        "Detailed movie cast, plot synopsis, and rating views",
        "Interactive movie browsing with rich poster previews",
        "Responsive cinematic dark-mode UI"
      ],
      techStack: ["React", "JavaScript", "Tailwind CSS", "Vite", "Movie API"],
      githubUrl: "https://github.com/arifkhadim2024/Cine-verse",
      liveUrl: "https://cine-verse-blond.vercel.app/",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      metrics: [
        { label: "Project Type", value: "Web App" },
        { label: "Interface", value: "Cinematic" },
        { label: "Domain", value: "Entertainment" }
      ]
    },
    {
      id: "ai-resume-matcher",
      title: "AI Resume Matcher",
      subtitle: "Intelligent Resume & Job Description Matching System",
      category: "AI / ML",
      description: "An AI and NLP-powered application that analyzes resumes against job descriptions to identify relevant skills, measure compatibility, highlight skill gaps, and help candidates align with target roles.",
      problemSolved: "Job seekers often struggle to determine whether their resume matches a particular job description and which keywords need optimization.",
      solution: "Developed an intelligent resume analysis system processing text using NLP and Scikit-learn to calculate TF-IDF feature vectors, Cosine similarity, and actionable gap analysis.",
      keyFeatures: [
        "Resume and job description text parsing",
        "TF-IDF feature extraction and Cosine similarity scoring",
        "Skill matching and missing keyword identification",
        "Interactive recommendations and match score breakdown"
      ],
      techStack: ["Python", "Machine Learning", "NLP", "Scikit-learn", "TF-IDF", "Cosine Similarity", "Streamlit"],
      githubUrl: "https://github.com/arifkhadim2024/AI-Resume-Matcher",
      liveUrl: "https://ai-resume-matcher-tszdxlceiozcvzmpxond5k.streamlit.app/",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
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
      subtitle: "Machine Learning Model for Tech Salary Benchmarking & Forecasting",
      category: "AI / ML",
      description: "A predictive machine learning application developed during the Industrial Internship at Ardent Computech Pvt. Ltd., designed to predict software industry salaries based on years of experience, job role, education, and technical skill sets.",
      problemSolved: "Software developers face compensation ambiguity across differing roles and experience tiers without transparent predictive benchmarks.",
      solution: "Implemented an end-to-end ML pipeline in Python using Scikit-learn with exploratory data analysis, feature engineering, categorical encoding, and regression modeling.",
      keyFeatures: [
        "Exploratory Data Analysis (EDA) and distribution preprocessing",
        "Feature engineering and categorical variable encoding",
        "Multiple regression models evaluated for minimum RMSE and maximum R² score",
        "Interactive prediction module for instant compensation forecasting"
      ],
      techStack: ["Python", "Data Science", "Machine Learning", "Scikit-learn", "Pandas", "NumPy"],
      githubUrl: "https://github.com/arifkhadim2024",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      metrics: [
        { label: "Domain", value: "Predictive ML" },
        { label: "Internship Project", value: "Ardent Computech" },
        { label: "Framework", value: "Scikit-Learn" }
      ]
    },
    {
      id: "cloudpulse-monitor",
      title: "CloudPulse Monitor",
      subtitle: "Microservices Observability & Performance Metrics Dashboard",
      category: "Tools / Cloud",
      description: "A lightweight cloud observability tool that tracks server CPU/memory telemetry, API endpoint latency distribution, error budgets, and uptime alerting in real time.",
      problemSolved: "Heavyweight enterprise observability tools are often over-engineered, slow to boot, and prohibitively expensive for mid-sized engineering stacks.",
      solution: "Designed a high-throughput telemetry collector using Go and Node.js micro-agents feeding time-series data into a responsive interactive charting dashboard.",
      keyFeatures: [
        "Live time-series chart streaming with customizable refresh intervals",
        "Configurable threshold alerts with Slack and Webhook triggers",
        "Container health status and Docker daemon metrics tracking",
        "Exportable incident report summaries with latency percentile graphs"
      ],
      techStack: ["React", "TypeScript", "Node.js", "Docker", "Chart.js", "Tailwind CSS"],
      githubUrl: "https://github.com/arifkhadim2024/cloudpulse-monitor",
      liveUrl: "https://cloudpulse.demo.app",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      metrics: [
        { label: "Throughput", value: "5k req/s" },
        { label: "Memory Footprint", value: "32MB" }
      ]
    },
    {
      id: "algorhythm-visualizer",
      title: "Algorhythm Visualizer",
      subtitle: "Interactive Algorithm & Data Structure Sandbox with Audio Feedback",
      category: "Web Apps",
      description: "An educational interactive visualizer exploring sorting algorithms, graph pathfinding (Dijkstra, A*), and dynamic programming with step-by-step playback and auditory feedback.",
      problemSolved: "Computer science students frequently struggle with abstract algorithmic concepts without intuitive visual step execution.",
      solution: "Built a custom HTML5 canvas visualization engine with variable execution speeds, sound synthesis for swaps, and comprehensive time complexity breakdowns.",
      keyFeatures: [
        "Visual step-through for 8+ sorting algorithms and 4+ pathfinding graphs",
        "Interactive maze generation and obstacle drawing tools",
        "Web Audio API sound synthesis synchronized with array comparisons",
        "Side-by-side pseudocode highlight tracking the active instruction"
      ],
      techStack: ["TypeScript", "React", "Canvas API", "Web Audio API", "Tailwind CSS"],
      githubUrl: "https://github.com/arifkhadim2024/algorhythm-visualizer",
      liveUrl: "https://algorhythm.demo.app",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      metrics: [
        { label: "GitHub Stars", value: "120+" },
        { label: "Active Users", value: "2.4k" }
      ]
    }
  ] as ProjectItem[],

  skills: [
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
  ] as SkillItem[],

  experiences: [
    {
      id: "exp-ardent-ai-ml",
      role: "Data Science, AI & ML Intern",
      company: "Ardent Computech Pvt. Ltd.",
      location: "Kolkata, India",
      period: "Jul 2026 — Sep 2026",
      type: "Industrial Internship",
      description: "Completed an intensive Industrial Internship on Data Science, Artificial Intelligence, and Machine Learning using Python at Ardent Computech Pvt. Ltd. (partnered with NASSCOM, MSME, and N.E.A.T).",
      achievements: [
        "Engineered and deployed an end-to-end Machine Learning project titled 'Salary Predictor' using Python and predictive regression modeling.",
        "Conducted exploratory data analysis (EDA), data cleaning, feature engineering, and model evaluation on industry datasets.",
        "Gained hands-on expertise in machine learning algorithms, Scikit-learn, Pandas, NumPy, and AI pipeline deployment.",
        "Awarded official Industrial Internship Certification (Certificate ID: ARDENT/221887) endorsed by NASSCOM, MSME, and N.E.A.T."
      ],
      technologies: ["Python", "Data Science", "Machine Learning", "Artificial Intelligence", "Scikit-learn", "Pandas", "NumPy"],
      certificateUrl: "/certificates/ardent-internship-certificate.jpg"
    },
    {
      id: "exp-1",
      role: "Website Design and Development Intern",
      company: "Internship Studio",
      location: "Remote",
      period: "Jun 2026 — Aug 2026",
      type: "Web Development Internship",
      description: "Completed an internship in Website Design and Development at Internship Studio from 10 June 2026 to 14 August 2026, gaining practical experience in designing and developing modern websites.",
      achievements: [
        "Worked on website design and development tasks as part of the internship program.",
        "Gained practical exposure to modern web development workflows and responsive website implementation.",
        "Applied web development concepts to build and improve accessible user interfaces."
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Web Design", "Web Development"],
      certificateUrl: "/certificates/website-design-development-istudio.jpg"
    }
  ] as ExperienceItem[],

  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Technology (B.Tech)",
      field: "Computer Science & Engineering",
      institution: "Adamas University",
      location: "India",
      startDate: "2023",
      endDate: "Expected 2027",
      grade: "7.411 / 10.0 CGPA",
      description: "Currently pursuing a Bachelor of Technology in Computer Science & Engineering at Adamas University. Developing strong foundations in programming, data structures, databases, software development, artificial intelligence, and modern web technologies.",
      relevantCoursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
        "Artificial Intelligence & Machine Learning",
        "Web Development",
        "Software Engineering"
      ]
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
      relevantCoursework: ["Physics", "Chemistry", "Mathematics", "Biology"]
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
      relevantCoursework: ["Mathematics", "Science", "English", "Social Science", "Computer Studies"]
    }
  ] as EducationItem[],

  certificates: [
    {
      id: "cert-ardent-ai-ml",
      title: "Industrial Internship on Data Science, AI & Machine Learning using Python",
      issuer: "Ardent Computech Pvt. Ltd. (NASSCOM / MSME / N.E.A.T)",
      issueDate: "08/09/2026",
      credentialId: "ARDENT/221887",
      credentialUrl: "/certificates/ardent-internship-certificate.jpg",
      image: "/certificates/ardent-internship-certificate.jpg",
      tags: ["Data Science", "Artificial Intelligence", "Machine Learning", "Python", "Salary Predictor", "NASSCOM", "MSME"]
    },
    {
      id: "cert-1",
      title: "Gen AI Tools (Gold Category, 94% Score)",
      issuer: "FutureSkills Prime / NASSCOM",
      issueDate: "31/08/2026",
      credentialId: "FSP/2026/8/10373991",
      credentialUrl: "/Arif+mohammed+khadim_164470570.pdf",
      image: "/certificates/gen-ai-tools.jpg",
      tags: ["Generative AI", "AI Tools", "NASSCOM", "Gold Category", "94% Score"]
    },
    {
      id: "cert-2",
      title: "Website Design and Development Internship",
      issuer: "iStudio",
      issueDate: "14/08/2026",
      credentialId: "ISWDT3263817",
      credentialUrl: "/certificates/website-design-development-istudio.jpg",
      image: "/certificates/website-design-development-istudio.jpg",
      tags: ["Web Design", "Web Development", "Internship", "Frontend"]
    },
    {
      id: "cert-3",
      title: "Design Thinking for Beginners",
      issuer: "Simplilearn SkillUp",
      issueDate: "05/11/2023",
      credentialId: "4629022",
      credentialUrl: "/Simplilearn Certificate.pdf",
      image: "/certificates/design-thinking-for-beginners.jpg",
      tags: ["Design Thinking", "Problem Solving", "Creative Thinking", "Innovation"]
    },
    {
      id: "cert-4",
      title: "Internship Common Aptitude Test (iCAT)",
      issuer: "iCAT",
      issueDate: "18/05/2026",
      credentialId: "CIT-P-3263817",
      credentialUrl: "/Arif Mohammed Khadim - Participation Certificate.pdf",
      image: "/certificates/internship-common-aptitude-test.jpg",
      tags: ["Aptitude", "Problem Solving", "Assessment", "Career Development"]
    },
    {
      id: "cert-5",
      title: "Python Course for Beginners: Mastering the Essentials",
      issuer: "Scaler Topics",
      issueDate: "11/12/2025",
      credentialId: "SCALER-PY-2025",
      credentialUrl: "/scaler.pdf",
      image: "/certificates/python-course-scaler.jpg",
      tags: ["Python", "Programming Fundamentals", "121 Tutorials", "16 Modules"]
    }
  ] as CertificateItem[],

  services: [
    {
      id: "fullstack",
      title: "Full-Stack Web Engineering",
      casingLabel: "fULL-sTACK eNGINEERING",
      description: "Architecting end-to-end web applications with Next.js, React, TypeScript, Node.js, and FastAPI. Building scalable APIs, robust databases, and blisteringly fast frontends.",
      skills: ["React & Next.js", "TypeScript", "Node.js & Express", "FastAPI / Python", "PostgreSQL & Redis", "REST & GraphQL"],
      iconType: "code"
    },
    {
      id: "creative-3d",
      title: "3D & Creative Development",
      casingLabel: "3d & cREATIVE dEVELOPMENT",
      description: "Bringing web interfaces to life with interactive WebGL, Three.js, React Three Fiber, GSAP ScrollTrigger, and fluid Lenis animations that captivate audiences.",
      skills: ["Three.js / WebGL", "React Three Fiber", "GSAP & ScrollTrigger", "Lenis Smooth Scroll", "Shaders (GLSL)", "Framer Motion"],
      iconType: "cube"
    },
    {
      id: "ai-ml",
      title: "AI / ML Integrations & Vision",
      casingLabel: "ai & mACHINE lEARNING",
      description: "Embedding intelligence into software products. Deploying computer vision pipelines, LLM fine-tuning, retrieval-augmented generation (RAG), and neural network models.",
      skills: ["PyTorch & TensorFlow", "Computer Vision & ViTs", "LLM Integration & RAG", "FastAPI Inference APIs", "Data Pipelines & NumPy", "Explainable AI (Grad-CAM)"],
      iconType: "brain"
    },
    {
      id: "design-systems",
      title: "Design Systems & UI/UX",
      casingLabel: "dESIGN sYSTEMS & ui/ux",
      description: "Crafting bulletproof component design systems with pixel-faithful fidelity, responsive fluid viewport scaling, accessible markup, and uncompromising polish.",
      skills: ["Tailwind CSS", "Figma to Code", "Fluid VW Scaling", "WCAG Accessibility", "Micro-Interactions", "Performance Optimization"],
      iconType: "palette"
    }
  ] as ServiceItem[],

  testimonials: [
    {
      id: "1",
      quote: "Arif is a rare breed of engineer who combines formidable full-stack architecture skills with an exceptional eye for design and interactive 3D motion. He delivered our platform ahead of schedule with 99+ Lighthouse performance.",
      author: "Alex Morgan",
      role: "CTO & Co-Founder",
      company: "Synthetix Labs",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "2",
      quote: "Working with Arif was the smoothest engineering partnership we've had. His attention to detail on animations, zero layout shift, and clean TypeScript codebase made scaling our application effortless.",
      author: "Elena Rostova",
      role: "Lead Product Designer",
      company: "Vanguard Studio",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "3",
      quote: "From complex 3D simulations to high-concurrency WebSocket systems, Arif approaches engineering challenges with clarity, speed, and creative elegance. Highly recommended!",
      author: "Marcus Vance",
      role: "Engineering Director",
      company: "Hyperion Digital",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
    }
  ] as TestimonialItem[]
};
