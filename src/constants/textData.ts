import WebLinks from "@/constants/links";
import { PageLinks } from "@/constants/links";
import {
  AboutPageData,
  EducationPageData,
  ExperiencePageData,
  MediaPageData,
  ConnectPageData,
  SkillsPageData,
  GraphData,
  TextSegment,
} from "@/types/interfaces";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaTelegram
} from "react-icons/fa6";

// Final Refined Graph Structure - HIERARCHICAL & INTERCONNECTED
const aboutPageGraphData = {
  nodes: [
    // --- Central Node ---
    { id: "Onkar Yaglewad", name: "root", val: 35, textSegmentId: "para-1" }, // Keep name 'root', val 35

    // --- Theme Nodes (Primary Branches) ---
    { id: "theme-para-2", name: "Early Coding & Inspiration", val: 12, textSegmentId: "para-2" },
    { id: "theme-para-3", name: "Project Experience & Learning", val: 12, textSegmentId: "para-3" },
    { id: "theme-para-4", name: "OS & Systems Mindset", val: 12, textSegmentId: "para-4" },
    { id: "theme-para-5", name: "FOSS & Collaboration", val: 12, textSegmentId: "para-5" },
    { id: "theme-para-6", name: "Current Work (VIA)", val: 12, textSegmentId: "para-6" },
    { id: "theme-para-7", name: "Building Philosophy", val: 12, textSegmentId: "para-7" },

    // --- Existing Skill/Concept Nodes (Secondary) + NEW SUB-NODES ---
    // Para 2
    { id: "Early Coding (Tourism Website)", name: "Early Coding (Tourism Website)", val: 6, textSegmentId: "para-2" },
    { id: "Web Fundamentals (HTML/CSS/JS)", name: "Web Fundamentals", val: 7, textSegmentId: "para-2" }, // Shortened name
    { id: "Trial & Error", name: "Trial & Error", val: 5, textSegmentId: "para-2" },
    { id: "Passion for Tech", name: "Passion for Tech", val: 7, textSegmentId: "para-2" },
    { id: "DOM Manipulation", name: "DOM Manipulation", val: 5, textSegmentId: "para-2" }, // NEW
    { id: "Problem Decomposition", name: "Problem Decomposition", val: 6, textSegmentId: "para-2" }, // NEW

    // Para 3
    { id: "Project Building", name: "Project Building", val: 9, textSegmentId: "para-3" },
    { id: "Social Platform (3K+ Users)", name: "Social Platform (3K+ Users)", val: 7, textSegmentId: "para-3" },
    { id: "Backend Dev (PHP/Node)", name: "Backend Dev", val: 7, textSegmentId: "para-3" }, // Shortened name
    { id: "Scrapped Projects", name: "Scrapped Projects", val: 4, textSegmentId: "para-3" },
    { id: "Learning from Experience", name: "Learning from Experience", val: 8, textSegmentId: "para-3" },
    { id: "Failure Analysis", name: "Failure Analysis", val: 5, textSegmentId: "para-3" },
    { id: "Web APIs (REST/HTTP)", name: "Web APIs", val: 7, textSegmentId: "para-3" }, // Shortened name
    { id: "Database Design", name: "Database Design", val: 6, textSegmentId: "para-3" }, // NEW
    { id: "User Authentication", name: "User Authentication", val: 6, textSegmentId: "para-3" }, // NEW

    // Para 4
    { id: "Arch Linux Configuration", name: "Arch Linux Config", val: 7, textSegmentId: "para-4" }, // Shortened name
    { id: "Understanding System Internals", name: "System Internals", val: 7, textSegmentId: "para-4" }, // Shortened name
    { id: "Debugging & Fixing", name: "Debugging & Fixing", val: 8, textSegmentId: "para-4" },
    { id: "Linux CLI Utilities", name: "Linux CLI", val: 8, textSegmentId: "para-4" }, // Shortened name
    { id: "Package Management (pacman)", name: "Package Management", val: 7, textSegmentId: "para-4" }, // Shortened name
    { id: "Systems Mindset", name: "Systems Mindset", val: 8, textSegmentId: "para-4" },
    { id: "Self-Directed Learning", name: "Self-Directed Learning", val: 9, textSegmentId: "para-4" },
    { id: "Bash Shell", name: "Bash Shell", val: 7, textSegmentId: "para-4" },
    { id: "Python 3", name: "Python 3", val: 7, textSegmentId: "para-4" },
    { id: "System Tinkering", name: "System Tinkering", val: 7, textSegmentId: "para-4" },
    { id: "Shell Scripting", name: "Shell Scripting", val: 6, textSegmentId: "para-4" }, // NEW
    { id: "Containerization", name: "Containerization", val: 5, textSegmentId: "para-4" }, // NEW

    // Para 5
    { id: "FOSS Exploration", name: "FOSS Exploration", val: 6, textSegmentId: "para-5" },
    { id: "Version Control (Git)", name: "Version Control (Git)", val: 9, textSegmentId: "para-5" },
    { id: "Collaboration", name: "Collaboration", val: 6, textSegmentId: "para-5" },
    { id: "Problem Solving", name: "Problem Solving", val: 9, textSegmentId: "para-5" },
    { id: "Open Source Contribution", name: "OSS Contribution", val: 5, textSegmentId: "para-5" }, // NEW
    { id: "Community Interaction", name: "Community Interaction", val: 4, textSegmentId: "para-5" }, // NEW
    { id: "CI/CD Pipelines", name: "CI/CD Pipelines", val: 6, textSegmentId: "para-5" }, // NEW

    // Para 6
    { id: "VIA App (Ride-Sharing)", name: "VIA App (Ride-Sharing)", val: 8, textSegmentId: "para-6" },
    { id: "Subscription Models", name: "Subscription Models", val: 5, textSegmentId: "para-6" },
    { id: "Flutter Development", name: "Flutter Development", val: 7, textSegmentId: "para-6" },
    { id: "Mobile App Architecture", name: "Mobile App Architecture", val: 6, textSegmentId: "para-6" },
    { id: "UI/UX Design (Mobile)", name: "UI/UX (Mobile)", val: 5, textSegmentId: "para-6" }, // NEW
    { id: "State Management (Mobile)", name: "State Management (Mobile)", val: 6, textSegmentId: "para-6" }, // NEW

    // Para 7
    { id: "Passion for Building", name: "Passion for Building", val: 8, textSegmentId: "para-7" },
    { id: "Ideation & Discussion", name: "Ideation & Discussion", val: 5, textSegmentId: "para-7" },
    { id: "Idea Generation", name: "Idea Generation", val: 5, textSegmentId: "para-7" },
    { id: "Brainstorming", name: "Brainstorming", val: 5, textSegmentId: "para-7" },
    { id: "Responsiveness", name: "Responsiveness", val: 4, textSegmentId: "para-7" }
  ],
  links: [
    // --- Central Node to Themes --- (Unchanged)
    { source: "Onkar Yaglewad", target: "theme-para-2" },
    { source: "Onkar Yaglewad", target: "theme-para-3" },
    { source: "Onkar Yaglewad", target: "theme-para-4" },
    { source: "Onkar Yaglewad", target: "theme-para-5" },
    { source: "Onkar Yaglewad", target: "theme-para-6" },
    { source: "Onkar Yaglewad", target: "theme-para-7" },

    // --- Theme 2 Links + Sub-nodes + Cross-links ---
    { source: "theme-para-2", target: "Early Coding (Tourism Website)" },
    { source: "theme-para-2", target: "Web Fundamentals (HTML/CSS/JS)" },
    { source: "theme-para-2", target: "Trial & Error" },
    { source: "theme-para-2", target: "Passion for Tech" },
    { source: "theme-para-2", target: "Problem Decomposition" }, // NEW
    { source: "Web Fundamentals (HTML/CSS/JS)", target: "DOM Manipulation" }, // NEW
    { source: "Early Coding (Tourism Website)", target: "Web Fundamentals (HTML/CSS/JS)" }, // Existing semantic link
    { source: "Problem Decomposition", target: "Problem Solving" }, // Cross-link

    // --- Theme 3 Links + Sub-nodes + Cross-links ---
    { source: "theme-para-3", target: "Project Building" },
    { source: "theme-para-3", target: "Social Platform (3K+ Users)" },
    { source: "theme-para-3", target: "Backend Dev (PHP/Node)" },
    { source: "theme-para-3", target: "Scrapped Projects" },
    { source: "theme-para-3", target: "Learning from Experience" },
    { source: "theme-para-3", target: "Failure Analysis" },
    { source: "theme-para-3", target: "Web APIs (REST/HTTP)" },
    { source: "Backend Dev (PHP/Node)", target: "Database Design" }, // NEW
    { source: "Backend Dev (PHP/Node)", target: "User Authentication" }, // NEW
    { source: "Social Platform (3K+ Users)", target: "User Authentication" }, // NEW
    { source: "Web APIs (REST/HTTP)", target: "Backend Dev (PHP/Node)" }, // Existing semantic link
    { source: "Learning from Experience", target: "Failure Analysis" }, // Existing semantic link
    { source: "Project Building", target: "Backend Dev (PHP/Node)" }, // Cross-link

    // --- Theme 4 Links + Sub-nodes + Cross-links ---
    { source: "theme-para-4", target: "Arch Linux Configuration" },
    { source: "theme-para-4", target: "Understanding System Internals" },
    { source: "theme-para-4", target: "Debugging & Fixing" },
    { source: "theme-para-4", target: "Linux CLI Utilities" },
    { source: "theme-para-4", target: "Package Management (pacman)" },
    { source: "theme-para-4", target: "Systems Mindset" },
    { source: "theme-para-4", target: "Self-Directed Learning" },
    { source: "theme-para-4", target: "Bash Shell" },
    { source: "theme-para-4", target: "Python 3" },
    { source: "theme-para-4", target: "System Tinkering" },
    { source: "Bash Shell", target: "Shell Scripting" }, // NEW
    { source: "Systems Mindset", target: "Containerization" }, // NEW
    { source: "Understanding System Internals", target: "Systems Mindset" }, // Existing semantic link
    { source: "Python 3", target: "Backend Dev (PHP/Node)" }, // Cross-link
    { source: "Debugging & Fixing", target: "Failure Analysis" }, // Cross-link

    // --- Theme 5 Links + Sub-nodes + Cross-links ---
    { source: "theme-para-5", target: "FOSS Exploration" },
    { source: "theme-para-5", target: "Version Control (Git)" },
    { source: "theme-para-5", target: "Collaboration" },
    { source: "theme-para-5", target: "Problem Solving" },
    { source: "FOSS Exploration", target: "Open Source Contribution" }, // NEW
    { source: "Collaboration", target: "Community Interaction" }, // NEW
    { source: "Version Control (Git)", target: "CI/CD Pipelines" }, // NEW
    { source: "Open Source Contribution", target: "Community Interaction" }, // NEW
    { source: "Version Control (Git)", target: "Project Building" }, // Cross-link
    { source: "Problem Solving", target: "Debugging & Fixing" }, // Cross-link

    // --- Theme 6 Links + Sub-nodes + Cross-links ---
    { source: "theme-para-6", target: "VIA App (Ride-Sharing)" },
    { source: "theme-para-6", target: "Subscription Models" },
    { source: "theme-para-6", target: "Flutter Development" },
    { source: "theme-para-6", target: "Mobile App Architecture" },
    { source: "Flutter Development", target: "UI/UX Design (Mobile)" }, // NEW
    { source: "Flutter Development", target: "State Management (Mobile)" }, // NEW
    { source: "Mobile App Architecture", target: "State Management (Mobile)" }, // NEW
    { source: "Web APIs (REST/HTTP)", target: "Flutter Development" }, // Cross-link
    { source: "Mobile App Architecture", target: "Systems Mindset" }, // Cross-link

    // --- Theme 7 Links + Existing Sub-nodes + Cross-links --- (Unchanged)
    { source: "theme-para-7", target: "Passion for Building" },
    { source: "theme-para-7", target: "Ideation & Discussion" },
    { source: "theme-para-7", target: "Idea Generation" },
    { source: "theme-para-7", target: "Brainstorming" },
    { source: "theme-para-7", target: "Responsiveness" },
    { source: "Passion for Building", target: "Idea Generation" },
    { source: "Ideation & Discussion", target: "Brainstorming" },
    { source: "Idea Generation", target: "Brainstorming" },
    { source: "Brainstorming", target: "Collaboration" },
    { source: "Responsiveness", target: "Collaboration" },
    { source: "Passion for Building", target: "Project Building" },
  ]
};

