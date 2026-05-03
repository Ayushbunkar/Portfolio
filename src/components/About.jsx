import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'
import MagneticButton from './MagneticButton'
import { ensureScrollTrigger, gsap } from '../utils/scrollAnimations'

const ORIGIN_STEPS = [
  {
    title: 'Curiosity Became Creation',
    phase: 'Origin 01',
    description:
      'What started as curiosity in building small apps evolved into a focus on AI-powered products, scalable systems, and real-world problem solving.',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Systems Thinking Took Shape',
    phase: 'Origin 02',
    description:
      'A structured approach emerged: clean architecture, modular components, and LLM-driven workflows designed for performance and scalability.',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Engineering Added Depth',
    phase: 'Origin 03',
    description:
      'Development evolved into production-ready systems with APIs, automation pipelines, performance optimization, and reliable backend architecture.',
    image:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Execution Became the Core',
    phase: 'Origin 04',
    description:
      'Every project now focuses on shipping—building MVPs, launching fast, and turning ideas into working AI products used in real scenarios.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
  },
]

const IMAGE_PANEL_STEPS = [
  ...ORIGIN_STEPS,
  {
    title: 'Iteration Drives Scale',
    phase: 'Origin 05',
    image:
      'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1600&q=80',
  },
]

const STATS = [
  { value: 3, suffix: '+', label: 'Years Crafting Interfaces' },
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 92, suffix: '%', label: 'Repeat Client Satisfaction' },
  { value: 100, suffix: '%', label: 'Performance-Focused Builds' },
]

const ORIGIN_CONTEXT = [
  {
    title: 'AI System Context',
    copy: 'This portfolio behaves like a product journey. Every section represents a stage from idea to MVP to deployment, so nothing feels random.',
  },
  {
    title: 'Execution Density',
    copy: 'Instead of placeholders, each section highlights real builds, clear outcomes, and the thinking behind how systems were designed and shipped.',
  },
  {
    title: 'Continuity Layer',
    copy: 'Each part connects the journey from learning to building to launching, so the flow stays consistent across AI, development, and product execution.',
  },
]

const IMAGE_FLOW_TEXT = [
  'Early exploration into development and UI led to building small projects and understanding how digital products are created.',
  'Focus shifted to structured development—clean code, reusable components, and integrating AI models into practical workflows.',
  'Projects evolved with backend systems, APIs, automation tools, and performance-focused engineering practices.',
  'The priority became clear: build fast, ship real products, and solve actual problems using AI and full-stack development.',
  'Continuous improvement, iteration, and feedback loops ensure every product becomes more scalable, efficient, and impactful over time.',
]

const HIGHLIGHT_TERMS = ['AI', 'LLM', 'scalable', 'systems', 'APIs', 'automation', 'MVP', 'full-stack', 'backend']

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const highlightText = (text) => {
  const pattern = new RegExp(`(${HIGHLIGHT_TERMS.map(escapeRegExp).join('|')})`, 'gi')
  return text.split(pattern).map((chunk, index) => {
    const isHighlight = HIGHLIGHT_TERMS.some((term) => term.toLowerCase() === chunk.toLowerCase())
    return isHighlight ? (
      <span key={`${chunk}-${index}`} className="text-gradient-highlight">
        {chunk}
      </span>
    ) : (
      chunk
    )
  })
}

