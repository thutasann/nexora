import { DOMElement, VNode } from '../../core/types';
import { render } from '../dom/render';

class ReactiveState {
  private states: Map<Function, Map<number, any>> = new Map();
  private stateIndexes: Map<Function, number> = new Map();
  private currentComponentFn: Function | null = null;
  private rootElement: DOMElement | null = null;

  createState<T>(initialValue: T): [() => T, (newValue: T | ((prev: T) => T)) => void] {
    this.rootElement ??= document.getElementById('app') as DOMElement;
    if (!this.currentComponentFn) {
      throw new Error('createState must be called within a component');
    }

    const componentFn = this.currentComponentFn;

    if (!this.stateIndexes.has(componentFn)) {
      this.stateIndexes.set(componentFn, 0);
    }
    const stateIndex = this.stateIndexes.get(componentFn)!;
    this.stateIndexes.set(componentFn, stateIndex + 1);

    if (!this.states.has(componentFn)) {
      this.states.set(componentFn, new Map());
    }
    const componentStates = this.states.get(componentFn)!;

    if (!componentStates.has(stateIndex)) {
      componentStates.set(stateIndex, initialValue);
    }

    const getState = () => {
      const states = this.states.get(componentFn);
      return states?.get(stateIndex);
    };

    const setState = (newValue: T | ((prev: T) => T)) => {
      const states = this.states.get(componentFn);
      if (!states) return;

      const currentValue = states.get(stateIndex);
      const nextValue = typeof newValue === 'function' ? (newValue as (prev: T) => T)(currentValue) : newValue;

      if (Object.is(currentValue, nextValue)) {
        return;
      }

      states.set(stateIndex, nextValue);

      queueMicrotask(() => {
        const newVNode = this.render(componentFn);
        if (this.rootElement) {
          const componentElement = this.findElementByComponent(this.rootElement, componentFn);
          if (componentElement) {
            const oldVNode = componentElement._vnode;
            if (oldVNode) {
              render(newVNode, componentElement);
            }
          }
        }
      });
    };

    return [getState, setState];
  }

  render(ComponentFn: Function): VNode {
    const prevComponent = this.currentComponentFn;
    this.currentComponentFn = ComponentFn;

    try {
      this.stateIndexes.set(ComponentFn, 0);
      const result = ComponentFn();
      const renderKey = Date.now();

      return {
        type: 'reactive-wrapper',
        props: {
          children: [result],
          _componentFn: ComponentFn,
          _renderKey: renderKey,
        },
        key: null,
        ref: null,
      };
    } finally {
      this.currentComponentFn = prevComponent;
    }
  }

  findElementByComponent(root: DOMElement, componentFn: Function): DOMElement | null {
    if (root._vnode?.props?._componentFn === componentFn) {
      return root;
    }

    for (const child of Array.from(root.children)) {
      const found = this.findElementByComponent(child as DOMElement, componentFn);
      if (found) return found;
    }

    return null;
  }
}

export const reactive = new ReactiveState();

export function createState<T>(initialValue: T) {
  return reactive.createState(initialValue);
}
