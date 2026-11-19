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
    let restoreTransition: (() => void) | null = null

    const stop = () => {
        master?.kill()
        master = null
        split?.revert()
        split = null
        context?.revert()
        context = null
        restoreTransition?.()
        restoreTransition = null
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

        const fromRight = window.matchMedia('(min-width: 1024px)').matches

        // The photo carries Tailwind's `transition-all`. A CSS transition on
        // clip-path and transform competes with GSAP: each frame GSAP writes a
        // new value, the transition tries to ease towards it, and when
        // clearProps removes the value the rendered clip is still part-way and
        // snaps to fully visible. Suspending the transition for the duration of
        // the intro keeps GSAP as the only thing driving these properties.
        if (photo) {
            // Safe to clear later: the element has no inline transition of its
            // own, the animation comes from its utility classes.
            photo.style.transition = 'none'
            restoreTransition = () => {
                photo.style.transition = ''
            }
        }

        // Put the photo in its start state *before* dropping the hiding
        // attribute. Otherwise it spends a frame at opacity 1 with no clip,
        // which flashes the full, unscaled photo for one frame before the wipe
        // begins. The hide rule is `opacity: 0`, so the element is invisible
        // while these values are written.
        if (photo) {
            photo.style.clipPath = fromRight ? 'inset(0 0 0 100%)' : 'inset(100% 0 0 0)'
            photo.style.transform = 'scale(1.08)'
        }

        // The head script pre-hides these elements inline (see nuxt.config.ts).
        // GSAP writes its own inline styles, so the hide has to go before the
        // timeline starts; `autoAlpha` on every target then owns the fade, as a
        // plain opacity tween cannot beat an inline `!important` declaration.
        all.forEach((element) => {
            element.style.opacity = ''
            element.style.visibility = ''
        })

        // Drop the hide state now that the start values are in place. GSAP
        // owns the inline values, so the unmatched CSS rule no longer applies.
        all.forEach((element) => element.removeAttribute('data-intro'))

        context = gsap.context(() => {
            master = gsap.timeline({
                defaults: { ease: 'power3.out' },
                onComplete: () => restoreTransition?.(),
            })

            if (photo) {
                // Wipe from the edge the photo sits on: the right column on
                // desktop, the bottom of the stack on phones.
                master.fromTo(photo, { autoAlpha: 0 }, {
                    autoAlpha: 1,
                    clipPath: 'inset(0 0 0 0%)',
                    scale: 1,
                    duration: 1.15,
                    // power2.out starts gentler than power4.out (4.3% vs 7% of
                    // the photo per frame at 60fps) and still settles cleanly,
                    // so the wipe opens smoothly instead of lurching.
                    ease: 'power2.out',
                    clearProps: 'clip-path,transform,opacity,visibility',
                }, 0)
            }

            if (heading) {
                // The lines are animated, so the heading box itself is shown
                // outright; the hide script's inline opacity would otherwise
                // keep every line invisible inside it.
                gsap.set(heading, { autoAlpha: 1, clearProps: 'opacity,visibility' })

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
                            autoAlpha: 0,
                            duration: 0.85,
                            stagger: 0.09,
                            clearProps: 'transform,opacity,visibility',
                        })

                        return lineTimeline
                    },
                })
            }

            if (paragraphs.length) {
                master.fromTo(paragraphs, { autoAlpha: 0, y: 26 }, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.14,
                    clearProps: 'transform,opacity,visibility',
                }, 0.45)
            }
        })
    }

    onMounted(start)
    onUnmounted(stop)
}
