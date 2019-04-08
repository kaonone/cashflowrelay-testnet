import * as React from 'react';
import { bind } from 'decko';

import { AccountAddress, ProfileMenu } from 'services/user';

import { StylesProps, provideStyles } from './Profile.style';
import ShowBalance from './ShowBalance/ShowBalance';

interface IState {
  isOpenMenu: boolean;
}

class Profile extends React.PureComponent<StylesProps> {
  public accountStatusRef = React.createRef<HTMLDivElement>();
  public state: IState = { isOpenMenu: false };

  public render() {
    const { classes } = this.props;
    const { isOpenMenu } = this.state;

    return (
      <>
        <div className={classes.root} ref={this.accountStatusRef}>
          <ShowBalance token="DAI" />
          <ShowBalance token="AKT" />
          <AccountAddress onClick={this.openMenu} />
        </div>
        <ProfileMenu
          open={isOpenMenu}
          onClose={this.closeMenu}
          anchor={this.accountStatusRef && this.accountStatusRef.current}
        />
      </>
    );
  }

  @bind
  public openMenu() {
    this.setState({ isOpenMenu: true });
  }

  @bind
  public closeMenu() {
    this.setState({ isOpenMenu: false });
  }
}

export default provideStyles(Profile);
