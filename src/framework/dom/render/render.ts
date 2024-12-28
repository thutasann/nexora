import { DOMElement, VNode } from '../../../core';
import { mount } from './mount';
import { patch } from './patch';

/**
 * Render the given VNode into the given container.
 */
export function render(vnode: VNode, container: DOMElement) {
  const prevNode = container._vnode;

  if (prevNode) {
    patch(container, prevNode, vnode);
  } else {
    mount(vnode, container);
  }

  container._vnode = vnode;
}
