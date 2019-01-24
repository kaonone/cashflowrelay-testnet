import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { GetProps } from '_helpers';

import { ITranslateProps, i18nConnect } from 'services/i18n';
import { MaskedInput } from 'shared/view/elements';
import { getFieldWithComponent } from 'shared/helpers/react';

type IProps = GetProps<typeof MaskedInput> & FieldRenderProps & ITranslateProps;

function MaskedInputField(props: IProps) {
  const { input, meta, t, locale, ...rest } = props;
  const error = typeof rest.error === 'boolean'
    ? rest.error && meta.error && t(meta.error)
    : meta.touched && meta.error && t(meta.error);
  return (
    <MaskedInput {...rest} helperText={error} error={Boolean(error)} {...input} />
  );
}

export default getFieldWithComponent(i18nConnect(MaskedInputField));
