declare namespace JSX {
	interface Element {
		type?: any;
		props?: any;
		children?: any;
	}

	interface IntrinsicElements {
		[elemName: string]: any;
	}
}

declare module 'revo' {
	export const Revo: (type: any, props: any, ...children: any[]) => JSX.Element;
	export const Fragment: symbol;
	export function render(
		element: JSX.Element,
		container: HTMLElement | null,
	): void;
}
