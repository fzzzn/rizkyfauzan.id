export type ColorMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'color-mode'

const resolve = (mode: ColorMode): boolean =>
    mode === 'dark' ||
    (mode === 'system' && typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)

export const useColorMode = () => {
    // useState keeps the pick per-request on the server and shared across
    // components on the client, like useSidebarState.
    const mode = useState<ColorMode>('color-mode', () => 'system')

    const apply = (value: ColorMode) => {
        mode.value = value
        if (typeof document === 'undefined') return
        document.documentElement.classList.toggle('dark', resolve(value))
        try {
            localStorage.setItem(STORAGE_KEY, value)
        } catch {
            // Private mode / blocked storage: the class still applies for this visit.
        }
    }

    // Reads the stored pick once on mount. System changes are left to reload:
    // the OS toggle is rare and the FOUC script already covers first paint.
    const init = () => {
        let stored: ColorMode = 'system'
        try {
            const saved = localStorage.getItem(STORAGE_KEY)
            if (saved === 'light' || saved === 'dark' || saved === 'system') stored = saved
        } catch {
            // Ignore blocked storage and keep the system default.
        }
        apply(stored)
    }

    const cycle = () => {
        const order: ColorMode[] = ['light', 'dark', 'system']
        apply(order[(order.indexOf(mode.value) + 1) % order.length]!)
    }

    return { mode, cycle, init }
}
