import { Component, shallowEqual } from '../../core';

/**
 * Freeze a component to prevent unnecessary re-renders
 * @param Component - The component to freeze
 * @returns A new component that only updates when props change
 */
export function freeze<P = {}>(Component: Component<P>): Component<P> {
  let prevProps: P | null = null;

  return (props: P) => {
    if (!props && !prevProps) {
      return Component(props);
    }

    const shouldUpdate = !prevProps || !shallowEqual(prevProps, props);

    if (shouldUpdate) {
      prevProps = { ...props };
      return Component(props);
    }

    return null;
  };
}
