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
        document.querySelectorAll('[data-reveal-active]').forEach((element) => {
            element.removeAttribute('data-reveal-active')
        })
        // Fresh set: after a revert the elements need animating again.
        revealed = new WeakSet<HTMLElement>()
    }

    const start = () => {
        if (typeof window === 'undefined') return

        // Respect the visitor's motion preference: leave everything as-is.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const groups = new Map<Element, HTMLElement[]>()
        const matched = new Set<Element>()

        document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
            if (revealed.has(element)) return
            matched.add(element)

            // Batch siblings so a grid cascades instead of popping in at once.
            const group = element.parentElement ?? document.body
            groups.set(group, [...(groups.get(group) ?? []), element])
        })

        // Anything marked `data-reveal` that this call did not match would stay
        // hidden by the CSS start state for good (a custom selector is easy to
        // get wrong). Reveal it immediately instead: a missing animation is
        // far better than a missing heading.
        document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
            if (matched.has(element)) return
            element.removeAttribute('data-reveal')
            gsap.set(element, { clearProps: 'transform,opacity,visibility' })
        })

        if (!groups.size) return

        // Claim matched elements so the head script's delayed re-hide (fired
        // after client-side navigation) cannot land on an element GSAP is
        // already animating. Cleared once the reveal completes or on stop.
        matched.forEach((element) => element.setAttribute('data-reveal-active', ''))

        context ??= gsap.context(() => {})

        context.add(() => {
            groups.forEach((elements) => {
                // `autoAlpha` also sets visibility, which is how an element the
                // head script pre-hid gets shown: a plain opacity tween cannot
                // beat that script's inline `!important` declaration. Elements
                // that arrive later carry no inline style, so hiding them
                // through `visibility` is what the tween then reveals.
                gsap.fromTo(elements, {
                    y: 24,
                    autoAlpha: 0,
                }, {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.7,
                    ease: 'power3.out',
                    stagger: elements.length > 1 ? 0.08 : 0,
                    // The attribute is removed when the animation starts so the
                    // hide rule stops applying, then the inline styles are
                    // cleared at the end: layout, hover effects and printing
                    // behave as if GSAP was never involved.
                    clearProps: 'transform,opacity,visibility',
                    onStart: () => {
                        elements.forEach((element) => element.removeAttribute('data-reveal'))
                    },
                    onComplete: () => {
                        elements.forEach((element) => {
                            element.removeAttribute('data-reveal-active')
                            revealed.add(element)
                        })
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
