import { OnInit } from '../../core';
import { reactive } from '../state';

const _componentInitCallbacks: OnInit.ComponentInitMap = new Map();
const _componentInitResults: WeakMap<Function, Map<Function, any>> = new WeakMap();
const _componentInitPromises: WeakMap<Function, Promise<any>> = new WeakMap();

/**
 * ## onInit Lifecycle ##
 * @description - This function is used to register an init callback for a component.
 * @param initFn - The function to be executed when the component is initialized.
 * @returns A tuple containing the result of the init function and a function to set the result.
 */
export function onInit<T>(initFn: () => Promise<T>): [T, (newValue: T) => void] {
  const currentComponent = reactive.currentComponentFn;
  if (!currentComponent) {
    throw new Error('onInit must be called within a component');
  }

  if (!_componentInitCallbacks.has(currentComponent)) {
    _componentInitCallbacks.set(currentComponent, []);
    _componentInitResults.set(currentComponent, new Map());
  }

  _componentInitCallbacks.get(currentComponent)?.push(initFn);

  const resultsMap = _componentInitResults.get(currentComponent)!;
  if (!resultsMap.has(initFn)) {
    const [getValue, setValue] = reactive.createState<T | null>(null);
    resultsMap.set(initFn, [getValue, setValue]);

    initFn().then((result) => {
      setValue(result);
      reactive.triggerUpdate(currentComponent);
    });
  }

  const [getValue, setValue] = resultsMap.get(initFn);
  return [getValue(), setValue];
}

/**
 * ## Execute Init Callbacks ##
 * @description Execute the init callbacks for a component
 * @param componentFn - The component function to execute the callbacks for.
 */
export function executeInitCallbacks(componentFn: Function) {
  const callbacks = _componentInitCallbacks.get(componentFn);
  if (callbacks) {
    reactive.currentComponentFn = componentFn;
    callbacks.forEach((callback) => {
      const promise = Promise.resolve(callback()).then((result) => {
        if (result !== undefined) {
          _componentInitResults.set(componentFn, result);
        }
        return result;
      });
      _componentInitPromises.set(componentFn, promise);
    });
  }
  return _componentInitResults.get(componentFn);
}

/**
 * ## Get Init Result ##
 * @description - Get the result of the init function for a component
 * @param component - The component to get the result for.
 * @returns - The result of the init function for the component.
 */
function getInitResult<T>(component: Function, initFn: Function): T {
  const resultsMap = _componentInitResults.get(component);
  if (!resultsMap || !resultsMap.has(initFn)) {
    throw new Error('Init result not found for component');
  }
  const [value] = resultsMap.get(initFn)!;
  return value();
}
