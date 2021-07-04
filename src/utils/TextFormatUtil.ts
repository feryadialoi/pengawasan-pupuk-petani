/**
 * returning currency with rupiah
 * @param value currency value in number
 */
export const rupiah = (value: number = 0): string => {
    const separator = ".";
    const currency = "Rp";
    const newValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

    return `${currency}${newValue}`;
};
