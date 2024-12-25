/**
 * Revo JSX Factory
 */
export function Revo(type: string | Function, props: any, ...children: any[]) {
	if (typeof type === 'function') {
		return type({ ...props, children });
	}

	return {
		type,
		props: {
			...props,
			children: children.map((child) =>
				typeof child === 'object'
					? child
					: { type: 'TEXT_ELEMENT', props: { nodeValue: child } },
			),
		},
	};
}
