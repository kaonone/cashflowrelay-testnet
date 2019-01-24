import * as React from 'react';

import { AngleArrow } from 'shared/view/elements/Icons';

import { provideStyles, StylesProps } from './ProfileMenu.style';

class ProfileMenu extends React.PureComponent<StylesProps> {

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.avatar} />
        <div className={classes.name}>Klimov Pavel</div>
        <div className={classes.toggle}><AngleArrow className={classes.toggleIcon} /></div>
      </div>

    );
  }

}

export default provideStyles(ProfileMenu);
