import { DOMElement, VNode } from '../../../core';
import { mount } from './mount';
import { patch } from './patch';

/**
 * ## Render ##
 * @description - This function is used to render a VNode into the DOM.
 * - Render the given VNode into the given container.
 * - If the container already has a VNode, patch the container with the new VNode.
 * - If the container does not have a VNode, mount the new VNode into the container.
 * - If the container has a VNode, but the new VNode is different, unmount the old VNode and mount the new VNode.
 */
export function render(vnode: VNode, container: DOMElement) {
  const prevNode = container._vnode;

  if (prevNode) {
    patch(container, prevNode, vnode);
    prevNode.props = {};
    prevNode.ref = null;
  } else {
    mount(vnode, container);
  }

  container._vnode = vnode;
}
