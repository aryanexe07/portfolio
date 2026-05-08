export interface Project {
  id: string;
  title: string;
  description: string;
  category: string[];
  techStack: string[];
  year: string;
  githubUrl?: string;
  liveUrl?: string;
  linesOfCode: string;
  designPattern: string;
  lighthouseScore: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "autoclicker",
    title: "AutoClicker",
    description: "PyQt6 desktop app for Windows with persistent configurations and macros.",
    category: ["Tools", "Systems"],
    techStack: ["Python", "PyQt6", "JSON"],
    year: "2023",
    githubUrl: "https://github.com",
    linesOfCode: "1.2k",
    designPattern: "MVC",
    lighthouseScore: "N/A (Desktop App)",
    featured: true
  },
  {
    id: "imagescraper",
    title: "Image Scraper",
    description: "Python GUI leveraging Selenium and undetected-chromedriver to bypass Shadow DOMs.",
    category: ["Tools"],
    techStack: ["Python", "Selenium", "Tkinter"],
    year: "2023",
    githubUrl: "https://github.com",
    linesOfCode: "800",
    designPattern: "Singleton",
    lighthouseScore: "N/A (CLI/GUI Tool)"
  },
  {
    id: "3dsolar",
    title: "3D Solar System",
    description: "Procedurally generated 3D solar system in a single HTML file without a build step.",
    category: ["Interactive", "Experiments"],
    techStack: ["Three.js", "Vanilla JS", "WebGL"],
    year: "2024",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    linesOfCode: "650",
    designPattern: "Entity Component",
    lighthouseScore: "98"
  },
  {
    id: "aryanexe",
    title: "aryan.exe",
    description: "High-performance cinematic developer portfolio with smooth scrolls and GSAP animations.",
    category: ["Interactive", "Systems"],
    techStack: ["Next.js 15", "TypeScript", "GSAP", "Tailwind 4"],
    year: "2025",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    linesOfCode: "1.5k",
    designPattern: "Component Based",
    lighthouseScore: "100"
  },
  {
    id: "telescope",
    title: "telescope.nvim #3623",
    description: "Fixed critical rendering issue in Telescope previewers logic within the Neovim ecosystem.",
    category: ["Open Source"],
    techStack: ["Lua", "Neovim", "Vimscript"],
    year: "2024",
    githubUrl: "https://github.com/nvim-telescope/telescope.nvim/pull/1",
    linesOfCode: "45",
    designPattern: "Decorator",
    lighthouseScore: "N/A (Editor Plugin)"
  },
  {
    id: "openclaw",
    title: "OpenClaw",
    description: "Multi-provider AI coding agent environment built for WSL and Ubuntu.",
    category: ["Systems", "Tools", "Open Source"],
    techStack: ["Bash", "Gemini API", "Python"],
    year: "2024",
    githubUrl: "https://github.com",
    linesOfCode: "2.1k",
    designPattern: "Modular Agent",
    lighthouseScore: "N/A (CLI)"
  }
];
