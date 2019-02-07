import * as React from 'react';

import { provideStyles, StylesProps } from './GlobalLoader.style';
import { Logo } from '../Icons';
import { i18nConnect, ITranslateProps, tKeys } from 'services/i18n';

function GlobalLoader(props: StylesProps & ITranslateProps) {
  const { classes, t } = props;
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Logo className={classes.logo} />
        <div className={classes.spinner} >
          <div className={classes.circle} />
          <div className={classes.circle} />
          <div className={classes.circle} />
        </div>
        <div className={classes.message}>{t(tKeys.shared.makeSureUseKovan.getKey())}</div>
      </div>
    </div>
  );
}

export default i18nConnect(provideStyles(GlobalLoader));
