import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'

const ROLES = ['Frontend Engineer', 'Interaction Designer', 'Creative Developer', 'Product Storyteller']

const HERO_STATS = [
  { value: '50+', label: 'Premium Builds' },
  { value: '98%', label: 'Client Delight' },
  { value: '24/7', label: 'Performance Focus' },
]

const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com' },
  { name: 'LinkedIn', href: 'https://linkedin.com' },
  { name: 'Dribbble', href: 'https://dribbble.com' },
]

function TypewriterText({ texts, speed = 90, deleteSpeed = 45, delay = 1400 }) {
  const [display, setDisplay] = useState('')
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('typing')
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const currentText = texts[index]
    let timeoutId

    if (phase === 'typing') {
      if (charIndex < currentText.length) {
        timeoutId = setTimeout(() => {
          setDisplay(currentText.slice(0, charIndex + 1))
          setCharIndex((value) => value + 1)
        }, speed)
      } else {
        timeoutId = setTimeout(() => setPhase('deleting'), delay)
      }
    } else if (charIndex > 0) {
      timeoutId = setTimeout(() => {
        setDisplay(currentText.slice(0, charIndex - 1))
        setCharIndex((value) => value - 1)
      }, deleteSpeed)
    } else {
      setIndex((value) => (value + 1) % texts.length)
      setPhase('typing')
    }

    return () => clearTimeout(timeoutId)
  }, [charIndex, delay, deleteSpeed, index, phase, speed, texts])

  return (
    <span>
      {display}
      <span
        className="ml-1 inline-block h-[1.05em] w-[2px] align-middle"
        style={{
          background: 'linear-gradient(180deg, #c7d2fe 0%, #2dd4bf 100%)',
          animation: 'heroCursorBlink 1s step-end infinite',
        }}
      />
    </span>
  )
}

function MagneticButton({ children, href, variant = 'filled' }) {
  const buttonRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 410, damping: 30 })
  const sy = useSpring(y, { stiffness: 410, damping: 30 })

  const onMove = (event) => {
    if (!buttonRef.current) return
    const box = buttonRef.current.getBoundingClientRect()
    const centerX = box.left + box.width / 2
    const centerY = box.top + box.height / 2
    x.set((event.clientX - centerX) * 0.28)
    y.set((event.clientY - centerY) * 0.28)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const baseClasses =
    'relative inline-flex min-h-[52px] items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300'

  const variantClasses =
    variant === 'filled'
      ? 'beam-button border border-indigo-300/30 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 text-white shadow-[0_14px_38px_rgba(61,74,208,0.42)] hover:scale-[1.03] hover:shadow-[0_18px_46px_rgba(80,95,228,0.46)]'
      : 'border border-white/20 bg-white/[0.02] text-white hover:scale-[1.03] hover:border-white/45 hover:bg-white/10'

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      className={`${baseClasses} ${variantClasses}`}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.97 }}
    >
      <span className="relative z-10">{children}</span>
    </motion.a>
  )
}

const disposeSceneObject = (object) => {
  object.traverse((item) => {
    if (item.geometry) item.geometry.dispose()
    if (item.material) {
      if (Array.isArray(item.material)) {
        item.material.forEach((material) => material.dispose())
      } else {
        item.material.dispose()
      }
    }
  })
}

