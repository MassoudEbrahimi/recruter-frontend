
export const useValidator = (items) => {
    return items.every(o => (o.required && o.value !== "") || (!o.required && (o.value === "" || o.value!=="")))
}