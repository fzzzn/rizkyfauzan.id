export const useSidebarState = () => {
    // useState keeps the value per-request on the server and shared across
    // components on the client, unlike a module-level ref.
    const sidebarOpen = useState<boolean>('sidebar-open', () => false)

    return { sidebarOpen }
}
