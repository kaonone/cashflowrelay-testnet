import * as React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

import { provideStyles, StylesProps } from './DonutChart.style';
interface IOwnProps {
  segments: Array<{ name: string, value: number, color: string }>;
  withTooltip?: boolean;
}

type IProps = IOwnProps & StylesProps & { children: any };

function DonutChart(props: IProps) {
  const { classes, segments, children, withTooltip } = props;
  return (
    <div className={classes.root}>
      <div className={classes.content}>{children}</div>
      <ResponsiveContainer>
        <PieChart margin={{ left: 0, top: 0, bottom: 0, right: 0 }} >
          <Pie
            startAngle={90}
            endAngle={450}
            stroke={'none'}
            dataKey="value"
            data={segments}
            innerRadius={'85%'}
            outerRadius={'100%'}
            fill="#efefef"
          >
            {segments.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
          </Pie>
          {withTooltip && <Tooltip />}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default provideStyles(DonutChart);
