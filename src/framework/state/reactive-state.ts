import { DOMElement, VNode } from '../../core/types';
import { render } from '../dom/render';

/**
 * ## Reactive State ##
 * @description - This class is used to manage the state of the components.
 * - Manages the state of the components.
 * - Provides a way to create and manage state for components.
 * - Uses a WeakMap to store the state of each component.
 * - Uses a WeakMap to store the index of the state for each component.
 * - Uses a WeakMap to store the current component function.
 * - Uses a WeakMap to store the root element.
 */
class ReactiveState {
  public states: WeakMap<Function, Map<number, any>> = new WeakMap();
  public stateIndexes: WeakMap<Function, number> = new WeakMap();
  public currentComponentFn: Function | null = null;
  public rootElement: DOMElement | null = null;

  /**
   * Creates a state for the given component.
   * @param initialValue - The initial value of the state.
   * @returns A tuple containing the getter and setter for the state.
   */
  public createState<T>(initialValue: T): [() => T, (newValue: T | ((prev: T) => T)) => void] {
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

  /**
   * Checks if the given component function has state.
   * @param componentFn - The component function to check.
   * @returns True if the component function has state, false otherwise.
   */
  public hasState(componentFn: Function): boolean {
    return this.states.has(componentFn);
  }

  /**
   * Triggers an update for the given component function.
   * @param componentFn - The component function to trigger an update for.
   */
  public triggerUpdate(componentFn: Function) {
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
  }

  /**
   * Finds the element by the given component function.
   * @param root - The root element to search within.
   * @param componentFn - The component function to search for.
   * @returns The element that matches the component function.
   */
  private findElementByComponent(root: DOMElement, componentFn: Function): DOMElement | null {
    if (root._vnode?.props?._componentFn === componentFn) {
      return root;
    }

    const searchChildren = (element: DOMElement): DOMElement | null => {
      for (const child of Array.from(element.children) as DOMElement[]) {
        if (child._vnode?.props?._componentFn === componentFn) {
          return child;
        }

        const found = searchChildren(child);
        if (found) return found;
      }
      return null;
    };

    return searchChildren(root);
  }

  /**
   * Renders the given component function.
   * @param ComponentFn - The component function to render.
   * @returns The VNode of the component.
   */
  private render(ComponentFn: Function, props?: any): VNode {
    const prevComponent = this.currentComponentFn;
    this.currentComponentFn = ComponentFn;

    try {
      this.stateIndexes.set(ComponentFn, 0);
      const result = ComponentFn(props || {});
      const renderKey = Date.now();

      // clean up any temporary references
      if (result && typeof result === 'object') {
        Object.keys(result).forEach((key) => {
          if (key.startsWith('_temp')) {
            delete result[key];
          }
        });
      }

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
}

export const reactive = new ReactiveState();

export function createState<T>(initialValue: T) {
  return reactive.createState(initialValue);
}
