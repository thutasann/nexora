const fibonacciCache = new Map<number, number>();
export function fibonacci(n: number): number {
  if (n <= 1) return n;
  if (fibonacciCache.has(n)) return fibonacciCache.get(n)!;
  const result = fibonacci(n - 1) + fibonacci(n - 2);
  fibonacciCache.set(n, result);
  return result;
}
