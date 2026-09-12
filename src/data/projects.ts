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
    githubUrl: "https://github.com/arifkhadim/neurovision-ai",
    liveUrl: "https://neurovision-ai.demo.app",
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
    githubUrl: "https://github.com/arifkhadim/devflow-nexus",
    liveUrl: "https://devflow-nexus.demo.app",
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
    githubUrl: "https://github.com/arifkhadim/pulse-commerce",
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
    githubUrl: "https://github.com/arifkhadim/cloudpulse-monitor",
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
    githubUrl: "https://github.com/arifkhadim/algorhythm-visualizer",
    liveUrl: "https://algorhythm.demo.app",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    metrics: [
      { label: "GitHub Stars", value: "120+" },
      { label: "Active Users", value: "2.4k" }
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
