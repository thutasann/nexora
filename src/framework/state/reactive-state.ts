import { DOMElement, VNode } from '../../core/types';
import { render } from '../dom/render';

class ReactiveState {
  private states: Map<Function, Map<number, any>> = new Map();
  private stateIndexes: Map<Function, number> = new Map();
  private currentComponentFn: Function | null = null;
  private rootElement: DOMElement | null = null;

  createState<T>(initialValue: T): [() => T, (newValue: T | ((prev: T) => T)) => void] {
    if (!this.currentComponentFn) {
      throw new Error('createState must be called within a component');
    }

    const componentFn = this.currentComponentFn;

    // Initialize state index if not exists
    if (!this.stateIndexes.has(componentFn)) {
      this.stateIndexes.set(componentFn, 0);
    }
    const stateIndex = this.stateIndexes.get(componentFn)!;
    this.stateIndexes.set(componentFn, stateIndex + 1);

    // Initialize component states if not exists
    if (!this.states.has(componentFn)) {
      this.states.set(componentFn, new Map());
    }
    const componentStates = this.states.get(componentFn)!;

    // Set initial value if not exists
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

      // Queue the re-render
      queueMicrotask(() => {
        const newVNode = this.renderComponent(componentFn);
        if (this.rootElement) {
          const oldVNode = this.rootElement._vnode;
          if (oldVNode) {
            render(newVNode, this.rootElement);
          }
        }
      });
    };

    return [getState, setState];
  }

  renderComponent(ComponentFn: Function): VNode {
    // Store the previous component function
    const prevComponent = this.currentComponentFn;
    this.currentComponentFn = ComponentFn;

    try {
      // Reset state index before rendering
      this.stateIndexes.set(ComponentFn, 0);

      // Execute the component function
      const result = ComponentFn();

      // Wrap the result in a reactive wrapper
      return {
        type: 'reactive-wrapper',
        props: {
          children: [result],
          _componentFn: ComponentFn,
          _renderKey: Date.now(),
        },
        key: null,
        ref: null,
      };
    } finally {
      // Restore the previous component function
      this.currentComponentFn = prevComponent;
    }
  }
}

export const reactive = new ReactiveState();

export function createState<T>(initialValue: T) {
  return reactive.createState(initialValue);
}
