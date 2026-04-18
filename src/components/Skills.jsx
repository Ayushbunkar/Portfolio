import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import {
  SiAngular,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFigma,
  SiFirebase,
  SiFramer,
  SiGreensock,
  SiGraphql,
  SiHuggingface,
  SiHtml5,
  SiJavascript,
  SiJupyter,
  SiKeras,
  SiKubernetes,
  SiLangchain,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiNumpy,
  SiOpenai,
  SiPandas,
  SiPostman,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiPytorch,
  SiReact,
  SiRedux,
  SiRedis,
  SiSass,
  SiScikitlearn,
  SiSvelte,
  SiSwagger,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
  SiVite,
  SiWebpack,
} from 'react-icons/si'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import AnimatedCounter from './AnimatedCounter'
import TiltCard from './TiltCard'
import { SKILL_GROUPS, setActiveSkillGroup } from '../store/skillsSlice'
import { ensureScrollTrigger, gsap } from '../utils/scrollAnimations'

const CATEGORY_KEYS = ['frontend', 'backend', 'ai']
const CARDS_PER_PAGE = 6

const getOrbitAngles = (count) => {
  if (count <= 0) return []

  const step = 360 / count
  return Array.from({ length: count }, (_, index) => -90 + index * step)
}

const ICON_MAP = {
  angular: SiAngular,
  docker: SiDocker,
  express: SiExpress,
  fastapi: SiFastapi,
  figma: SiFigma,
  firebase: SiFirebase,
  framer: SiFramer,
  greensock: SiGreensock,
  graphql: SiGraphql,
  huggingface: SiHuggingface,
  html5: SiHtml5,
  javascript: SiJavascript,
  jupyter: SiJupyter,
  keras: SiKeras,
  kubernetes: SiKubernetes,
  langchain: SiLangchain,
  mongodb: SiMongodb,
  mysql: SiMysql,
  nestjs: SiNestjs,
  nextdotjs: SiNextdotjs,
  nginx: SiNginx,
  nodedotjs: SiNodedotjs,
  numpy: SiNumpy,
  openai: SiOpenai,
  pandas: SiPandas,
  postman: SiPostman,
  postgresql: SiPostgresql,
  prisma: SiPrisma,
  python: SiPython,
  pytorch: SiPytorch,
  react: SiReact,
  redux: SiRedux,
  redis: SiRedis,
  sass: SiSass,
  scikitlearn: SiScikitlearn,
  svelte: SiSvelte,
  swagger: SiSwagger,
  supabase: SiSupabase,
  tailwindcss: SiTailwindcss,
  tensorflow: SiTensorflow,
  typescript: SiTypescript,
  vercel: SiVercel,
  vuedotjs: SiVuedotjs,
  vite: SiVite,
  webpack: SiWebpack,
}

const getOrbitLayout = (size) => {
  if (size < 390) {
    const coreSize = 96
    const tagWidth = 132
    const tagOffset = 6
    const maxRadius = size / 2 - tagWidth / 2 - 8 - tagOffset
    const minRadius = coreSize / 2 + 30

    return {
      coreSize,
      tagWidth,
      tagOffset,
      ringRadius: Math.max(minRadius, Math.min(112, maxRadius)),
      textClass: 'text-[10px]',
      iconClass: 'text-[12px]',
    }
  }

  const coreSize = 112
  const tagWidth = 148
  const tagOffset = 8
  const maxRadius = size / 2 - tagWidth / 2 - 8 - tagOffset
  const minRadius = coreSize / 2 + 32

  return {
    coreSize,
    tagWidth,
    tagOffset,
    ringRadius: Math.max(minRadius, Math.min(132, maxRadius)),
    textClass: 'text-[10px]',
    iconClass: 'text-[13px]',
  }
}

