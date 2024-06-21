//Generete a slug from a string
export const nameToSlug = (name: string): string => {
    return name.toLowerCase().replace(/ /g, "-");
};