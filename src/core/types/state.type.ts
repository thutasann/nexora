/**
 * The state namespace.
 */
export namespace State {
	/**
	 * The state id type.
	 */
	export type StateId = string;

	/**
	 * The component id type.
	 */
	export type ComponentId = string;

	/**
	 * The subscriber type.
	 */
	export type Subscriber = () => void;

	/**
	 * The state tracker type.
	 */
	export type StateTracker = {
		/**
		 * The value of the state.
		 */
		value: any;

		/**
		 * The components that are subscribed to the state.
		 */
		components: Set<ComponentId>;

		/**
		 * The subscribers of the state.
		 */
		subscribers: Set<Subscriber>;
	};

	/**
	 * The return type of the `createState` function.
	 */
	export type CreateStateReturnType<T> = [() => T, (newValue: T) => void];
}
