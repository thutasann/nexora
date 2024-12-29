import { OnInit } from '../../core';
import { reactive } from '../state';

/**
 * ## Component Init Callbacks Map ##
 * Store init callbacks for each component
 */
const _componentInitCallbacks: OnInit.ComponentInitMap = new Map();
const _componentInitResults: WeakMap<Function, any> = new WeakMap();
const _componentInitPromises: WeakMap<Function, Promise<any>> = new WeakMap();

/**
 * ## onInit Lifecycle ##
 * @description - This function is used to register an init callback for a component.
 * @param callback - The callback to be executed when the component is initialized.
 */
export function onInit(initFn: () => Promise<any>) {
  const currentComponent = reactive.currentComponentFn;
  if (!currentComponent) {
    throw new Error('onInit must be called within a component');
  }

  if (!_componentInitCallbacks.has(currentComponent)) {
    _componentInitCallbacks.set(currentComponent, []);
  }

  _componentInitCallbacks.get(currentComponent)?.push(initFn);

  if (!_componentInitResults.has(currentComponent)) {
    _componentInitResults.set(currentComponent, reactive.createState(null));
    initFn().then((result) => {
      const [_, setResult] = _componentInitResults.get(currentComponent)!;
      setResult(result);
      reactive.triggerUpdate(currentComponent);
    });
  }
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
          reactive.triggerUpdate(componentFn);
        }
        return result;
      });
      _componentInitPromises.set(componentFn, promise);
    });
  }
  return _componentInitResults.get(componentFn);
}

export function getInitResult<T>(component: Function): T | null {
  const signal = _componentInitResults.get(component);
  if (!signal) {
    return null;
  }
  const [value] = signal;
  return value();
}
