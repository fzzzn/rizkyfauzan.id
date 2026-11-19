import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

/**
 * Gentle intro for the About page: the photo wipes in, then the heading rises
 * line by line and the paragraphs follow.
 *
 * The page is two columns on wide screens and one stacked column on phones.
 * On desktop everything is above the fold, so a plain scroll reveal makes the
 * whole page appear at once. Running as an intro instead lets the photo lead
 * and the text follow, which reads like a page entrance rather than a pop-in.
 *
 * Elements are hidden before hydration by `html.reveal-enabled [data-intro]`
 * in main.css. That rule never applies under reduced motion, so those visitors
 * see the finished page immediately.
 */
export const useAboutIntro = () => {
    let master: gsap.core.Timeline | null = null
    let split: SplitText | null = null
    let context: ReturnType<typeof gsap.context> | null = null

    const stop = () => {
        master?.kill()
        master = null
        split?.revert()
        split = null
        context?.revert()
        context = null
    }

    const start = () => {
        if (typeof window === 'undefined') return
        // Reduced motion: the hide rule is inactive, so do nothing at all.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const photo = document.querySelector<HTMLElement>('[data-intro="photo"]')
        const heading = document.querySelector<HTMLElement>('[data-intro="heading"]')
        const paragraphs = [...document.querySelectorAll<HTMLElement>('[data-intro="paragraph"]')]
        const all = [photo, heading, ...paragraphs].filter(Boolean) as HTMLElement[]

        if (!all.length) return

        // Drop the start state before creating any tween. GSAP then writes its
        // own inline values, and those win over the now-unmatched CSS rule.
        all.forEach((element) => element.removeAttribute('data-intro'))

        const fromRight = window.matchMedia('(min-width: 1024px)').matches

        context = gsap.context(() => {
            master = gsap.timeline({ defaults: { ease: 'power3.out' } })

            if (photo) {
                // Wipe from the edge the photo sits on: the right column on
                // desktop, the bottom of the stack on phones.
                master.fromTo(photo, {
                    clipPath: fromRight ? 'inset(0 0 0 100%)' : 'inset(100% 0 0 0)',
                    scale: 1.08,
                }, {
                    clipPath: 'inset(0 0 0 0%)',
                    scale: 1,
                    duration: 1.15,
                    ease: 'power4.out',
                    clearProps: 'clip-path,transform',
                }, 0)
            }

            if (heading) {
                // SplitText owns the heading's lines. autoSplit re-runs onSplit
                // when the line breaks change, and returning the timeline tells
                // it what to play again for the new lines.
                split = SplitText.create(heading, {
                    type: 'lines',
                    linesClass: 'intro-line',
                    autoSplit: true,
                    onSplit: (self) => {
                        const lineTimeline = gsap.timeline()

                        lineTimeline.from(self.lines, {
                            yPercent: 100,
                            opacity: 0,
                            duration: 0.85,
                            stagger: 0.09,
                            clearProps: 'transform,opacity',
                        })

                        return lineTimeline
                    },
                })
            }

            if (paragraphs.length) {
                master.from(paragraphs, {
                    y: 26,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.14,
                    clearProps: 'transform,opacity',
                }, 0.45)
            }
        })
    }

    onMounted(start)
    onUnmounted(stop)
}
