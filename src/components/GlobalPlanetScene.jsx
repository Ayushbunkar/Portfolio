import { useEffect, useRef } from 'react'
import { gsap, ensureScrollTrigger } from '../utils/scrollAnimations'

const SECTION_STORY = [
  { id: 'home', mode: 'cinematic', placement: { x: 0.72, y: 0.42 }, scale: 1.16 },
  { id: 'about', mode: 'minimal', placement: { x: 0.34, y: 0.49 }, scale: 0.98 },
  { id: 'skills', mode: 'futuristic', placement: { x: 0.66, y: 0.5 }, scale: 1.08 },
  { id: 'projects', mode: 'futuristic', placement: { x: 0.38, y: 0.5 }, scale: 1.12 },
  { id: 'journey', mode: 'cinematic', placement: { x: 0.5, y: 0.5 }, scale: 1.04, centerLock: true },
  { id: 'contact', mode: 'minimal', placement: { x: 0.5, y: 0.5 }, scale: 0.96, centerLock: true },
]

const MODE_PROFILES = {
  cinematic: {
    glow: 1.55,
    atmosphereOpacity: 0.33,
    haloOpacity: 0.24,
    speed: 0.56,
    ringSpeed: 0.0036,
    pulseSpeed: 0.12,
    linkOpacity: 0.34,
    nodeOpacity: 0.94,
    starOpacity: 0.56,
  },
  minimal: {
    glow: 1.12,
    atmosphereOpacity: 0.2,
    haloOpacity: 0.12,
    speed: 0.32,
    ringSpeed: 0.0021,
    pulseSpeed: 0.085,
    linkOpacity: 0.16,
    nodeOpacity: 0.62,
    starOpacity: 0.34,
  },
  futuristic: {
    glow: 1.9,
    atmosphereOpacity: 0.4,
    haloOpacity: 0.3,
    speed: 0.92,
    ringSpeed: 0.0058,
    pulseSpeed: 0.19,
    linkOpacity: 0.52,
    nodeOpacity: 1,
    starOpacity: 0.78,
  },
}

const toWorldTarget = (placement) => ({
  x: (placement.x - 0.5) * 7.4,
  y: (0.5 - placement.y) * 4.8,
})

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

