import { DOMNode, VNode } from '../../../core';

/**
 * Find the DOM node for a VNode
 */
export function findDom(vnode: VNode): DOMNode | null {
  if (!vnode) return null;

  if (vnode._dom) return vnode._dom;

  if (vnode._rendered) {
    return findDom(vnode._rendered);
  }

  return null;
}
