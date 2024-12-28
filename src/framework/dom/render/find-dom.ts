import { DOMNode, VNode } from '../../../core';

/**
 * Find the DOM node for a VNode
 * @description - This function is used to find the DOM node for a VNode.
 * @param vnode - The VNode to find the DOM node for
 * @returns The DOM node for the VNode or null if the VNode does not have a DOM node
 */
export function findDom(vnode: VNode): DOMNode | null {
  if (!vnode) return null;

  if (vnode._dom) return vnode._dom;

  if (vnode._rendered) {
    return findDom(vnode._rendered);
  }

  return null;
}
