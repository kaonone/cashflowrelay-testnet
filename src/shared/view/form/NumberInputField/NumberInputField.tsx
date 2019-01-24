import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { GetProps } from '_helpers';

import { ITranslateProps, i18nConnect } from 'services/i18n';
import { NumberInput } from 'shared/view/elements';
import { getFieldWithComponent } from 'shared/helpers/react';

type IProps = GetProps<typeof NumberInput> & FieldRenderProps & ITranslateProps;

class NumberInputField extends React.Component<IProps> {
  public render() {
    const { input, meta, t, locale, ...rest } = this.props;
    const error = typeof rest.error === 'boolean'
      ? rest.error && meta.error && t(meta.error)
      : meta.touched && meta.error && t(meta.error);
    return (
      <NumberInput {...rest} helperText={error} error={Boolean(error)} {...input} onChange={this.onChange} />
    );
  }

  private onChange: GetProps<typeof NumberInput>['onChange'] = value => this.props.input.onChange(value.floatValue);
}

export default getFieldWithComponent(i18nConnect(NumberInputField));
