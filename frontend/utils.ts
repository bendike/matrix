export function areAllNumbers(args: (number | null)[]): args is number[] {
    return args.every((arg) => typeof arg === "number" && arg !== null);
}
