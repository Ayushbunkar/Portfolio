import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MagneticButton from './MagneticButton'
import { ensureScrollTrigger, gsap } from '../utils/scrollAnimations'
import builtatticImage from '../lib/builtatticai.png'
import cardioShieldImage from '../lib/heart.png'
import cardioShieldModalImage from '../lib/heartopendetails.png'
import voiceOsImage from '../lib/voice os.png'
import alcoZeroImage from '../lib/alcozero.png'

const PROJECTS = [
  {
    id: 'nova-commerce',
    title: 'Builtattic AI',
    phase: 'Impact 01',
    year: '2025',
    type: 'AI Architecture Platform',
    summary:
      'Built an AI home design platform that turns inputs into structured layouts using computer vision and generative AI.',
    impact: '3x faster design generation · Reduced manual effort by 60%',
    narrative:
      'AI workflow redesign streamlined concept-to-layout generation, cutting effort and speeding design decisions.',
    modalSummary:
      'Builtattic converts homeowner prompts, site constraints, and style preferences into structured floor plans and room adjacencies that are ready for iteration.',
    modalNarrative:
      'The pipeline ingests site images and dimensions, extracts constraints with computer vision, and synthesizes multiple layout options with zoning and circulation logic.',
    accent: '#7c86ff',
    image: builtatticImage,
    primaryLink: 'https://www.builtattic.com/',
    imageFit: 'contain',
    imageBg: 'rgba(8, 12, 22, 0.7)',
    imagePadding: '0.75rem',
    stack: ['React', 'Node.js', 'Python', 'TensorFlow', 'AWS', 'Vector DB'],
    highlights: [
      'Multi-option layout generation for rapid design iteration',
      'Site photo analysis to seed plan constraints',
      'Plan-ready layout outputs for downstream tools',
    ],
    modalDetails: [
      'Multi-step pipeline for input parsing, zoning, and layout synthesis',
      'Computer vision module to extract site constraints from images',
      'Evaluation loop to score layouts for circulation and adjacency',
    ],
    links: [
      { label: 'Builtattic Info', url: 'https://www.builtattic.info/' },
      { label: 'Builtattic', url: 'https://www.builtattic.com/' },
    ],
    details: [
      'Dynamic product narrative with interactive sections',
      'Checkout drop-off reduced via frictionless flow mapping',
      'Page performance tuned for Core Web Vitals',
    ],
  },
  {
    id: 'pulse-analytics',
    title: 'AlcoZero',
    phase: 'Impact 02',
    year: '2025',
    type: 'AI Safety & Monitoring Platform',
    summary:
      'Engineered a real-time AI safety system that detects alcohol influence and behavioral anomalies via computer vision.',
    impact: 'Fast detection · Scalable monitoring · Accurate insights',
    narrative:
      'Converted visual inputs into structured intelligence with optimized inference and low-latency backends for proactive safety.',
    modalSummary:
      'AlcoZero analyzes live video and sensor streams to detect impairment risk and behavioral anomalies, enabling fast safety interventions.',
    modalNarrative:
      'Streaming inference pipelines normalize events, score risk in near real time, and trigger alerts with audit-ready metadata.',
    accent: '#2dd4bf',
    image: alcoZeroImage,
    imageFit: 'contain',
    imageBg: 'rgba(8, 12, 22, 0.7)',
    imagePadding: '0.75rem',
    stack: ['React', 'Node.js', 'Python', 'PyTorch', 'OpenCV', 'WebSockets', 'AWS'],
    highlights: [
      'Realtime impairment detection from vision signals',
      'Behavior anomaly scoring with temporal smoothing',
      'Operations dashboard for safety teams',
    ],
    modalDetails: [
      'Edge-ready CV models with temporal stabilization',
      'Event pipeline with WebSockets and alert thresholds',
      'Incident timelines and audit trails for compliance',
    ],
    links: [{ label: 'AlcoZero', url: 'https://alcozero.vercel.app/' }],
    details: [
      'Real-time charts with contextual transitions',
      'Alert layers with priority-driven visual grammar',
      'Systemized component architecture for scale',
    ],
  },
  {
    id: 'orbit-social',
    title: 'CardioShield AI',
    phase: 'Impact 03',
    year: '2024',
    type: 'AI Healthcare Monitoring System',
    summary:
      'Engineered a real-time cardiovascular AI platform to spot anomalies and predict cardiac risks from streaming data.',
    impact: 'Predictive insights · Scalable monitoring',
    narrative:
      'Built scalable pipelines and low-latency inference to turn physiological signals into clinical insights for continuous care.',
    modalSummary:
      'CardioShield ingests ECG and wearable telemetry to detect anomalies, forecast risk windows, and surface clinician-ready insights.',
    modalNarrative:
      'Time-series feature extraction and anomaly detection models run in low-latency pipelines to keep monitoring continuous and reliable.',
    accent: '#ec4899',
    image: cardioShieldImage,
    modalImage: cardioShieldModalImage,
    stack: ['Next.js', 'Python', 'PyTorch', 'Time-Series Analysis', 'PostgreSQL', 'Redis', 'WebSockets', 'Cloud Deployment'],
    highlights: [
      'Streaming health data processing at scale',
      'Risk prediction and anomaly insights',
      'Continuous monitoring experience for care teams',
    ],
    modalDetails: [
      'Signal preprocessing and noise filtering pipelines',
      'Anomaly detection and risk scoring models',
      'Alerting and trend dashboards for clinicians',
    ],
    links: [{ label: 'CardioShield AI', url: 'https://cardio-shield-ai.vercel.app/' }],
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
    type: 'Multi-Agent RAG Workflow Platform',
    summary:
      'Engineered a multi-agent AI workflow platform using RAG and LLMs to generate context-aware campaign and product content aligned with brand guidelines.',
    impact: '58% higher content throughput · Reduced manual effort · Improved grounded accuracy',
    narrative:
      'Built a RAG pipeline with vector retrieval and multi-agent orchestration to boost accuracy, reduce hallucinations, and scale content production.',
    modalSummary:
      'Astra coordinates retrieval, drafting, validation, and optimization agents to produce brand-aligned content with grounded citations.',
    modalNarrative:
      'Vector retrieval supplies approved context while orchestration logic routes tasks, retries failures, and enforces tone consistency.',
    accent: '#f59e0b',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80',
    stack: ['Python', 'FastAPI', 'React', 'OpenAI API', 'RAG', 'Vector DB', 'Multi-Agent Systems', 'REST APIs'],
    highlights: [
      'RAG-based grounding for factual accuracy',
      'Multi-agent orchestration for quality control',
      'Realtime workflow dashboard for teams',
    ],
    modalDetails: [
      'Agent roles for retrieval, drafting, QA, and optimization',
      'RAG pipeline with vector DB and prompt templates',
      'FastAPI orchestration with a React control panel',
    ],
    details: [
      'Multi-agent architecture for generation, retrieval, validation, and optimization',
      'RAG pipeline with vector retrieval for grounded responses',
      'Orchestrated agent collaboration with FastAPI services and React UI',
    ],
  },
  {
    id: 'voice-os',
    title: 'VoiceOS',
    phase: 'Impact 05',
    year: '2025',
    type: 'Voice AI Operating System',
    summary:
      'Built a real-time voice-first AI system that enables natural, conversational interaction with applications through speech.',
    impact: '40% faster task execution via voice automation',
    narrative:
      'Designed a low-latency pipeline combining STT, LLM reasoning, and TTS with memory and intent for personalized tasks.',
    modalSummary:
      'VoiceOS enables hands-free app control with streaming speech, intent routing, and contextual responses across multi-step tasks.',
    modalNarrative:
      'Low-latency voice pipelines support interruption handling, session memory, and tool execution for reliable task completion.',
    accent: '#38bdf8',
    image: voiceOsImage,
    stack: ['Python', 'FastAPI', 'WebRTC', 'LLMs', 'Speech APIs'],
    highlights: [
      'Voice-first task automation with low latency',
      'Intent routing and tool execution',
      'Context-aware responses across sessions',
    ],
    modalDetails: [
      'Streaming STT and TTS with barge-in support',
      'Intent classification with multi-step routing',
      'Context memory for personalized voice flows',
    ],
    details: [
      'Streaming STT and TTS with interruption handling',
      'Contextual memory for multi-turn task execution',
      'Low-latency inference pipeline tuned for voice UX',
    ],
  },
]

