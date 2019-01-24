import * as React from 'react';

import { ITranslateProps } from '../../namespace';
import { TContext } from '../../constants';

function i18nConnect<TProps>(
  WrappedComponent: React.ComponentType<TProps & ITranslateProps>,
): React.ComponentClass<TProps> {
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
