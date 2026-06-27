'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/LanguageContext'
import { projects, type Project } from '@/lib/data'
import { ProjectCard } from '@/components/portfolio/ProjectCard'
import { ProjectDetailModal } from '@/components/portfolio/ProjectDetailModal'
import { fadeUp, staggerContainer, viewport } from '@/lib/animations'

export function ProjectsPageContent() {
  const { t } = useTranslation()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <main className="pt-28 pb-20 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 min-h-screen">
      <div className="max-w-4xl mx-auto">

        {/* Page header */}
        <motion.div
          className="mb-14"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-xs font-semibold text-accent-portfolio uppercase tracking-widest mb-3"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            variants={fadeUp}
          >
            {t('projects.label')}
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            variants={fadeUp}
          >
            {t('projects.title')}
          </motion.h1>
          <motion.p
            className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            variants={fadeUp}
          >
            {t('projects.page.description')}
          </motion.p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={fadeUp} className="h-full">
              <ProjectCard
                project={project}
                t={t}
                showImage
                onSelect={setSelectedProject}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        t={t}
      />
    </main>
  )
}
