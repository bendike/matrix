export function isNumber(arg: number | null): arg is number {
    return typeof arg === "number" && arg !== null;
}
