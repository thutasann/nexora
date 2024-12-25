export function createElement(
	tag: string,
	props: Record<string, any>,
	...children: any[]
) {
	return { tag, props, children };
}

export function render(vdom: any, container: HTMLElement) {
	if (typeof vdom === 'string') {
		container.appendChild(document.createTextNode(vdom));
		return;
	}

	const el = document.createElement(vdom.tag);
	Object.entries(vdom.props || {}).forEach(([key, value]) =>
		el.setAttribute(key, value),
	);
	vdom.children.forEach((child: any) => render(child, el));
	container.appendChild(el);
}