const TechIcon = ({ iconKey, className }) => {
  const Icon = ICON_MAP[iconKey] ?? SiReact
  return <Icon className={className} aria-hidden="true" />
}

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
  const orbitCanvasRef = useRef(null)
  const paletteUpdateRef = useRef(null)
  const [orbitSize, setOrbitSize] = useState(420)
  const isInView = useInView(sectionRef, { once: true, margin: '-90px' })
  const dispatch = useDispatch()
  const [skillsPage, setSkillsPage] = useState(0)
  const activeGroupKey = useSelector((state) => state.skills.activeGroup)
  const activeGroup = SKILL_GROUPS[activeGroupKey] ?? SKILL_GROUPS.frontend
  const skills = activeGroup.skills

  const groupMaxLevel = useMemo(() => skills.reduce((max, item) => Math.max(max, item.level), 0), [skills])

  const averageLevel = useMemo(
    () => Math.round(skills.reduce((total, item) => total + item.level, 0) / skills.length),
    [skills]
  )

  const stats = useMemo(
    () => [
      { value: skills.length, suffix: '', label: `${activeGroup.label} Tools` },
      { value: averageLevel, suffix: '%', label: 'Average Strength' },
      { value: groupMaxLevel, suffix: '%', label: 'Peak Strength' },
    ],
    [activeGroup.label, averageLevel, groupMaxLevel, skills.length]
  )

  const totalPages = useMemo(() => Math.max(1, Math.ceil(skills.length / CARDS_PER_PAGE)), [skills.length])

  const safePage = useMemo(() => Math.min(skillsPage, totalPages - 1), [skillsPage, totalPages])

  const pageStart = safePage * CARDS_PER_PAGE
  const pageEnd = Math.min(pageStart + CARDS_PER_PAGE, skills.length)

  const visibleSkills = useMemo(() => skills.slice(pageStart, pageStart + CARDS_PER_PAGE), [skills, pageStart])

  const pageMaxLevel = useMemo(
    () => visibleSkills.reduce((max, item) => Math.max(max, item.level), 0),
    [visibleSkills]
  )

  const orbitLayout = useMemo(() => getOrbitLayout(orbitSize), [orbitSize])

  const circleTags = useMemo(
    () =>
      visibleSkills.map((skill) => ({
        icon: skill.icon,
        label: skill.name,
      })),
    [visibleSkills]
  )

  const orbitAngles = useMemo(() => getOrbitAngles(circleTags.length), [circleTags.length])

  useEffect(() => {
    if (!orbitRef.current) return

    const host = orbitRef.current
    const updateSize = () => {
      const width = host.clientWidth
      const height = host.clientHeight
      const size = Math.min(width, height)

      if (size > 0) setOrbitSize(size)
    }

    updateSize()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateSize)
      return () => window.removeEventListener('resize', updateSize)
    }

    const observer = new ResizeObserver(() => updateSize())
    observer.observe(host)

    return () => observer.disconnect()
  }, [])

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-card-item',
        { opacity: 0, y: 18, scale: 0.98, filter: 'blur(7px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.52,
          stagger: 0.06,
          ease: 'power2.out',
        }
      )

      gsap.fromTo(
        '.orbit-tag',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.42,
          stagger: 0.045,
          ease: 'back.out(1.5)',
        }
      )

      gsap.fromTo(
        '.orbit-core',
        { scale: 0.94, opacity: 0.75 },
        { scale: 1, opacity: 1, duration: 0.45, ease: 'power2.out' }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [activeGroupKey, safePage])

  useEffect(() => {
    setSkillsPage(0)
  }, [activeGroupKey])

  useEffect(() => {
    if (skillsPage > totalPages - 1) {
      setSkillsPage(totalPages - 1)
    }
  }, [skillsPage, totalPages])

  useEffect(() => {
    let mounted = true
    let animationFrameId = 0
    let renderer
    let scene
    let camera
    let particles

    const setupOrbitScene = async () => {
      if (!orbitRef.current || !orbitCanvasRef.current) return

      const THREE = await import('three')
      if (!mounted || !orbitRef.current || !orbitCanvasRef.current) return

      const host = orbitRef.current
      const canvas = orbitCanvasRef.current
      const pointer = { x: 0, y: 0 }
      const smoothPointer = { x: 0, y: 0 }

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6))
      renderer.setClearColor(0x000000, 0)

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
      camera.position.z = 7.2

      const pointsCount = 700
      const positions = new Float32Array(pointsCount * 3)
      const colors = new Float32Array(pointsCount * 3)

      const applyPalette = (paletteHex) => {
        const palette = paletteHex.map((hex) => new THREE.Color(hex))
        for (let i = 0; i < pointsCount; i += 1) {
          const selected = palette[Math.floor(Math.random() * palette.length)]
          colors[i * 3] = selected.r
          colors[i * 3 + 1] = selected.g
          colors[i * 3 + 2] = selected.b
        }
      }

      for (let i = 0; i < pointsCount; i += 1) {
        const radius = 2.1 + Math.random() * 2.1
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        positions[i * 3 + 2] = (radius * Math.cos(phi)) * 0.4
      }

      applyPalette(activeGroup.palette)

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      const material = new THREE.PointsMaterial({
        size: 0.03,
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      })

      particles = new THREE.Points(geometry, material)
      scene.add(particles)

      paletteUpdateRef.current = (paletteHex) => {
        applyPalette(paletteHex)
        geometry.attributes.color.needsUpdate = true
      }

      const onPointerMove = (event) => {
        const box = host.getBoundingClientRect()
        pointer.x = ((event.clientX - box.left) / box.width - 0.5) * 2
        pointer.y = ((event.clientY - box.top) / box.height - 0.5) * 2
      }

      const onPointerLeave = () => {
        pointer.x = 0
        pointer.y = 0
      }

      const resize = () => {
        if (!host || !renderer || !camera) return
        const width = host.clientWidth
        const height = host.clientHeight
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }

      const animate = () => {
        if (!mounted || !renderer || !scene || !camera || !particles) return
        animationFrameId = requestAnimationFrame(animate)

        smoothPointer.x += (pointer.x - smoothPointer.x) * 0.06
        smoothPointer.y += (pointer.y - smoothPointer.y) * 0.06

        particles.rotation.y += 0.0018 + smoothPointer.x * 0.0026
        particles.rotation.x += 0.0009 + smoothPointer.y * 0.0022
        particles.position.x = smoothPointer.x * 0.24
        particles.position.y = smoothPointer.y * 0.2

        renderer.render(scene, camera)
      }

      resize()
      animate()

      host.addEventListener('pointermove', onPointerMove)
      host.addEventListener('pointerleave', onPointerLeave)
      window.addEventListener('resize', resize)

      const cleanup = () => {
        host.removeEventListener('pointermove', onPointerMove)
        host.removeEventListener('pointerleave', onPointerLeave)
        window.removeEventListener('resize', resize)
        if (animationFrameId) cancelAnimationFrame(animationFrameId)
        geometry.dispose()
        material.dispose()
        renderer.dispose()
      }

      orbitCanvasRef.current._cleanupOrbitThree = cleanup
    }

    setupOrbitScene()

    return () => {
      mounted = false
      paletteUpdateRef.current = null
      if (orbitCanvasRef.current?._cleanupOrbitThree) {
        orbitCanvasRef.current._cleanupOrbitThree()
        delete orbitCanvasRef.current._cleanupOrbitThree
      }
    }
  }, [])

  useEffect(() => {
    if (paletteUpdateRef.current) {
      paletteUpdateRef.current(activeGroup.palette)
      gsap.fromTo(orbitRef.current, { scale: 0.985 }, { scale: 1, duration: 0.42, ease: 'power2.out' })
    }
  }, [activeGroupKey, activeGroup.palette])

  return (
    <section id="skills" ref={sectionRef} className="section-shell bg-[#070a14]/62" style={{ overflow: 'visible' }}>
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
          {stats.map((stat) => (
            <div key={`${activeGroupKey}-${stat.label}`} className="soft-panel min-w-[170px] px-5 py-4 text-center">
              <div className="font-display text-3xl font-bold text-white">
                <AnimatedCounter
                  key={`${activeGroupKey}-${stat.label}-counter`}
                  target={stat.value}
                  suffix={stat.suffix}
                  duration={1.8}
                />
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div ref={orbitRef} className="relative mx-auto aspect-square w-full max-w-[420px]">
            <canvas ref={orbitCanvasRef} className="pointer-events-none absolute inset-0 z-0 h-full w-full" />
            <motion.div
              className="absolute inset-0 z-[1] rounded-full border border-indigo-300/25"
              style={{ borderColor: `${activeGroup.palette[0]}66` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-[14%] z-[1] rounded-full border border-cyan-300/20"
              style={{ borderColor: `${activeGroup.palette[1]}5a` }}
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-[32%] z-[1] rounded-full border border-pink-300/25"
              style={{ borderColor: `${activeGroup.palette[2]}66` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
            />

            <div
              className="orbit-core absolute left-1/2 top-1/2 z-[3] grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-lg"
              style={{ width: orbitLayout.coreSize, height: orbitLayout.coreSize }}
            >
              <div className="text-center">
                <p className="font-display text-3xl font-black text-white">{pageMaxLevel}%</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-cyan-200">
                  <span className="inline-flex items-center gap-1">
                    <TechIcon iconKey={activeGroup.icon} className="text-[11px] text-cyan-200" />
                    {activeGroup.label}
                  </span>
                </p>
              </div>
            </div>

            {circleTags.map((item, index) => {
              const angle = orbitAngles[index] ?? -90
              const radius = orbitLayout.ringRadius + orbitLayout.tagOffset
              const radian = (angle * Math.PI) / 180
              const x = Math.cos(radian) * radius
              const y = Math.sin(radian) * radius

              return (
                <motion.div
                  key={`${activeGroupKey}-${safePage}-${item.label}`}
                  className="orbit-tag absolute left-1/2 top-1/2 z-[6]"
                  style={{ x, y }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.08 * index, duration: 0.45 }}
                >
                  <div
                    className={`-translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-full border border-white/20 bg-[#0c1324]/84 px-3 py-1.5 font-medium tracking-[0.01em] text-white shadow-[0_12px_30px_rgba(7,12,24,0.35)] ${orbitLayout.textClass}`}
                    style={{ width: orbitLayout.tagWidth }}
                  >
                    <span className="inline-flex align-middle">
                      <TechIcon iconKey={item.icon} className={`${orbitLayout.iconClass} text-cyan-200`} />
                    </span>
                    <span className="block min-w-0 flex-1 truncate" title={item.label}>
                      {item.label}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div>
            <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
              {CATEGORY_KEYS.map((key) => {
                const group = SKILL_GROUPS[key]
                const isActive = key === activeGroupKey

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => dispatch(setActiveSkillGroup(key))}
                    className={`skills-filter-btn flex min-w-[126px] items-center justify-center gap-2 rounded-full border px-4 py-2 transition-all duration-300 ${
                      isActive
                        ? 'border-white/60 bg-white/14 text-white'
                        : 'border-white/20 bg-black/25 text-slate-200 hover:border-white/35 hover:bg-white/[0.08]'
                    }`}
                    style={
                      isActive
                        ? {
                            boxShadow: `0 12px 26px ${group.accent}4a`,
                            borderColor: `${group.accent}cc`,
                          }
                        : undefined
                    }
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full border border-white/20 bg-white/10">
                      <TechIcon iconKey={group.icon} className="text-sm text-white" />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em]">{group.label}</span>
                  </button>
                )
              })}
            </div>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-200">{activeGroup.label} Tools</p>
                <p className="mt-1 text-xs text-slate-300/90">
                  Showing {pageStart + 1}-{pageEnd} of {skills.length} skills
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSkillsPage((prev) => Math.max(0, prev - 1))}
                  disabled={safePage === 0}
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-black/25 text-slate-100 transition-all duration-200 hover:border-white/45 hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous skills"
                >
                  <RiArrowLeftSLine className="text-lg" />
                </button>

                <span className="min-w-[50px] text-center font-mono text-[10px] uppercase tracking-[0.14em] text-slate-300">
                  {safePage + 1} / {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => setSkillsPage((prev) => Math.min(totalPages - 1, prev + 1))}
                  disabled={safePage >= totalPages - 1}
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-black/25 text-slate-100 transition-all duration-200 hover:border-white/45 hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next skills"
                >
                  <RiArrowRightSLine className="text-lg" />
                </button>
              </div>
            </div>

            <div className="skills-grid grid gap-4 sm:grid-cols-2">
              {visibleSkills.map((skill, index) => (
                <TiltCard key={`${activeGroupKey}-${safePage}-${skill.name}`} className="skills-card skills-card-item h-full" intensity={9}>
                  <div className="glass-panel h-full p-5">
                    <div className="mb-4 grid grid-cols-[1fr_auto] items-center gap-2">
                      <p className="font-display flex min-w-0 items-center gap-2 text-lg font-bold text-white sm:text-xl">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/20 bg-black/25">
                          <TechIcon iconKey={skill.icon} className="text-[14px] text-white" />
                        </span>
                        <span className="block truncate" title={skill.name}>
                          {skill.name}
                        </span>
                      </p>
                      <span className="shrink-0 min-w-[118px] rounded-full border border-white/20 bg-white/10 px-2 py-1 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-slate-200">
                        {skill.type}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/12">
                      <motion.div
                        key={`${activeGroupKey}-${safePage}-${skill.name}-bar`}
                        className="h-full rounded-full"
                        style={{
                          background:
                            'linear-gradient(90deg, rgba(124,134,255,1) 0%, rgba(45,212,191,1) 45%, rgba(236,72,153,1) 100%)',
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
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
      </div>
    </section>
  )
}

export default Skills
