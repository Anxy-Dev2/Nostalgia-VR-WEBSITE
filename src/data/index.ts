export const personalInfo = {
  name: "Carter",
  displayName: "Carter",
  handle: "Carter",
  email: "carter21232@gmail.com",
  title: "Unity Developer & VR Physics Engineer",
  roles: [
    "Unity Systems Engineer",
    "VR Gameplay Programmer",
    "Full-Body Physics Specialist",
    "Gorilla Tag Fan Game Creator",
  ],
  bio: `I build immersive Unity experiences with custom full-body physics and VR gameplay systems. My work includes Hurricane VR-style mechanics, Gorilla Tag-inspired movement, and polished C# systems that feel responsive and natural in motion.`,
  bioContinued: `I bring 2.5 years of Unity development, 1.5 years of C# engineering, and 6 months of full-stack experience — all focused on clean systems, performant gameplay, and immersive interaction.`,
  tagline:
    "Unity-first development with full-body VR physics, custom gameplay systems, and Gorilla Tag fan game expertise.",
  location: "Canada",
  socials: {
    github: "",
  },
};

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  sourceUrl?: string;
  gradient: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Hurricane VR Physics Suite",
    description:
      "Custom full-body VR physics systems built in Unity with C#. Includes locomotion, grab interactions, and momentum handling for immersive motion gameplay.",
    tags: ["Unity", "C#", "VR", "Physics"],
    gradient: "from-cyan-500/20 to-blue-500/20",
    image: "/projects/hurricane-vr.png",
  },
  {
    id: 2,
    title: "Gorilla Tag Fan Game Prototype",
    description:
      "A fast-paced VR fan game inspired by Gorilla Tag. Features tracked movement, climbing interactions, and polished player feel for immersive multiplayer sessions.",
    tags: ["Unity", "C#", "VR", "Multiplayer"],
    gradient: "from-emerald-500/20 to-teal-500/20",
    image: "/projects/gorillatag-fangame.jpg",
  },
  {
    id: 3,
    title: "Full-Body Interaction System",
    description:
      "Reusable VR interaction systems for hand/object physics, collision response, and realistic movement across tracked rigs.",
    tags: ["Unity", "C#", "Physics", "VR"],
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 4,
    title: "Custom Gameplay Toolkit",
    description:
      "A library of C# tools for fast prototyping, state-driven movement, and polished input handling in Unity projects.",
    tags: ["Unity", "C#", "Tools"],
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
  {
    id: 5,
    title: "Interactive VR Demo",
    description:
      "A polished demo experience showcasing precision VR interaction, environmental feedback, and immersive physics-driven gameplay.",
    tags: ["Unity", "VR", "Game Dev"],
    gradient: "from-blue-500/20 to-indigo-500/20",
  },
  {
    id: 6,
    title: "Portfolio Showcase",
    description:
      "A modern portfolio built with Next.js and Tailwind to highlight Unity systems, VR projects, and real-time gameplay work.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    gradient: "from-slate-500/20 to-slate-700/20",
  },
];

export interface Skill {
  name: string;
  category: "language" | "frontend" | "backend" | "tool" | "gamedev";
  color: string;
  icon: string;
  desc: string;
}

