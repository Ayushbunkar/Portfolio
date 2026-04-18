import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ensureScrollTrigger, gsap } from '../utils/scrollAnimations'

const COLLAB_STEPS = [
  {
    phase: 'Step 01',
    title: 'Context Sync',
    detail: 'We align on product goals, audience, timeline, and what premium success should look like.',
  },
  {
    phase: 'Step 02',
    title: 'Design + Build Route',
    detail: 'You receive a practical execution roadmap with visual direction, feature priorities, and delivery plan.',
  },
  {
    phase: 'Step 03',
    title: 'Launch Continuum',
    detail: 'The final output is refined, performant, and ready for real users with ongoing optimization support.',
  },
]

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    ensureScrollTrigger()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-intro',
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 78%',
          },
        }
      )

      gsap.fromTo(
        '.contact-card',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#contact .contact-grid',
            start: 'top 82%',
          },
        }
      )

      gsap.fromTo(
        '.contact-process-card',
        { opacity: 0, y: 16, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.55,
          stagger: 0.09,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#contact .contact-process-grid',
            start: 'top 86%',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (submitted) setSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="section-shell bg-[#050913]/66 pb-24">
      <div className="section-container">
        <div className="contact-intro text-center">
          <span className="section-kicker">
            <span className="section-kicker-dot" />
            Connection Layer
          </span>
          <h2 className="section-title">
            Let&apos;s Design Something
            <span className="section-title-gradient">That Feels Premium & Alive</span>
          </h2>
          <p className="section-copy mx-auto">
            Share your vision and goals. I&apos;ll respond with a sharp project direction, delivery path, and a practical build plan.
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-300/95 sm:text-base">
            This final section keeps the same space-mission continuity as the rest of the page and converts it into a
            clear collaboration protocol, so nothing feels disconnected.
          </p>
        </div>

        <div className="contact-grid mt-12 grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <aside className="contact-card glass-panel p-6 sm:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-indigo-200">Direct Channels</p>

            <div className="mt-4 space-y-3">
              {[
                ['Email', 'hello@ayushbunkar.com'],
                ['Location', 'India'],
                ['Timezone', 'IST (UTC +05:30)'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/12 bg-black/25 p-4">
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="mt-1 text-sm font-medium text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-cyan-300/30 bg-cyan-500/10 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-100">Availability</p>
              <p className="mt-2 text-sm text-cyan-50">Open for selected freelance and product collaborations.</p>
            </div>

            <div className="mt-5 rounded-2xl border border-white/12 bg-black/25 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-300">Meaning Layer</p>
              <p className="mt-2 text-sm text-slate-200">
                Contact is connection: this is where identity, origin, power, and impact turn into real collaboration.
              </p>
            </div>
          </aside>

          <form onSubmit={handleSubmit} className="contact-card glass-panel space-y-4 p-6 sm:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-indigo-200">Project Brief</p>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="focus-ring-shell block">
                <span className="mb-1.5 block text-xs text-slate-300">Name</span>
                <input
                  className="focus-input"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </label>

              <label className="focus-ring-shell block">
                <span className="mb-1.5 block text-xs text-slate-300">Email</span>
                <input
                  className="focus-input"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="focus-ring-shell block">
                <span className="mb-1.5 block text-xs text-slate-300">Project Type</span>
                <select
                  className="focus-input"
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Portfolio">Portfolio Website</option>
                  <option value="SaaS">SaaS Landing Page</option>
                  <option value="Dashboard">Dashboard</option>
                  <option value="E-commerce">E-commerce</option>
                </select>
              </label>

              <label className="focus-ring-shell block">
                <span className="mb-1.5 block text-xs text-slate-300">Budget Range</span>
                <select
                  className="focus-input"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="2L-5L">₹2L - ₹5L</option>
                  <option value="5L-10L">₹5L - ₹10L</option>
                  <option value="10L+">₹10L+</option>
                </select>
              </label>
            </div>

            <label className="focus-ring-shell block">
              <span className="mb-1.5 block text-xs text-slate-300">What are you building?</span>
              <textarea
                className="focus-input min-h-[138px] resize-y"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me your goals, timeline, and what success should look like..."
                required
              />
            </label>

            <motion.button
              type="submit"
              className="beam-button relative w-full overflow-hidden rounded-2xl border border-indigo-300/40 bg-gradient-to-r from-indigo-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-[0_18px_44px_rgba(80,70,230,0.42)]"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Project Brief
            </motion.button>

            <motion.p
              initial={false}
              animate={{ opacity: submitted ? 1 : 0, y: submitted ? 0 : 6 }}
              className="text-sm text-cyan-200"
            >
              Thanks. Your brief is ready to send. Connect via email and I&apos;ll reply with a roadmap.
            </motion.p>
          </form>
        </div>

        <div className="contact-process-grid mt-8 grid gap-3 md:grid-cols-3">
          {COLLAB_STEPS.map((item) => (
            <motion.article
              key={item.phase}
              className="contact-process-card narrative-card flex h-full flex-col rounded-2xl p-4 sm:p-5"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-200">{item.phase}</p>
              <p className="mt-1 text-base font-semibold text-white">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-200">{item.detail}</p>
            </motion.article>
          ))}
        </div>

        <footer className="mt-14 border-t border-white/10 pt-8 text-center">
          <p className="font-display text-xl font-bold text-white">Ayush Bunkar</p>
          <p className="mt-1 text-sm text-slate-400">Creative Developer • Motion-Driven Frontend Engineer</p>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-slate-500">
            End of route: from launch signal to collaboration channel, every section above was designed to carry one
            consistent space-themed product story.
          </p>
        </footer>
      </div>
    </section>
  )
}

export default Contact
