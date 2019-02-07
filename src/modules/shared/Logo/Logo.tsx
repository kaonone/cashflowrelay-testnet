import * as React from 'react';
import { Link } from 'react-router-dom';

import { provideStyles, StylesProps } from './Logo.style';
import { Logo } from 'shared/view/elements/Icons';

interface IOwnProps {
  linkTo: string;
  viewType: 'row' | 'column';
  onlyIcon?: boolean;
}
type IProps = IOwnProps & StylesProps;

class HeaderLogo extends React.PureComponent<IProps> {
  public render() {
    const { classes, linkTo } = this.props;
    return (
      <Link className={classes.root} to={linkTo}>
        <Logo className={classes.logo} />
        <div className={classes.title}>Cashflow<br />Relay</div>
      </Link>
    );
  }
}

export { IProps };
export default provideStyles(HeaderLogo);
