import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { bind } from 'decko';
import { GetProps, Omit } from '_helpers';

import { SliderSelect } from 'shared/view/elements';
import { getFieldWithComponent } from 'shared/helpers/react';

type IProps = Omit<GetProps<typeof SliderSelect>, 'value'> & FieldRenderProps;

class SliderSelectField extends React.Component<IProps> {
  public render() {
    const { input, meta, ...rest } = this.props;
    return (
      <SliderSelect {...rest} {...input} onChange={this.onChange} />
    );
  }

  @bind
  private onChange(_event: React.ChangeEvent<{}>, value: string) {
    this.props.input.onChange(value);
  }
}

export default getFieldWithComponent(SliderSelectField);
