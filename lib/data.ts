// Data models and constants for personal portfolio page

// --- Navigation ---
export interface NavLink {
  labelKey: string  // Translation_Key
  href: string
}

// --- Skills ---
export type SkillCategory = 'language' | 'framework' | 'mobile' | 'tool' | 'styling' | 'state' | 'backend' | 'design' | 'ml'

export const skillCategoryOrder: { category: SkillCategory; labelKey: string }[] = [
  { category: 'language', labelKey: 'skills.category.language' },
  { category: 'backend', labelKey: 'skills.category.backend' },
  { category: 'framework', labelKey: 'skills.category.frontend' },
  { category: 'mobile', labelKey: 'skills.category.mobile' },
  { category: 'styling', labelKey: 'skills.category.styling' },
  { category: 'state', labelKey: 'skills.category.state' },
  { category: 'tool', labelKey: 'skills.category.tools' },
  { category: 'design', labelKey: 'skills.category.design' },
  // { category: 'ml', labelKey: 'skills.category.ml' }, // temporarily hidden
]

export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return skills.filter((skill) => skill.category === category)
}

export interface Skill {
  id: string
  name: string
  category: SkillCategory
}

// --- Projects ---
export type ProjectStatus = 'Live' | 'Dev'
export type ProjectType = 'Mobile App' | 'Web App' | 'Desktop App' | 'Library'

export interface Project {
  id: string
  name: string
  descriptionKey: string  // Translation_Key
  detailKey?: string       // Translation_Key
  techStack: string[]
  status: ProjectStatus
  type: ProjectType
  repoUrl?: string
  liveUrl?: string
  imageUrl?: string        // Preview image shown on projects page
}

// --- Experience ---
export interface Experience {
  id: string
  company: string
  positionKey: string       // Translation_Key
  startDate: string         // format: "2022"
  endDate: string | null    // null = currently working
  locationKey?: string      // Translation_Key
  descriptionKey?: string   // Translation_Key
  bulletKeys?: string[]     // Translation_Keys for bullet points
  techStack?: string[]
  certificateUrl?: string   // URL to internship/work certificate PDF
}

// --- Social Links ---
export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'instagram' | 'email' | 'whatsapp'
  url: string
  label: string  // for aria-label
}

// --- Owner Info ---
export interface OwnerInfo {
  name: string
  professionKey: string  // Translation_Key
  bioKey: string         // Translation_Key
  profileImageUrl: string
  resumeUrl: string
}

// ============================================================================
// Constants
// ============================================================================

export const ownerInfo: OwnerInfo = {
  name: "Wahidan",
  professionKey: "hero.profession",
  bioKey: "hero.bio",
  profileImageUrl: "/images/wahidan.png",
  resumeUrl: "/CV-Wahidan-Nashrullah.pdf",
}

export const navLinks: NavLink[] = [
  { labelKey: "nav.about", href: "/about" },
  { labelKey: "nav.skills", href: "/skills" },
  { labelKey: "nav.projects", href: "/projects" },
  { labelKey: "nav.experience", href: "/experience" },
  { labelKey: "nav.contact", href: "/contact" },
]

