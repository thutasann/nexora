import { VNode } from './vnode.type';

/**
 * Props interface represents the base properties that all components can receive
 */
export type FreezeProps = {
  children?: VNode[];
  [key: string]: any;
};

/**
 * Component type repr=esents a functional component in Nexora
 * It takes generic type P (extends Props) for component props
 * Returns either a VNode or null
 */
export type Component<P = FreezeProps> = (props: P) => VNode | null;
