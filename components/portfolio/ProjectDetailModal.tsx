'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef } from 'react'
import { ExternalLink, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { getStatusBadgeProps, type Project } from '@/lib/data'

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

interface ProjectDetailModalProps {
  project: Project | null
  onClose: () => void
  t: (key: string) => string
}

export function ProjectDetailModal({ project, onClose, t }: ProjectDetailModalProps) {
  const isOpen = Boolean(project)
  const dialogRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => dialogRef.current?.focus())
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  const detailKey = project?.detailKey ?? project?.descriptionKey
  const statusKey = project?.status === 'Live' ? 'projects.badge.live' : 'projects.badge.dev'

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} project details`}
            tabIndex={-1}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div
              className="pointer-events-auto w-full max-w-4xl flex flex-col rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-[#0d1117] shadow-2xl overflow-hidden"
              style={{ maxHeight: 'calc(100vh - 2rem)' }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
                <div className="min-w-0">
                  <p
                    className="text-xs font-semibold text-accent-portfolio uppercase tracking-widest truncate"
                    style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                  >
                    {project.type}
                  </p>
                  <h2
                    className="text-base sm:text-lg font-bold text-foreground truncate"
                    style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                  >
                    {project.name}
                  </h2>
                </div>

                <button
                  onClick={onClose}
                  className="flex items-center justify-center size-8 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors shrink-0"
                  aria-label={`Close ${project.name} project details`}
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="overflow-y-auto">
                {project.imageUrl && (
                  <div className="relative h-56 sm:h-72 bg-zinc-100 dark:bg-zinc-950">
                    <Image
                      src={project.imageUrl}
                      alt={`${project.name} preview`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, 896px"
                    />
                  </div>
                )}

                <div className="p-5 sm:p-6 space-y-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="rounded-md border-accent-portfolio/30 bg-accent-portfolio/15 text-accent-portfolio"
                      style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                    >
                      {project.type}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`rounded-md ${getStatusBadgeProps(project.status).className}`}
                      style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                    >
                      {t(statusKey)}
                    </Badge>
                  </div>

                  <p
                    className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    {detailKey ? t(detailKey) : t(project.descriptionKey)}
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

                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-zinc-700 border border-zinc-200 bg-zinc-100 hover:bg-zinc-200 hover:text-zinc-950 dark:text-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/60 dark:hover:bg-zinc-700/60 dark:hover:text-white transition-colors"
                        style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                      >
                        <GitHubIcon className="size-3.5" />
                        {t('projects.link.repo')}
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-black bg-accent-portfolio hover:bg-accent-portfolio/90 transition-colors"
                        style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                      >
                        <ExternalLink className="size-3.5" />
                        {t('projects.link.live')}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
