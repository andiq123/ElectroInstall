export function staggerMs(index: number, step: number, base = 0): number {
  return base + index * step;
}