export const skills: Skill[] = [
  // Language
  { id: "html", name: "HTML", category: "language" },
  { id: "css", name: "CSS", category: "styling" },
  { id: "javascript", name: "JavaScript", category: "language" },
  { id: "typescript", name: "TypeScript", category: "language" },
  { id: "java", name: "Java", category: "language" },
  { id: "go", name: "Go", category: "language" },
  { id: "dart", name: "Dart", category: "language" },
  { id: "python", name: "Python", category: "language" },
  // Frontend
  { id: "react", name: "React", category: "framework" },
  { id: "nextjs", name: "Next.js", category: "framework" },
  // Mobile
  { id: "flutter", name: "Flutter", category: "mobile" },
  // Styling
  { id: "tailwind", name: "Tailwind CSS", category: "styling" },
  { id: "bootstrap", name: "Bootstrap", category: "styling" },
  { id: "shadcn", name: "shadcn/ui", category: "styling" },
  { id: "sass", name: "Sass", category: "styling" },
  { id: "scss", name: "SCSS", category: "styling" },
  // State
  { id: "contextapi", name: "Context API", category: "state" },
  { id: "zustand", name: "Zustand", category: "state" },
  { id: "jotai", name: "Jotai", category: "state" },
  { id: "redux", name: "Redux", category: "state" },
  { id: "bloc", name: "Bloc", category: "state" },
  // Backend
  { id: "restapi", name: "REST API", category: "backend" },
  { id: "express", name: "Express", category: "backend" },
  { id: "gin", name: "Gin Gonic", category: "backend" },
  { id: "echo", name: "Echo", category: "backend" },
  { id: "redis", name: "Redis", category: "backend" },
  { id: "redisstream", name: "Redis Stream", category: "backend" },
  { id: "mqtt", name: "MQTT", category: "backend" },
  { id: "docker", name: "Docker", category: "backend" },
  { id: "postgresql", name: "PostgreSQL", category: "backend" },
  { id: "mysql", name: "MySQL", category: "backend" },
  // Tools
  { id: "git", name: "Git", category: "tool" },
  { id: "github", name: "GitHub", category: "tool" },
  // Design
  { id: "figma", name: "Figma", category: "design" },
  // Machine Learning
  { id: "anaconda", name: "Anaconda", category: "ml" },
  { id: "jupyter", name: "Jupyter", category: "ml" },
  { id: "numpy", name: "NumPy", category: "ml" },
  { id: "pandas", name: "Pandas", category: "ml" },
  { id: "scikitlearn", name: "Scikit-learn", category: "ml" },
  { id: "tensorflow", name: "TensorFlow", category: "ml" },
]

/** 8 skills shown on home page (2 rows × 4 columns) */
export const homeFeaturedSkillIds = [
  "html",
  "typescript",
  "nextjs",
  "go",
  "python",
  "flutter",
  "java",
  "docker",
] as const

export function getHomeFeaturedSkills(): Skill[] {
  return homeFeaturedSkillIds
    .map((id) => skills.find((skill) => skill.id === id))
    .filter((skill): skill is Skill => skill !== undefined)
}

