export function render(vnode: any, container: HTMLElement) {
	if (vnode.type === 'TEXT_ELEMENT') {
		const textNode = document.createTextNode(vnode.props.nodeValue);
		container.appendChild(textNode);
		return;
	}

	const element = document.createElement(vnode.type);

	// Set properties
	Object.keys(vnode.props)
		.filter((key) => key !== 'children')
		.forEach((name) => {
			element[name] = vnode.props[name];
		});

	// Render children
	vnode.props.children.forEach((child: any) => render(child, element));

	container.appendChild(element);
}
