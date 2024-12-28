import { RouterNameSpace, VNode } from '../../core';
import { Nexora } from '../dom/nexora';
import { createState } from '../state/reactive-state';
import { RouterProvider } from './router-provider';

/**
 * Router component
 * @description - The Router component is used to manage the routing of the application.
 * @param children - The children of the Router component.
 * @returns The Router component.
 */
export function Router({ children }: RouterNameSpace.RouterProps): VNode {
  console.log('Router');
  const [getRouterContext, setRouterContext] = createState<RouterNameSpace.RouterContextType>({
    currentPath: window.location.pathname,
    params: {},
  });

  const handlePopState = () => {
    setRouterContext((prev) => ({
      ...prev,
      currentPath: window.location.pathname,
    }));
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('popstate', handlePopState);
  }

  return (
    <RouterProvider value={{ getRouterContext, setRouterContext }}>
      <div>{children}</div>
    </RouterProvider>
  );
}
