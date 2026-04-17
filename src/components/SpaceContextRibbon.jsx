import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const SPACE_STORY = [
  {
    id: 'home',
    phase: 'Launch',
    title: 'Identity Transmission',
    detail: 'Mission starts with a premium first impression powered by realtime 3D visuals.',
    cue: 'Core Reactor Online',
  },
  {
    id: 'about',
    phase: 'Star Origin',
    title: 'Signal of Craft',
    detail: 'The origin chapter maps how design intent and engineering discipline formed the style system.',
    cue: 'Navigation Locked',
  },
  {
    id: 'skills',
    phase: 'Power Grid',
    title: 'Capabilities Orbit',
    detail: 'Tools, frameworks, and product systems rotate in sync to deliver high-quality outcomes.',
    cue: 'Energy Stable',
  },
  {
    id: 'projects',
    phase: 'Impact Field',
    title: 'Results Constellation',
    detail: 'Project panels reveal measurable outcomes through immersive storytelling and motion.',
    cue: 'Outcome Markers Visible',
  },
  {
    id: 'journey',
    phase: 'Deep Route',
    title: 'Timeline Continuum',
    detail: 'Every milestone adds momentum and explains how today’s craft was shaped over time.',
    cue: 'Route Synced',
  },
  {
    id: 'contact',
    phase: 'Docking',
    title: 'Connection Channel',
    detail: 'The final layer turns the story into collaboration with a structured project brief.',
    cue: 'Open Comms',
  },
]

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const SpaceContextRibbon = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    let frame = 0

    const update = () => {
      frame = 0

      const viewportHeight = window.innerHeight
      const scrollY = window.scrollY
      const probeY = scrollY + viewportHeight * 0.48

      const calibrated = SPACE_STORY.map((item) => {
        const section = document.getElementById(item.id)
        if (!section) return null

        const top = section.offsetTop
        const height = section.offsetHeight || viewportHeight

        return {
          ...item,
          start: top,
          mid: top + height * 0.5,
          end: top + height,
        }
      }).filter(Boolean)

      if (calibrated.length === 0) return

      let nextIndex = calibrated.length - 1
      for (let i = calibrated.length - 1; i >= 0; i -= 1) {
        if (probeY >= calibrated[i].start) {
          nextIndex = i
          break
        }
      }

      const first = calibrated[0].start
      const last = calibrated[calibrated.length - 1].end
      const nextProgress = clamp((probeY - first) / Math.max(last - first, 1), 0, 1)

      setActiveIndex(nextIndex)
      setProgress(nextProgress)
    }

    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  const active = SPACE_STORY[activeIndex]

  return (
    <>
      <aside
        aria-hidden="true"
        className="pointer-events-none fixed right-3 top-1/2 z-[42] hidden w-[260px] -translate-y-1/2 xl:block"
      >
        <div className="glass-panel relative overflow-hidden border-white/12 p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_14%,rgba(124,134,255,0.25),transparent_35%),radial-gradient(circle_at_18%_82%,rgba(45,212,191,0.22),transparent_34%)]" />

          <div className="relative z-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-indigo-200">Space Context</p>
            <p className="mt-1 font-display text-lg font-bold text-white">Mission Continuum</p>

            <div className="mt-3 flex gap-3">
              <div className="relative h-[132px] w-[6px] overflow-hidden rounded-full bg-white/15">
                <motion.div
                  className="absolute bottom-0 left-0 w-full rounded-full bg-gradient-to-t from-pink-400 via-indigo-300 to-cyan-300"
                  animate={{ height: `${Math.round(progress * 100)}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </div>

              <div className="min-w-0 flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 8, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -8, filter: 'blur(8px)' }}
                    transition={{ duration: 0.24 }}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-200">{active.phase}</p>
                    <p className="mt-1 font-display text-base font-bold leading-tight text-white">{active.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-200/90">{active.detail}</p>
                    <p className="mt-2 rounded-full border border-white/20 bg-white/[0.06] px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-100">
                      {active.cue}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div aria-hidden="true" className="pointer-events-none fixed inset-x-3 bottom-3 z-[42] xl:hidden">
        <div className="glass-panel border-white/12 px-3 py-2">
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-indigo-200">{active.phase}</p>
            <p className="text-[10px] uppercase tracking-[0.12em] text-slate-300">{Math.round(progress * 100)}% Route</p>
          </div>
          <p className="mt-1 text-xs text-slate-100">{active.title}</p>
        </div>
      </div>
    </>
  )
}

export default SpaceContextRibbon
