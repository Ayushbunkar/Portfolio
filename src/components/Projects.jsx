import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MagneticButton from './MagneticButton'
import { ensureScrollTrigger, gsap } from '../utils/scrollAnimations'

const PROJECTS = [
  {
    id: 'nova-commerce',
    title: 'Nova Commerce',
    phase: 'Impact 01',
    year: '2025',
    type: 'SaaS Commerce Platform',
    summary:
      'Built a conversion-focused storefront with immersive storytelling, responsive checkout flow, and optimized navigation depth.',
    impact: '42% conversion uplift',
    narrative: 'Commerce flow redesigned as a cinematic conversion path from discovery to checkout.',
    accent: '#7c86ff',
    image:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1600&q=80',
    stack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    details: [
      'Dynamic product narrative with interactive sections',
      'Checkout drop-off reduced via frictionless flow mapping',
      'Page performance tuned for Core Web Vitals',
    ],
  },
  {
    id: 'pulse-analytics',
    title: 'Pulse Analytics',
    phase: 'Impact 02',
    year: '2025',
    type: 'Realtime Product Dashboard',
    summary:
      'Designed and engineered a realtime operations dashboard where motion communicates hierarchy and critical metric states.',
    impact: '35% faster insight cycles',
    narrative: 'Realtime signals were translated into visual hierarchy so teams make decisions faster.',
    accent: '#2dd4bf',
    image:
      'https://images.unsplash.com/photo-1518186233392-c232efbf2373?auto=format&fit=crop&w=1600&q=80',
    stack: ['React', 'Framer Motion', 'D3', 'WebSockets'],
    details: [
      'Real-time charts with contextual transitions',
      'Alert layers with priority-driven visual grammar',
      'Systemized component architecture for scale',
    ],
  },
  {
    id: 'orbit-social',
    title: 'Orbit Social',
    phase: 'Impact 03',
    year: '2024',
    type: 'Community Product Experience',
    summary:
      'Created a high-retention social experience with fluid feed interactions, creator tools, and immersive posting journeys.',
    impact: '120K active users',
    narrative: 'Interaction loops were tuned to keep creators and audiences engaged for longer sessions.',
    accent: '#ec4899',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80',
    stack: ['Next.js', 'PostgreSQL', 'Redis', 'Socket.io'],
    details: [
      'Live interactions with resilient event handling',
      'Publishing workflow designed for creator speed',
      'Visual feedback loops increased session duration',
    ],
  },
  {
    id: 'astra-ai',
    title: 'Astra AI Studio',
    phase: 'Impact 04',
    year: '2025',
    type: 'AI Workflow Platform',
    summary:
      'Delivered a structured AI studio where teams can generate campaign assets while staying within brand and product context.',
    impact: '58% production boost',
    narrative: 'AI workflows were structured to reduce chaos and preserve brand quality at scale.',
    accent: '#f59e0b',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80',
    stack: ['Python', 'FastAPI', 'React', 'OpenAI'],
    details: [
      'Prompt systems aligned to brand and product taxonomies',
      'Review and feedback loop integrated in one workflow',
      'Multi-team collaboration with permission layers',
    ],
  },
]

const IMPACT_CONTEXT = [
  {
    title: 'Space Theme Continuity',
    copy: 'Projects are mapped as constellations: each panel is a star that contributes to the larger mission narrative.',
  },
  {
    title: 'Density Over Emptiness',
    copy: 'Every case includes story, stack, outcomes, and deliverables so the section feels complete and informative.',
  },
  {
    title: 'Motion With Purpose',
    copy: 'Horizontal scroll and reveal animations are used to guide attention, not distract from decision-critical details.',
  },
]

