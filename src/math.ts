export function average(a: number[]): number {
    return a.reduce((acc, val) => acc + val, 0) / a.length;
}