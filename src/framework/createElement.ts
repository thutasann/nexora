export type VNode = {
	type: string | Function;
	props: Record<string, any>;
};

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