const GlobalPlanetScene = () => {
  const wrapperRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    let mounted = true
    let animationFrameId = 0
    let renderer
    let scene
    let camera
    const cleanupFns = []

    const setupScene = async () => {
      if (!wrapperRef.current || !canvasRef.current || typeof window === 'undefined') return

      const THREE = await import('three')
      if (!mounted || !wrapperRef.current || !canvasRef.current) return

      const ScrollTrigger = ensureScrollTrigger()
      const wrapper = wrapperRef.current
      const canvas = canvasRef.current
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      let globalProgress = 0
      let activeSectionId = SECTION_STORY[0].id
      let activeSectionProgress = 0
      let activeSectionCenterLock = Boolean(SECTION_STORY[0].centerLock)

      const profileState = { ...MODE_PROFILES.cinematic }
      const initialTarget = toWorldTarget(SECTION_STORY[0].placement)
      const worldTarget = {
        x: initialTarget.x,
        y: initialTarget.y,
        scale: SECTION_STORY[0].scale,
      }

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
      renderer.setClearColor(0x000000, 0)

      scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x060d20, 0.026)

      camera = new THREE.PerspectiveCamera(45, 1, 0.1, 120)
      camera.position.set(0, 0.06, 10.8)

      const ambient = new THREE.AmbientLight(0x7ba9ff, 0.44)
      const key = new THREE.DirectionalLight(0x9ffff0, 1.2)
      key.position.set(5, 2.2, 6)
      const rim = new THREE.PointLight(0xff9478, 1.05, 22)
      rim.position.set(-3.2, -2.8, 5)
      const glow = new THREE.PointLight(0x5da8ff, 0.9, 18)
      glow.position.set(3.6, 1.8, 3.4)
      scene.add(ambient, key, rim, glow)

      const world = new THREE.Group()
      world.position.set(worldTarget.x, worldTarget.y, 0)
      scene.add(world)

      const planetGroup = new THREE.Group()
      world.add(planetGroup)

      const planetMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x4a77de,
        emissive: 0x1f4f95,
        emissiveIntensity: 1.42,
        roughness: 0.16,
        metalness: 0.22,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
        transmission: 0.2,
        transparent: true,
        opacity: 0.97,
      })

      const core = new THREE.Mesh(new THREE.SphereGeometry(1.74, 64, 64), planetMaterial)
      planetGroup.add(core)

      const crust = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.86, 2),
        new THREE.MeshBasicMaterial({
          color: 0x8ab9ff,
          wireframe: true,
          transparent: true,
          opacity: 0.12,
        })
      )
      planetGroup.add(crust)

      const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x72cbff,
        transparent: true,
        opacity: 0.32,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      })
      const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(2.06, 56, 56), atmosphereMaterial)
      planetGroup.add(atmosphere)

      const bloomShell = new THREE.Mesh(
        new THREE.SphereGeometry(2.42, 40, 40),
        new THREE.MeshBasicMaterial({
          color: 0x7fb6ff,
          transparent: true,
          opacity: 0.08,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      )
      planetGroup.add(bloomShell)

      const haloMaterial = new THREE.MeshBasicMaterial({
        color: 0x8fc4ff,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const halo = new THREE.Mesh(new THREE.RingGeometry(2.45, 3.24, 84), haloMaterial)
      halo.rotation.x = Math.PI * 0.15
      planetGroup.add(halo)

      const ringA = new THREE.Mesh(
        new THREE.TorusGeometry(2.9, 0.054, 16, 230),
        new THREE.MeshStandardMaterial({
          color: 0x79a5ff,
          emissive: 0x2b56a9,
          emissiveIntensity: 0.88,
          roughness: 0.22,
          metalness: 0.72,
          transparent: true,
          opacity: 0.76,
        })
      )
      ringA.rotation.set(Math.PI * 0.26, Math.PI * 0.04, Math.PI * 0.12)
      planetGroup.add(ringA)

      const ringB = new THREE.Mesh(
        new THREE.TorusGeometry(2.32, 0.046, 14, 200),
        new THREE.MeshStandardMaterial({
          color: 0x41dec9,
          emissive: 0x1e7f72,
          emissiveIntensity: 0.82,
          roughness: 0.2,
          metalness: 0.66,
          transparent: true,
          opacity: 0.64,
        })
      )
      ringB.rotation.set(Math.PI * 0.62, Math.PI * 0.15, Math.PI * 0.2)
      planetGroup.add(ringB)

      const ringC = new THREE.Mesh(
        new THREE.TorusGeometry(1.98, 0.038, 12, 190),
        new THREE.MeshStandardMaterial({
          color: 0xff9f7e,
          emissive: 0x7a3d2d,
          emissiveIntensity: 0.68,
          roughness: 0.2,
          metalness: 0.62,
          transparent: true,
          opacity: 0.54,
        })
      )
      ringC.rotation.set(Math.PI * 0.38, Math.PI * 0.3, Math.PI * 0.06)
      planetGroup.add(ringC)

      const moonPivot = new THREE.Group()
      moonPivot.rotation.set(Math.PI * 0.24, Math.PI * 0.08, 0)
      planetGroup.add(moonPivot)

      const moon = new THREE.Mesh(
        new THREE.SphereGeometry(0.21, 24, 24),
        new THREE.MeshStandardMaterial({
          color: 0xd7e7ff,
          emissive: 0x5f7ea8,
          emissiveIntensity: 0.45,
          roughness: 0.46,
          metalness: 0.2,
          transparent: true,
          opacity: 0.95,
        })
      )
      moon.position.set(3.02, 0.22, 0.12)
      moonPivot.add(moon)

      const connectionGroup = new THREE.Group()
      connectionGroup.position.set(0.14, 0.02, 0.2)
      world.add(connectionGroup)

      const nodeCount = SECTION_STORY.length
      const routeNodes = []
      for (let index = 0; index < nodeCount; index += 1) {
        const theta = (Math.PI * 2 * index) / nodeCount - Math.PI / 2
        const radius = 2.65 + (index % 2 === 0 ? 0.2 : 0.45)
        routeNodes.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius * 0.72, 0.74 + Math.sin(theta) * 0.16))
      }

      const linkPalette = [0x83b7ff, 0x6af7e4, 0xffb08e, 0xa4c5ff, 0x9afbe9, 0xffd2ad]
      const lineMaterials = []
      const nodeMaterials = []
      const routeSignals = []

      routeNodes.forEach((position, index) => {
        const nodeMaterial = new THREE.MeshBasicMaterial({
          color: linkPalette[index % linkPalette.length],
          transparent: true,
          opacity: 0.9,
        })
        const node = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 12), nodeMaterial)
        node.position.copy(position)
        nodeMaterials.push(nodeMaterial)
        connectionGroup.add(node)
      })

      for (let index = 0; index < routeNodes.length; index += 1) {
        const start = routeNodes[index]
        const end = routeNodes[(index + 1) % routeNodes.length]
        const control = start.clone().add(end).multiplyScalar(0.5)
        control.z += 1 + (index % 2 === 0 ? 0.35 : 0.2)

        const curve = new THREE.QuadraticBezierCurve3(start, control, end)
        const points = curve.getPoints(52)

        const lineMaterial = new THREE.LineBasicMaterial({
          color: linkPalette[index % linkPalette.length],
          transparent: true,
          opacity: 0.3,
        })
        const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), lineMaterial)
        lineMaterials.push(lineMaterial)
        connectionGroup.add(line)

        const pulse = new THREE.Mesh(
          new THREE.SphereGeometry(0.052, 12, 12),
          new THREE.MeshBasicMaterial({
            color: 0xb8fbff,
            transparent: true,
            opacity: 0.94,
          })
        )
        routeSignals.push({ curve, pulse, offset: index / routeNodes.length })
        connectionGroup.add(pulse)
      }

      const starsGeometry = new THREE.BufferGeometry()
      const starsCount = 1600
      const starsPositions = new Float32Array(starsCount * 3)
      const starsColors = new Float32Array(starsCount * 3)
      const starPalette = [new THREE.Color(0x8ea8ff), new THREE.Color(0x9cf8ea), new THREE.Color(0xffba9e)]

      for (let index = 0; index < starsCount; index += 1) {
        const radius = 6.3 + Math.random() * 5.2
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)

        starsPositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
        starsPositions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        starsPositions[index * 3 + 2] = radius * Math.cos(phi) - 1.4

        const picked = starPalette[index % starPalette.length]
        starsColors[index * 3] = picked.r
        starsColors[index * 3 + 1] = picked.g
        starsColors[index * 3 + 2] = picked.b
      }

      starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3))
      starsGeometry.setAttribute('color', new THREE.BufferAttribute(starsColors, 3))

      const starsMaterial = new THREE.PointsMaterial({
        size: 0.027,
        vertexColors: true,
        transparent: true,
        opacity: profileState.starOpacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const stars = new THREE.Points(starsGeometry, starsMaterial)
      scene.add(stars)

      const pointer = { x: 0, y: 0 }
      const smoothPointer = { x: 0, y: 0 }

      const transitionMode = (mode) => {
        gsap.to(profileState, {
          ...MODE_PROFILES[mode],
          duration: 1.05,
          ease: 'power2.out',
          overwrite: true,
        })
      }

      const setSectionFocus = (section) => {
        const target = toWorldTarget(section.placement)
        activeSectionId = section.id
        activeSectionProgress = 0
        activeSectionCenterLock = Boolean(section.centerLock)
        worldTarget.x = target.x
        worldTarget.y = target.y
        worldTarget.scale = section.scale
        transitionMode(section.mode)
      }

      setSectionFocus(SECTION_STORY[0])

      const globalScrollTrigger = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          globalProgress = self.progress
        },
      })
      cleanupFns.push(() => globalScrollTrigger.kill())

      let sectionSyncTimer = 0
      const sectionTriggerCleanups = []

      const bindSectionTriggers = () => {
        sectionTriggerCleanups.forEach((kill) => kill())
        sectionTriggerCleanups.length = 0

        let foundCount = 0

        SECTION_STORY.forEach((section) => {
          const el = document.getElementById(section.id)
          if (!el) return

          foundCount += 1

          const trigger = ScrollTrigger.create({
            trigger: el,
            start: 'top 66%',
            end: 'bottom 34%',
            onEnter: () => setSectionFocus(section),
            onEnterBack: () => setSectionFocus(section),
            onUpdate: (self) => {
              if (activeSectionId === section.id) {
                activeSectionProgress = self.progress
              }
            },
          })

          sectionTriggerCleanups.push(() => trigger.kill())
        })

        return foundCount
      }

      const syncSectionTriggers = () => {
        if (!mounted) return

        const found = bindSectionTriggers()
        ScrollTrigger.refresh()

        if (found < SECTION_STORY.length) {
          sectionSyncTimer = window.setTimeout(syncSectionTriggers, 550)
        }
      }

      syncSectionTriggers()

      cleanupFns.push(() => {
        if (sectionSyncTimer) window.clearTimeout(sectionSyncTimer)
      })
      cleanupFns.push(() => {
        sectionTriggerCleanups.forEach((kill) => kill())
      })

      const onPointerMove = (event) => {
        if (prefersReducedMotion) return
        pointer.x = (event.clientX / window.innerWidth - 0.5) * 2
        pointer.y = (event.clientY / window.innerHeight - 0.5) * 2
      }

      const onPointerLeave = () => {
        pointer.x = 0
        pointer.y = 0
      }

      const onResize = () => {
        if (!renderer || !camera || !wrapper) return
        const width = wrapper.clientWidth
        const height = wrapper.clientHeight
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }

      wrapper.addEventListener('pointermove', onPointerMove)
      wrapper.addEventListener('pointerleave', onPointerLeave)
      window.addEventListener('resize', onResize)
      cleanupFns.push(() => wrapper.removeEventListener('pointermove', onPointerMove))
      cleanupFns.push(() => wrapper.removeEventListener('pointerleave', onPointerLeave))
      cleanupFns.push(() => window.removeEventListener('resize', onResize))
      cleanupFns.push(() => gsap.killTweensOf(profileState))

      onResize()

      const animate = () => {
        if (!mounted || !renderer || !scene || !camera) return

        animationFrameId = requestAnimationFrame(animate)
        const elapsed = performance.now() * 0.001

        smoothPointer.x += (pointer.x - smoothPointer.x) * 0.045
        smoothPointer.y += (pointer.y - smoothPointer.y) * 0.045

        const pointerX = prefersReducedMotion ? 0 : smoothPointer.x
        const pointerY = prefersReducedMotion ? 0 : smoothPointer.y

        const travelY = activeSectionCenterLock
          ? 0
          : (0.5 - globalProgress) * 0.9 + (activeSectionProgress - 0.5) * 0.34
        const targetX = (activeSectionCenterLock ? 0 : worldTarget.x) + pointerX * (activeSectionCenterLock ? 0.56 : 0.9)
        const targetY = (activeSectionCenterLock ? 0 : worldTarget.y + travelY) + pointerY * (activeSectionCenterLock ? 0 : 0.54)

        world.position.x = THREE.MathUtils.lerp(world.position.x, targetX, 0.05)
        world.position.y = THREE.MathUtils.lerp(world.position.y, targetY, 0.05)

        const nextScale = THREE.MathUtils.lerp(world.scale.x, worldTarget.scale, 0.04)
        world.scale.set(nextScale, nextScale, nextScale)

        planetMaterial.emissiveIntensity = THREE.MathUtils.lerp(planetMaterial.emissiveIntensity, profileState.glow, 0.08)
        atmosphereMaterial.opacity = THREE.MathUtils.lerp(atmosphereMaterial.opacity, profileState.atmosphereOpacity, 0.08)
        haloMaterial.opacity = THREE.MathUtils.lerp(haloMaterial.opacity, profileState.haloOpacity, 0.08)
        starsMaterial.opacity = THREE.MathUtils.lerp(starsMaterial.opacity, profileState.starOpacity, 0.06)

        lineMaterials.forEach((material) => {
          material.opacity = THREE.MathUtils.lerp(material.opacity, profileState.linkOpacity, 0.08)
        })

        nodeMaterials.forEach((material) => {
          material.opacity = THREE.MathUtils.lerp(material.opacity, profileState.nodeOpacity, 0.08)
        })

        const baseSpeed = profileState.speed
        planetGroup.rotation.y += 0.0008 + baseSpeed * 0.0024 + pointerX * 0.0014
        planetGroup.rotation.x = Math.sin(elapsed * 0.28) * (0.04 + baseSpeed * 0.06) + pointerY * 0.22

        core.rotation.y += 0.0014 + baseSpeed * 0.0012
        crust.rotation.y = -elapsed * (0.08 + baseSpeed * 0.06)
        crust.rotation.x = elapsed * (0.05 + baseSpeed * 0.03)
        atmosphere.rotation.y = -elapsed * 0.06
        bloomShell.rotation.y = elapsed * 0.04
        halo.rotation.z += 0.0009 + baseSpeed * 0.0011

        ringA.rotation.z += profileState.ringSpeed * 0.9
        ringA.rotation.x = Math.PI * 0.26 + Math.sin(elapsed * 0.38) * 0.05
        ringB.rotation.x -= profileState.ringSpeed * 1.1
        ringB.rotation.y = Math.cos(elapsed * 0.36) * 0.24
        ringC.rotation.z += profileState.ringSpeed * 1.35
        moonPivot.rotation.y += 0.0024 + baseSpeed * 0.0012
        moon.rotation.y += 0.0032

        routeSignals.forEach((signal, index) => {
          const t = (elapsed * profileState.pulseSpeed + signal.offset) % 1
          const point = signal.curve.getPointAt(t)
          signal.pulse.position.copy(point)
          const pulseScale = 0.78 + Math.sin((elapsed + index) * 4.2) * 0.2
          signal.pulse.scale.setScalar(pulseScale)
        })

        connectionGroup.rotation.y = -elapsed * (0.035 + baseSpeed * 0.07) + pointerX * 0.09
        connectionGroup.rotation.x = pointerY * 0.08

        stars.rotation.y -= 0.0003 + baseSpeed * 0.0014
        stars.rotation.x = Math.sin(elapsed * 0.17) * 0.06

        camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointerX * 0.74, 0.05)
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.06 + pointerY * 0.46 + (globalProgress - 0.5) * 0.08, 0.05)
        camera.lookAt(world.position.x * 0.18, world.position.y * 0.14, 0)

        renderer.render(scene, camera)
      }

      animate()

      cleanupFns.push(() => {
        disposeSceneObject(world)
        disposeSceneObject(stars)
      })
    }

    setupScene()

    return () => {
      mounted = false
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      cleanupFns.forEach((fn) => fn())
      if (renderer) renderer.dispose()
    }
  }, [])

  return (
    <div ref={wrapperRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full opacity-[0.98]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_56%_38%_at_70%_46%,rgba(111,168,255,0.2),transparent_70%),radial-gradient(ellipse_42%_32%_at_30%_56%,rgba(47,215,195,0.14),transparent_72%),radial-gradient(ellipse_34%_24%_at_52%_78%,rgba(255,158,128,0.1),transparent_76%)]" />
    </div>
  )
}

export default GlobalPlanetScene
