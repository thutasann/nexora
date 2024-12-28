import { DOMElement, VNode } from '../../../core';
import { diffChildren } from './diff-children';
import { findDom } from './find-dom';
import { mount } from './mount';
import { updateProps } from './update-props';

/**
 * Update an existing VNode in the DOM
 */
export function patch(container: DOMElement, oldVNode: VNode, newVNode: VNode) {
  if (oldVNode.type === 'reactive-wrapper' && newVNode.type === 'reactive-wrapper') {
    const oldChild = oldVNode.props.children?.[0];
    const newChild = newVNode.props.children?.[0];
    if (!oldChild || !newChild) return;

    if (oldVNode.props._renderKey !== newVNode.props._renderKey) {
      const oldDom = findDom(oldVNode);
      const newDom = mount(newChild, container);
      if (oldDom) {
        oldDom.parentNode?.replaceChild(newDom, oldDom);
      }
      newVNode._dom = newDom;
      return;
    }

    patch(container, oldChild, newChild);
    newVNode._dom = oldVNode._dom;
    return;
  }

  if (oldVNode.type !== newVNode.type) {
    const oldDom = findDom(oldVNode);
    const newDom = mount(newVNode, container);
    if (oldDom) {
      oldDom.parentNode?.replaceChild(newDom, oldDom);
    }
    return;
  }

  if (newVNode.type === 'TEXT_ELEMENT') {
    const dom = findDom(oldVNode);
    if (dom && oldVNode.props.nodeValue !== newVNode.props.nodeValue) {
      dom.nodeValue = newVNode.props.nodeValue;
    }
    newVNode._dom = dom!;
    return;
  }

  const dom = findDom(oldVNode) as DOMElement;
  if (!dom) return;

  updateProps(dom, oldVNode.props, newVNode.props);
  newVNode._dom = dom;

  diffChildren(dom, oldVNode.props.children || [], newVNode.props.children || []);
}
