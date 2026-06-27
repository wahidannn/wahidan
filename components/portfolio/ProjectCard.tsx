import Image from 'next/image'
import type { KeyboardEvent, MouseEvent } from 'react'
import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Project } from '@/lib/data'

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

interface ProjectCardProps {
  project: Project
  t: (key: string) => string
  showImage?: boolean
  onSelect?: (project: Project) => void
}

export function ProjectCard({ project, t, showImage = false, onSelect }: ProjectCardProps) {
  const isClickable = Boolean(onSelect)

  const handleSelect = () => {
    onSelect?.(project)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onSelect) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleSelect()
    }
  }

  const stopCardSelect = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
  }

  return (
    <motion.div
      className="h-full"
      whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div
        className={cn(
          'flex flex-col h-full rounded-xl overflow-hidden transition-all duration-200',
          'border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#0d1117]',
          'shadow-sm shadow-zinc-200/80 dark:shadow-black/30',
          'hover:border-accent-portfolio/50',
          isClickable && 'cursor-pointer focus-visible:border-accent-portfolio focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-portfolio/40',
        )}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onClick={isClickable ? handleSelect : undefined}
        onKeyDown={isClickable ? handleKeyDown : undefined}
        aria-label={isClickable ? `Open ${project.name} project details` : undefined}
      >
        {showImage && project.imageUrl && (
          <div className="relative w-full h-52 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={project.imageUrl}
              alt={`${project.name} preview`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        )}

        {showImage && !project.imageUrl && (
          <div className="w-full h-52 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
            <span
              className="text-xs text-zinc-400 dark:text-zinc-600"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              No preview
            </span>
          </div>
        )}

        <div className="flex flex-col gap-4 p-5 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span
              className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-accent-portfolio/15 text-accent-portfolio border border-accent-portfolio/30"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              {project.type}
            </span>
            <div className="flex items-center gap-2">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} repository`}
                  onClick={stopCardSelect}
                  className="text-zinc-400 hover:text-accent-portfolio transition-colors dark:text-zinc-500"
                >
                  <GitHubIcon className="size-4" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} live site`}
                  onClick={stopCardSelect}
                  className="text-zinc-400 hover:text-accent-portfolio transition-colors dark:text-zinc-500"
                >
                  <ExternalLink className="size-4" />
                </a>
              )}
            </div>
          </div>

          <h3
            className="text-xl font-bold text-foreground leading-tight"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            {project.name}
          </h3>

          <p
            className="text-sm text-muted-foreground leading-relaxed flex-1"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            {t(project.descriptionKey)}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-[11px] px-2 py-0.5 border-zinc-200 text-zinc-500 bg-transparent rounded-md dark:border-zinc-700 dark:text-zinc-400"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
