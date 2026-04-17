import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let isRegistered = false

export const ensureScrollTrigger = () => {
  if (typeof window === 'undefined') return ScrollTrigger
  if (!isRegistered) {
    gsap.registerPlugin(ScrollTrigger)
    isRegistered = true
  }
  return ScrollTrigger
}

export { gsap, ScrollTrigger }
