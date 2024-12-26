/**
 * VNode is the basic building block of the Nexora Library.
 * It represents a virtual DOM node.
 */
export type VNode = {
  /**
   * The type of the VNode.
   */
  type: string | Function;
  /**
   * The properties of the VNode.
   */
  props: Props;
  /**
   * The key of the VNode.
   */
  key: string | null;
  /**
   * The ref of the VNode.
   */
  ref: any;
  /**
   * The DOM node of the VNode.
   */
  _dom?: DOMNode;
  /**
   * The rendered VNode of the VNode.
   */
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
  /**
   * The VNode of the DOM element.
   */
  _vnode?: VNode;
  /**
   * The key of the DOM element.
   */
  [key: string]: any;
}

/**
 * DOMNode is the type for the DOM node.
 */
export type DOMNode = HTMLElement | Text;