const aboutPageData: AboutPageData = {
  title: {
    acquainted: "Let's Get Acquainted",
    achievements: "Achievements",
    testimonials: "What Others Say",
  },
  subtitle: {
    acquainted:
      "Get to know me a little better.",
    achievements:
      "Technical and non-technical milestones that changed my life.",
    testimonials:
      "Insights and experiences shared by colleagues, mentors, and collaborators.",
  },

  introductionSegments: [
    { id: "para-1", text: "Hey, I'm Onkar Yaglewad." },
    { id: "para-2", text: "I started coding when I was 12, figuring out how to turn my sister's Android app project into a working tourism website. It was clunky, confusing, and full of trial and error but that messy process is what made me fall in love with tech." },
    { id: "para-3", text: "Over the years, I've built things like a social platform that reached over 3K active users. I've also scrapped projects that never made it past a few commits. Both experiences taught me in different ways." },
    { id: "para-4", text: "I use Arch Linux as my daily driver, not for the badge, but because I enjoy understanding what's under the hood and fixing things when they go wrong. That mindset extends to how I approach code, systems, and life in general." },
    { id: "para-5", text: "Lately, I've been diving deeper into FOSS, exploring the structures that shape the digital world and the ways we can make them better. I'm always up for building, collaborating, and figuring things out along the way." },
    { id: "para-6", text: "Right now, I'm working on VIA - a subscription-based ride-sharing app. Can't share too much publicly yet, but if it sounds interesting and you think you can help us out in any way, feel free to reach out. Maybe we'll end up building something crazy together." },
    { id: "para-7", text: "I love building things. If you've got an idea, want a second brain, or just need someone to bounce thoughts off, just hit me up, as long as it's not spam, I'll always reply :p" }
  ],

  itemCardList: {
    backgroundList: [
      { icon: "🔖", title: "Name: Onkar Yaglewad" },
      { icon: "🎂", title: "Age: 18" },
      { icon: "👨🏽", title: "Gender: Male" },
      { icon: "🌏", title: "Location: Pune, Maharashtra, India" },
      { icon: "💬", title: "Languages: English, Hindi, Marathi" },
    ],

    goalsList: [
      { icon: "💻", title: "Master: Web Development" },
      { icon: "🖥️", title: "Practice: Software Development" },
      { icon: "🎓", title: "Complete: B.Tech in CSE" },
      { icon: "🚀", title: "Build: Impactful Projects" },
    ],

    interestsList: [
      { icon: "🎬", title: "Watch: Movies & TV Shows" },
      { icon: "🎧", title: "Listen: Songs & Music" },
      { icon: "🖌️", title: "Create: Contents & Media" },
      { icon: "🔍", title: "Explore: New Things" },
    ],
  },

  achievementsList: [
    {
      title: "2nd Position - IT Olympiad",
      date: "2018",
      description:
        "Secured 2nd position in a national-level IT championship at MCE Society's PAI College.",
    },
    {
      title: "5th Position - Retracer",
      date: "2022",
      description:
        "Achieved 5th rank in Retracer at the annual, national level technical festival of College of Engineering, Pune (COEP Tech.).",
    },
    {
      title: "Lead Organizer - India's largest FOSS hackathon",
      date: "Feb 2025",
      description:
        "Spearheaded organization of India's largest FOSS hackathon under FOSS United.",
    },
    {
      title: "Managed Partnerships - PuneFOSS 3.0",
      date: "Mar 2025",
      description:
        "Managed partnerships for PuneFOSS 3.0, the city's flagship open-source conference.",
    },
    {
      title: "Freelanced for 6+ brands",
      date: "2022-2025",
      description:
        "Freelanced for 6+ brands, including FadersAcademy and Rasta Café.",
    },
    {
      title: "Core Maintainer - Rising OS",
      date: "2024",
      description:
        "Served as a Core Maintainer of Rising OS custom Android ROM for 6 months.",
    },
  ],

  testimonials: [
    {
      name: "Prabhath Mannapperuma",
      title: "Partner Technology Strategist",
      org: "@Microsoft",
      image: "prabhath",
      connection: "",
      profileLink: PageLinks.about.prabhath,
      testimonialLink: PageLinks.about.linkedInRecommendations,
      testimonial:
        "I highly recommend Dileepa Bandara as a Microsoft Learn Student Ambassador. Over the past few years, I've witnessed his unwavering commitment to community engagement and his proactive efforts in collaborating with fellow students. Dileepa's dedication to giving back and his impactful contributions make him a valuable asset to any company or project.",
    },
    {
      name: "Ruwandika Wijesiri",
      title: "Technical Lead",
      org: "@Sysco LABS",
      image: "ruwandika",
      connection: "",
      profileLink: PageLinks.about.ruwandika,
      testimonialLink: PageLinks.about.linkedInRecommendations,
      testimonial:
        "I was impressed by his technical skills and the potential he had at the time I was teaching him, making him one of the hardworking & talented students at the institute. He is very much passionate about writing code and solving problems through the development of creative and innovative software solutions and tends to stay up to date with the latest technologies as well.",
    },
    {
      name: "Isuru Devinda De Silva",
      title: "Co-Founder",
      org: "@DDS Techvira",
      image: "isuru",
      connection: "",
      profileLink: PageLinks.about.isuru,
      testimonialLink: PageLinks.about.linkedInRecommendations,
      testimonial:
        "I'm amazed by Dileepa's ability to Flutter, a skill he uses to his benefit when making presentations to clients and colleagues. He is a highly focused person as well as analytical and can add to any team he is a part of. His energy to make things happen was contagious and it helped us achieve great goals. One of the best analysts we had for sure.",
    },
    {
      name: "Nimesh Ekanayake",
      title: "Technical Consultant",
      org: "@Platned",
      image: "nimesh",
      connection: "",
      profileLink: PageLinks.about.nimesh,
      testimonialLink: PageLinks.about.linkedInRecommendations,
      testimonial:
        "Dileepa possesses exceptional skills in community building, leadership, and technical expertise, making a significant impact on the success of our initiatives. His passion for empowering fellow students and fostering a culture of continuous learning is truly inspiring. It has been a pleasure working alongside Dileepa, and I am confident that his skills and commitment will continue to shine in future endeavors.",
    },
    {
      name: "Eranga Perera",
      title: "Consultant / Lecturer",
      org: "@NIBM",
      image: "eranga",
      connection: "",
      profileLink: PageLinks.about.eranga,
      testimonialLink: PageLinks.about.linkedInRecommendations,
      testimonial:
        "What truly impressed me about Dileepa was their proactive approach to problem-solving. They exhibited a strong analytical mindset, often thinking outside the box to find innovative solutions. Their eagerness to explore new technologies and apply them practically was commendable and reflected in their work. I am delighted to recommend them highly for their exceptional dedication to the IT field.",
    },
    {
      name: "Buwaneka Jayasundara",
      title: "DevOps Engineer",
      org: "@Affiniti Innovations",
      image: "buwaneka",
      connection: "",
      profileLink: PageLinks.about.buwaneka,
      testimonialLink: PageLinks.about.linkedInRecommendations,
      testimonial:
        "Dileepa and I collaborated on a challenging mobile app project centered around visualizing data predicted by ML algorithms. As a Flutter developer, Dileepa demonstrated exceptional coding skills and a profound understanding of Google Cloud services, contributing significantly to the success of our project. His problem-solving abilities are exemplary, consistently finding innovative solutions to complex challenges.",
    },
  ],
};

