import * as React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import { IAppReduxState } from 'shared/types/app';
import { BreakpointType } from 'shared/styles/breakpoints';

import * as selectors from './../../../redux/selectors';
import { StylesProps, provideStyles } from './Adaptive.style';

interface IOwnProps {
  from?: BreakpointType;
  to?: BreakpointType;
  className?: string;
  children: React.ReactNode;
}

interface IStateProps {
  hydrated: boolean;
}

type IProps = IStateProps & IOwnProps & StylesProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    hydrated: selectors.selectHydrated(state),
  };
}

// TODO ds: remove react-responsive, after react-hooks release https://material-ui.com/layout/use-media-query/

class Adaptive extends React.PureComponent<IProps> {
  public render() {
    const { classes, theme, from = '', to = '', className, hydrated, children } = this.props;

    const fromQuery = theme && from && theme.extra.breakpoints.up(from).split(' ')[1];
    const toQuery = theme && to && theme.extra.breakpoints.down(to).split(' ')[1];
    const query = [fromQuery, toQuery].filter(Boolean).join(' and ');

    const adaptClasses = cn(classes.root, {
      [classes[`from${from.toUpperCase()}`]]: !!from,
      [classes[`to${to.toUpperCase()}`]]: !!to,
    });

    const finalClassName = cn(
      className,
      hydrated ? undefined : adaptClasses,
    );

    const wrappedChildren = <div className={finalClassName}>{children}</div>;

    return hydrated ? <MediaQuery query={query}>{wrappedChildren}</MediaQuery> : wrappedChildren;
  }
}

export { IProps };
export default (
  connect(mapState)(
    provideStyles(Adaptive),
  )
);
