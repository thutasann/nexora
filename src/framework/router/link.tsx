import { RouterNameSpace, VNode } from '../../core';
import { Nexora } from '../dom/nexora';
import { navigate } from './router-provider';

/**
 * Link component
 * @param props - The properties for the Link component.
 * @returns The Link component.
 */
export function Link({ to, children, className }: RouterNameSpace.LinkProps): VNode {
  const handleClick = (e: Event) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
