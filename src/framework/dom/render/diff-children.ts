import { VNode } from '../../../core';
import { findDom } from './find-dom';
import { mount } from './mount';
import { patch } from './patch';

/**
 * Diff and update children
 */
export function diffChildren(parentDom: HTMLElement, oldChildren: VNode[], newChildren: VNode[]) {
  const maxLength = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < maxLength; i++) {
    const oldChild = oldChildren[i];
    const newChild = newChildren[i];

    if (!newChild && oldChild) {
      const oldChildDom = findDom(oldChild);
      if (oldChildDom) {
        parentDom.removeChild(oldChildDom);
      }
    } else if (!oldChild && newChild) {
      mount(newChild, parentDom);
    } else if (oldChild && newChild) {
      patch(parentDom, oldChild, newChild);
    }
  }
}
