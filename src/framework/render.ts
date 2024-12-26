import { DOMElement, DOMNode, Props, VNode } from '../core';

/**
 * Render the given VNode into the given container.
 * @description This function is the entry point for the renderer.
 * @param vnode - The VNode to render.
 * @param container - The container to render the VNode into.
 */
export function render(vnode: VNode, container: DOMElement) {
	const prevNode = container._vnode;

	// If there's a previous tree, perform diffing
	if (prevNode) {
		patch(container, prevNode, vnode);
	} else {
		mount(vnode, container);
	}

	// Store the current vnode for future diffing
	container._vnode = vnode;
}

/**
 * Mount the given VNode into the given container.
 * @param vnode - The VNode to mount.
 * @param container - The container to mount the VNode into.
 * @param nextSibling - The next sibling to mount the VNode after.
 * @returns The mounted DOM node.
 */
function mount(
	vnode: VNode,
	container: DOMElement,
	nextSibling: DOMNode | null = null,
): DOMNode {
	if (typeof vnode.type === 'function') {
		return mountComponent(vnode, container, nextSibling);
	}

	const dom =
		vnode.type === 'TEXT_ELEMENT'
			? document.createTextNode(vnode.props.nodeValue)
			: document.createElement(vnode.type);

	// Store vnode reference for future updates
	(dom as DOMElement)._vnode = vnode;
	vnode._dom = dom;

	// Handle properties
	if (dom instanceof HTMLElement) {
		updateProps(dom, {}, vnode.props);
	}

	// Mount children
	if (dom instanceof HTMLElement) {
		vnode.props.children?.forEach((child) => mount(child, dom));
	}

	if (nextSibling) {
		container.insertBefore(dom, nextSibling);
	} else {
		container.appendChild(dom);
	}

	return dom;
}

/**
 * Patch the given VNode into the given container.
 * @param container - The container to patch the VNode into.
 * @param oldVNode - The old VNode to patch.
 * @param newVNode - The new VNode to patch.
 */
function patch(container: DOMElement, oldVNode: VNode, newVNode: VNode) {
	// If types are different, unmount and mount
	if (oldVNode.type !== newVNode.type) {
		const oldDom = findDom(oldVNode);
		const newDom = mount(newVNode, container);
		oldDom?.parentNode?.replaceChild(newDom as Node, oldDom);
		return;
	}

	// Update props
	const dom = findDom(oldVNode);
	if (dom) {
		updateProps(dom as DOMElement, oldVNode.props, newVNode.props);
	}

	// Diff children
	diffChildren(
		dom as HTMLElement,
		oldVNode.props.children,
		newVNode.props.children,
	);
}

/**
 * Mount the given component VNode into the given container.
 * @param vnode - The component VNode to mount.
 * @param container - The container to mount the component VNode into.
 * @param nextSibling - The next sibling to mount the component VNode after.
 * @returns The mounted DOM node.
 */
function mountComponent(
	vnode: VNode,
	container: DOMElement,
	nextSibling: DOMNode | null = null,
): DOMNode {
	// Handle both class and function components
	const component =
		typeof vnode.type === 'function'
			? vnode.type.prototype?.render
				? new (vnode.type as any)(vnode.props)
				: (vnode.type as any)(vnode.props)
			: null;

	if (!component) {
		throw new Error('Invalid component type');
	}

	const renderedVNode =
		typeof component === 'function' ? component() : component.render();
	const dom = mount(renderedVNode, container, nextSibling);
	vnode._rendered = renderedVNode;
	return dom;
}

/**
 * Find the DOM node for the given VNode.
 * @param vnode - The VNode to find the DOM node for.
 * @returns The DOM node or null if not found.
 */
function findDom(vnode: VNode): DOMNode | null {
	if (!vnode) return null;

	if (typeof vnode.type === 'function') {
		return findDom(vnode._rendered!);
	}

	return vnode._dom || null;
}

/**
 * Update the properties of the given DOM element.
 * @param dom - The DOM element to update.
 * @param oldProps - The old properties.
 * @param newProps - The new properties.
 */
function updateProps(dom: DOMElement, oldProps: Props, newProps: Props) {
	// Remove old properties
	Object.keys(oldProps).forEach((key) => {
		if (key !== 'children' && !(key in newProps)) {
			if (key.startsWith('on')) {
				const eventType = key.toLowerCase().substring(2);
				dom.removeEventListener(eventType, oldProps[key]);
			} else {
				dom[key] = '';
			}
		}
	});

	// Set new properties
	Object.keys(newProps).forEach((key) => {
		if (key !== 'children' && oldProps[key] !== newProps[key]) {
			if (key.startsWith('on')) {
				const eventType = key.toLowerCase().substring(2);
				if (oldProps[key]) {
					dom.removeEventListener(eventType, oldProps[key]);
				}
				dom.addEventListener(eventType, newProps[key]);
			} else {
				dom[key] = newProps[key];
			}
		}
	});
}

/**
 * Diff the children of the given DOM element.
 * @param parentDom - The DOM element to diff the children of.
 * @param oldChildren - The old children.
 * @param newChildren - The new children.
 */
function diffChildren(
	parentDom: HTMLElement,
	oldChildren: VNode[] = [],
	newChildren: VNode[] = [],
) {
	const maxLength = Math.max(oldChildren.length, newChildren.length);

	for (let i = 0; i < maxLength; i++) {
		const oldChild = oldChildren[i];
		const newChild = newChildren[i];

		if (!newChild && oldChild) {
			// Remove old child
			const oldChildDom = findDom(oldChild);
			if (oldChildDom) {
				parentDom.removeChild(oldChildDom);
			}
		} else if (!oldChild && newChild) {
			// Add new child
			mount(newChild, parentDom);
		} else if (oldChild && newChild) {
			// Update existing child
			patch(parentDom, oldChild, newChild);
		}
	}
}
