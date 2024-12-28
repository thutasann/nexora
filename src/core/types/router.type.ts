import { VNode } from './vnode.type';

/**
 * Router Types
 * @description The types for the Router component.
 */
export namespace RouterNameSpace {
  /**
   * Route properties
   * @description - The properties for the Router component.
   */
  export type RouteProps = {
    /**
     * The path to the component
     */
    path: string;
    /**
     * The component to render
     */
    component: () => VNode;
  };
  /**
   * Router context type
   * @description - The context type for the Router component.
   */
  export type RouterContextType = {
    /**
     * The current path
     */
    currentPath: string;
    /**
     * The params of the current path
     */
    params: Record<string, string>;
  };
  /**
   * Router properties
   * @description - The properties for the Router component.
   */
  export type RouterProps = {
    /**
     * The children of the Router component
     */
    children: VNode[];
  };
  /**
   * Route params type
   * @description - The type for the params of the route.
   */
  export type RouteParams = {
    /**
     * The params of the route
     */
    [key: string]: string;
  };
  /**
   * Link properties
   * @description - The properties for the Link component.
   */
  export type LinkProps = {
    /**
     * The path to navigate to
     */
    to: string;
    /**
     * The children of the Link component
     */
    children: VNode | string;
    /**
     * The class name of the Link component
     */
    className?: string;
  };
  /**
   * Router provider properties
   * @description - The properties for the RouterProvider component.
   */
  export type RouterProviderProps = {
    value: {
      getRouterContext: () => RouterContextType;
      setRouterContext: (value: RouterContextType | ((prev: RouterContextType) => RouterContextType)) => void;
    };
    children: VNode;
  };
}
