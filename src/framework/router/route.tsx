import { RouterNameSpace, VNode } from '../../core';
import { Nexora } from '../dom/nexora';
import { useRouter } from './router-provider';

/**
 * Route component
 * @param props - The properties for the Route component.
 * @returns The Route component.
 */
export function Route({ path, component: Component }: RouterNameSpace.RouteProps): VNode | null {
  const { getRouterContext } = useRouter();
  const { currentPath } = getRouterContext();

  const match = matchPath(path, currentPath);

  if (!match) {
    return null;
  }

  return <Component />;
}

function matchPath(pattern: string, path: string): boolean {
  const regexPattern = pattern.replace(/:[^\s/]+/g, '([^/]+)').replace(/\*/g, '.*');
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(path);
}
