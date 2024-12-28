import { DOMElement, DOMNode, VNode } from '../../../core';
import { executeInitCallbacks } from '../../lifecycles/on-init';
import { mount } from './mount';

/**
 * Mount a component VNode
 * @description - This function is used to mount a component VNode.
 * @param vnode - The VNode to mount
 * @param container - The container element to mount the component in
 * @param nextSibling - The next sibling DOM node to mount the component after
 * @returns The DOM node for the component
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
