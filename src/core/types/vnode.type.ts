/**
 * VNode is the basic building block of the Nexora Library.
 * It represents a virtual DOM node.
 */
export type VNode = {
	type: string | Function;
	props: Props;
	key: string | null;
	ref: any;
	_dom?: DOMNode;
	_rendered?: VNode;
};

/**
 * Props is the type for the properties of a VNode.
 */
export type Props = Record<string, any> & { children?: VNode[] };

/**
 * DOMElement is the type for the DOM element.
 */
export interface DOMElement extends HTMLElement {
	_vnode?: VNode;
	[key: string]: any;
}

/**
 * DOMNode is the type for the DOM node.
 */
export type DOMNode = HTMLElement | Text;
