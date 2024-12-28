import { VNode } from '../../core';
import { reactive } from '../state/reactive-state';

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface Element {
      type: string | Function;
      props: any;
    }
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface ElementChildrenAttribute {
      children: {};
    }
  }
}

/**
 * ## Nexora JSX Factory ##
 * @param type - The type of the element or component.
 * @param props - The properties of the element or component.
 * @param children - The children of the element or component.
 * @returns The VNode of the element or component.
 */
export function Nexora(type: string | Function, props: any, ...children: any[]) {
  if (typeof type === 'function') {
    const prevComponent = reactive.currentComponentFn;
    reactive.currentComponentFn = type;

    try {
      reactive.stateIndexes.set(type, 0);
      const result = type({ ...props, children });

      if (reactive.hasState(type)) {
        const renderKey = Date.now();
        return {
          type: 'reactive-wrapper',
          props: {
            children: [result],
            _componentFn: type,
            _renderKey: renderKey,
          },
          key: null,
          ref: null,
        };
      }

      return result;
    } finally {
      reactive.currentComponentFn = prevComponent;
    }
  }

  const transformedProps = { ...props };
  if (transformedProps.style && typeof transformedProps.style === 'object') {
    transformedProps.style = Object.entries(transformedProps.style)
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${cssKey}: ${value}`;
      })
      .join(';');
  }

  return {
    type,
    props: {
      ...transformedProps,
      children: children.map((child) =>
        typeof child === 'object' ? child : { type: 'TEXT_ELEMENT', props: { nodeValue: child } }
      ),
    },
  };
}
