export const usePageBreadcrumb = (name: string, path: string) => {
  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        { name: 'Home', item: '/' },
        { name, item: path },
      ],
    }),
  ])
}