export default function Hero() {
  const heroRef = useRef(null)
  const canvasRef = useRef(null)
  const [threeReady, setThreeReady] = useState(false)

  useEffect(() => {
    let mounted = true
    let animationFrameId = 0
    let renderer
    let scene
    let camera
    let cleanupFns = []

    const setupThree = async () => {
      if (typeof window === 'undefined' || !heroRef.current || !canvasRef.current) return

      const THREE = await import('three')
      if (!mounted || !heroRef.current || !canvasRef.current) return

      const section = heroRef.current
      const canvas = canvasRef.current
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
      renderer.setClearColor(0x000000, 0)

      scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x060a16, 0.055)

      camera = new THREE.PerspectiveCamera(52, 1, 0.1, 80)
      camera.position.set(0, 0.15, 8.9)

      const ambient = new THREE.AmbientLight(0x5d6de8, 0.42)
      const key = new THREE.DirectionalLight(0xa8f5eb, 1.08)
      key.position.set(4, 2, 6)
      const rim = new THREE.PointLight(0xff6dc6, 1.1, 18)
      rim.position.set(-3, -2.5, 5)

      scene.add(ambient, key, rim)

      const root = new THREE.Group()
      scene.add(root)

      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.72, 2),
        new THREE.MeshPhysicalMaterial({
          color: 0x6f83ff,
          emissive: 0x2b2f70,
          emissiveIntensity: 1.15,
          roughness: 0.14,
          metalness: 0.28,
          clearcoat: 1,
          clearcoatRoughness: 0.12,
          transmission: 0.25,
          transparent: true,
          opacity: 0.9,
        })
      )
      root.add(core)

      const wireShell = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.34, 1),
        new THREE.MeshBasicMaterial({
          color: 0x8bf4df,
          wireframe: true,
          transparent: true,
          opacity: 0.2,
        })
      )
      root.add(wireShell)

      const ringA = new THREE.Mesh(
        new THREE.TorusGeometry(2.8, 0.048, 16, 220),
        new THREE.MeshStandardMaterial({
          color: 0x6f83ff,
          emissive: 0x303c90,
          emissiveIntensity: 0.85,
          roughness: 0.2,
          metalness: 0.72,
          transparent: true,
          opacity: 0.76,
        })
      )
      ringA.rotation.set(Math.PI * 0.25, Math.PI * 0.04, Math.PI * 0.12)
      root.add(ringA)

      const ringB = new THREE.Mesh(
        new THREE.TorusGeometry(2.22, 0.04, 14, 200),
        new THREE.MeshStandardMaterial({
          color: 0xff74ca,
          emissive: 0x6c2a56,
          emissiveIntensity: 0.7,
          roughness: 0.18,
          metalness: 0.75,
          transparent: true,
          opacity: 0.6,
        })
      )
      ringB.rotation.set(Math.PI * 0.65, Math.PI * 0.15, Math.PI * 0.2)
      root.add(ringB)

      const starCount = 1600
      const starGeometry = new THREE.BufferGeometry()
      const starPositions = new Float32Array(starCount * 3)
      const starColors = new Float32Array(starCount * 3)
      const palette = [new THREE.Color(0x8ea2ff), new THREE.Color(0x9cf7e5), new THREE.Color(0xff8bd1)]

      for (let index = 0; index < starCount; index += 1) {
        const radius = 5.2 + Math.random() * 4.3
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)

        starPositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
        starPositions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        starPositions[index * 3 + 2] = radius * Math.cos(phi) - 1.5

        const color = palette[index % palette.length]
        starColors[index * 3] = color.r
        starColors[index * 3 + 1] = color.g
        starColors[index * 3 + 2] = color.b
      }

      starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
      starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3))

      const stars = new THREE.Points(
        starGeometry,
        new THREE.PointsMaterial({
          size: 0.028,
          vertexColors: true,
          transparent: true,
          opacity: 0.72,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      )
      scene.add(stars)

      const pointer = { x: 0, y: 0 }
      const smoothPointer = { x: 0, y: 0 }
      const clock = new THREE.Clock()

      const onPointerMove = (event) => {
        if (prefersReducedMotion) return
        const box = section.getBoundingClientRect()
        const nx = ((event.clientX - box.left) / box.width) * 2 - 1
        const ny = ((event.clientY - box.top) / box.height) * 2 - 1
        pointer.x = nx
        pointer.y = -ny
      }

      const onResize = () => {
        if (!section || !renderer || !camera) return
        const width = section.clientWidth
        const height = section.clientHeight
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }

      section.addEventListener('pointermove', onPointerMove)
      window.addEventListener('resize', onResize)
      onResize()

      cleanupFns = [
        () => section.removeEventListener('pointermove', onPointerMove),
        () => window.removeEventListener('resize', onResize),
      ]

      const animate = () => {
        if (!mounted || !renderer || !scene || !camera) return
        animationFrameId = requestAnimationFrame(animate)

        const elapsed = clock.getElapsedTime()
        smoothPointer.x += (pointer.x - smoothPointer.x) * 0.04
        smoothPointer.y += (pointer.y - smoothPointer.y) * 0.04

        const pointerInfluenceX = prefersReducedMotion ? 0 : smoothPointer.x
        const pointerInfluenceY = prefersReducedMotion ? 0 : smoothPointer.y

        root.rotation.y = elapsed * 0.2 + pointerInfluenceX * 0.4
        root.rotation.x = Math.sin(elapsed * 0.28) * 0.14 + pointerInfluenceY * 0.28

        core.rotation.x = elapsed * 0.18
        core.rotation.y = elapsed * 0.22
        wireShell.rotation.y = -elapsed * 0.15
        ringA.rotation.z += 0.0055
        ringB.rotation.x -= 0.0045

        stars.rotation.y = -elapsed * 0.06
        stars.rotation.x = elapsed * 0.03

        camera.position.x = pointerInfluenceX * 0.42
        camera.position.y = 0.14 + pointerInfluenceY * 0.27
        camera.lookAt(0, 0, 0)

        renderer.render(scene, camera)
      }

      animate()
      setThreeReady(true)

      cleanupFns.push(() => {
        disposeSceneObject(root)
        disposeSceneObject(stars)
      })
    }

    setupThree()

    return () => {
      mounted = false
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      cleanupFns.forEach((fn) => fn())
      if (renderer) renderer.dispose()
    }
  }, [])

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        '.hero-reveal',
        { y: 38, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.12,
          delay: 0.25,
          ease: 'power3.out',
        }
      )

      gsap.fromTo(
        '.hero-stat-card',
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.85,
          ease: 'power2.out',
          stagger: 0.08,
        }
      )

      gsap.fromTo(
        '.hero-scroll',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          delay: 1.2,
          ease: 'power2.out',
        }
      )
    }, heroRef)

    return () => context.revert()
  }, [])

  return (
    <>
      <style>{`
        @keyframes heroCursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes heroScan { 0% { transform: translateX(-140%); } 100% { transform: translateX(140%); } }
        @keyframes heroScrollDot { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
      `}</style>

      <section
        id="home"
        ref={heroRef}
        className="relative isolate min-h-screen overflow-hidden bg-[#050812] pb-24 pt-28 sm:pt-32"
      >
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 h-full w-full" />

        <div className="pointer-events-none absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_65%_at_24%_28%,rgba(115,130,255,0.22),transparent_62%),radial-gradient(ellipse_66%_56%_at_84%_22%,rgba(44,212,189,0.14),transparent_62%),radial-gradient(ellipse_72%_62%_at_50%_102%,rgba(236,72,153,0.16),transparent_68%)]" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:68px_68px]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,18,0.68)_0%,rgba(5,8,18,0.78)_42%,rgba(5,8,18,0.94)_100%)]" />
        </div>

        <div className="section-container relative z-10 grid items-center gap-12 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:gap-8">
          <div className="space-y-7 text-center lg:text-left">
            <div className="hero-reveal inline-flex items-center gap-2 rounded-full border border-indigo-300/25 bg-indigo-300/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-indigo-100">
              Premium Portfolio Experience
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            </div>

            <div className="hero-reveal space-y-4">
              <h1 className="font-display text-[clamp(2.7rem,7.6vw,6rem)] font-black leading-[0.94] tracking-[-0.03em] text-white">
                AYUSH
                <span className="block bg-[linear-gradient(102deg,#d7deff_0%,#98f2e4_42%,#f7a6d2_100%)] bg-clip-text text-transparent">
                  BUNKAR
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-200/88 sm:text-lg lg:mx-0">
                I build digital products that feel expensive from the first second. Clean systems, cinematic motion,
                and high-performance engineering come together into one premium experience.
              </p>
            </div>

            <div className="hero-reveal text-base text-slate-200/80 sm:text-lg">
              <span className="mr-2 text-white/65">I craft as a</span>
              <span className="font-semibold text-cyan-200">
                <TypewriterText texts={ROLES} />
              </span>
            </div>

            <div className="hero-reveal flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <MagneticButton href="#projects" variant="filled">
                Explore Projects
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7" />
                  <path d="M17 7H8" />
                  <path d="M17 7V16" />
                </svg>
              </MagneticButton>
              <MagneticButton href="#contact" variant="outline">
                Book a Discovery Call
              </MagneticButton>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {HERO_STATS.map((item) => (
                <div key={item.label} className="hero-stat-card soft-panel px-4 py-3 text-center sm:text-left">
                  <p className="font-display text-2xl font-bold text-white">{item.value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="hero-reveal flex flex-wrap items-center justify-center gap-2 pt-1 lg:justify-start">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/16 bg-white/[0.04] px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-white/85 transition-colors duration-300 hover:border-cyan-200/55 hover:text-cyan-100"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <motion.aside
            className="hero-reveal relative mx-auto w-full max-w-[520px] lg:max-w-none"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="glass-panel relative overflow-hidden p-5 sm:p-6">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.42)_45%,transparent_85%)] opacity-55"
                style={{ animation: 'heroScan 3.8s linear infinite' }}
              />

              <div className="relative z-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-indigo-200">Realtime 3D Identity Layer</p>
                <h3 className="mt-3 font-display text-2xl font-black leading-tight text-white sm:text-3xl">
                  A Hero Built Like a Product Launch
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-200/90 sm:text-[15px]">
                  The scene is rendered with Three.js: a physical-material core, orbiting rings, volumetric color fields,
                  and additive star particles tuned for smooth motion.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-xl border border-white/12 bg-white/[0.04] p-3 text-slate-100">
                    <p className="font-mono uppercase tracking-[0.14em] text-indigo-200">Render</p>
                    <p className="mt-1 text-sm font-semibold">Adaptive Pixel Ratio</p>
                  </div>
                  <div className="rounded-xl border border-white/12 bg-white/[0.04] p-3 text-slate-100">
                    <p className="font-mono uppercase tracking-[0.14em] text-cyan-200">Motion</p>
                    <p className="mt-1 text-sm font-semibold">Pointer Reactive</p>
                  </div>
                  <div className="rounded-xl border border-white/12 bg-white/[0.04] p-3 text-slate-100">
                    <p className="font-mono uppercase tracking-[0.14em] text-pink-200">Depth</p>
                    <p className="mt-1 text-sm font-semibold">Physical Materials</p>
                  </div>
                  <div className="rounded-xl border border-white/12 bg-white/[0.04] p-3 text-slate-100">
                    <p className="font-mono uppercase tracking-[0.14em] text-violet-200">Speed</p>
                    <p className="mt-1 text-sm font-semibold">Lightweight Scene Graph</p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/15 bg-black/28 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-cyan-200">Premium Direction</p>
                  <p className="mt-1 text-sm text-slate-200/95">
                    Identity is now unmistakable: bold, technical, and premium before the user scrolls.
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>

        <div className="hero-scroll absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">Scroll to continue</span>
          <div className="h-11 w-px bg-gradient-to-b from-cyan-200/70 via-indigo-300/55 to-transparent" />
          <span
            className="h-1.5 w-1.5 rounded-full bg-cyan-200/90"
            style={{ animation: 'heroScrollDot 1.9s ease-in-out infinite' }}
          />
        </div>
      </section>
    </>
  )
}