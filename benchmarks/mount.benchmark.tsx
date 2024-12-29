import { Nexora, render } from '../dist';
import { measurePerformance } from './utils/measure';
export async function mountBenchmark() {
  console.log('\n📊 Running Mount Benchmarks:');

  // Component mount
  await measurePerformance('Component mount', () => {
    const container = document.createElement('div');
    function TestComponent() {
      return (
        <div>
          <h1>Title</h1>
          <p>Content</p>
        </div>
      );
    }
    const vnode = <TestComponent />;
    render(vnode, container);
  });

  // Deep tree mount
  await measurePerformance('Deep tree mount', () => {
    const container = document.createElement('div');
    const depth = 10;

    const createNestedDivs = (level: number): any => {
      if (level === 0) return <div>Leaf</div>;
      return (
        <div>
          Level {level}
          {createNestedDivs(level - 1)}
        </div>
      );
    };

    const vnode = createNestedDivs(depth);
    render(vnode, container);
  });
}
