export const removePunctuation = (str) => {
    return str.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
}