import * as React from 'react';
import { Omit } from '_helpers';
import { DrizzleContext, InjectDrizzleProps } from 'drizzle-react';

function withDrizzle<TProps extends InjectDrizzleProps>(
  WrappedComponent: React.ComponentType<TProps>,
): React.ComponentClass<Omit<TProps, keyof InjectDrizzleProps>> {
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  class WithDrizzle extends React.Component<TProps> {
    public static displayName: string = `withDrizzle(${wrappedComponentName})`;

    public render() {
      return (
        <DrizzleContext.Consumer>
          {(contextProps) => <WrappedComponent {...contextProps} {...this.props} />}
        </DrizzleContext.Consumer>
      );
    }
  }
  return WithDrizzle;
}

export { InjectDrizzleProps };
export default withDrizzle;
