import * as React from 'react';
import { Omit, GetProps } from '_helpers';
import { bind } from 'decko';

import { ISliderItemProps } from './SliderItem';
import BaseSlider from './BaseSlider/BaseSlider';

interface IOwnProps {
  children: Array<React.ReactElement<ISliderItemProps>>;
  value: string;
  formatLabel?(item: { value: string, label?: string }): string;
  onChange?(event: React.ChangeEvent<{}>, value: string): void;
}

type IProps = IOwnProps & Omit<GetProps<typeof BaseSlider>, 'classes' | 'onChange' | 'value' | 'formatLabel'>;

class SliderSelect extends React.Component<IProps> {
  public render() {
    const { value: _value, formatLabel, onChange, ...restProps } = this.props;
    this.checkPropsConsistency();
    const range = this.getRange();
    const value = this.getValue();
    return (
      <BaseSlider
        {...restProps}
        {...range}
        value={value}
        onChange={this.onChange}
        formatLabel={formatLabel && this.formatLabel}
      />
    );
  }

  @bind
  private formatLabel(value: number): React.ReactText {
    const { formatLabel } = this.props;
    if (!formatLabel) { return ''; }
    const item = this.getItems()[value];
    if (!item) { return ''; }
    return formatLabel({ value: item.value, label: item.children });
  }

  private getRange(): { min?: number; max?: number, step?: number } {
    return { min: 0, max: this.getItems().length - 1, step: 1 };
  }

  private getValue(): number {
    const { value } = this.props;
    const index = this.getItems().findIndex(item => item.value === value);
    return Math.max(0, index);
  }

  @bind
  private onChange(event: React.ChangeEvent<{}>, value: number) {
    const { onChange } = this.props;
    if (!onChange) { return; }

    const nextValue = (this.getItems()[value] || {}).value;
    onChange(event, nextValue);
  }

  private getItems(): ISliderItemProps[] {
    const childrenProps: ISliderItemProps[] = React.Children.toArray(this.props.children)
      .map((child: React.ReactElement<ISliderItemProps>) => child.props);
    return childrenProps;
  }

  private checkPropsConsistency() {
    const { children } = this.props;

    children && React.Children.toArray(children).some((child: React.ReactElement<ISliderItemProps>) => {
      const isUnsuitableChild = !child || !child.props || !child.props.value;
      isUnsuitableChild && console.error('`SliderSelect` `children` contains unsuitable child');
      return isUnsuitableChild;
    });
  }
}

export { IProps };
export default SliderSelect;
