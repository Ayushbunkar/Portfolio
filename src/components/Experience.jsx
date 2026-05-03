import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ensureScrollTrigger, gsap } from '../utils/scrollAnimations'

const JOURNEY_STEPS = [
  {
    phase: 'Identity',
    title: 'The Spark',
    description:
      'Started with a focused interest in building digital products, quickly moving from basic development to creating functional applications.',
    meta: '2024',
    lensTitle: 'System Foundation',
    lensCopy:
      'Built strong fundamentals in frontend development, logic building, and problem-solving, forming the base for product thinking.',
    lensTags: ['HTML', 'CSS', 'JavaScript', 'UI Basics'],
  },
  {
    phase: 'Origin',
    title: 'Development + Systems Merge',
    description:
      'Progressed into full-stack development, combining frontend interfaces with backend logic to build complete applications.',
    meta: '2024 - 2025',
    lensTitle: 'Core Stability',
    lensCopy:
      'Adopted modular code, reusable components, and performance-focused practices for scalable and maintainable systems.',
    lensTags: ['Full-Stack Development', 'APIs', 'Performance', 'Scalability'],
  },
  {
    phase: 'Power',
    title: 'AI & Systems Thinking',
    description:
      'Shifted towards building AI-powered applications, LLM-based tools, and automation systems to solve real-world problems.',
    meta: '2025',
    lensTitle: 'Outcome Focus',
    lensCopy: 'Focused on efficiency, usability, and building systems that deliver measurable results.',
    lensTags: ['AI / ML', 'LLM Integration', 'Automation', 'Backend Systems'],
  },
  {
    phase: 'Impact',
    title: 'Product Execution',
    description:
      'Focused on building and launching MVPs, AI tools, and scalable products with real-world applications.',
    meta: '2025 - Ongoing',
    lensTitle: 'Mission Alignment',
    lensCopy: 'Turned ideas into production-ready systems, ensuring performance, usability, and reliability.',
    lensTags: ['MVP Development', 'System Design', 'Deployment', 'Optimization'],
  },
  {
    phase: 'Connection',
    title: 'Collaborative Growth',
    description:
      'Working with founders, teams, and creators to build AI-driven products and scalable digital solutions.',
    meta: '2025 - Present',
    lensTitle: 'Continuous Evolution',
    lensCopy: 'Focused on iteration, feedback, and scaling systems for long-term impact.',
    lensTags: ['Collaboration', 'Product Strategy', 'Scaling', 'Execution'],
  },
]

const JOURNEY_CONTEXT = [
  {
    title: 'Growth Path',
    copy: 'Each stage marks a milestone, from early learning to building LLM applications, automation systems, and full-stack products used in real scenarios.',
  },
  {
    title: 'Structured Progress',
    copy: 'This is not a random journey. Every step shows clear intent, skill development, and execution outcomes leading to production-ready systems.',
  },
  {
    title: 'Execution Over Theory',
    copy: 'Instead of simple milestones, each phase shows what was built, how it was built, and the impact it created.',
  },
]

