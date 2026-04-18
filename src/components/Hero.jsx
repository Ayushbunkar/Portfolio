import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ensureScrollTrigger } from '../utils/scrollAnimations'

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
    'relative inline-flex shrink-0 min-h-[52px] items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300'

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
      <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">{children}</span>
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
      const ScrollTrigger = ensureScrollTrigger()
      let scrollProgress = 0

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.9))
      renderer.setClearColor(0x000000, 0)

      scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x050b1c, 0.038)

      camera = new THREE.PerspectiveCamera(52, 1, 0.1, 80)
      camera.position.set(0, 0.12, 8.8)

      const ambient = new THREE.AmbientLight(0x6f9bff, 0.5)
      const key = new THREE.DirectionalLight(0x9ffff0, 1.25)
      key.position.set(5, 2.5, 6)
      const rim = new THREE.PointLight(0xff947f, 1.12, 20)
      rim.position.set(-3.2, -2.4, 5.2)
      const glow = new THREE.PointLight(0x5aa5ff, 0.92, 16)
      glow.position.set(2.8, 1.4, 3.2)

      scene.add(ambient, key, rim, glow)

      const world = new THREE.Group()
      world.position.set(1.2, -0.06, 0)
      scene.add(world)

      const planetGroup = new THREE.Group()
      world.add(planetGroup)

      const planetMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x3f68c9,
        emissive: 0x1a3677,
        emissiveIntensity: 1.28,
        roughness: 0.2,
        metalness: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.16,
        transmission: 0.18,
        transparent: true,
        opacity: 0.96,
      })

      const core = new THREE.Mesh(new THREE.SphereGeometry(1.86, 64, 64), planetMaterial)
      planetGroup.add(core)

      const crust = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.98, 2),
        new THREE.MeshBasicMaterial({
          color: 0x8ab8ff,
          wireframe: true,
          transparent: true,
          opacity: 0.14,
        })
      )
      planetGroup.add(crust)

      const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x74c9ff,
        transparent: true,
        opacity: 0.28,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      })
      const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(2.2, 48, 48), atmosphereMaterial)
      planetGroup.add(atmosphere)

      const ringA = new THREE.Mesh(
        new THREE.TorusGeometry(3.16, 0.062, 16, 240),
        new THREE.MeshStandardMaterial({
          color: 0x7da3ff,
          emissive: 0x274f9f,
          emissiveIntensity: 1,
          roughness: 0.2,
          metalness: 0.72,
          transparent: true,
          opacity: 0.82,
        })
      )
      ringA.rotation.set(Math.PI * 0.26, Math.PI * 0.06, Math.PI * 0.14)
      planetGroup.add(ringA)

      const ringB = new THREE.Mesh(
        new THREE.TorusGeometry(2.48, 0.052, 16, 220),
        new THREE.MeshStandardMaterial({
          color: 0x4ce3c8,
          emissive: 0x1e7f71,
          emissiveIntensity: 0.9,
          roughness: 0.22,
          metalness: 0.64,
          transparent: true,
          opacity: 0.68,
        })
      )
      ringB.rotation.set(Math.PI * 0.62, Math.PI * 0.12, Math.PI * 0.2)
      planetGroup.add(ringB)

      const ringC = new THREE.Mesh(
        new THREE.TorusGeometry(2.06, 0.04, 12, 200),
        new THREE.MeshStandardMaterial({
          color: 0xff9b78,
          emissive: 0x7b3f2e,
          emissiveIntensity: 0.72,
          roughness: 0.2,
          metalness: 0.62,
          transparent: true,
          opacity: 0.5,
        })
      )
      ringC.rotation.set(Math.PI * 0.38, Math.PI * 0.3, Math.PI * 0.04)
      planetGroup.add(ringC)

      // Connection routes: identity -> origin -> power -> impact -> connection
      const connectionGroup = new THREE.Group()
      connectionGroup.position.set(0.12, 0.08, 0.16)
      world.add(connectionGroup)

      const nodeBlueprint = [
        new THREE.Vector3(-2.5, 1.25, 0.72),
        new THREE.Vector3(-0.92, 2.1, 1.04),
        new THREE.Vector3(1.56, 1.54, 0.82),
        new THREE.Vector3(2.22, -0.24, 0.92),
        new THREE.Vector3(0.42, -1.92, 0.7),
      ]
      const linkPalette = [0x6fa8ff, 0x2fd7c3, 0xff8f73, 0x8fb8ff, 0x7cf2dd]
      const pulseSignals = []

      nodeBlueprint.forEach((position, index) => {
        const node = new THREE.Mesh(
          new THREE.SphereGeometry(0.07, 16, 16),
          new THREE.MeshBasicMaterial({
            color: linkPalette[index % linkPalette.length],
            transparent: true,
            opacity: 0.95,
          })
        )
        node.position.copy(position)
        connectionGroup.add(node)
      })

      for (let index = 0; index < nodeBlueprint.length; index += 1) {
        const start = nodeBlueprint[index]
        const end = nodeBlueprint[(index + 1) % nodeBlueprint.length]
        const control = start.clone().add(end).multiplyScalar(0.5)
        control.z += 1 + (index % 2 === 0 ? 0.45 : 0.28)

        const curve = new THREE.QuadraticBezierCurve3(start, control, end)
        const points = curve.getPoints(48)

        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(points),
          new THREE.LineBasicMaterial({
            color: linkPalette[index % linkPalette.length],
            transparent: true,
            opacity: 0.26,
          })
        )
        connectionGroup.add(line)

        const pulse = new THREE.Mesh(
          new THREE.SphereGeometry(0.055, 12, 12),
          new THREE.MeshBasicMaterial({
            color: 0xb7f7ff,
            transparent: true,
            opacity: 0.95,
          })
        )
        connectionGroup.add(pulse)
        pulseSignals.push({ curve, pulse, offset: index / nodeBlueprint.length })
      }

      const starCount = 2000
      const starGeometry = new THREE.BufferGeometry()
      const starPositions = new Float32Array(starCount * 3)
      const starColors = new Float32Array(starCount * 3)
      const palette = [new THREE.Color(0x8ea2ff), new THREE.Color(0x9cf7e5), new THREE.Color(0xffb49b)]

      for (let index = 0; index < starCount; index += 1) {
        const radius = 5.8 + Math.random() * 4.6
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)

        starPositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
        starPositions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        starPositions[index * 3 + 2] = radius * Math.cos(phi) - 1.4

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
          size: 0.031,
          vertexColors: true,
          transparent: true,
          opacity: 0.76,
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

      const materialPulse = gsap.to(planetMaterial, {
        emissiveIntensity: 1.52,
        duration: 2.8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })

      const atmospherePulse = gsap.to(atmosphereMaterial, {
        opacity: 0.36,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })

      const ringPulse = gsap.to(ringB.material, {
        emissiveIntensity: 1.22,
        duration: 2.3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })

      const heroScroll = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          scrollProgress = self.progress
        },
      })

      section.addEventListener('pointermove', onPointerMove)
      window.addEventListener('resize', onResize)
      onResize()

      cleanupFns = [
        () => section.removeEventListener('pointermove', onPointerMove),
        () => window.removeEventListener('resize', onResize),
        () => materialPulse.kill(),
        () => atmospherePulse.kill(),
        () => ringPulse.kill(),
        () => heroScroll.kill(),
      ]

      const animate = () => {
        if (!mounted || !renderer || !scene || !camera) return
        animationFrameId = requestAnimationFrame(animate)

        const elapsed = clock.getElapsedTime()
        smoothPointer.x += (pointer.x - smoothPointer.x) * 0.045
        smoothPointer.y += (pointer.y - smoothPointer.y) * 0.045

        const pointerInfluenceX = prefersReducedMotion ? 0 : smoothPointer.x
        const pointerInfluenceY = prefersReducedMotion ? 0 : smoothPointer.y

        const targetX = 1.2 + pointerInfluenceX * 0.48
        const targetY = -0.06 - scrollProgress * 1.6 + pointerInfluenceY * 0.36
        world.position.x += (targetX - world.position.x) * 0.06
        world.position.y += (targetY - world.position.y) * 0.06

        world.rotation.z = Math.sin(elapsed * 0.2) * 0.03 + pointerInfluenceX * 0.04

        planetGroup.rotation.y = elapsed * 0.17 + pointerInfluenceX * 0.46
        planetGroup.rotation.x = Math.sin(elapsed * 0.32) * 0.11 + pointerInfluenceY * 0.24

        core.rotation.y += 0.0018
        crust.rotation.y = -elapsed * 0.12
        crust.rotation.x = elapsed * 0.06
        atmosphere.rotation.y = -elapsed * 0.07

        ringA.rotation.z += 0.0044
        ringA.rotation.x = Math.PI * 0.26 + Math.sin(elapsed * 0.45) * 0.055
        ringB.rotation.x -= 0.0036
        ringB.rotation.y = Math.cos(elapsed * 0.38) * 0.25
        ringC.rotation.z += 0.005

        pulseSignals.forEach((signal, index) => {
          const t = (elapsed * 0.1 + signal.offset) % 1
          const position = signal.curve.getPointAt(t)
          signal.pulse.position.copy(position)
          const pulseScale = 0.82 + Math.sin((elapsed + index) * 3.4) * 0.22
          signal.pulse.scale.setScalar(pulseScale)
        })

        connectionGroup.rotation.y = -elapsed * 0.04 + pointerInfluenceX * 0.1
        connectionGroup.rotation.x = pointerInfluenceY * 0.06

        stars.rotation.y = -elapsed * 0.055
        stars.rotation.x = elapsed * 0.024

        camera.position.x = pointerInfluenceX * 0.45
        camera.position.y = 0.12 + pointerInfluenceY * 0.29 + scrollProgress * 0.16
        camera.lookAt(world.position.x * 0.14, world.position.y * 0.12, 0)

        renderer.render(scene, camera)
      }

      animate()
      setThreeReady(true)

      cleanupFns.push(() => {
        disposeSceneObject(world)
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
        className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-[#050812]/38 pb-14 pt-16 sm:min-h-[calc(100svh-4.5rem)] sm:pb-16 sm:pt-20"
      >
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_66%_at_26%_28%,rgba(111,168,255,0.26),transparent_60%),radial-gradient(ellipse_64%_58%_at_74%_42%,rgba(47,215,195,0.2),transparent_58%),radial-gradient(ellipse_62%_54%_at_72%_78%,rgba(255,143,115,0.18),transparent_66%)]" />
          <div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:68px_68px]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,18,0.44)_0%,rgba(5,8,18,0.56)_44%,rgba(5,8,18,0.74)_100%)]" />
        </div>

        <div className="section-container relative z-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:gap-7">
          <div className="space-y-6 text-center lg:text-left">
            <div className="hero-reveal space-y-4">
              <h1 className="max-w-[13ch] pr-2 font-display text-[clamp(2.5rem,6.8vw,5.4rem)] font-black leading-[0.95] tracking-[-0.025em] text-white lg:pr-4">
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
            className="hero-reveal relative mx-auto mt-1 w-full max-w-[520px] lg:mt-2 lg:max-w-none lg:self-center"
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