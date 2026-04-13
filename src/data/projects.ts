export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  techStack: string[];
  color: string;
  imagePath?: string;
  links?: {
    github?: string;
    demo?: string;
  };
  tags?: ("AI" | "Web" | "ML")[];
}

export const projects: Project[] = [
  {
    id: "ayashield",
    title: "AyaShield",
    category: "AI / DeFi",
    shortDescription:
      "AI-powered DeFi risk intelligence platform that analyzes protocol security, liquidity stability, and exploit probability before transactions are signed. Simulates market conditions and evaluates smart contract risk to help users make safer DeFi decisions.",
    fullDescription:
      "An advanced AI-powered platform that analyzes DeFi protocol risks in real-time using machine learning algorithms and smart contract auditing.",
    features: [
      "Real-time risk assessment of DeFi protocols",
      "Smart contract vulnerability detection",
      "Predictive analytics for market threats",
      "Integration with major blockchain networks",
    ],
    techStack: ["Python", "TensorFlow", "Web3.js", "React", "PostgreSQL"],
    color: "from-blue-500 to-cyan-500",
    links: {
      demo: "https://ayashield.vercel.app/",
    },
    tags: ["AI", "Web", "ML"],
  },
  {
    id: "edura",
    title: "Edura",
    category: "AI / Education",
    shortDescription:
      "AI-powered personalized learning ecosystem that generates custom courses, study roadmaps, and interactive learning experiences. Combines AI tutoring, VR study environments, and productivity tools to improve student engagement and learning efficiency.",
    fullDescription:
      "An intelligent learning platform that adapts to each student's learning style and pace, powered by machine learning recommendations.",
    features: [
      "Adaptive learning paths based on student performance",
      "AI-powered content recommendations",
      "Real-time progress tracking",
      "Collaborative learning features",
    ],
    techStack: ["React", "Node.js", "MongoDB", "PyTorch", "WebSocket"],
    color: "from-purple-500 to-pink-500",
    links: {
      demo: "https://edura-geminihack.vercel.app/",
    },
    tags: ["AI", "Web"],
  },
  {
    id: "unmasked",
    title: "Unmasked",
    category: "Computer Vision",
    shortDescription:
      "Deepfake detection platform that analyzes video frames using deep learning models to identify manipulated media. Provides forensic analysis tools, reporting dashboards, and awareness features for detecting synthetic content.",
    fullDescription:
      "A sophisticated deepfake detection system using advanced computer vision and neural networks to identify manipulated media.",
    features: [
      "Deep learning-based face analysis",
      "Temporal consistency checking",
      "Audio-visual synchronization analysis",
      "Real-time video processing",
    ],
    techStack: ["PyTorch", "OpenCV", "FastAPI", "React", "FFmpeg"],
    color: "from-red-500 to-orange-500",
    links: {
      github: "https://github.com/apurvakhangal/Unmasked",
    },
    tags: ["AI", "ML"],
  },
  {
    id: "brain-wheelchair",
    title: "Brain Operated Wheelchair",
    category: "BCI / IoT",
    shortDescription:
      "Assistive technology system that enables wheelchair control using brain signals captured through EEG/EOG circuits. Integrates neural signal processing with deep learning models to convert brain activity into movement commands.",
    fullDescription:
      "An innovative brain-computer interface system that enables wheelchair control through EEG signals, enhancing mobility for individuals with severe motor disabilities.",
    features: [
      "Real-time EEG signal processing",
      "Machine learning-based intent recognition",
      "Wheelchair motor control integration",
      "Safety override mechanisms",
    ],
    techStack: ["Arduino", "Python", "TensorFlow", "Signal Processing", "ROS"],
    color: "from-green-500 to-emerald-500",
    links: {
      github: "https://github.com/NOOBPOOK/FinalYearProject",
    },
    tags: ["AI", "ML"],
  },
  {
    id: "phishing-detection",
    title: "Phishing URL Detection",
    category: "Security / ML",
    shortDescription:
      "Machine learning system that identifies malicious phishing URLs using feature engineering and classification models. Implements SVM with SMOTE and dimensionality reduction to detect suspicious patterns in URLs.",
    fullDescription:
      "A machine learning model trained to identify malicious URLs and phishing attempts with high accuracy using advanced feature engineering.",
    features: [
      "URL feature extraction and analysis",
      "Real-time classification engine",
      "Browser extension integration",
      "Continuous model improvement",
    ],
    techStack: ["Scikit-learn", "Python", "Flask", "JavaScript", "PostgreSQL"],
    color: "from-yellow-500 to-amber-500",
    links: {
      github: "https://github.com/apurvakhangal/Python-Phishing-URL-ML",
    },
    tags: ["Web", "ML"],
  },
];
