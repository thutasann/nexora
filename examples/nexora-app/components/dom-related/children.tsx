import { Nexora, VNode } from '../../../../src';

export function ChildrenTest({ children }: { children: VNode }): VNode {
  return (
    <div className='container'>
      <h2>This is Parent</h2>
      <div style='margin-left: 20px'>{children}</div>
    </div>
  );
}
