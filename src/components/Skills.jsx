import { useEffect, useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'
import TiltCard from './TiltCard'
import { ensureScrollTrigger, gsap } from '../utils/scrollAnimations'

const SKILLS = [
  { name: 'React', level: 95, type: 'Frontend' },
  { name: 'Next.js', level: 90, type: 'Frontend' },
  { name: 'TypeScript', level: 88, type: 'Frontend' },
  { name: 'GSAP', level: 92, type: 'Motion' },
  { name: 'Framer Motion', level: 94, type: 'Motion' },
  { name: 'Node.js', level: 86, type: 'Backend' },
  { name: 'Design Systems', level: 90, type: 'Product' },
  { name: 'Performance', level: 91, type: 'Engineering' },
]

const ORBIT = ['React', 'Motion', 'UI', 'DX', 'Perf', 'A11y', 'API', 'Story']

const STATS = [
  { value: 18, suffix: '+', label: 'Core Tools' },
  { value: 40, suffix: '+', label: 'Shipped Interfaces' },
  { value: 3, suffix: '+', label: 'Years Experience' },
]

const POWER_CONTEXT = [
  {
    title: 'System Power',
    copy: 'Every tool here is selected to keep motion smooth, maintainability high, and delivery speed practical.',
  },
  {
    title: 'Space Coordination',
    copy: 'Orbit visuals represent how design, frontend, backend, and performance layers stay synchronized.',
  },
  {
    title: 'Execution Clarity',
    copy: 'These skills are applied as product systems, not isolated tricks, so results stay consistent across pages.',
  },
]

const Skills = () => {
  const sectionRef = useRef(null)
  const orbitRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-90px' })

  const maxLevel = useMemo(
    () => SKILLS.reduce((max, item) => Math.max(max, item.level), 0),
    []
  )

  useEffect(() => {
    ensureScrollTrigger()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-intro',
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      )

      gsap.fromTo(
        '.skills-card',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 82%',
          },
        }
      )

      gsap.fromTo(
        '.skills-context-card',
        { opacity: 0, y: 20, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.skills-context-grid',
            start: 'top 84%',
          },
        }
      )

      gsap.to(orbitRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="section-shell bg-[#070a14]">
      <div className="section-container">
        <div className="skills-intro text-center">
          <span className="section-kicker">
            <span className="section-kicker-dot" />
            Power Layer
          </span>
          <h2 className="section-title">
            Skills That Turn
            <span className="section-title-gradient">Concept Into Product</span>
          </h2>
          <p className="section-copy mx-auto">
            This section represents power: technical precision, interaction quality, and the system thinking needed to scale premium experiences.
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-300/95 sm:text-base">
            Power here means controlled complexity. Every animation, component, and architecture decision is tuned to
            feel premium while keeping the build reliable in real production timelines.
          </p>
        </div>

        <div className="skills-context-grid mt-8 grid gap-3 md:grid-cols-3">
          {POWER_CONTEXT.map((item) => (
            <motion.article
              key={item.title}
              className="skills-context-card narrative-card p-4 text-left"
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

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="soft-panel min-w-[170px] px-5 py-4 text-center">
              <div className="font-display text-3xl font-bold text-white">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={1.8} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div ref={orbitRef} className="relative mx-auto h-[360px] w-[360px] max-w-full sm:h-[420px] sm:w-[420px]">
            <motion.div
              className="absolute inset-0 rounded-full border border-indigo-300/25"
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-[14%] rounded-full border border-cyan-300/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-[32%] rounded-full border border-pink-300/25"
              animate={{ rotate: 360 }}
              transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
            />

            <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-lg">
              <div className="text-center">
                <p className="font-display text-3xl font-black text-white">{maxLevel}%</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-cyan-200">Peak Strength</p>
              </div>
            </div>

            {ORBIT.map((item, index) => {
              const angle = (360 / ORBIT.length) * index
              const radius = index % 2 === 0 ? 170 : 130

              return (
                <motion.div
                  key={item}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg)`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.08 * index, duration: 0.45 }}
                >
                  <div className="rounded-full border border-white/20 bg-[#0c1324]/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_12px_30px_rgba(7,12,24,0.35)]">
                    {item}
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="skills-grid grid gap-4 sm:grid-cols-2">
            {SKILLS.map((skill, index) => (
              <TiltCard key={skill.name} className="skills-card h-full" intensity={9}>
                <div className="glass-panel h-full p-5">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <p className="font-display text-xl font-bold text-white">{skill.name}</p>
                    <span className="rounded-full border border-white/20 bg-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-200">
                      {skill.type}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/12">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(124,134,255,1) 0%, rgba(45,212,191,1) 45%, rgba(236,72,153,1) 100%)',
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">Capability</p>
                    <p className="font-display text-xl font-bold text-white">{skill.level}%</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
