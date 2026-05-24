import { memo } from 'react'

const Marquee = memo(({ items, direction = 'left', speed = 30 }) => {
  const duplicatedItems = [...items, ...items, ...items]
  const duration = `${speed}s`
  const animName = direction === 'left' ? 'marqueeLeft' : 'marqueeRight'

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-[#0d0d14]/68 py-5 md:py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0d0d14]/95 to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0d0d14]/95 to-transparent md:w-40" />
      <style>{`
        @keyframes marqueeLeft { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        @keyframes marqueeRight { from { transform: translateX(-33.333%); } to { transform: translateX(0); } }
      `}</style>
      <div
        className="flex items-center gap-10 md:gap-12 whitespace-nowrap"
        style={{
          animation: `${animName} ${duration} linear infinite`,
          willChange: 'transform',
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-10 md:gap-12">
            <span className="font-display text-3xl md:text-5xl font-bold text-white/10 uppercase tracking-tight hover:text-white/20 transition-colors duration-300">{item}</span>
            <span className="text-indigo-400 text-xl">✦</span>
          </div>
        ))}
      </div>
    </div>
  )
})

Marquee.displayName = 'Marquee'
export default Marquee
