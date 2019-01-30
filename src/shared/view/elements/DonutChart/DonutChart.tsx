import * as React from 'react';
import PieChart from 'react-minimal-pie-chart';

import { provideStyles, StylesProps } from './DonutChart.style';
interface IOwnProps {
  title: string;
  total: number;
  segments: Array<{ color: string, value: number }>;
}

type IProps = IOwnProps & StylesProps;

function DonutChart(props: IProps) {
  const { classes, segments, total, theme, title } = props;
  return (
    <div className={classes.root}>
      <PieChart
        data={[{ value: 1, color: theme!.extra.colors.silver }]}
        startAngle={-90}
        lineWidth={10}
        totalValue={1}
      />
      <div className={classes.values}>
        <PieChart
          data={segments}
          startAngle={-90}
          lineWidth={10}
          totalValue={total}
        />
      </div>
      <div className={classes.title}>{title}</div>
    </div>
  );
}

export default provideStyles(DonutChart);
