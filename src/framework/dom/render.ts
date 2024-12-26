import { DOMElement, DOMNode, Props, VNode } from '../../core';

/**
 * Render the given VNode into the given container.
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
 * Mount a VNode to the DOM
 */
function mount(
	vnode: VNode,
	container: DOMElement,
	nextSibling: DOMNode | null = null,
): DOMNode {
	// Handle reactive components
	if (vnode.type === 'reactive-wrapper') {
		const child = vnode.props.children?.[0];
		if (!child) throw new Error('Reactive wrapper must have a child');

		// Store the component function reference
		child.props._componentFn = vnode.props._componentFn;

		const dom = mount(child, container, nextSibling);
		vnode._dom = dom;
		return dom;
	}

	// Handle function components
	if (typeof vnode.type === 'function') {
		return mountComponent(vnode, container, nextSibling);
	}

	// Create DOM element
	const dom =
		vnode.type === 'TEXT_ELEMENT'
			? document.createTextNode(vnode.props.nodeValue)
			: document.createElement(vnode.type);

	// Store references
	(dom as DOMElement)._vnode = vnode;
	vnode._dom = dom;

	// Handle properties
	if (dom instanceof HTMLElement) {
		updateProps(dom, {}, vnode.props);
	}

	// Mount children
	if (dom instanceof HTMLElement && vnode.props.children) {
		vnode.props.children.forEach((child) => mount(child, dom));
	}

	// Insert into DOM
	if (nextSibling) {
		container.insertBefore(dom, nextSibling);
	} else {
		container.appendChild(dom);
	}

	return dom;
}

/**
 * Update an existing VNode in the DOM
 */
function patch(container: DOMElement, oldVNode: VNode, newVNode: VNode) {
	// Handle reactive components
	if (
		oldVNode.type === 'reactive-wrapper' &&
		newVNode.type === 'reactive-wrapper'
	) {
		const oldChild = oldVNode.props.children?.[0];
		const newChild = newVNode.props.children?.[0];
		if (!oldChild || !newChild) return;

		// Store the component function reference
		const componentFn = newVNode.props._componentFn;

		// Check if we need to force update
		if (oldVNode.props._renderKey !== newVNode.props._renderKey) {
			const oldDom = findDom(oldVNode);
			const newDom = mount(newChild, container);
			if (oldDom) {
				oldDom.parentNode?.replaceChild(newDom, oldDom);
			}
			newVNode._dom = newDom;
			return;
		}

		patch(container, oldChild, newChild);
		newVNode._dom = oldVNode._dom;
		return;
	}

	// If types are different, replace the node
	if (oldVNode.type !== newVNode.type) {
		const oldDom = findDom(oldVNode);
		const newDom = mount(newVNode, container);
		if (oldDom) {
			oldDom.parentNode?.replaceChild(newDom, oldDom);
		}
		return;
	}

	// Update text nodes
	if (newVNode.type === 'TEXT_ELEMENT') {
		const dom = findDom(oldVNode);
		if (dom && oldVNode.props.nodeValue !== newVNode.props.nodeValue) {
			dom.nodeValue = newVNode.props.nodeValue;
		}
		newVNode._dom = dom!;
		return;
	}

	// Update regular elements
	const dom = findDom(oldVNode) as DOMElement;
	if (!dom) return;

	// Update props
	updateProps(dom, oldVNode.props, newVNode.props);
	newVNode._dom = dom;

	// Update children
	diffChildren(
		dom,
		oldVNode.props.children || [],
		newVNode.props.children || [],
	);
}

/**
 * Mount a component VNode
 */
function mountComponent(
	vnode: VNode,
	container: DOMElement,
	nextSibling: DOMNode | null = null,
): DOMNode {
	const ComponentFn = vnode.type as Function;
	const props = vnode.props;

	// Handle both class and function components
	const component = ComponentFn.prototype?.render
		? new (ComponentFn as any)(props)
		: ComponentFn(props);

	const renderedVNode =
		typeof component === 'function' ? component() : component.render();

	const dom = mount(renderedVNode, container, nextSibling);
	vnode._rendered = renderedVNode;
	vnode._dom = dom;
	return dom;
}

/**
 * Find the DOM node for a VNode
 */
function findDom(vnode: VNode): DOMNode | null {
	if (!vnode) return null;

	if (vnode._dom) return vnode._dom;

	if (vnode._rendered) {
		return findDom(vnode._rendered);
	}

	return null;
}

/**
 * Update props on a DOM element
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
 * Diff and update children
 */
function diffChildren(
	parentDom: HTMLElement,
	oldChildren: VNode[],
	newChildren: VNode[],
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
