// Enhanced Profile with Improved Images

export const profiles = {
  personal: {
    name: "Personal",
    icon: "User",
    color: "bg-blue-600",
    hero: {
      title: "Hi, I'm Tanmay Khandelwal",
      description: "A passionate Full Stack Developer, AI/ML Engineer, and problem solver. I build intelligent systems, scalable web applications, and elegant solutions to complex problems. Welcome to my digital space where I share my journey and experiences.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80", // Coding on laptop - professional workspace
      match: "98% Match",
      year: "2023",
      rating: "General",
      duration: "Continuous"
    },
    sections: [
      {
        title: "Work Experience",
        projects: [
          {
  id: 'p-work-1',
  title: "Backend Developer Intern @ Mentox Technologies Pvt. Ltd.",
  description: "Designed and developed scalable backend services for an intelligent ERP platform. Built RESTful APIs, optimized database schemas, and implemented automation workflows using Node.js, Express, and MongoDB. Focused on creating maintainable, production-ready code with strong emphasis on data integrity and performance optimization.",
  category: "Internship",
  image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "Zod", "REST API", "Git"],
  match: "99% Match",
  year: "2024-2025",
  rating: "Work",
  duration: "6 Months",
  role: "Backend Developer Intern",
  difficulty: "Professional",
  tags: ["Backend Development", "API Design", "Database Optimization", "ERP Systems"],
  links: {
    demo: "#",
    code: "#"
  },
  features: [
    {
      title: "API Development & Integration",
      duration: "Ongoing",
      desc: "Designed and built RESTful endpoints with Express.js, ensuring seamless service interaction and robust data flow across ERP modules."
    },
    {
      title: "Database Schema Design",
      duration: "Throughout",
      desc: "Architected efficient Mongoose schemas with pre-save hooks, validation layers, and indexing strategies that improved query performance and data integrity."
    },
    {
      title: "Automation & Workflow Logic",
      duration: "Core Focus",
      desc: "Implemented automated allocation and distribution algorithms for sectioning and grouping processes, handling large-scale datasets and edge cases effectively."
    },
    {
      title: "Code Quality & Maintainability",
      duration: "Continuous",
      desc: "Applied Zod-based validation, implemented reusable service layers, and enforced modular coding practices aligned with microservices architecture principles."
    },
    {
      title: "Performance Optimization",
      duration: "Regular",
      desc: "Optimized database queries and indexing strategies, reducing system latency and improving data retrieval performance across the platform."
    },
    {
      title: "Team Collaboration",
      duration: "Daily",
      desc: "Participated in code reviews, debugging sessions, and technical discussions to maintain best practices and ensure consistency across backend modules."
    }
  ]
}
        ]
      },
      {
        title: "Education",
        projects: [
          {
            id: 'p-edu-1',
            title: "B.Tech in Computer Science & Engineering",
            description: "Currently pursuing Bachelor of Technology with focus on Software Engineering, Data Structures & Algorithms, Machine Learning, and System Design. Consistent academic performer with hands-on project experience.",
            category: "Education",
            image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80", // University campus/learning environment
            technologies: ["CS Fundamentals", "DSA", "OS", "DBMS", "ML", "Networks"],
            match: "100% Match",
            year: "2021-2025",
            rating: "A+",
            duration: "4 Years",
            role: "Student",
            difficulty: "Academic",
            tags: ["Computer Science", "Engineering", "Research"],
            links: {
              demo: "#",
              code: "#"
            },
            features: [
              {
                title: "Core Curriculum",
                duration: "3 Years",
                desc: "Completed courses in Data Structures, Algorithms, OS, DBMS, Computer Networks, and System Design."
              },
              {
                title: "Machine Learning",
                duration: "1 Semester",
                desc: "Studied supervised/unsupervised learning, neural networks, and deep learning fundamentals."
              },
              {
                title: "Academic Projects",
                duration: "Ongoing",
                desc: "Built multiple projects demonstrating practical application of theoretical concepts."
              }
            ]
          },
          {
            id: 'p-edu-2',
            title: "Relevant Certifications & Courses",
            description: "Completed industry-recognized certifications and online courses to supplement academic learning. Focused on modern web technologies, cloud computing, and AI/ML specializations.",
            category: "Certifications",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80", // Online learning/certificates
            technologies: ["AWS", "React", "Python", "Machine Learning", "Docker"],
            match: "96% Match",
            year: "2022-2024",
            rating: "Certified",
            duration: "2 Years",
            role: "Learner",
            difficulty: "Professional",
            tags: ["Continuous Learning", "Certifications", "Upskilling"],
            links: {
              demo: "#",
              code: "#"
            },
            features: [
              {
                title: "Web Development",
                duration: "6 Months",
                desc: "Completed advanced React, Node.js, and full-stack development courses."
              },
              {
                title: "Cloud & DevOps",
                duration: "3 Months",
                desc: "AWS certifications and Docker containerization training."
              },
              {
                title: "AI/ML Specialization",
                duration: "4 Months",
                desc: "Deep learning, NLP, and computer vision courses from Coursera."
              }
            ]
          }
        ]
      },
      {
        title: "Extracurricular Activities",
        projects: [
          {
            id: 'p-extra-1',
            title: "ACM Student Chapter - Technical Lead",
            description: "Led the university's ACM chapter organizing hackathons, coding competitions, and technical workshops. Mentored 50+ junior students in web development and competitive programming. Managed a team of 20 volunteers.",
            category: "Leadership",
            image: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800&q=80", // Presentation/workshop environment
            technologies: ["Leadership", "Event Management", "Public Speaking", "Mentorship"],
            match: "98% Match",
            year: "2023-2024",
            rating: "Leadership",
            duration: "1 Year",
            role: "Technical Lead",
            difficulty: "Soft Skills",
            tags: ["Leadership", "Community", "Mentorship"],
            links: {
              demo: "#",
              code: "#"
            },
            features: [
              {
                title: "Hackathon Organization",
                duration: "3 Events",
                desc: "Organized and managed 3 major 24-hour hackathons with 200+ participants."
              },
              {
                title: "Workshop Series",
                duration: "10 Sessions",
                desc: "Conducted workshops on React, Python, Git, and competitive programming."
              },
              {
                title: "Mentorship Program",
                duration: "Year-round",
                desc: "Mentored 50+ juniors through one-on-one sessions and group workshops."
              }
            ]
          },
          {
            id: 'p-extra-2',
            title: "Open Source Contributor",
            description: "Active contributor to open source projects in the React and Python ecosystems. Contributed bug fixes, documentation improvements, and new features to popular libraries. Building a strong GitHub presence.",
            category: "Community",
            image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80", // GitHub/code collaboration
            technologies: ["Git", "GitHub", "Open Source", "Collaboration"],
            match: "90% Match",
            year: "2023-2024",
            rating: "Community",
            duration: "Ongoing",
            role: "Contributor",
            difficulty: "Collaborative",
            tags: ["Open Source", "Git", "Community Building"],
            links: {
              demo: "#",
              code: "#"
            },
            features: [
              {
                title: "Code Contributions",
                duration: "Ongoing",
                desc: "Submitted 20+ pull requests to various open source projects."
              },
              {
                title: "Documentation",
                duration: "Ongoing",
                desc: "Improved README files and added missing API documentation for several libraries."
              }
            ]
          },
          {
            id: 'p-extra-3',
            title: "Technical Blogging & Content Creation",
            description: "Maintain a technical blog sharing tutorials, project breakdowns, and learning experiences. Write about web development, AI/ML, and software engineering best practices. Growing audience of 500+ regular readers.",
            category: "Content Creation",
            image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80", // Writing/blogging setup
            technologies: ["Writing", "Technical Documentation", "Teaching"],
            match: "88% Match",
            year: "2023-2024",
            rating: "Creator",
            duration: "Ongoing",
            role: "Blogger",
            difficulty: "Creative",
            tags: ["Writing", "Teaching", "Knowledge Sharing"],
            links: {
              demo: "#",
              code: "#"
            },
            features: [
              {
                title: "Tutorial Series",
                duration: "Ongoing",
                desc: "Published 30+ in-depth tutorials on React, WebRTC, and ML topics."
              },
              {
                title: "Project Showcases",
                duration: "Monthly",
                desc: "Detailed breakdowns of personal projects with code walkthroughs."
              }
            ]
          }
        ]
      }
    ]
  },
  
  fullstack: {
    name: "Full Stack Developer",
    icon: "Code",
    color: "bg-red-600",
    hero: {
      title: "Full Stack Engineering",
      description: "From pixel-perfect UIs to scalable microservices - building end-to-end solutions that matter. Specialized in real-time systems, modern web frameworks, and production-grade architectures.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80", // Developer coding on multiple monitors
      match: "100% Match",
      year: "2024",
      rating: "Code",
      duration: "Specialization"
    },
    sections: [
      {
        title: "Real-Time & Communication",
        projects: [
          {
            id: 'fs-rtc-1',
            title: "Student-Verified Video Platform",
            description: "Production-ready WebRTC communication platform with P2P video, random matching, watch parties, and real-time chat. Architected with Redux, Socket.IO signaling, and deterministic lifecycle management. Features dynamic device switching and synchronized media playback.",
            category: "Real-Time Systems",
            image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80", // Video call/conferencing setup
            technologies: ["React", "WebRTC", "Socket.IO", "Redux Toolkit", "Node.js"],
            match: "100% Match",
            year: "2024",
            rating: "Production",
            duration: "4 Months",
            role: "Full Stack Engineer",
            difficulty: "Expert",
            tags: ["WebRTC", "Real-time", "Media Streaming", "Signaling"],
            links: {
              demo: "#",
              code: "#"
            },
            features: [
              {
                title: "WebRTC Engine",
                duration: "1 Month",
                desc: "Built peer-to-peer video with track replacement, screen sharing, and multi-participant support."
              },
              {
                title: "Socket Architecture",
                duration: "2 Weeks",
                desc: "Designed single-instance socket with clean signaling for offer/answer/ICE exchange."
              },
              {
                title: "Watch Party Sync",
                duration: "2 Weeks",
                desc: "Implemented host-controlled synchronized playback with drift correction."
              }
            ]
          }
        ]
      },
      {
        title: "E-Commerce & SaaS",
        projects: [
          {
            id: 'fs-ecom-1',
            title: "Supabase E-Commerce Platform",
            description: "Full-stack e-commerce with role-based pricing, phone authentication, and WhatsApp checkout. Normalized PostgreSQL with RLS, cart/wishlist persistence, and category browsing. Resolved complex RLS recursion and session handling issues.",
            category: "E-Commerce",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", // E-commerce/shopping interface
            technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind"],
            match: "98% Match",
            year: "2024",
            rating: "SaaS",
            duration: "3 Months",
            role: "Full Stack Developer",
            difficulty: "Advanced",
            tags: ["BaaS", "Auth", "Database Design", "Security"],
            links: {
              demo: "#",
              code: "#"
            },
            features: [
              {
                title: "Database Design",
                duration: "2 Weeks",
                desc: "Normalized schemas for products, orders, carts with computed views for category counts."
              },
              {
                title: "Row Level Security",
                duration: "2 Weeks",
                desc: "Implemented strict RLS policies, debugged recursion issues, improved reliability 100%."
              },
              {
                title: "WhatsApp Integration",
                duration: "1 Week",
                desc: "Built checkout flow with order persistence before Click-to-Chat redirect."
              }
            ]
          }
        ]
      },
      {
        title: "Document Processing & Tools",
        projects: [
          {
            id: 'fs-pdf-1',
            title: "React PDF Editor Pro",
            description: "Browser-based PDF annotation suite with layered canvas architecture. Non-destructive editing, coordinate normalization, undo/redo, and burn-in export. 100% client-side with zero backend dependencies.",
            category: "Productivity Tool",
            image: "https://images.unsplash.com/photo-1554224311-beee415c201f?w=800&q=80", // Document/PDF editing workspace
            technologies: ["React", "PDF.js", "Canvas API", "jsPDF"],
            match: "99% Match",
            year: "2024",
            rating: "Tool",
            duration: "2 Months",
            role: "Frontend Engineer",
            difficulty: "Expert",
            tags: ["Canvas", "PDF", "Vector Graphics", "Performance"],
            links: {
              demo: "#",
              code: "#"
            },
            features: [
              {
                title: "Dual-Layer Rendering",
                duration: "2 Weeks",
                desc: "Static PDF layer + dynamic annotation canvas achieving 60fps."
              },
              {
                title: "Zoom System",
                duration: "1 Week",
                desc: "Coordinate normalization maintaining vector sharpness across zoom levels."
              },
              {
                title: "Export Engine",
                duration: "1 Week",
                desc: "Compositing pipeline merging PDF and annotations into single downloadable file."
              }
            ]
          }
        ]
      },
      {
        title: "Desktop to Web Integration",
        projects: [
          {
            id: 'fs-desktop-1',
            title: "Travel Agency Billing System",
            description: "Production-grade Java desktop application with wizard-style CardLayout interface, custom Graphics2D components, and Apache PDFBox integration. Implemented MVC architecture with centralized session management and BigDecimal financial precision.",
            category: "Desktop Application",
            image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80", // Travel/booking interface
            technologies: ["Java", "Swing", "Apache PDFBox", "MVC", "Graphics2D", "BigDecimal"],
            match: "99% Match",
            year: "2024",
            rating: "Production",
            duration: "3 Months",
            role: "Software Engineer",
            difficulty: "Advanced",
            tags: ["Desktop", "Financial", "PDF Generation", "Custom UI"],
            links: {
              demo: "#",
              code: "#"
            },
            features: [
              {
                title: "Custom UI Framework",
                duration: "3 Weeks",
                desc: "Built flat-design components using Graphics2D with rounded borders, shadows, and anti-aliasing."
              },
              {
                title: "PDF Generation Engine",
                duration: "2 Weeks",
                desc: "Dynamic coordinate mapping system for variable-length itineraries with precise positioning."
              },
              {
                title: "Session Management",
                duration: "1 Week",
                desc: "Centralized BookingSession enabling non-destructive wizard navigation."
              },
              {
                title: "Financial Precision",
                duration: "3 Days",
                desc: "BigDecimal for all monetary calculations eliminating floating-point errors."
              }
            ]
          }
        ]
      },
      {
        title: "Content & Community",
        projects: [
          {
            id: 'fs-blog-1',
            title: "Blog Platform with Appwrite",
            description: "Full-featured blogging platform with React frontend and Appwrite backend. User authentication, rich text editing, comment system, and responsive design.",
            category: "Content Platform",
            image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80", // Blogging/writing on laptop
            technologies: ["React", "Appwrite", "Tailwind CSS"],
            match: "92% Match",
            year: "2023",
            rating: "Blog",
            duration: "1 Month",
            role: "Full Stack Developer",
            difficulty: "Intermediate",
            tags: ["CMS", "BaaS", "Content Creation"],
            links: {
              demo: "#",
              code: "#"
            },
            features: []
          },
          {
            id: 'fs-mgmt-1',
            title: "College Management System",
            description: "Community engagement platform with Node.js/Express backend. Dynamic content rendering, club announcements, member sign-ups, and cross-device accessibility.",
            category: "Management System",
            image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80", // Campus/college environment
            technologies: ["React", "Node.js", "Express", "MongoDB"],
            match: "94% Match",
            year: "2023",
            rating: "Web",
            duration: "2 Months",
            role: "Full Stack Developer",
            difficulty: "Intermediate",
            tags: ["CRUD", "Backend", "Community"],
            links: {
              demo: "#",
              code: "#"
            },
            features: []
          }
        ]
      }
    ]
  },
  
  aiml: {
    name: "AI/ML Engineer",
    icon: "Brain",
    color: "bg-purple-600",
    hero: {
      title: "Artificial Intelligence & Machine Learning",
      description: "Building intelligent systems that learn, adapt, and solve real-world problems. From NLP to Computer Vision, transforming data into actionable insights.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80", // AI/neural network visualization
      match: "99% Match",
      year: "2025",
      rating: "Research",
      duration: "Innovation"
    },
    sections: [
      {
        title: "Natural Language Processing",
        projects: [
          {
            id: 'ai-nlp-1',
            title: "Fake News Detection System",
            description: "Comprehensive ML pipeline for misinformation detection. Implemented TF-IDF, VADER sentiment, spaCy semantic vectors, and BERT embeddings. Compared Naive Bayes, SVM, Random Forest, LSTM, and BERT models. Achieved 97.6% accuracy with SVM using combined features.",
            category: "NLP & Classification",
            image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80", // News/media/journalism
            technologies: ["Python", "scikit-learn", "BERT", "LSTM", "spaCy", "VADER", "TensorFlow"],
            match: "98% Match",
            year: "2024",
            rating: "Research",
            duration: "3 Months",
            role: "Data Scientist",
            difficulty: "Advanced",
            tags: ["NLP", "Deep Learning", "Feature Engineering", "Text Classification"],
            links: {
              demo: "#",
              code: "#"
            },
            features: [
              {
                title: "Data Collection",
                duration: "2 Weeks",
                desc: "Built RSS scraper for 15+ sources with feedparser, BeautifulSoup, retry mechanisms."
              },
              {
                title: "Feature Engineering",
                duration: "3 Weeks",
                desc: "Extracted TF-IDF, sentiment (VADER), semantic (spaCy), and BERT embeddings."
              },
              {
                title: "Model Comparison",
                duration: "2 Weeks",
                desc: "Trained 5+ models: Naive Bayes, SVM (97.6%), Random Forest, LSTM, BERT."
              },
              {
                title: "EDA & Insights",
                duration: "1 Week",
                desc: "Analyzed content length, complexity, sentiment, and linguistic patterns."
              }
            ]
          }
        ]
      },
      {
        title: "Computer Vision",
        projects: [
          {
            id: 'ai-cv-1',
            title: "Object Detection Threshold Analysis",
            description: "Comparative study of Faster R-CNN, YOLOv5, and YOLOv8 on aerial traffic imagery. Conducted threshold sensitivity analysis (0.1-0.9), IoU-based NMS evaluation, and per-class detection frequency visualization. Demonstrated precision-recall trade-offs across architectures.",
            category: "Computer Vision",
            image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=80", // Traffic/autonomous vehicles
            technologies: ["PyTorch", "YOLOv5", "YOLOv8", "Torchvision", "OpenCV", "Matplotlib"],
            match: "97% Match",
            year: "2024",
            rating: "Research",
            duration: "1 Month",
            role: "Computer Vision Engineer",
            difficulty: "Advanced",
            tags: ["Object Detection", "Model Comparison", "Performance Analysis"],
            links: {
              demo: "#",
              code: "#"
            },
            features: [
              {
                title: "Multi-Architecture Comparison",
                duration: "2 Weeks",
                desc: "Implemented Faster R-CNN (region-based) vs YOLOv5/v8 (single-shot) on same dataset."
              },
              {
                title: "Threshold Analysis",
                duration: "1 Week",
                desc: "Evaluated confidence thresholds 0.1-0.9 with per-class frequency line plots."
              },
              {
                title: "NMS & IoU Study",
                duration: "3 Days",
                desc: "Analyzed Non-Maximum Suppression impact on overlapping bounding boxes."
              }
            ]
          }
        ]
      },
      {
        title: "Predictive Analytics & IoT",
        projects: [
          {
            id: 'ai-pred-1',
            title: "Predictive Maintenance System",
            description: "ML-powered system classifying machine failure types from IoT sensor data. Performed EDA, feature engineering with OrdinalEncoder/StandardScaler, and hyperparameter tuning for Random Forest. Containerized preprocessing pipeline.",
            category: "Predictive Analytics",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", // Industrial IoT/sensors
            technologies: ["Python", "scikit-learn", "Random Forest", "Pandas", "Docker"],
            match: "96% Match",
            year: "2023",
            rating: "IoT",
            duration: "2 Months",
            role: "ML Engineer",
            difficulty: "Intermediate",
            tags: ["IoT", "Classification", "Feature Engineering"],
            links: {
              demo: "#",
              code: "#"
            },
            features: [
              {
                title: "Sensor Feature Engineering",
                duration: "2 Weeks",
                desc: "Processed sensor readings with ordinal encoding and standardization."
              },
              {
                title: "Model Optimization",
                duration: "1 Week",
                desc: "Grid search hyperparameter tuning for Random Forest classifier."
              },
              {
                title: "Deployment Pipeline",
                duration: "3 Days",
                desc: "Dockerized preprocessing and prediction workflow for production."
              }
            ]
          }
        ]
      }
    ]
  }
};

export default profiles;