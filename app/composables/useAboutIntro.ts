import gsap from 'gsap'

/**
 * Gentle intro for the About page: the photo fades in and settles while the
 * heading and paragraphs rise into place.
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
    let context: ReturnType<typeof gsap.context> | null = null
    let restoreTransition: (() => void) | null = null
    let claimed: HTMLElement[] = []

    const stop = () => {
        master?.kill()
        master = null
        context?.revert()
        context = null
        restoreTransition?.()
        restoreTransition = null
        claimed.forEach((element) => element.removeAttribute('data-reveal-active'))
        claimed = []
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

        // Claim these elements for the animation before touching their hidden
        // state. The head script's MutationObserver re-hides matched elements
        // on a timeout after client-side navigation; without this marker that
        // late hide lands after the intro starts and leaves the heading
        // invisible on phones, where nothing re-runs to show it again.
        claimed = all
        all.forEach((element) => element.setAttribute('data-reveal-active', ''))

        // The photo carries Tailwind's `transition-all`. A CSS transition on
        // transform competes with GSAP: each frame GSAP writes a new value and
        // the transition tries to ease towards it. Suspending it for the intro
        // keeps GSAP the only thing driving the frame.
        if (photo) {
            // Safe to clear later: the element has no inline transition of its
            // own, the animation comes from its utility classes.
            photo.style.transition = 'none'
            restoreTransition = () => {
                photo.style.transition = ''
            }
        }

        // Put the photo in its start state *before* dropping the hiding
        // attribute, so it never appears for a frame at full size before
        // settling. The hide rule is `opacity: 0`, so the element is
        // invisible while these values are written.
        if (photo) {
            photo.style.transform = 'scale(1.04)'
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
                // A soft fade with a slow settle inward. Long and eased-out so it
                // finishes without a visible stop, which reads as composure
                // rather than an effect: no wipe, no bounce, nothing that draws
                // attention to the motion itself.
                master.fromTo(photo, { autoAlpha: 0, scale: 1.04 }, {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 1.4,
                    ease: 'power2.out',
                    clearProps: 'transform,opacity,visibility',
                }, 0)
            }

            if (heading) {
                // The heading rises and fades in as a single element. SplitText's
                // line-by-line reveal was replaced: autoSplit re-splits on font
                // load, and on mobile that left the re-created lines stuck at
                // autoAlpha:0 — the heading never showed when arriving from
                // another page. A plain fromTo has a guaranteed visible end.
                master.fromTo(heading, { autoAlpha: 0, y: 30 }, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.85,
                    ease: 'power3.out',
                    clearProps: 'transform,opacity,visibility',
                }, 0)
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
