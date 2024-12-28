import { DOMElement, DOMNode, VNode } from '../../../core';
import { executeInitCallbacks } from '../../lifecycles/on-init';
import { mount } from './mount';

/**
 * Mount a component VNode
 */
export function mountComponent(vnode: VNode, container: DOMElement, nextSibling: DOMNode | null = null): DOMNode {
  const ComponentFn = vnode.type as Function;
  const props = vnode.props;

  executeInitCallbacks(ComponentFn);

  const childVNode = props.children?.[0];

  const dom = mount(childVNode!, container, nextSibling);
  vnode._rendered = childVNode;
  vnode._dom = dom;

  return dom;
}