const educationPageData: EducationPageData = {
  title: "Education",

  subtitle: "Discover the stages of my academic learning journey.",

  academic: [
    {
      course: "B.Tech., Computer Science and Engineering",
      institute: "D Y Patil International University",
      location: "Pune, Maharashtra",
      years: "2022 - 2026",
      status: "In Progress",
      image: "nibm",
      link: PageLinks.education.nibm,
    },
    {
      course: "Higher Secondary Certificate (HSC)",
      institute: "Maharashtra State Board",
      location: "Maharashtra",
      years: "2022",
      status: "62.17%",
      image: "coventry",
      link: PageLinks.education.coventry,
    },
    {
      course: "Secondary School Certificate (SSC)",
      institute: "Maharashtra State Board",
      location: "Maharashtra",
      years: "2020",
      status: "87.80%",
      image: "nibm",
      link: PageLinks.education.nibm,
    },
  ],
};

const experiencePageData: ExperiencePageData = {
  title: "Experience",

  subtitle: {
    work: "These are the places where my technical career unfolded.",
    projects: "Check out some of the projects I've worked on.",
    tools:
      "I love using so many tools to make my work easier. Here are some of them.",
    volunteer:
      "These are my favorite tech communities I've been involved with.",
  },

  work: [
    {
      title: "Product Intern",
      org: "Bajaj Finserv · Internship",
      location: "Jun 2024 - Aug 2024 · Pune",
      years: "Jun 2024 - Aug 2024",
      status: "Managed build and run processes for Store Locator module and Compliance framework across CUG and production builds of the app and web platforms; collaborated with QA, IT, and Design teams to resolve `bugs` and ensure smooth deployments.",
      image: "placeholder",
      imageL: "placeholder",
      link: "#",
      calculatedDurationOverride: "3 months",
    },
    {
      title: "Event Coordinator Intern",
      org: "Make-a-Wish Foundation India · Internship",
      location: "Jun 2023 - July 2023 · Pune",
      years: "Jun 2023 - July 2023",
      status: "Facilitated onboarding of underprivileged children into the Make-A-Wish program; worked alongside the CEO to manage events and deliver impactful experiences for 600+ lives.",
      image: "placeholder",
      imageL: "placeholder",
      link: "#",
      calculatedDurationOverride: "1 month",
    },
    {
      title: "Web Development Intern",
      org: "Mark AD · Internship",
      location: "Jan 2023 - May 2023 · Raipur",
      years: "Jan 2023 - May 2023",
      status: "Solely developed and deployed 4 client websites using WordPress and PHP, driving up to 11K weekly visitors and generating qualified business leads.",
      image: "placeholder",
      imageL: "placeholder",
      link: "#",
      calculatedDurationOverride: "4 months",
    },
    {
      title: "Web Development Intern",
      org: "DY Patil International University · Internship",
      location: "Nov 2022 - Feb 2023 · Akurdi",
      years: "Nov 2022 - Feb 2023",
      status: "Developed and enhanced the university's Moodle LMS using PHP, supporting 4000+ students and 80+ faculty across live teacher and student portals.",
      image: "placeholder",
      imageL: "placeholder",
      link: "#",
      calculatedDurationOverride: "4 months",
    },
  ],

  projects: [
    {
      title: "Impulse OS - Custom Linux Distro",
      description:
        "Engineered a minimal Arch-based Linux distro with Hyprland, linux-zen kernel, and Material You-inspired UX, optimized for performance and beginner usability.",
      image: "placeholder", // Placeholder
      keyWords: ["Linux", "OS", "UX", "Performance", "Hyprland", "Rust"], // Added more specific keywords
      link: "#", // Placeholder
    },
    {
      title: "EvoFrame - Gesture & Voice Controlled Smart Glasses",
      description:
        "Built and 3D printed smart glasses with Raspberry Pi, OpenCV, and Python for gesture and voice-based control, enhancing hands-free accessibility and interaction.",
      image: "placeholder", // Placeholder
      keyWords: ["Raspberry Pi", "OpenCV", "Python", "Hardware", "IoT", "3D Printing"], // Added more specific keywords
      link: "#", // Placeholder
    },
    {
      title: "Drip Limitless - Social Media Platform",
      description:
        "Led development of a full-stack social platform with real-time chat and analytics using Node.js, PHP, and Docker, reaching 5K+ users and boosting engagement by 25%.",
      image: "placeholder", // Placeholder
      keyWords: ["Node.js", "PHP", "Docker", "Full-stack", "Social Media", "Web Sockets", "Analytics"], // Added more specific keywords
      link: "#", // Placeholder
    },
    {
      title: "MahaDarshan - State Tourism Website",
      description:
        "Created and hosted a responsive tourism portal using HTML, CSS, and JS at age 15, achieving SEO optimization and smooth performance on live servers.",
      image: "placeholder", // Placeholder
      keyWords: ["HTML", "CSS", "JavaScript", "SEO", "Web Development", "Performance"], // Added more specific keywords
      link: "#", // Placeholder
    },
    {
      title: "Additional Projects", // Using a general title for the summary
      description:
        "Built various apps including those with Flutter and Jetpack Compose, facial recognition tools, alumni platforms, and ride-hailing concepts. Also developed kiosks and smart waste systems.",
      image: "placeholder", // Placeholder
      keyWords: ["Flutter", "Jetpack Compose", "AI", "Mobile Dev", "Hardware", "IoT"], // Added relevant keywords
      link: "https://onkaryaglewad.in/projects", // Using the link provided in CV
    },
  ],

  toolsFrontBack: [
    {
      title: "HTML5",
      description:
        "A markup language used for structuring and presenting content on the World Wide Web.",
      image: "html5",
      imageL: "html5",
      link: "",
    },
    {
      title: "CSS3",
      description:
        "A style sheet language used for describing the presentation of a document written in HTML.",
      image: "css3",
      imageL: "css3",
      link: "",
    },
    {
      title: "Bootstrap",
      description:
        "A free and open-source CSS framework directed at responsive, mobile-first front-end web development.",
      image: "bootstrap",
      imageL: "bootstrap",
      link: "",
    },
    {
      title: "Tailwind CSS",
      description: "A utility-first CSS framework for rapid UI development.",
      image: "tailwindcss",
      imageL: "tailwindcss",
      link: "",
    },
    {
      title: "JavaScript",
      description: "A high-level, interpreted programming language.",
      image: "javascript",
      imageL: "javascript",
      link: "",
    },
    {
      title: "TypeScript",
      description:
        "A typed superset of JavaScript that compiles to plain JavaScript.",
      image: "typescript",
      imageL: "typescript",
      link: "",
    },
    {
      title: "Node.js",
      description:
        "A JavaScript runtime built on Chrome's V8 JavaScript engine.",
      image: "nodejs",
      imageL: "nodejs",
      link: "",
    },
    {
      title: "Express.js",
      description: "A web application framework for Node.js.",
      image: "express",
      imageL: "express-l",
      link: "",
    },
    {
      title: "React.js",
      description: "A JavaScript library for building user interfaces.",
      image: "reactjs",
      imageL: "reactjs",
      link: "",
    },
    {
      title: "Next.js",
      description: "A React framework for building production-ready apps.",
      image: "nextjs",
      imageL: "nextjs",
      link: "",
    },
    {
      title: "GraphQL",
      description:
        "A query language for APIs and a runtime for executing those queries by using a type system you define for your data.",
      image: "graphql",
      imageL: "graphql",
      link: "",
    },
    {
      title: "C#",
      description: "A general-purpose, multi-paradigm programming language.",
      image: "csharp",
      imageL: "csharp",
      link: "",
    },
    {
      title: ".NET",
      description: "A free, cross-platform, open-source developer platform.",
      image: "dotnet",
      imageL: "dotnet",
      link: "",
    },
    {
      title: "Dart",
      description:
        "A client-optimized programming language for fast apps on any platform.",
      image: "dart",
      imageL: "dart",
      link: "",
    },
    {
      title: "Flutter",
      description:
        "Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.",
      image: "flutter",
      imageL: "flutter",
      link: "",
    },
    {
      title: "Python",
      description:
        "An interpreted high-level general-purpose programming language.",
      image: "python",
      imageL: "python",
      link: "",
    },
    {
      title: "Flask",
      description: "A lightweight WSGI web application framework in Python.",
      image: "flask",
      imageL: "flask",
      link: "",
    },
    {
      title: "FastAPI",
      description:
        "A modern, fast (high-performance), web framework for Python.",
      image: "fastapi",
      imageL: "fastapi",
      link: "",
    },
    {
      title: "Java",
      description:
        "A class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
      image: "java",
      imageL: "java",
      link: "",
    },
  ],

  toolsCloud: [
    {
      title: "Azure",
      description:
        "A cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services.",
      image: "azure",
      imageL: "azure",
      link: "",
    },
    {
      title: "GCP",
      description:
        "A suite of cloud computing services that runs on the same infrastructure that Google uses internally for its end-user products.",
      image: "gcp",
      imageL: "gcp",
      link: "",
    },
    {
      title: "Firebase",
      description:
        "A platform developed by Google for creating mobile and web applications.",
      image: "firebase",
      imageL: "firebase",
      link: "",
    },
    {
      title: "Supabase",
      description:
        "An open-source Firebase alternative. Instantly add authentication, a realtime database, serverless functions, and storage to your project.",
      image: "supabase",
      imageL: "supabase",
      link: "",
    },
    {
      title: "PostgreSQL",
      description: "A powerful, open-source object-relational database system.",
      image: "postgresql",
      imageL: "postgresql",
      link: "",
    },
    {
      title: "MongoDB",
      description:
        "A source-available cross-platform document-oriented database program.",
      image: "mongodb",
      imageL: "mongodb",
      link: "",
    },
    {
      title: "Git",
      description:
        "A distributed version control system for tracking changes in source code during software development.",
      image: "git",
      imageL: "git",
      link: "",
    },
    {
      title: "GitHub",
      description:
        "A web-based platform for version control and collaboration.",
      image: "github",
      imageL: "github-l",
      link: "",
    },
    {
      title: "GitLab",
      description:
        "A web-based DevOps lifecycle tool that provides a Git repository manager.",
      image: "gitlab",
      imageL: "gitlab",
      link: "",
    },
    {
      title: "Codemagic",
      description:
        "A CI/CD tool that helps you build, test, and deliver your apps.",
      image: "codemagic",
      imageL: "codemagic",
      link: "",
    },
  ],

  toolsAIML: [
    {
      title: "Azure AI",
      description:
        "A web-based integrated development environment for building AI applications.",
      image: "azureai",
      imageL: "azureai",
      link: "",
    },
    {
      title: "Azure ML",
      description:
        "A collaborative, drag-and-drop tool to build, test, and deploy machine learning models.",
      image: "azureml",
      imageL: "azureml",
      link: "",
    },
    {
      title: "TensorFlow",
      description: "An end-to-end open-source platform for machine learning.",
      image: "tensorflow",
      imageL: "tensorflow",
      link: "",
    },
    {
      title: "Keras",
      description: "An open-source deep learning framework written in Python.",
      image: "keras",
      imageL: "keras",
      link: "",
    },
    {
      title: "PyTorch",
      description:
        "An open-source machine learning library based on the Torch library.",
      image: "pytorch",
      imageL: "pytorch",
      link: "",
    },
    {
      title: "Scikit-learn",
      description:
        "A free software machine learning library for the Python programming language.",
      image: "scikitlearn",
      imageL: "scikitlearn",
      link: "",
    },
    {
      title: "OpenCV",
      description:
        "A library of programming functions mainly aimed at real-time computer vision.",
      image: "opencv",
      imageL: "opencv",
      link: "",
    },
    {
      title: "LangChain",
      description:
        "A blockchain-based platform for language learning and teaching.",
      image: "langchain",
      imageL: "langchain-l",
      link: "",
    },
  ],

  toolsCode: [
    {
      title: "Visual Studio Code",
      description:
        "A free source-code editor made by Microsoft for Windows, Linux, and macOS.",
      image: "vscode",
      imageL: "vscode",
      link: "",
    },
    {
      title: "Visual Studio",
      description:
        "An integrated development environment for developing computer programs.",
      image: "visualstudio",
      imageL: "visualstudio",
      link: "",
    },
    {
      title: "Android Studio",
      description:
        "The official integrated development environment for Google's Android operating system.",
      image: "androidstudio",
      imageL: "androidstudio",
      link: "",
    },
    {
      title: "IntelliJ IDEA",
      description:
        "A Java integrated development environment for developing computer software.",
      image: "intellijidea",
      imageL: "intellijidea",
      link: "",
    },
    {
      title: "PyCharm",
      description:
        "An integrated development environment used in computer programming, specifically for the Python language.",
      image: "pycharm",
      imageL: "pycharm",
      link: "",
    },
    {
      title: "Codespaces",
      description:
        "A cloud-based development environment that is integrated into GitHub.",
      image: "codespaces",
      imageL: "codespaces",
      link: "",
    },
    {
      title: "CodeSandbox",
      description:
        "An online code editor and prototyping tool that makes creating web applications faster.",
      image: "codesandbox",
      imageL: "codesandbox",
      link: "",
    },
    {
      title: "Google Colab",
      description:
        "A free cloud service that supports free GPU and TPU for deep learning.",
      image: "googlecolab",
      imageL: "googlecolab",
      link: "",
    },
  ],

  toolsPM: [
    {
      title: "ClickUp",
      description: "A cloud-based collaboration and project management tool.",
      image: "clickup",
      imageL: "clickup",
      link: "",
    },
    {
      title: "Jira",
      description:
        "A proprietary issue tracking product developed by Atlassian.",
      image: "jira",
      imageL: "jira",
      link: "",
    },
    {
      title: "Microsoft 365",
      description:
        "A line of subscription services offered by Microsoft as part of the Microsoft Office product line.",
      image: "microsoft365",
      imageL: "microsoft365",
      link: "",
    },
    {
      title: "Figma",
      description:
        "A cloud-based design tool that is used for creating user interfaces.",
      image: "figma",
      imageL: "figma",
      link: "",
    },
  ],

  volunteer: [
    {
      title: "FOSS Hack Pune",
      org: "FOSS United Foundation",
      location: "2025 · Pune",
      years: "2025",
      status: "Lead Organizer of India's largest FOSS hackathon, bringing together developers, designers, and innovators to build open-source solutions. Managed event logistics, participant coordination, and technical mentorship.",
      image: "placeholder",
      link: "#",
    },
    {
      title: "PuneFOSS 3.0",
      org: "FOSS United Pune",
      location: "2025 · Pune",
      years: "2025",
      status: "Managed community partnerships for the city's flagship open-source conference, facilitating collaborations between tech communities and industry partners.",
      image: "placeholder",
      link: "#",
    },
    {
      title: "Lead Web Development",
      org: "TEDxDyp",
      location: "Pune", // Assuming location for context
      years: "Year", // Placeholder year
      status: "Led the web development efforts for TEDxDyp, an independently organized TED event, including building and maintaining the event website.",
      image: "placeholder", // Placeholder
      link: "#", // Placeholder
    },
  ],
};

