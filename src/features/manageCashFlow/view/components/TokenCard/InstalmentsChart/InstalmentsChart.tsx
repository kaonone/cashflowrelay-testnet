import * as React from 'react';

import { provideStyles, StylesProps } from './InstalmentsChart.style';
import { i18nConnect, ITranslateProps, tKeys as tKeysAll } from 'services/i18n';
import { DonutChart } from 'shared/view/elements';

const tKeys = tKeysAll.features.manageCashFlows;

interface IOwnProps {
  totalInstalments: number;
  payed: number;
  waiting: number;
  overdue: number;
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

function InstalmentsChart(props: IProps) {
  const { classes, t, payed, waiting, overdue, totalInstalments, theme } = props;

  const completionPercent = (payed + waiting + overdue) / totalInstalments * 100;

  const segments = completionPercent ? [
    { name: 'payed', value: payed, color: theme!.extra.colors.apple },
    { name: 'waiting', value: waiting, color: theme!.extra.colors.buttercup },
    { name: 'overdue', value: overdue, color: theme!.extra.colors.monza },
  ]
    : [{ name: '', value: 1, color: theme!.extra.colors.alabaster }];
  return (
    <div className={classes.root}>
      <DonutChart segments={segments} withTooltip={!!completionPercent}>
        <div className={classes.content}>
          <div className={classes.title}>
            {t(
              tKeys.howMuchInstalmentIsComplete.getKey(),
              { amount: completionPercent },
            )}
          </div>
          <div className={classes.progress}>
            <div className={classes.progressValue} style={{ width: `${completionPercent}%` }} />
          </div>
        </div>
      </DonutChart>
    </div>
  );
}

export default i18nConnect(provideStyles(InstalmentsChart));
