import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reveal elements as they scroll into view.
 *
 * Elements are matched by selector inside the page root; anything above the
 * fold animates immediately so the first paint feels alive, and the rest fade
 * and rise into place when they are reached. Siblings get a small stagger so a
 * grid of cards cascades instead of popping in together.
 *
 * Returns a cleanup function that kills the triggers; call it on unmount.
 */
export const useScrollReveal = (selector = '[data-reveal]', options: { auto?: boolean } = {}) => {
    const { auto = true } = options
    let context: ReturnType<typeof gsap.context> | null = null
    let cleanup: (() => void) | null = null

    // Elements already animated, so calling start() again after new content
    // renders only animates what is actually new.
    let revealed = new WeakSet<HTMLElement>()

    const stop = () => {
        cleanup?.()
        cleanup = null
        // Fresh set: after a revert the elements need animating again.
        revealed = new WeakSet<HTMLElement>()
    }

    const start = () => {
        if (typeof window === 'undefined') return

        // Respect the visitor's motion preference: leave everything as-is.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const groups = new Map<Element, HTMLElement[]>()

        document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
            if (revealed.has(element)) return

            // Batch siblings so a grid cascades instead of popping in at once.
            const group = element.parentElement ?? document.body
            groups.set(group, [...(groups.get(group) ?? []), element])
        })

        // Anything marked `data-reveal` that this call did not match would stay
        // hidden by the CSS start state for good (a custom selector is easy to
        // get wrong). Reveal it immediately instead: a missing animation is
        // far better than a missing heading.
        document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
            if (element.matches(selector)) return
            element.removeAttribute('data-reveal')
            gsap.set(element, { clearProps: 'transform,opacity' })
        })

        if (!groups.size) return

        context ??= gsap.context(() => {})

        context.add(() => {
            groups.forEach((elements) => {
                gsap.fromTo(elements, {
                    y: 24,
                    opacity: 0,
                }, {
                    y: 0,
                    // Explicit end value: the CSS start state is opacity 0, so
                    // animating `from` alone would fade 0 into 0.
                    opacity: 1,
                    duration: 0.7,
                    ease: 'power3.out',
                    stagger: elements.length > 1 ? 0.08 : 0,
                    // The attribute is removed when the animation starts so the
                    // hide rule stops applying, then the inline styles are
                    // cleared at the end: layout, hover effects and printing
                    // behave as if GSAP was never involved.
                    clearProps: 'transform,opacity',
                    onStart: () => {
                        elements.forEach((element) => element.removeAttribute('data-reveal'))
                    },
                    onComplete: () => {
                        elements.forEach((element) => revealed.add(element))
                    },
                    scrollTrigger: {
                        trigger: elements[0],
                        start: 'top 88%',
                        // Play once; re-animating on scroll back up is distracting.
                        once: true,
                    },
                })
            })
        })

        // Fonts and images can change document height after mount, so refresh
        // once the page has settled.
        const refresh = () => ScrollTrigger.refresh()
        if (document.fonts?.ready) document.fonts.ready.then(refresh)
        window.setTimeout(refresh, 300)

        cleanup = () => {
            context?.revert()
            context = null
        }
    }

    onMounted(() => {
        if (auto) start()
    })
    onUnmounted(stop)

    return { start, stop }
}
