import { reporter } from './report';

/**
 * Measures the performance of a function by running it multiple times and calculating the average, minimum, and maximum time.
 * @param name - The name of the function to measure.
 * @param fn - The function to measure.
 * @param iterations - The number of times to run the function.
 */
export async function measurePerformance(name: string, fn: () => void, iterations: number = 1000) {
  const times: number[] = [];

  for (let i = 0; i < 5; i++) {
    fn();
  }

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    fn();
    const end = performance.now();
    times.push(end - start);
  }

  const average = times.reduce((a, b) => a + b, 0) / times.length;
  const min = Math.min(...times);
  const max = Math.max(...times);

  console.log(`\n${name}:`);
  console.log(`  Average: ${average.toFixed(3)}ms`);
  console.log(`  Min: ${min.toFixed(3)}ms`);
  console.log(`  Max: ${max.toFixed(3)}ms`);

  reporter.addResult(name, average, min, max);
}
