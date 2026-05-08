export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  category: string[];
  githubUrl?: string;
  liveUrl?: string;
  year: string;
  linesOfCode: string;
  designPattern: string;
  lighthouseScore: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
}

export interface GithubStats {
  totalRepos: number;
  totalStars: number;
  commitsThisYear: number;
  topLanguage: string;
  pinned: GithubRepo[];
  contributionGraphDays: number[];
}