export const projects: Project[] = [
  {
    id: "claimdesk",
    name: "ClaimDesk",
    descriptionKey: "projects.claimdesk.description",
    detailKey: "projects.claimdesk.detail",
    techStack: [
      "Java 21",
      "Spring Boot",
      "PostgreSQL",
      "Flyway",
      "Redis",
      "Supabase Storage",
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "TanStack Query",
      "Axios",
      "React Hook Form",
      "Zod",
      "Recharts",
      "Docker",
      "Render",
      "Vercel",
    ],
    status: "Live",
    type: "Web App",
    repoUrl: "https://github.com/wahidannn/claimdesk",
    liveUrl: "https://claimdesk-rho.vercel.app/",
    imageUrl: "/images/projects/image (2).png",
  },
  {
    id: "spacebook",
    name: "Spacebook",
    descriptionKey: "projects.spacebook.description",
    detailKey: "projects.spacebook.detail",
    techStack: [
      "Java 25",
      "Spring Boot",
      "PostgreSQL",
      "Supabase",
      "Flyway",
      "JWT",
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Axios",
      "Framer Motion",
      "Render",
      "Vercel",
    ],
    status: "Live",
    type: "Web App",
    repoUrl: "https://github.com/wahidannn/spacebook",
    liveUrl: "https://spacebook-one.vercel.app/",
    imageUrl: "/images/projects/image (3).png",
  },
  {
    id: "flowforge",
    name: "FlowForge",
    descriptionKey: "projects.flowforge.description",
    detailKey: "projects.flowforge.detail",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "Bun",
      "Hono",
      "Prisma",
    ],
    status: "Live",
    type: "Web App",
    repoUrl: "https://github.com/wahidannn/flowforge",
    liveUrl: "https://flowforge-web.vercel.app/",
    imageUrl: "/images/projects/image (1).png",
  },
  {
    id: "inventory-warehouse",
    name: "Inventory Warehouse",
    descriptionKey: "projects.inventorywarehouse.description",
    detailKey: "projects.inventorywarehouse.detail",
    techStack: ["Next.js", "TypeScript", "Go", "Redis", "Redis Stream", "Supabase", "Docker"],
    status: "Dev",
    type: "Web App",
    repoUrl: "https://github.com/KingWahid/inventory-be",
    imageUrl: "/images/projects/screencapture-localhost-3000-id-login-2026-05-21-16_35_55.png",
  },
  {
    id: "aladdin",
    name: "Aladdin",
    descriptionKey: "projects.aladdin.description",
    detailKey: "projects.aladdin.detail",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Express", "MySQL"],
    status: "Dev",
    type: "Web App",
    repoUrl: "https://github.com/wahidanDev/umkm-project-akhir",
    imageUrl: "/images/projects/screencapture-localhost-5173-2026-05-21-16_42_41.png",
  },
  {
    id: "task-schedule",
    name: "Task Schedule",
    descriptionKey: "projects.taskschedule.description",
    detailKey: "projects.taskschedule.detail",
    techStack: ["Next.js", "Appwrite", "Tailwind CSS", "TypeScript"],
    status: "Dev",
    type: "Web App",
    repoUrl: "https://github.com/KingWahid/virsas-schadule",
    imageUrl: "/images/projects/screencapture-localhost-3000-preview-2026-05-21-16_17_06.jpg",
  },
  {
    id: "banibaizabeh",
    name: "Banibaizabeh",
    descriptionKey: "projects.banibaizabeh.description",
    detailKey: "projects.banibaizabeh.detail",
    techStack: ["Next.js", "TypeScript", "Supabase"],
    status: "Live",
    type: "Web App",
    repoUrl: "https://github.com/KingWahid/banibaizabeh",
    liveUrl: "https://banibaizabeh.vercel.app",
    imageUrl: "/images/projects/screencapture-banibaizabeh-vercel-app-2026-05-21-16_20_57.png",
  },
  {
    id: "findcommunity",
    name: "FindCommunity",
    descriptionKey: "projects.findcommunity.description",
    detailKey: "projects.findcommunity.detail",
    techStack: ["React", "Tailwind CSS"],
    status: "Live",
    type: "Web App",
    liveUrl: "https://findcommunity.vercel.app",
    imageUrl: "/images/projects/image (14).jpg",
  },
]

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "PT Teknologi Solusi Industri",
    positionKey: "experience.exp1.position",
    startDate: "2025",
    endDate: "2026",
    locationKey: "experience.exp1.location",
    descriptionKey: "experience.exp1.description",
    bulletKeys: [
      "experience.exp1.bullet1",
      "experience.exp1.bullet2",
      "experience.exp1.bullet3",
      "experience.exp1.bullet4",
      "experience.exp1.bullet5",
    ],
    techStack: ["Next.js", "Go", "PostgreSQL", "Redis", "Docker", "TypeScript"],
    certificateUrl: "/Industrix_Internship_Certificate.pdf",
  },
  {
    id: "exp-2",
    company: "Findcommunity",
    positionKey: "experience.exp2.position",
    startDate: "2025",
    endDate: "2025",
    locationKey: "experience.exp2.location",
    descriptionKey: "experience.exp2.description",
    bulletKeys: [
      "experience.exp2.bullet1",
      "experience.exp2.bullet2",
      "experience.exp2.bullet3",
    ],
    techStack: ["React.js", "TypeScript", "Tailwind CSS"],
  }
]

