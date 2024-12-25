import { VNode } from '../../types/vdom.type';

export function createElement(
	type: string | Function,
	props: Record<string, any> | null,
	...children: any[]
): VNode {
	return {
		type,
		props: { ...props, children },
	};
}
