import { OnInit } from '../../core';
import { reactive } from '../state';

/**
 * ## Component Init Callbacks Map ##
 * Store init callbacks for each component
 */
const _componentInitCallbacks: OnInit.ComponentInitMap = new Map();

/**
 * ## onInit Lifecycle ##
 * - Register an init callback for a component
 * @param callback - The callback to be executed when the component is initialized.
 */
export function onInit(callback: OnInit.InitCallback) {
  const currentComponent = reactive.currentComponentFn;
  if (!currentComponent) {
    throw new Error('onInit must be called within a component');
  }

  if (!_componentInitCallbacks.has(currentComponent)) {
    _componentInitCallbacks.set(currentComponent, []);
  }

  _componentInitCallbacks.get(currentComponent)?.push(callback);
}

/**
 * ## Execute Init Callbacks ##
 * @description Execute the init callbacks for a component
 * @param componentFn - The component function to execute the callbacks for.
 */
export function executeInitCallbacks(componentFn: Function) {
  const callbacks = _componentInitCallbacks.get(componentFn);
  if (callbacks) {
    callbacks.forEach((callback) => callback());
  }
}