const IMPACT_CONTEXT = [
  {
    title: 'System Continuity',
    copy: 'Projects are connected as part of a larger system, showing how architecture, scalability, and performance stay consistent across builds.',
  },
  {
    title: 'Depth Over Noise',
    copy: 'Every case study includes clear context, technologies used (LLMs, APIs, frameworks), and outcomes so value is visible fast.',
  },
  {
    title: 'Execution-Focused Motion',
    copy: 'Horizontal scrolling and animations guide attention through each project, helping users understand decisions, workflows, and results without distraction.',
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
      panels.forEach((panel, index) => {
        const isFirst = index === 0
        const media = panel.querySelector('.project-media')
        const copy = panel.querySelector('.project-copy')
        const labels = panel.querySelectorAll('.floating-label')

        if (media) {
          if (isFirst) {
            gsap.set(media, { scale: 1, opacity: 1, filter: 'blur(0px)' })
          } else {
            gsap.fromTo(
              media,
              { scale: 1.2, opacity: 0.45, filter: 'blur(12px)' },
              {
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
                ease: 'none',
                immediateRender: false,
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontalTween,
                  start: 'left 80%',
                  end: 'center center',
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              }
            )
          }
        }

        if (copy) {
          if (isFirst) {
            gsap.set(copy, { opacity: 1, y: 0, filter: 'blur(0px)' })
          } else {
            gsap.fromTo(
              copy,
              { opacity: 0, y: 48, filter: 'blur(10px)' },
              {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                ease: 'none',
                immediateRender: false,
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontalTween,
                  start: 'left 72%',
                  end: 'left 38%',
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              }
            )
          }
        }

        if (labels.length > 0) {
          if (isFirst) {
            gsap.set(labels, { opacity: 1, y: 0 })
          } else {
            gsap.fromTo(
              labels,
              { opacity: 0, y: 12 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.08,
                ease: 'none',
                immediateRender: false,
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontalTween,
                  start: 'left 62%',
                  end: 'left 45%',
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              }
            )
          }
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

    // Lock scroll BEFORE adding modal class to prevent jump
    const scrollY = window.scrollY || window.pageYOffset || 0
    document.body.style.top = `-${scrollY}px`
    
    document.body.classList.add('modal-open')
    document.documentElement.classList.add('modal-open')
    window.dispatchEvent(new Event('modal:open'))
    window.addEventListener('keydown', closeOnEscape)
    
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      window.dispatchEvent(new Event('modal:close'))
      
      // Restore scroll position
      document.body.classList.remove('modal-open')
      document.documentElement.classList.remove('modal-open')
      document.body.style.top = ''
      window.scrollTo(0, scrollY)
    }
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
          Scroll to explore full-screen AI projects and case studies. Each panel highlights the problem, solution, tech stack,
          and real outcomes behind every build.
        </p>

        <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-300/95 sm:text-base">
          This section showcases how ideas are transformed into working products, from concept to deployment, while keeping
          the journey clear and structured.
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
                    <span className="pill-badge rounded-full border border-white/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-300">
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

                  {(project.highlights ?? project.details)?.length ? (
                    <ul className="mt-2 space-y-1 text-[11px] leading-relaxed text-slate-200/85">
                      {(project.highlights ?? project.details).slice(0, 3).map((item) => (
                        <li key={`${project.id}-highlight-${item}`}>• {item}</li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-2.5 min-h-[1.8rem] flex flex-wrap gap-1 sm:min-h-[2rem] sm:gap-1.5">
                    {project.stack.map((item) => (
                      <span
                        key={`${project.id}-${item}`}
                        className="floating-label pill-badge rounded-full border border-white/20 bg-white/10 px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-[0.08em] text-slate-100 sm:px-2 sm:text-[8px]"
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

                <motion.div
                  className="project-media relative aspect-[4/3] sm:aspect-[6/5] min-w-0 w-full max-w-[480px] justify-self-center self-center overflow-hidden rounded-2xl border border-white/20 bg-black/20 shadow-[0_28px_90px_rgba(5,10,24,0.55)]"
                  style={{ backgroundColor: project.imageBg ?? undefined, padding: project.imagePadding ?? undefined }}
                >
                  {project.primaryLink ?? project.links?.[0]?.url ? (
                    <a
                      href={project.primaryLink ?? project.links[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full w-full"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`h-full w-full object-center ${project.imagePadding ? 'rounded-xl' : ''}`}
                        style={{ objectFit: project.imageFit ?? 'cover' }}
                        loading="lazy"
                      />
                    </a>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`h-full w-full object-center ${project.imagePadding ? 'rounded-xl' : ''}`}
                      style={{ objectFit: project.imageFit ?? 'cover' }}
                      loading="lazy"
                    />
                  )}

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
            className="modal-shell fixed inset-0 z-[1300] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="glass-panel modal-panel relative w-full max-w-5xl max-h-[90vh] overflow-y-auto p-4 sm:p-6"
              initial={{ opacity: 0, y: 28, scale: 0.94, rotateX: -16 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: 20, scale: 0.97, rotateX: 10 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 rounded-full border border-white/25 bg-black/35 px-3 py-1 text-xs text-white"
              >
                Close
              </button>

              <div className="mt-3 grid gap-3 sm:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-2">
                  <img
                    src={selectedProject.modalImage ?? selectedProject.image}
                    alt={selectedProject.title}
                    className="h-32 w-full rounded-2xl border border-white/20 object-cover sm:h-40"
                    loading="lazy"
                  />

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="meaning-badge">{selectedProject.phase}</span>
                    <span className="pill-badge rounded-full border border-white/20 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-300">
                      {selectedProject.type}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-black text-white">{selectedProject.title}</h3>
                  <p className="text-[13px] leading-relaxed text-slate-200">
                    {selectedProject.modalSummary ?? selectedProject.summary}
                  </p>

                  {selectedProject.links?.length ? (
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-indigo-200">Live Links</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedProject.links.map((link) => (
                          <a
                            key={`${selectedProject.id}-link-${link.url}`}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pill-badge rounded-full border border-cyan-200/60 bg-[linear-gradient(110deg,rgba(59,130,246,0.28),rgba(14,165,233,0.32),rgba(34,211,238,0.28))] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white shadow-[0_0_0_1px_rgba(56,189,248,0.25),0_10px_26px_rgba(6,182,212,0.25)] transition-all hover:-translate-y-0.5 hover:border-cyan-100 hover:bg-[linear-gradient(110deg,rgba(59,130,246,0.38),rgba(14,165,233,0.42),rgba(34,211,238,0.36))] hover:shadow-[0_0_0_1px_rgba(125,211,252,0.45),0_14px_32px_rgba(6,182,212,0.35)]"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-2">
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-cyan-200">Approach</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-slate-100/90">
                      {selectedProject.modalNarrative ?? selectedProject.narrative}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/12 bg-black/25 p-2">
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-indigo-200">Outcome</p>
                    <p className="mt-1 font-display text-[18px] font-bold leading-tight text-white">
                      {selectedProject.impact}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-black/25 p-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-indigo-200">Key Contributions</p>
                    <ul className="mt-2 space-y-2">
                      {(selectedProject.modalDetails ?? selectedProject.details).map((item) => (
                        <li key={item} className="text-[13px] text-slate-100">• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((item) => (
                      <span
                        key={`${selectedProject.id}-modal-${item}`}
                        className="pill-badge rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