const Projects = () => {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const ScrollTrigger = ensureScrollTrigger()

    const ctx = gsap.context(() => {
      const track = trackRef.current
      const pin = pinRef.current
      if (!track || !pin) return

      const distance = () => Math.max(track.scrollWidth - window.innerWidth, 0)

      const horizontalTween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1.05,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      gsap.fromTo(
        '.projects-intro',
        { opacity: 0, y: 38, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )

      gsap.fromTo(
        '.projects-context-card',
        { opacity: 0, y: 20, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.projects-context-grid',
            start: 'top 85%',
          },
        }
      )

      const panels = gsap.utils.toArray('.project-panel')
      panels.forEach((panel) => {
        const media = panel.querySelector('.project-media')
        const copy = panel.querySelector('.project-copy')
        const labels = panel.querySelectorAll('.floating-label')

        if (media) {
          gsap.fromTo(
            media,
            { scale: 1.2, opacity: 0.45, filter: 'blur(12px)' },
            {
              scale: 1,
              opacity: 1,
              filter: 'blur(0px)',
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalTween,
                start: 'left 80%',
                end: 'center center',
                scrub: true,
              },
            }
          )
        }

        if (copy) {
          gsap.fromTo(
            copy,
            { opacity: 0, y: 48, filter: 'blur(10px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalTween,
                start: 'left 72%',
                end: 'left 38%',
                scrub: true,
              },
            }
          )
        }

        if (labels.length > 0) {
          gsap.fromTo(
            labels,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalTween,
                start: 'left 62%',
                end: 'left 45%',
                scrub: true,
              },
            }
          )
        }
      })

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!selectedProject) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedProject(null)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [selectedProject])

  return (
    <section id="projects" ref={sectionRef} className="relative scroll-mt-28 overflow-hidden bg-[#050913]/58 pb-12 pt-24 md:scroll-mt-32">
      <div className="projects-intro section-container mb-10 text-center">
        <span className="section-kicker">
          <span className="section-kicker-dot" />
          Impact Layer
        </span>
        <h2 className="section-title">
          Project Stories in
          <span className="section-title-gradient">A Horizontal Journey</span>
        </h2>
        <p className="section-copy mx-auto">
          Scroll to move across full-screen case studies. Each panel reveals media, impact, and system decisions that shaped real outcomes.
        </p>

        <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-300/95 sm:text-base">
          This is the impact orbit of the site. As you move horizontally, each project expands from headline to execution
          detail so the storyline stays clear without feeling sparse.
        </p>
      </div>

      <div className="projects-context-grid section-container mb-10 grid gap-3 md:grid-cols-3">
        {IMPACT_CONTEXT.map((item) => (
          <motion.article
            key={item.title}
            className="projects-context-card narrative-card p-4 text-left"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-pink-200">{item.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">{item.copy}</p>
          </motion.article>
        ))}
      </div>

      <div ref={pinRef} className="relative">
        <div ref={trackRef} className="flex w-max">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className="project-panel relative min-h-screen w-screen overflow-hidden px-4 pb-2 pt-26 sm:px-7 sm:pb-4 sm:pt-30 lg:px-14 lg:pt-36"
              style={{
                background: `radial-gradient(circle at 18% 18%, ${project.accent}2f, transparent 42%), radial-gradient(circle at 78% 82%, rgba(124,134,255,0.12), transparent 45%), #050913`,
              }}
            >
              <div className="mx-auto grid max-w-[1240px] items-stretch gap-4 lg:grid-cols-2 lg:gap-6">
                <div className="project-copy flex h-full min-w-0 w-full max-w-[480px] flex-col justify-self-center">
                  <div className="mb-2 flex flex-wrap items-center gap-1.5">
                    <span className="meaning-badge">{project.phase}</span>
                    <span className="rounded-full border border-white/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-300">
                      {project.year}
                    </span>
                  </div>

                  <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-cyan-200">{project.type}</p>
                  <h3 className="mt-1.5 min-h-[4.1rem] max-w-[12ch] font-display text-[clamp(1.55rem,3.2vw,2.9rem)] font-black leading-[0.9] tracking-[-0.01em] text-white sm:min-h-[4.9rem]">
                    {project.title}
                  </h3>

                  <p className="mt-1.5 min-h-[2.6rem] max-w-xl text-[12px] leading-relaxed text-slate-200 sm:min-h-[3rem] sm:text-[13px]">
                    {project.summary}
                  </p>

                  <p className="mt-1.5 min-h-[3.9rem] max-w-xl rounded-2xl border border-white/15 bg-black/25 p-2 text-[12px] leading-relaxed text-slate-100/95 sm:min-h-[4.4rem] sm:text-[13px]">
                    {project.narrative}
                  </p>

                  <div className="mt-2.5 min-h-[1.8rem] flex flex-wrap gap-1 sm:min-h-[2rem] sm:gap-1.5">
                    {project.stack.map((item) => (
                      <span
                        key={`${project.id}-${item}`}
                        className="floating-label rounded-full border border-white/20 bg-white/10 px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-[0.08em] text-slate-100 sm:px-2 sm:text-[8px]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-2.5 min-h-[4rem] rounded-2xl border border-white/15 bg-black/25 p-2 sm:min-h-[4.4rem] sm:p-2.5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-indigo-200">Outcome</p>
                    <p className="mt-1 font-display text-[1.45rem] font-bold leading-none text-white sm:text-[1.7rem]">{project.impact}</p>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="beam-button rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/18"
                    >
                      Open Details
                    </button>
                    <MagneticButton href="#contact" className="outline rounded-full !px-4 !py-2 !text-xs">
                      <span>Build Similar</span>
                    </MagneticButton>
                  </div>
                </div>

                <motion.div className="project-media aspect-[4/3] sm:aspect-[6/5] min-w-0 w-full max-w-[480px] justify-self-center self-center overflow-hidden rounded-2xl border border-white/20 bg-black/20 shadow-[0_28px_90px_rgba(5,10,24,0.55)]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(255,255,255,0.26),transparent_36%)] opacity-45" />
                </motion.div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[1300] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="glass-panel relative w-full max-w-3xl overflow-hidden p-4 sm:p-6"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 rounded-full border border-white/25 bg-black/35 px-3 py-1 text-xs text-white"
              >
                Close
              </button>

              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="h-52 w-full rounded-2xl border border-white/20 object-cover sm:h-64"
                loading="lazy"
              />

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="meaning-badge">{selectedProject.phase}</span>
                <span className="rounded-full border border-white/20 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-300">
                  {selectedProject.type}
                </span>
              </div>

              <h3 className="mt-3 font-display text-3xl font-black text-white">{selectedProject.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">{selectedProject.summary}</p>

              <div className="mt-4 rounded-2xl border border-white/15 bg-black/25 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-indigo-200">What Was Delivered</p>
                <ul className="mt-2 space-y-2">
                  {selectedProject.details.map((item) => (
                    <li key={item} className="text-sm text-slate-100">• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {selectedProject.stack.map((item) => (
                  <span
                    key={`${selectedProject.id}-modal-${item}`}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
