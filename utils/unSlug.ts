//unslug a name sluged with the first letter of each word in uppercase
export const unSlug = (slug: string): string => {
    return slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};