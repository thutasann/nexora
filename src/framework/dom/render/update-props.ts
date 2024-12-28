import { DOMElement, Props } from '../../../core';

/**
 * Update props on a DOM element
 * @description - This function is used to update the props on a DOM element.
 * @param dom - The DOM element to update the props on
 * @param oldProps - The old props
 * @param newProps - The new props
 */
export function updateProps(dom: DOMElement, oldProps: Props, newProps: Props) {
  Object.keys(oldProps).forEach((key) => {
    if (key !== 'children' && !(key in newProps)) {
      if (key.startsWith('on')) {
        const eventType = key.toLowerCase().substring(2);
        dom.removeEventListener(eventType, oldProps[key]);
      } else {
        dom[key] = '';
      }
    }
  });

  Object.keys(newProps).forEach((key) => {
    if (key !== 'children' && oldProps[key] !== newProps[key]) {
      if (key.startsWith('on')) {
        const eventType = key.toLowerCase().substring(2);
        if (oldProps[key]) {
          dom.removeEventListener(eventType, oldProps[key]);
        }
        dom.addEventListener(eventType, newProps[key]);
      } else {
        dom[key] = newProps[key];
      }
    }
  });
}
