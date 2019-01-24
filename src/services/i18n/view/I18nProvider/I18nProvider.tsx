import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as Polyglot from 'node-polyglot';

import { IAppReduxState } from 'shared/types/app';
import { withProps } from 'shared/helpers/react';

import { ITranslateFunction, Lang, ITranslateKey } from '../../namespace';
import * as selectors from '../../redux/selectors';
import { DEFAULT_LANGUAGE, TContext } from '../../constants';
import { phrasesByLocale as phrases } from '../../locales';

interface IOwnProps {
  phrasesByLocale: typeof phrases;
}

interface IStateProps {
  locale: Lang;
}

type IProps = IStateProps & IOwnProps;

class I18nProvider extends React.Component<IProps> {
  public polyglot: Polyglot = new Polyglot({
    locale: DEFAULT_LANGUAGE,
    phrases: this.props.phrasesByLocale[DEFAULT_LANGUAGE],
  });

  public state = { translator: makeTranslator(this.polyglot) };

  public componentDidUpdate(prevProps: IProps) {
    const { locale, phrasesByLocale } = this.props;
    if (prevProps.locale !== locale || prevProps.phrasesByLocale !== phrasesByLocale) {
      this.polyglot.locale(locale);
      this.polyglot.replace(phrasesByLocale[locale]);
      this.setState({ translator: makeTranslator(this.polyglot) });
    }
  }

  public render() {
    const { children, locale } = this.props;
    return <TContext.Provider value={{ t: this.state.translator, locale }}>{children}</TContext.Provider>;
  }
}

function makeTranslator(polyglot: Polyglot): ITranslateFunction {
  return (phrase: ITranslateKey, smartCountOrInterpolationOptions?: number | Polyglot.InterpolationOptions) => {
    if (typeof phrase === 'string') {
      return polyglot.t(phrase, smartCountOrInterpolationOptions as any);
    }
    return polyglot.t(phrase.key, phrase.params);
  };
}

function mapState(state: IAppReduxState) {
  return {
    locale: selectors.selectCurrentLocale(state),
  };
}

export default (
  withRouter(// needed for rerendering on route change
    withProps(
      connect(mapState)(I18nProvider), { phrasesByLocale: phrases },
    ),
  )
);
