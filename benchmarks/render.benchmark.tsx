import { measurePerformance, Nexora, render } from '../src';

export async function renderBenchmark() {
  console.log('📊 Running Render Benchmarks:');

  // Simple element render
  await measurePerformance('Simple div render', () => {
    const container = document.createElement('div');
    const vnode = <div>Hello World</div>;
    render(vnode, container);
  });

  // Nested elements render
  await measurePerformance('Nested elements render', () => {
    const container = document.createElement('div');
    const vnode = (
      <div>
        <h1>Title</h1>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
        <div>
          <span>Nested content</span>
        </div>
      </div>
    );
    render(vnode, container);
  });

  // List render
  await measurePerformance('1000 item list render', () => {
    const container = document.createElement('div');
    const items = Array.from({ length: 1000 }, (_, i) => i);
    const vnode = (
      <ul>
        {items.map((i) => (
          <li key={i}>Item {i}</li>
        ))}
      </ul>
    );
    render(vnode, container);
  });
}
