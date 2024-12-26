import { DOMElement, VNode } from '../../core/types';
import { render } from '../dom/render';

class ReactiveState {
	private states: Map<Function, Map<number, any>> = new Map();
	private stateIndexes: Map<Function, number> = new Map();
	private currentComponentFn: Function | null = null;
	private rootElement: DOMElement | null = null;

	createState<T>(
		initialValue: T,
	): [() => T, (newValue: T | ((prev: T) => T)) => void] {
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
			const nextValue =
				typeof newValue === 'function'
					? (newValue as (prev: T) => T)(currentValue)
					: newValue;

			if (Object.is(currentValue, nextValue)) {
				return;
			}

			states.set(stateIndex, nextValue);

			if (this.rootElement) {
				const rootVNode = this.rootElement._vnode;
				if (!rootVNode) return;

				const rootComponentFn = rootVNode.props._componentFn;
				if (!rootComponentFn) return;

				queueMicrotask(() => {
					// Reset state index
					this.stateIndexes.set(componentFn, 0);
					const newVNode = this.renderComponent(rootComponentFn);
					render(newVNode, this.rootElement!);
				});
			}
		};

		return [getState, setState];
	}

	renderComponent(ComponentFn: Function): VNode {
		if (!this.rootElement) {
			this.rootElement = document.getElementById('app') as DOMElement;
		}

		const prevComponent = this.currentComponentFn;
		this.currentComponentFn = ComponentFn;

		try {
			this.stateIndexes.set(ComponentFn, 0);

			const result =
				typeof ComponentFn === 'function' ? ComponentFn() : ComponentFn;

			const finalResult = typeof result === 'function' ? result() : result;

			return {
				type: 'reactive-wrapper',
				props: {
					children: [finalResult],
					_componentFn: ComponentFn,
					_renderKey: Date.now(),
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
