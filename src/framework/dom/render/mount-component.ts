import { DOMElement, DOMNode, VNode } from '../../../core';
import { mount } from './mount';

/**
 * Mount a component VNode
 */
export function mountComponent(vnode: VNode, container: DOMElement, nextSibling: DOMNode | null = null): DOMNode {
  const ComponentFn = vnode.type as Function;
  const props = vnode.props;

  const component = ComponentFn.prototype?.render ? new (ComponentFn as any)(props) : ComponentFn(props);

  const renderedVNode = typeof component === 'function' ? component() : component.render();

  const dom = mount(renderedVNode, container, nextSibling);
  vnode._rendered = renderedVNode;
  vnode._dom = dom;
  return dom;
}