const mediaPageData: MediaPageData = {
  title: {
    events: "Event Highlights",
    csc: "Cloud Skills Challenges",
  },
  subtitle: {
    events:
      "A snapshot of memorable sessions, meetups, and workshops I did as a speaker.",
    csc: "A collection of Cloud Skills Challenges I've hosted.",
  },

  eventsList: [
    {
      title: "Season of AI - NIBM Galle",
      date: "31st August 2024",
      time: "07:00 PM - 10:00 PM (UTC+05:30)",
      venue: "Microsoft Teams (Online)",
      description:
        "Season of AI is a global Microsoft Community Pilot program taking place at various locations around the world, focusing on the latest advancements in Microsoft AI.",
      image: "banner",
      link: "#",
      role: ["Speaker"],
      organizer: ["Microsoft Learn Student Ambassadors"],
      organizerImage: ["mlsa"],
    },
    {
      title: "Season of AI - NIBM Kurunegala",
      date: "26th August 2024",
      time: "03:00 PM - 04:30 PM (UTC+05:30)",
      venue: "NIBM Kurunegala (In-Person)",
      description:
        "Season of AI is a global Microsoft Community Pilot program taking place at various locations around the world, focusing on the latest advancements in Microsoft AI.",
      image: "banner",
      link: "#",
      role: ["Speaker"],
      organizer: ["Microsoft Learn Student Ambassadors"],
      organizerImage: ["mlsa"],
    },
    {
      title: "Microsoft Azure Artificial Intelligence Career Paths",
      date: "28th June 2024",
      time: "09:00 AM - 04:00 PM (UTC+05:30)",
      venue: "NIBM Kandy (In-Person)",
      description:
        "This workshop offered comprehensive guidelines for embarking on a career in artificial intelligence, leveraging the power of Azure AI services.",
      image: "banner",
      link: "#",
      role: ["Speaker"],
      organizer: ["Microsoft Learn Student Ambassadors"],
      organizerImage: ["mlsa"],
    },
    {
      title: "Build AI Solutions with Microsoft Technologies",
      date: "13th May 2024",
      time: "09:00 AM - 03:00 PM (UTC+05:30)",
      venue: "NIBM Kurunegala (In-Person)",
      description:
        "A practical workshop on building AI solutions using Microsoft technologies, including Azure AI services and tools.",
      image: "banner",
      link: "#",
      role: ["Speaker"],
      organizer: ["Microsoft Learn Student Ambassadors"],
      organizerImage: ["mlsa"],
    },
    {
      title: "Exploring Azure Services for Web Apps",
      date: "02nd May 2024",
      time: "07:00 PM - 08:30 PM (UTC+05:30)",
      venue: "Microsoft Teams (Online)",
      description:
        "This event provided a beginner-friendly introduction to Azure fundamentals and explored its capabilities for web apps.",
      image: "banner",
      link: "#",
      role: ["Speaker"],
      organizer: ["Microsoft Learn Student Ambassadors"],
      organizerImage: ["mlsa"],
    },
    {
      title: "Productivity with Azure AI Studio",
      date: "23rd April 2024",
      time: "07:00 PM - 08:00 PM (UTC+05:30)",
      venue: "Microsoft Teams (Online)",
      description:
        "A hands-on introduction to Azure AI Studio, a powerful tool for building, training, and deploying machine learning models.",
      image: "banner",
      link: "#",
      role: ["Speaker"],
      organizer: ["Microsoft Learn Student Ambassadors"],
      organizerImage: ["mlsa"],
    },
    {
      title: "Building, Deploying, and Consuming ML Models with Azure ML",
      date: "28th February 2024",
      time: "12:30 PM - 2:00 PM (UTC+05:30)",
      venue: "Google Meet (Online)",
      description:
        "A hands-on workshop to introduce the Azure Machine Learning platform for building, deploying, and consuming machine learning models.",
      image: "banner",
      link: "#",
      role: ["Speaker"],
      organizer: [
        "Amihacks 2k24 by Amity University Gwalior",
        "Microsoft Learn Student Ambassadors",
      ],
      organizerImage: ["ami", "mlsa"],
    },
    {
      title: "Sri Lanka Developer Forum - January Meetup",
      date: "18th January 2024",
      time: "06:30 PM - 07:00 PM (UTC+05:30)",
      venue: "Microsoft Sri Lanka (In-Person)",
      description:
        "A monthly meetup of the Sri Lanka Developer Forum community to discuss the latest trends in Microsoft technologies and software development.",
      image: "banner",
      link: "#",
      role: ["Speaker"],
      organizer: ["Sri Lanka Developer Forum"],
      organizerImage: ["sldf"],
    },
    {
      title: "Microsoft Imagine Cup 2024 - NIBM Awareness Session",
      date: "20th December 2023",
      time: "7:30 PM - 9:00 PM (UTC+05:30)",
      venue: "Microsoft Teams (Online)",
      description:
        "An awareness session for NIBM students to learn about the Microsoft Imagine Cup 2024 competition and how to participate.",
      image: "banner",
      link: "#",
      role: ["Host, Speaker"],
      organizer: [
        "NIBM Computing Society",
        "Microsoft Learn Student Ambassadors",
      ],
      organizerImage: ["nibmcs", "mlsa"],
    },
    {
      title: "Navigating Azure OpenAl Service as a Beginner",
      date: "01st December 2023",
      time: "8:00 PM - 9:30 PM (UTC+05:30)",
      venue: "Microsoft Teams (Online)",
      description:
        "A beginner-friendly session includes hands-on practice demos to explore the Azure OpenAl service and its capabilities for AI-powered applications.",
      image: "banner",
      link: "#",
      role: ["Host, Speaker"],
      organizer: ["Microsoft Learn Student Ambassadors"],
      organizerImage: ["mlsa"],
    },
    {
      title: "Web development with Microsoft tools",
      date: "19th August 2023",
      time: "8:00 PM - 9:30 PM (UTC+05:30)",
      venue: "Microsoft Teams (Online)",
      description:
        "A session to guide beginners through building their first web application using Microsoft tools and services.",
      image: "banner",
      link: "#",
      role: ["Host, Speaker"],
      organizer: ["Microsoft Learn Student Ambassadors"],
      organizerImage: ["mlsa"],
    },
    {
      title: "Microsoft Build After Party - NIBM Meetup",
      date: "04th July 2023",
      time: "3:00 PM - 6:00 PM (UTC+05:30)",
      venue: "NIBM Colombo (In-Person)",
      description:
        "A post-event meetup to discuss the highlights of Microsoft Build 2023 and share insights on the latest announcements and technologies.",
      image: "banner",
      link: "#",
      role: ["Host, Speaker"],
      organizer: [
        "NIBM Computing Society",
        "Microsoft Learn Student Ambassadors",
      ],
      organizerImage: ["nibmcs", "mlsa"],
    },
    {
      title: "Build your first web app with Node.js",
      date: "25th March 2023",
      time: "3:00 PM - 4:00 PM (UTC+05:30)",
      venue: "Microsoft Sri Lanka (In-Person)",
      description:
        "A hands-on workshop to guide beginners through building their first web application using Node.js and Express.js.",
      image: "banner",
      link: "#",
      role: ["Co-Host, Speaker"],
      organizer: ["Microsoft Learn Student Ambassadors - Sri Lanka"],
      organizerImage: ["mlsa"],
    },
    {
      title: "Getting Started with Microsoft 365",
      date: "07th March 2023",
      time: "1:00 PM - 3:00 PM (UTC+05:30)",
      venue: "NIBM Kurunegala (In-Person)",
      description:
        "An introductory session to explore the features and benefits of Microsoft 365 for students and educators.",
      image: "banner",
      link: "#",
      role: ["Host, Speaker"],
      organizer: ["Microsoft Learn Student Ambassadors"],
      organizerImage: ["mlsa"],
    },
    {
      title: "Introduction to Azure",
      date: "24th February 2023",
      time: "10:00 AM - 12:00 PM (UTC+05:30)",
      venue: "NIBM Colombo (In-Person)",
      description:
        "A beginner-friendly workshop to introduce the fundamentals of Azure cloud services and how to get started with Azure.",
      image: "banner",
      link: "#",
      role: ["Host, Speaker"],
      organizer: [
        "NIBM Computing Society",
        "Microsoft Learn Student Ambassadors",
      ],
      organizerImage: ["nibmcs", "mlsa"],
    },
    {
      title: "FOSS Community Meetup - NIBM",
      date: "14th January 2023",
      time: "10:00 AM - 12:00 PM (UTC+05:30)",
      venue: "NIBM Colombo (In-Person)",
      description:
        "A community meetup to discuss the latest trends in open-source software and how to contribute to FOSS projects.",
      image: "banner",
      link: "#",
      role: ["Co-Host, Speaker"],
      organizer: ["NIBM Computing Society", "FOSS Sri Lanka"],
      organizerImage: ["nibmcs", "fosslk"],
    },
  ],

  log: [
    {
      title: "Dileepa Bandara",
      org: "YouTube",
      years: "Nov 2023 - Present",
      status: "",
      image: "youtube",
      link: PageLinks.media.youtube,
      handler: "@dileepadev",
    },
    {
      title: "Dileepa Bandara",
      org: "Hashnode",
      years: "Nov 2023 - Present",
      status: "",
      image: "hashnode",
      link: PageLinks.media.hashnode,
      handler: "@dileepadev",
    },
  ],
};

