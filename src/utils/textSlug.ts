


export const textSlug = (text: string): string => {
  return text
          .toString().toLowerCase()
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/[^\w-]+/g, '') // Remove non-alphanumeric characters
          .replace(/--+/g, '-') // Replace multiple hyphens with a single one
          .replace(/^-+|-+$/g, ''); // Trim leading and trailing hyphens
}