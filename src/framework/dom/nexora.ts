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
 * Nexora JSX Factory
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

  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : { type: 'TEXT_ELEMENT', props: { nodeValue: child } }
      ),
    },
  };
}
