import { Props, VNode } from '../../core';

/**
 * Creates a VNode from the given arguments.
 * @param type - The type of the VNode.
 * @param props - The properties of the VNode.
 * @param children - The children of the VNode.
 * @returns The created VNode.
 */
export function createElement(
	type: string | Function,
	props: Props | null,
	...children: any[]
): VNode {
	const filteredChildren = children
		.flat()
		.filter((child) => child !== null && child !== undefined);

	/** convert primitive children to text nodes */
	const normalizedChildren = filteredChildren.map((child) =>
		typeof child === 'string' || typeof child === 'number'
			? createTextElement(child)
			: child,
	);

	return {
		type,
		props: {
			...props,
			children: normalizedChildren,
		},
		key: props?.key ?? null,
		ref: props?.ref ?? null,
	};
}

/**
 * Creates a text VNode from the given text.
 * @private
 * @param text - The text to create a VNode from.
 * @returns The created VNode.
 */
function createTextElement(text: string | number): VNode {
	return {
		type: 'TEXT_ELEMENT',
		props: {
			nodeValue: text,
			children: [],
		},
		key: null,
		ref: null,
	};
}