const connectPageData: ConnectPageData = {
  title: "Connect",

  subtitle:
    "Connect with me through social media and other communication channels.",

  description:
    "Let's connect! Whether you have inquiries, thoughts to share, or just want to drop a friendly message, I'd love to hear from you. Feel free to reach out through the contact form.",

  connectLinks: [
    {
      title: "Email",
      link: "mailto:" + WebLinks.email,
      handler: WebLinks.email,
      icon: "email",
    },
    {
      title: "GitHub",
      link: "https://github.com/once-human",
      handler: "once-human",
      icon: "github",
    },
    {
      title: "Instagram",
      link: "https://www.instagram.com/yaglewad_onkar/",
      handler: "@yaglewad_onkar",
      icon: "instagram",
    },
    {
      title: "WhatsApp",
      link: "https://wa.me/917057273988?text=hey%20Onkar%2C%20hopped%20in%20from%20your%20portfolio%20website%20at%20onkaryaglewad.in.%20how%27re%20you%20doing%20%3F",
      handler: "+91 70572 73988",
      icon: "whatsapp",
    },
    {
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/onkar-yaglewad",
      handler: "onkar-yaglewad",
      icon: "linkedin",
    },
    {
      title: "Telegram",
      link: "https://t.me/oncehuman7",
      handler: "@oncehuman7",
      icon: "telegram",
    },
  ],

  submitStatus: "SUCCESS",
  submitMessage:
    "Thanks for contacting me! I'll get back to you as soon as possible. 😊",
};