const Experience = () => {
  const sectionRef = useRef(null)
  const listRef = useRef(null)
  const fillRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    ensureScrollTrigger()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.journey-heading',
        { opacity: 0, y: 38, filter: 'blur(8px)' },
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
        '.journey-context-card',
        { opacity: 0, y: 20, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.journey-context-grid',
            start: 'top 85%',
          },
        }
      )

      gsap.to(fillRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 68%',
          end: 'bottom 34%',
          scrub: 1,
        },
      })

      const rows = gsap.utils.toArray('.journey-step')

      rows.forEach((row, index) => {
        const mainCard = row.querySelector('.journey-main-card')
        const lensCard = row.querySelector('.journey-lens-card')

        if (mainCard) {
          gsap.fromTo(
            mainCard,
            { opacity: 0.2, y: 36, filter: 'blur(9px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.75,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 78%',
              },
            }
          )
        }

        if (lensCard) {
          gsap.fromTo(
            lensCard,
            { opacity: 0, x: index % 2 === 0 ? 30 : -30, filter: 'blur(8px)' },
            {
              opacity: 1,
              x: 0,
              filter: 'blur(0px)',
              duration: 0.68,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 78%',
              },
            }
          )
        }

        const ScrollTrigger = ensureScrollTrigger()
        ScrollTrigger.create({
          trigger: row,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="journey" ref={sectionRef} className="section-shell bg-[#060913]/64">
      <div className="section-container">
        <div className="journey-heading mb-12 text-center md:mb-16">
          <span className="section-kicker">
            <span className="section-kicker-dot" />
            Experience Journey
          </span>
          <h2 className="section-title">
            Every Step Adds
            <span className="section-title-gradient">Momentum & Meaning</span>
          </h2>
          <p className="section-copy mx-auto">
            This timeline reflects the journey from learning to building AI-powered products, scalable systems, and real-world
            applications. Each stage highlights how skills evolved into execution.
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-300/95 sm:text-base">
            As you scroll, each step reveals growth, showing how ideas progressed into working products, deployed systems,
            and practical solutions while keeping the full progression connected.
          </p>
        </div>

        <div className="journey-context-grid mb-8 grid gap-3 md:grid-cols-3">
          {JOURNEY_CONTEXT.map((item) => (
            <motion.article
              key={item.title}
              className="journey-context-card narrative-card p-4 text-left"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-200">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-200">{item.copy}</p>
            </motion.article>
          ))}
        </div>

        <div ref={listRef} className="relative mx-auto max-w-5xl px-1 md:px-6">
          <div className="absolute left-[18px] top-0 h-full w-[2px] rounded-full bg-white/12 md:left-1/2 md:-translate-x-1/2" />
          <div
            ref={fillRef}
            className="absolute left-[18px] top-0 h-0 w-[3px] rounded-full bg-gradient-to-b from-indigo-400 via-cyan-300 to-pink-400 md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-7">
            {JOURNEY_STEPS.map((step, index) => {
              const isActive = index <= activeIndex
              const isRight = index % 2 !== 0
              const isFocused = index === activeIndex

              return (
                <div key={step.title} className="journey-step relative grid gap-4 md:grid-cols-2 md:gap-8">
                  <motion.aside
                    className={`journey-lens-card relative ml-10 rounded-2xl border p-4 md:ml-0 md:max-w-[88%] md:p-5 ${
                      isRight ? 'md:order-1' : 'md:order-2 md:ml-auto'
                    } ${
                      isActive
                        ? 'border-cyan-300/35 bg-cyan-500/10 shadow-[0_16px_36px_rgba(8,28,34,0.28)]'
                        : 'border-white/10 bg-black/25'
                    }`}
                    animate={{
                      scale: isFocused ? 1 : 0.99,
                      y: isFocused ? -1 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 170, damping: 23 }}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-cyan-200">{step.lensTitle}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-200/95">{step.lensCopy}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {step.lensTags.map((tag) => (
                        <span
                          key={`${step.title}-${tag}`}
                          className="rounded-full border border-white/20 bg-white/[0.06] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.aside>

                  <motion.div
                    className={`journey-main-card relative ml-10 rounded-2xl border p-5 md:ml-0 md:max-w-[94%] md:p-6 ${
                      isRight
                        ? 'md:order-2 md:ml-auto'
                        : 'md:order-1'
                    } ${
                      isActive
                        ? 'border-indigo-300/45 bg-indigo-500/10 shadow-[0_18px_48px_rgba(6,15,35,0.42)]'
                        : 'border-white/12 bg-white/[0.03]'
                    }`}
                    animate={{
                      scale: isActive ? 1 : 0.985,
                      y: isActive ? -2 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="meaning-badge">{step.phase}</span>
                      <span className="rounded-full border border-white/20 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-300">
                        {step.meta}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white md:text-2xl">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-[15px]">{step.description}</p>
                  </motion.div>

                  <motion.div
                    className="absolute left-[18px] top-7 h-4 w-4 -translate-x-1/2 rounded-full border-2 md:left-1/2"
                    animate={{
                      backgroundColor: isActive ? '#7c86ff' : '#111827',
                      borderColor: isActive ? '#c7d2fe' : 'rgba(255,255,255,0.3)',
                      boxShadow: isActive ? '0 0 16px #7c86ff' : 'none',
                      scale: isActive ? 1.08 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )
            })}
          </div>
        </div>

        <motion.div
          className="narrative-card mt-10 border-white/12 bg-black/28 p-5 text-center sm:p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-indigo-200">Journey Continuum</p>
          <p className="mx-auto mt-2 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
            The timeline closes the loop between origin and impact, then hands context to the contact layer so the
            conversation begins with clarity, not guesswork.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
