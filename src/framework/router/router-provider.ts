import { RouterNameSpace, VNode } from '../../core';

/**
 * Current router context
 * @description - The current router context.
 */
let currentRouterContext: RouterNameSpace.RouterProviderProps['value'] | null = {
  getRouterContext: () => ({
    currentPath: window.location.pathname,
    params: {},
  }),
  setRouterContext: () => {},
};

/**
 * Router provider component
 * @description - The Router provider component is used to provide the router context to the application.
 * @param value - The value of the router context.
 * @param children - The children of the Router provider component.
 * @returns The Router provider component.
 */
export function RouterProvider({ value, children }: RouterNameSpace.RouterProviderProps): VNode {
  currentRouterContext = value;
  return children;
}

/**
 * Use router hook
 * @description - The useRouter hook is used to get the router context.
 * @returns The router context.
 */
export function useRouter() {
  if (!currentRouterContext) {
    throw new Error('useRouter must be used within a Router');
  }
  return currentRouterContext;
}

/**
 * Navigate to a new path
 * @description - The navigate function is used to navigate to a new path.
 * @param to - The path to navigate to.
 */
export function navigate(to: string) {
  window.history.pushState({}, '', to);
  const router = useRouter();
  router.setRouterContext((prev) => ({
    ...prev,
    currentPath: to,
  }));
}
