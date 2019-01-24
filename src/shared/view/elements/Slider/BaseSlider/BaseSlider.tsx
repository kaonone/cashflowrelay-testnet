import * as React from 'react';
import { Omit } from '_helpers';
import MuiSlider, { SliderProps } from '@material-ui/lab/Slider';
import { StylesProps, provideStyles } from './BaseSlider.style';

interface IOwnProps {
  value: number;
  formatLabel?(value: number): React.ReactText;
}

type IProps = IOwnProps & Omit<SliderProps, 'classes' | 'value'> & StylesProps;

class BaseSlider extends React.Component<IProps> {
  public render() {
    const { classes, formatLabel, ...restProps } = this.props;
    const thumb = (
      <div className={classes.runnerWrapper}>
        <div className={classes.runner} />
      </div>
    );
    return (
      <div className={classes.root}>
        <MuiSlider
          {...restProps}
          classes={{
            thumb: classes.thumb,
            track: classes.track,
            trackAfter: classes.trackAfter,
          }}
          thumb={thumb}
        />
        {formatLabel && (
          <div className={classes.labels}>
            <span>{formatLabel(restProps.min || 0)}</span>
            <span>{formatLabel(restProps.max || 100)}</span>
          </div>
        )}
      </div>
    );
  }
}

export { IProps };
export default provideStyles(BaseSlider);
