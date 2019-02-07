import * as React from 'react';

import { i18nConnect, ITranslateProps, tKeys as tKeysAll } from 'services/i18n';
import { DonutChart } from 'shared/view/elements';
import { toFixed } from 'shared/helpers/integer';

import { provideStyles, StylesProps } from './InstalmentsChart.style';

const tKeys = tKeysAll.features.manageCashFlows;

interface IOwnProps {
  totalInstalments: number;
  payed: number;
  due: number;
  missed: number;
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

function InstalmentsChart(props: IProps) {
  const { classes, t, payed, due, missed, totalInstalments, theme } = props;

  const completionPercent = (payed + due + missed) / totalInstalments * 100;

  const segments = completionPercent ? [
    { name: 'Timely instalments', value: payed, color: theme!.extra.colors.apple },
    { name: 'Under 30 days late instalments', value: due, color: theme!.extra.colors.buttercup },
    { name: 'Over 30 days late instalments', value: missed, color: theme!.extra.colors.monza },
  ]
    : [{ name: '', value: 1, color: theme!.extra.colors.alabaster }];
  return (
    <div className={classes.root}>
      <DonutChart segments={segments} withTooltip={!!completionPercent} >
        <div className={classes.content}>
          <div className={classes.title}>
            {t(
              tKeys.howMuchInstalmentIsComplete.getKey(),
              { amount: toFixed(completionPercent, 0) },
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