// --- Education ---
export interface Education {
  id: string
  institution: string
  titleKey: string   // Translation_Key for degree/course title
  period: string
  type: 'formal' | 'course' | 'certification'
  certificateUrl?: string
}

export const socialLinks: SocialLink[] = [
  { platform: "github", url: "https://github.com/KingWahid", label: "GitHub Profile" },
  { platform: "linkedin", url: "https://www.linkedin.com/in/wahidan-nashrullah-141516295/", label: "LinkedIn Profile" },
  { platform: "whatsapp" as SocialLink['platform'], url: "https://wa.me/6285669170171", label: "WhatsApp" },
]

export const educations: Education[] = [
  {
    id: "edu-sma",
    institution: "SMA Negeri 8 Bandung",
    titleKey: "about.education.sma.title",
    period: "Aug 2018 – May 2021",
    type: "formal",
  },
  {
    id: "edu-bnsp",
    institution: "Badan Nasional Sertifikasi Profesi (BNSP)",
    titleKey: "about.education.bnsp.title",
    period: "October 2025",
    type: "certification",
  },
  {
    id: "edu-udemy-flutter",
    institution: "Udemy",
    titleKey: "about.education.udemy.flutter.title",
    period: "September 2025",
    type: "course",
    certificateUrl: "https://www.udemy.com/certificate/UC-c72adb0a-abd0-4365-8430-4572111c044d/",
  },
  {
    id: "edu-udemy-fullstack",
    institution: "Udemy",
    titleKey: "about.education.udemy.fullstack.title",
    period: "August 2025",
    type: "course",
    certificateUrl: "https://www.udemy.com/certificate/UC-1c9ca46b-9b35-4c83-b3e5-0a19fc6247c2/",
  },
]

export const heroStats = [
  { valueKey: "hero.stats.years.value", labelKey: "hero.stats.years.label" },
  { valueKey: "hero.stats.projects.value", labelKey: "hero.stats.projects.label" },
  { valueKey: "hero.stats.clients.value", labelKey: "hero.stats.clients.label" },
]

// ============================================================================
// Pure Functions
// ============================================================================

/**
 * Format a date range for display in experience timeline
 * @param startDate - Start date string (e.g., "Jan 2022")
 * @param endDate - End date string or null for current position
 * @returns Formatted date range string
 */
export function formatDateRange(startDate: string, endDate: string | null): string {
  if (endDate === null) {
    return `${startDate} — Present`
  }
  return `${startDate} — ${endDate}`
}

/**
 * Get Badge component props based on project status
 * @param status - Project status ('Live' or 'Dev')
 * @returns Object with className for Badge styling
 */
export function getStatusBadgeProps(status: ProjectStatus): { className: string } {
  if (status === 'Live') {
    return {
      className: 'bg-accent-portfolio/20 text-accent-portfolio border-accent-portfolio/30',
    }
  }
  return {
    className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  }
}

/**
 * Sort experiences by date, with current positions first
 * @param experiences - Array of experience objects
 * @returns Sorted array (current jobs first, then by startDate descending)
 */
export function sortExperiences(experiences: Experience[]): Experience[] {
  return [...experiences].sort((a, b) => {
    // Current jobs (endDate: null) always first
    if (a.endDate === null && b.endDate !== null) return -1
    if (a.endDate !== null && b.endDate === null) return 1
    // Then sort by startDate descending (most recent first)
    return b.startDate.localeCompare(a.startDate)
  })
}

/**
 * Build page title from name and profession
 * @param name - Owner's name
 * @param profession - Owner's profession
 * @returns Formatted page title
 */
export function buildPageTitle(name: string, profession: string): string {
  return `${name} — ${profession}`
}

/**
 * Toggle theme between dark and light
 * @param theme - Current theme ('dark' or 'light')
 * @returns Opposite theme
 */
export function toggleTheme(theme: 'dark' | 'light'): 'dark' | 'light' {
  return theme === 'dark' ? 'light' : 'dark'
}