const skillsPageData: SkillsPageData = {
  title: {
    technical: "Technical Skills",
    soft: "Soft Skills",
    languages: "Languages",
  },
  subtitle: {
    technical: "My technical expertise and proficiencies.",
    soft: "Personal attributes that enable me to interact effectively with others.",
    languages: "Languages I can communicate in.",
  },
  technicalSkills: [
    {
      id: 1,
      name: "Web Development",
      proficiency: 90,
      description: "Proficient in HTML, CSS, JavaScript, and modern frameworks like React and Next.js.",
    },
    {
      id: 2,
      name: "Programming Languages",
      proficiency: 85,
      description: "Experienced with Python, JavaScript, C, C++, and Java.",
    },
    {
      id: 3,
      name: "Database Management",
      proficiency: 80,
      description: "Skilled in SQL, MongoDB, and Firebase for data storage and retrieval.",
    },
    {
      id: 4,
      name: "Version Control",
      proficiency: 85,
      description: "Proficient with Git and GitHub for collaborative development.",
    },
    {
      id: 5,
      name: "UI/UX Design",
      proficiency: 75,
      description: "Capable of creating user-friendly interfaces and experiences.",
    },
    {
      id: 6,
      name: "API Development",
      proficiency: 80,
      description: "Experienced in creating and consuming RESTful APIs.",
    },
  ],
  softSkills: [
    {
      id: 1,
      name: "Communication",
      proficiency: 90,
      description: "Effective verbal and written communication skills.",
    },
    {
      id: 2,
      name: "Problem Solving",
      proficiency: 85,
      description: "Analytical approach to identifying and resolving complex issues.",
    },
    {
      id: 3,
      name: "Teamwork",
      proficiency: 90,
      description: "Collaborative mindset with experience in diverse team environments.",
    },
    {
      id: 4,
      name: "Time Management",
      proficiency: 85,
      description: "Efficient prioritization and organization of tasks and projects.",
    },
    {
      id: 5,
      name: "Adaptability",
      proficiency: 80,
      description: "Quick to learn new technologies and adjust to changing requirements.",
    },
    {
      id: 6,
      name: "Leadership",
      proficiency: 75,
      description: "Experience leading small teams and coordinating project activities.",
    },
  ],
  languages: [
    {
      id: 1,
      name: "English",
      proficiency: 90,
      description: "Professional working proficiency",
    },
    {
      id: 2,
      name: "Hindi",
      proficiency: 95,
      description: "Native proficiency",
    },
    {
      id: 3,
      name: "Marathi",
      proficiency: 100,
      description: "Native proficiency",
    },
  ],
};

const textData = {
  aboutPageData,
  aboutPageGraphData,
  educationPageData,
  experiencePageData,
  mediaPageData,
  connectPageData,
  skillsPageData,
  socialLinks: [
    { name: "LinkedIn", icon: FaLinkedin, link: "https://www.linkedin.com/in/onkar-yaglewad" },
    { name: "GitHub", icon: FaGithub, link: "https://github.com/once-human" },
    { name: "Email (Secondary)", icon: FaEnvelope, link: "mailto:onkar@viarides.in" },
    { name: "Telegram", icon: FaTelegram, link: "https://t.me/oncehuman7" },
    { name: "Email", icon: FaEnvelope, link: "mailto:contact@onkaryaglewad.in" },
  ],
};

export default textData;
