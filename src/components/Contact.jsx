import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ensureScrollTrigger, gsap } from '../utils/scrollAnimations'

const COLLAB_STEPS = [
  {
    phase: 'Step 01',
    title: 'Project Strategy',
    detail:
      'Your idea is shaped into a clear plan, covering AI integration, system architecture, and development approach to ensure a strong foundation.',
  },
  {
    phase: 'Step 02',
    title: 'Build & Execution',
    detail:
      'From concept to deployment, I build scalable, production-ready applications with clean architecture, reliable performance, and real-world usability.',
  },
  {
    phase: 'Step 03',
    title: 'Launch & Scale',
    detail:
      'After delivery, the focus is on testing, optimization, and scaling, so your product performs well with real users and growing demand.',
  },
]

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    budgetCustom: '',
    timeline: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitState, setSubmitState] = useState('idle')
  const [step, setStep] = useState(1)

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
    if (submitState !== 'idle') setSubmitState('idle')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (submitState === 'submitting') return

    setSubmitState('submitting')

    const budgetValue = form.budget === 'Custom' && form.budgetCustom.trim()
      ? form.budgetCustom.trim()
      : form.budget

    try {
      const apiBase = import.meta.env.VITE_API_BASE ?? ''
      const response = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          budget: budgetValue,
        }),
      })

      if (!response.ok) throw new Error('Request failed')

      setSubmitted(true)
      setSubmitState('success')
    } catch (error) {
      setSubmitState('error')
    }
  }

  const goNext = () => {
    if (!form.name.trim() || !form.email.trim() || !form.projectType) return
    setStep(2)
  }

  const goBack = () => setStep(1)

  return (
    <section id="contact" className="section-shell bg-[#050913]/66 pb-24">
      <div className="section-container">
        <div className="contact-intro text-center">
          <span className="section-kicker">
            <span className="section-kicker-dot" />
            Contact & Collaboration
          </span>
          <h2 className="section-title">
            Let&apos;s Build AI-Powered Products
            <span className="section-title-gradient">That Actually Deliver Results</span>
          </h2>
          <p className="section-copy mx-auto">
            Share your idea, product vision, or business goal. I&apos;ll respond with a clear project strategy, technical approach,
            and execution plan focused on building scalable and reliable solutions.
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-300/95 sm:text-base">
            Have an idea or need a developer for your next product? Let&apos;s build something fast, scalable, and production-ready.
          </p>
        </div>

        <div className="contact-grid mt-12 grid items-stretch gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <aside className="contact-card glass-panel h-full p-6 sm:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-indigo-200">Direct Channels</p>

            <div className="mt-4 space-y-3">
              {[
                ['Email', 'ayushbunkar100@gmail.com'],
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

          </aside>

          <form onSubmit={handleSubmit} className="contact-card glass-panel h-full space-y-4 p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-indigo-200">Start a Project</p>
              <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-200">
                Step {step} of 2
              </span>
            </div>
            <p className="text-sm text-slate-300">
              {step === 1
                ? 'Quick start: share basics so I can scope the right approach.'
                : 'Deeper context: your goals, timeline, and what success looks like.'}
            </p>

            {step === 1 && (
              <div className="space-y-4">
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

                <label className="focus-ring-shell block">
                  <span className="mb-1.5 block text-xs text-slate-300">What are you building?</span>
                  <select
                    className="focus-input"
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="AI Product">AI Product / LLM App</option>
                    <option value="SaaS">SaaS / Web Platform</option>
                    <option value="Automation">Automation System</option>
                    <option value="MVP">MVP / Prototype</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <motion.button
                  type="button"
                  onClick={goNext}
                  className="beam-button relative w-full overflow-hidden rounded-2xl border border-indigo-300/40 bg-gradient-to-r from-indigo-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-[0_18px_44px_rgba(80,70,230,0.42)]"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue to Project Details
                </motion.button>
                <p className="text-xs text-slate-400">No commitment. I reply within 24-48 hours.</p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
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
                      <option value="$200-$500">$200 - $500</option>
                      <option value="$500-$1k">$500 - $1k</option>
                      <option value="$1k-$3k">$1k - $3k</option>
                      <option value="$3k+">$3k+</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </label>

                  {form.budget === 'Custom' && (
                    <label className="focus-ring-shell block">
                      <span className="mb-1.5 block text-xs text-slate-300">Custom Budget</span>
                      <input
                        className="focus-input"
                        name="budgetCustom"
                        type="text"
                        value={form.budgetCustom}
                        onChange={handleChange}
                        placeholder="Enter your budget"
                        required
                      />
                    </label>
                  )}

                  <label className="focus-ring-shell block">
                    <span className="mb-1.5 block text-xs text-slate-300">Timeline</span>
                    <select
                      className="focus-input"
                      name="timeline"
                      value={form.timeline}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="2-4 weeks">2-4 weeks</option>
                      <option value="1-2 months">1-2 months</option>
                      <option value="3+ months">3+ months</option>
                    </select>
                  </label>
                </div>

                <label className="focus-ring-shell block">
                  <span className="mb-1.5 block text-xs text-slate-300">Project goals & success metrics</span>
                  <textarea
                    className="focus-input min-h-[138px] resize-y"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me your goals, constraints, and what success should look like..."
                    required
                  />
                </label>

                <div className="flex flex-wrap gap-3">
                  <motion.button
                    type="button"
                    onClick={goBack}
                    className="w-full rounded-2xl border border-white/20 bg-white/[0.06] px-6 py-3 font-semibold text-white transition hover:border-white/40 hover:bg-white/10 sm:w-auto"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={submitState === 'submitting'}
                    className="beam-button relative w-full flex-1 overflow-hidden rounded-2xl border border-indigo-300/40 bg-gradient-to-r from-indigo-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-[0_18px_44px_rgba(80,70,230,0.42)]"
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {submitState === 'submitting' ? 'Sending...' : 'Get My Project Plan'}
                  </motion.button>
                </div>
              </div>
            )}

            <motion.p
              initial={false}
              animate={{ opacity: submitted ? 1 : 0, y: submitted ? 0 : 6 }}
              className="text-sm text-cyan-200"
            >
              Thanks. I&apos;ll review your details and reply with a clear project strategy and next steps.
            </motion.p>
            <motion.p
              initial={false}
              animate={{ opacity: submitState === 'error' ? 1 : 0, y: submitState === 'error' ? 0 : 6 }}
              className="text-sm text-rose-200"
            >
              Something went wrong. Please try again or email me directly.
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
          <p className="mt-1 text-sm text-slate-400">AI Developer • Full-Stack Engineer • Product Builder</p>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-slate-500">
            From idea to execution, every step is focused on building AI-powered products that are fast, scalable, and ready
            for real-world impact.
          </p>
        </footer>
      </div>
    </section>
  )
}

export default Contact
