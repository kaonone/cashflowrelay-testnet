import * as React from 'react';
import { Omit } from '_helpers';

import { ITranslateProps } from '../../namespace';
import { TContext } from '../../constants';

function i18nConnect<TProps extends ITranslateProps>(
  WrappedComponent: React.ComponentType<TProps>,
): React.ComponentClass<Omit<TProps, keyof ITranslateProps>> {
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  class I18nConnector extends React.Component<TProps> {
    public static displayName: string = `I18nConnect(${wrappedComponentName})`;

    public render() {
      return (
        <TContext.Consumer>
          {(contextProps) => <WrappedComponent {...contextProps} {...this.props} />}
        </TContext.Consumer>
      );
    }
  }
  return I18nConnector;
}

export { i18nConnect };
