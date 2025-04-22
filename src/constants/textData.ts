import WebLinks from "@/constants/links";
import { PageLinks } from "@/constants/links";
import {
  AboutPageData,
  EducationPageData,
  ExperiencePageData,
  MediaPageData,
  ConnectPageData,
  SkillsPageData,
} from "@/types/interfaces";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaTelegram
} from "react-icons/fa6";

const aboutPageData: AboutPageData = {
  title: {
    acquainted: "Let's Get Acquainted",
    achievements: "Achievements",
    testimonials: "What Others Say",
  },
  subtitle: {
    acquainted:
      "This is a brief overview about my background, goals, and interests.",
    achievements:
      "Technical and non-technical milestones that changed my life.",
    testimonials:
      "Insights and experiences shared by colleagues, mentors, and collaborators.",
  },

  itemCardDescription: {
    introduction:
      "Hi everyone! I'm a B.Tech CSE student at DYPIU, Pune. I'm passionate about web development and software development, with experience in building responsive websites and applications. I've worked on various projects including MahaDarshan (a tourism website), Drip Limitless (a social networking platform), and Norse Music (a streaming web app). I enjoy solving problems through code and continuously learning new technologies to enhance my skills.",
    background: "These are some intriguing facts about my personal details.",
    goals: "I've set these main goals for my career development.",
    interests: "I'm passionate about these activities and hobbies.",
  },

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
      title: "Intern Software Engineer",
      date: "Sep 2024",
      description:
        "Started an internship as a Software Engineer at Random Software Ltd, working on AI, Software Engineering, and Cloud Computing projects.",
    },
    {
      title: "LinkedIn Top Artificial Intelligence (AI) Voice",
      date: "Feb 2024",
      description:
        "Community Top Voice. People on LinkedIn find Dileepa Bandara an insightful contributor in AI skill.",
    },
    {
      title: "Gold Microsoft Learn Student Ambassador",
      date: "Feb 2024",
      description:
        "Received the highest milestone within the Microsoft Learn Student Ambassadors program, in recognition of exceptional dedication and impactful contributions to both the community and technology.",
    },
    {
      title: "Found Microsoft Learn Student Club - NIBM",
      date: "Jan 2024",
      description:
        "Established the Microsoft Learn Student Club at the National Institute of Business Management, a student-led community dedicated to empowering students with technical skills and career opportunities in technology.",
    },
    {
      title: "Completed 10+ Events as a Speaker",
      date: "Dec 2023",
      description:
        "Delivered engaging presentations on various topics, including Software Development, AI, and Cloud Computing, at tech events and meetups, inspiring and educating audiences on the latest trends and technologies.",
    },
    {
      title: "Established NIBM Computing Society",
      date: "Oct 2022",
      description:
        "Started the NIBM Computing Society, a student-led organization dedicated to fostering a culture of innovation, learning, and collaboration among computing students at the National Institute of Business Management.",
    },
    {
      title: "Colors Award",
      date: "Jan 2018",
      description:
        "Received the prestigious Colors Award for outstanding achievements in academics, extracurricular activities, and community service, recognizing exceptional leadership and contributions to the school community at Maliyadeva Model School.",
    },
    {
      title: "President's Scout Award",
      date: "Jan 2016",
      description:
        "Earned the President's Scout Award, the highest rank in the Sri Lanka Scout Association, for demonstrating exceptional leadership, service, and commitment to the principles of scouting.",
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
      title: "Web Development Intern",
      org: "DYPIU · Internship",
      location: "Pune",
      years: "Nov 2022 - Feb 2023",
      status:
        "Responsible for customization, development and improvement of college's Moodle platform.",
      image: "rsl-l",
      imageL: "rsl-d",
      link: PageLinks.experience.rsl,
    },
    {
      title: "WordPress Development Intern",
      org: "Mark AD · Internship",
      location: "Remote",
      years: "Jan 2023 - May 2023",
      status:
        "Solely crafted and launched websites for 4 diverse businesses, amplifying their online presence. Adept in digital marketing strategies.",
      image: "pd",
      imageL: "pd",
      link: PageLinks.experience.pd,
    },
    {
      title: "Event Coordinator Intern",
      org: "Make-a-Wish India · Internship",
      location: "Remote",
      years: "June 2023 - July 2023",
      status:
        "Orchestrated events, spreading joy to children. Enhanced skills in nonprofit work, communication, social services, and operations.",
      image: "wd",
      imageL: "wd",
      link: PageLinks.experience.wd,
    },
  ],

  projects: [
    {
      title: "MahaDarshan",
      description:
        "Developed and optimized MahaDarshan, a responsive and SEO-friendly tourism website using HTML, CSS, and JavaScript, hosted on reliable servers for peak performance.",
      image: "student-profiler",
      keyWords: ["HTML", "CSS", "JavaScript"],
      link: "/",
    },
    {
      title: "Drip Limitless - Social Networking Platform",
      description:
        "Led Drip Limitless project, crafting a dynamic platform with JavaScript, PHP, Node.js. Achieved 5K+ members, real-time chat, analytics—boasting excellence!",
      image: "ggez",
      keyWords: ["JavaScript", "PHP", "Node.js"],
      link: "/",
    },
    {
      title: "Norse - Feel the Music",
      description:
        "Crafted Norse Music, dynamic streaming web app, utilizing Spotify API. Optimized API, integrated Redis, achieving 25% engagement boost with 200+ users.",
      image: "railway-guider",
      keyWords: ["Web Development", "Spotify API", "Redis"],
      link: "/",
    },
    {
      title: "Atmos",
      description:
        "Elevated Atmos with WebGL-driven landing pages, Unreal Engine 5 space, and chat API integration for immersive 3D social interactions.",
      image: "car-tracking",
      keyWords: ["WebGL", "Unreal Engine 5", "API Integration"],
      link: "/",
    },
    {
      title: "Attendify",
      description:
        "Engineered Attendify with Python, leveraging OpenCV and dlib for automated attendance through facial recognition, boosting efficiency.",
      image: "banner",
      keyWords: ["Python", "OpenCV", "dlib", "Facial Recognition"],
      link: "/",
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
      title: "Member",
      org: "Google Developers Students Club (GDSC)",
      location: "DYPIU",
      years: "2022",
      status: "Active member of the Google Developers Students Club, participating in tech events and workshops.",
      image: "msft",
      link: PageLinks.experience.mlsa,
    },
    {
      title: "Participant",
      org: "Compose Camp Workshops",
      location: "Android",
      years: "2022",
      status: "Attended Compose Camp workshops on Android with Kotlin, enhancing mobile development skills.",
      image: "mlsa",
      link: PageLinks.experience.mlsaLK,
    },
    {
      title: "Participant",
      org: "Joy of Learning: C Programming",
      location: "CSE department, DYPIU",
      years: "2022",
      status: "Participated in C Programming workshop organized by the CSE department.",
      image: "aicsl",
      link: PageLinks.experience.aicsl,
    },
    {
      title: "Participant",
      org: "Competitive Coding Activities",
      location: "Code-Decode community",
      years: "2023",
      status: "Participated in competitive coding activities, enhancing problem-solving skills.",
      image: "mlsc-nibm",
      link: PageLinks.experience.mlscnibm,
    },
    {
      title: "Participant",
      org: "eChai Ventures",
      location: "eChai Ventures",
      years: "2023",
      status: "Participated in entrepreneurship events, gaining insights into business and networking.",
      image: "sldf",
      link: PageLinks.experience.sldf,
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
      link: WebLinks.github,
      handler: "yaglewad-onkar",
      icon: "github",
    },
    {
      title: "Instagram",
      link: "https://www.instagram.com/yaglewad_onkar/",
      handler: "@yaglewad_onkar",
      icon: "instagram",
    },
    {
      title: "Email (VIA)",
      link: "mailto:onkar@viarides.in",
      handler: "onkar@viarides.in",
      icon: "email",
    },
    {
      title: "LinkedIn",
      link: WebLinks.linkedin,
      handler: "yaglewad-onkar",
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
