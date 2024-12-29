import { diffBenchmark } from './diff.benchmark';
import { mountBenchmark } from './mount.benchmark';
import { renderBenchmark } from './render.benchmark';
import './setup';
import { reporter } from './utils';

async function runBenchmarks() {
  console.log('🚀 Starting Nexora Benchmarks...\n');

  await renderBenchmark();
  await diffBenchmark();
  await mountBenchmark();

  reporter.saveToFile();

  console.log('\n✨ Benchmark tests completed!');
}

(async function main() {
  try {
    await runBenchmarks();
  } catch (error) {
    console.error('Benchmark Error:', error);
    process.exit(1);
  }
})();
