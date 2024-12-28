import { DOMElement, DOMNode, VNode } from '../../../core';
import { mountComponent } from './mount-component';
import { updateProps } from './update-props';

/**
 * Mount a VNode to the DOM
 * @description - This function is used to mount a VNode to the DOM.
 * @param vnode - The VNode to mount
 * @param container - The container element to mount the VNode in
 * @param nextSibling - The next sibling DOM node to mount the VNode after
 * @returns The DOM node for the VNode
 */
export function mount(vnode: VNode | VNode[], container: DOMElement, nextSibling: DOMNode | null = null): DOMNode {
  if (Array.isArray(vnode)) {
    const fragment = document.createDocumentFragment() as unknown as DOMElement;
    vnode.forEach((node) => mount(node, fragment, null));
    container.appendChild(fragment);
    return fragment.firstChild as DOMNode;
  }

  if (vnode.type === 'reactive-wrapper') {
    const child = vnode.props.children?.[0];
    if (!child) throw new Error('Reactive wrapper must have a child');

    if (vnode.props._componentFn) {
      child.props = child.props || {};
      child.props._componentFn = vnode.props._componentFn;
    }

    const dom = mount(child, container, nextSibling);
    vnode._dom = dom;
    return dom;
  }

  if (typeof vnode.type === 'function') {
    return mountComponent(vnode, container, nextSibling);
  }

  const dom =
    vnode.type === 'TEXT_ELEMENT' ? document.createTextNode(vnode.props.nodeValue) : document.createElement(vnode.type);

  (dom as DOMElement)._vnode = vnode;
  vnode._dom = dom;

  if (dom instanceof HTMLElement) {
    updateProps(dom, {}, vnode.props);
  }

  if (dom instanceof HTMLElement && vnode.props.children) {
    vnode.props.children.forEach((child) => {
      if (child) {
        mount(child, dom);
      }
    });
  }

  if (nextSibling) {
    container.insertBefore(dom, nextSibling);
  } else {
    container.appendChild(dom);
  }

  return dom;
}