const About = () => {
  const sectionRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const ScrollTrigger = ensureScrollTrigger()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-intro',
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      )

      gsap.fromTo(
        '.about-context-card',
        { opacity: 0, y: 24, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-context-grid',
            start: 'top 84%',
          },
        }
      )

      const items = gsap.utils.toArray('.about-story-item')
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: index % 2 === 0 ? -42 : 42,
            y: 30,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
            },
          }
        )

        ScrollTrigger.create({
          trigger: item,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section-shell bg-[#060913]/64">
      <div className="section-container">
        <div className="about-intro text-center">
          <span className="section-kicker">
            <span className="section-kicker-dot" />
            Builder Layer
          </span>
          <h2 className="section-title">
            The Story Behind
            <span className="section-title-gradient">The Builder Mindset</span>
          </h2>
          <p className="section-copy mx-auto">
            About is no longer just biography. It shows how skills evolved across AI, development, and product
            building, so you understand how systems, automation, and real-world execution come together.
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-300/95 sm:text-base">
            You are not only reading background information. You are moving through a structured path that explains why
            these AI systems, scalable architectures, and product decisions exist together in one cohesive workflow.
          </p>
        </div>

        <div className="about-context-grid mt-8 grid gap-3 md:grid-cols-3">
          {ORIGIN_CONTEXT.map((item) => (
            <motion.article
              key={item.title}
              className="about-context-card narrative-card p-4 text-left"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-indigo-200">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-200">{item.copy}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="relative pr-0 lg:pr-8">
            <div className="absolute left-[18px] top-0 h-full w-[2px] rounded-full bg-white/12 md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-5">
              {ORIGIN_STEPS.map((step, index) => {
                const isActive = index <= activeStep
                const isLeft = index % 2 === 0

                return (
                  <div key={step.title} className="about-story-item relative grid md:grid-cols-2 md:gap-6">
                    <motion.span
                      className="absolute left-[11px] top-8 h-4 w-4 -translate-x-1/2 rounded-full border-2 md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                      animate={{
                        backgroundColor: isActive ? '#7c86ff' : '#101827',
                        borderColor: isActive ? '#c7d2fe' : 'rgba(255,255,255,0.3)',
                        boxShadow: isActive ? '0 0 18px #7c86ff' : 'none',
                      }}
                      transition={{ duration: 0.35 }}
                    />

                    <motion.article
                      className={`story-card ml-10 rounded-2xl border p-5 sm:p-6 md:ml-0 ${
                        isLeft ? 'md:mr-10 md:text-right' : 'md:col-start-2 md:ml-10'
                      } ${
                        isActive
                          ? 'border-indigo-300/45 bg-indigo-500/10 shadow-[0_22px_50px_rgba(6,15,35,0.4)]'
                          : 'border-white/12 bg-white/[0.03]'
                      }`}
                      animate={{ scale: isActive ? 1 : 0.985 }}
                      transition={{ type: 'spring', stiffness: 180, damping: 24 }}
                    >
                      <div
                        className={`mb-3 flex items-center justify-between gap-3 ${
                          isLeft ? 'md:flex-row-reverse' : ''
                        }`}
                      >
                        <span className="meaning-badge">{step.phase}</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
                          Story Reveal
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{step.title}</h3>
                      <p className="story-clamp mt-3 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                        {highlightText(step.description)}
                      </p>
                    </motion.article>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton href="#projects" className="filled beam-button rounded-full">
                <span>See My Work</span>
              </MagneticButton>
              <MagneticButton href="#contact" className="outline rounded-full">
                <span>Start a Project</span>
              </MagneticButton>
            </div>
          </div>

          <div className="relative">
            <div className="glass-panel relative overflow-hidden p-4 sm:p-5 lg:min-h-[940px]">
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_14%_22%,rgba(124,134,255,0.26),transparent_38%),radial-gradient(circle_at_82%_18%,rgba(45,212,191,0.18),transparent_34%),radial-gradient(circle_at_52%_90%,rgba(236,72,153,0.2),transparent_40%)]" />

              <div className="mb-3 rounded-2xl border border-white/12 bg-black/25 p-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-cyan-200">Product Journey</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-200 sm:text-sm">
                  {highlightText(
                    'The hero defines identity. The about section shows origin. Each stage builds capability, execution, and real-world impact through AI and scalable systems.'
                  )}
                </p>
              </div>

              <div className="space-y-3">
                {IMAGE_PANEL_STEPS.map((step, index) => (
                  <div key={step.title} className="timeline-card">
                    <div className="relative overflow-hidden rounded-2xl border border-white/15">
                      <motion.img
                        src={step.image}
                        alt={step.title}
                        className="h-[175px] w-full object-cover sm:h-[195px] lg:h-[210px]"
                        loading="lazy"
                        initial={{ opacity: 0, y: 10, scale: 1.04, filter: 'blur(6px)' }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                      />

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-cyan-200">{step.phase}</p>
                        <p className="mt-1 font-display text-sm font-semibold leading-tight text-white sm:text-base">
                          {step.title}
                        </p>
                      </div>
                    </div>

                    <p className="story-clamp px-1 pt-1 text-[11px] leading-relaxed text-slate-300/90">
                      {highlightText(IMAGE_FLOW_TEXT[index])}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((item) => (
            <motion.div
              key={item.label}
              className="soft-panel p-5 text-center"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="font-display text-3xl font-bold text-white md:text-4xl">
                <AnimatedCounter target={item.value} suffix={item.suffix} duration={1.9} />
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-slate-300">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About

