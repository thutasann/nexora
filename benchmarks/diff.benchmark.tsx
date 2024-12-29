import { Nexora, render } from '../src';
import { measurePerformance } from './utils';

export async function diffBenchmark() {
  console.log('\n📊 Running Diff Benchmarks:');

  // Props update
  await measurePerformance('Props diffing', () => {
    const container = document.createElement('div');
    const oldVNode = (
      <div className='old' style={{ color: 'red' }}>
        Test
      </div>
    );
    render(oldVNode, container);

    const newVNode = (
      <div className='new' style={{ color: 'blue' }}>
        Test
      </div>
    );
    render(newVNode, container);
  });

  // Children update
  await measurePerformance('Children diffing', () => {
    const container = document.createElement('div');
    const items = Array.from({ length: 100 }, (_, i) => i);

    const oldVNode = (
      <ul>
        {items.map((i) => (
          <li key={i}>Item {i}</li>
        ))}
      </ul>
    );
    render(oldVNode, container);

    const newVNode = (
      <ul>
        {items.map((i) => (
          <li key={i}>Updated Item {i}</li>
        ))}
      </ul>
    );
    render(newVNode, container);
  });
}
