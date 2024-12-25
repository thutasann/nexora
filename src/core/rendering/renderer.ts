import { VNode } from '../../types/vdom.type';

export function render(vnode: VNode, container: HTMLElement): void {
	if (typeof vnode === 'string' || typeof vnode === 'number') {
		container.appendChild(document.createTextNode(String(vnode)));
		return;
	}

	if (typeof vnode.type === 'function') {
		const component = vnode.type as Function;
		const renderedVNode = component(vnode.props);
		render(renderedVNode, container);
		return;
	}

	const dom = document.createElement(vnode.type as string);

	if (vnode.props) {
		Object.keys(vnode.props).forEach((key) => {
			if (key === 'children') return;
			(dom as any)[key] = vnode.props[key];
		});
	}

	vnode.props.children.forEach((child: VNode) => render(child, dom));
	container.appendChild(dom);
}