const devicon = (name: string, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;

export const skills: Skill[] = [
  { name: "C#", category: "language", color: "#239120", icon: devicon("csharp"), desc: "Core language for Unity gameplay and VR systems." },
  { name: "Unity", category: "gamedev", color: "#ffffff", icon: devicon("unity"), desc: "Primary engine for VR games, physics, and interactive systems." },
  { name: "VR", category: "gamedev", color: "#8b5cf6", icon: "", desc: "Full-body interaction, locomotion, and immersive gameplay." },
  { name: "Physics", category: "gamedev", color: "#f97316", icon: "", desc: "Custom collision, momentum, and motion systems." },
  { name: "Gorilla Tag", category: "gamedev", color: "#22c55e", icon: "", desc: "Fan game design and movement-driven gameplay." },
  { name: "Unreal Engine", category: "gamedev", color: "#00c2ff", icon: "", desc: "Additional engine experience for interactive prototypes." },
  { name: "TypeScript", category: "language", color: "#3178C6", icon: devicon("typescript"), desc: "Web tooling, portfolio interfaces, and supporting systems." },
  { name: "React", category: "frontend", color: "#61DAFB", icon: devicon("react"), desc: "Modern UI development for portfolio and tools." },
  { name: "Node.js", category: "backend", color: "#339933", icon: devicon("nodejs"), desc: "Backend services and utility tooling for game projects." },
  { name: "Git", category: "tool", color: "#F05032", icon: devicon("git"), desc: "Version control workflows and collaborative development." },
];

export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string[];
  type: "work" | "military" | "education";
}

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Unity & VR Systems Developer",
    company: "Independent",
    period: "Jan 2024 — Present",
    description: [
      "Designing full-body physics systems and VR motion mechanics in Unity.",
      "Building Gorilla Tag-inspired fan games with tracked locomotion and climbing.",
      "Creating reusable C# gameplay tools for interaction, input, and collision response.",
    ],
    type: "work",
  },
  {
    id: 2,
    title: "Hurricane VR Physics Engineer",
    company: "Project Studio",
    period: "2024 — Present",
    description: [
      "Implemented custom VR locomotion and hand interaction systems for immersive gameplay.",
      "Optimized physics performance for smooth motion on headsets and tracked rigs.",
      "Delivered high-fidelity interaction feel across custom Unity demos and prototypes.",
    ],
    type: "work",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Personal Projects",
    period: "Sep 2025 — Present",
    description: [
      "Built portfolio and tooling interfaces using Next.js, TypeScript, and Tailwind CSS.",
      "Created backend utilities and deployment workflows to support game project assets.",
      "Maintained clean code structure for both web and gameplay systems.",
    ],
    type: "work",
  },
  {
    id: 4,
    title: "Unreal Engine Prototyper",
    company: "Independent",
    period: "2025 — 2026",
    description: [
      "Developed gameplay prototypes and interactive systems in Unreal Engine.",
      "Explored advanced animation, physics, and input-driven interactions.",
      "Delivered proof-of-concept demos for fast iteration and design validation.",
    ],
    type: "work",
  },
  {
    id: 5,
    title: "C# Developer",
    company: "Self-Directed",
    period: "2023 — Present",
    description: [
      "Designed reusable systems and utilities for game engines and custom tools.",
      "Focused on performance, modular architecture, and maintainable code.",
      "Integrated physics, input, and gameplay state logic across Unity projects.",
    ],
    type: "work",
  },
  {
    id: 6,
    title: "Game Dev Student",
    company: "Self-Learning",
    period: "2021 — 2023",
    description: [
      "Studied game development, 3D math, VR interaction, and physics systems.",
      "Built portfolio projects in Unity, Unreal, and supporting web tools.",
      "Learned to translate player motion into responsive gameplay feel.",
    ],
    type: "education",
  },
];

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Studio Lead",
    role: "Unity Team Lead",
    text: "Carter shipped a responsive VR physics prototype with clean systems and strong attention to player feel.",
  },
  {
    id: 2,
    name: "Community Tester",
    role: "VR Player",
    text: "The Gorilla Tag-inspired movement felt natural and energetic from the first playtest.",
  },
  {
    id: 3,
    name: "Project Partner",
    role: "Creative Technologist",
    text: "He turned complex physics and input problems into polished gameplay tools that were easy to iterate on.",
  },
];

export const certificates = [
  "Unity Game Development — Coursera",
  "VR Interaction Design — Udemy",
  "C# Programming — Pluralsight",
  "Full-Stack Web Development — FreeCodeCamp",
  "Game Physics Fundamentals — Udemy",
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
