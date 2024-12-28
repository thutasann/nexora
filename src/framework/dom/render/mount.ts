import { DOMElement, DOMNode, VNode } from '../../../core';
import { mountComponent } from './mount-component';
import { updateProps } from './update-props';

/**
 * Mount a VNode to the DOM
 */
export function mount(vnode: VNode, container: DOMElement, nextSibling: DOMNode | null = null): DOMNode {
  if (vnode.type === 'reactive-wrapper') {
    const child = vnode.props.children?.[0];
    if (!child) throw new Error('Reactive wrapper must have a child');

    child.props._componentFn = vnode.props._componentFn;

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
    vnode.props.children.forEach((child) => mount(child, dom));
  }

  if (nextSibling) {
    container.insertBefore(dom, nextSibling);
  } else {
    container.appendChild(dom);
  }

  return dom;
}
