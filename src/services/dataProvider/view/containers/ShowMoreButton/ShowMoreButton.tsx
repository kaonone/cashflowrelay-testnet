import * as React from 'react';

import { ITranslateProps, i18nConnect, tKeys } from 'services/i18n';

import { IPaginationToChildrenProps } from 'shared/types/models';
import { Button, CircleProgressBar } from 'shared/view/elements';
import { Arrow } from 'shared/view/elements/Icons';

import { StylesProps, provideStyles } from './ShowMoreButton.style';

interface IOwnProps {
  pagination: IPaginationToChildrenProps;
  loading: boolean;
  fullWidth?: boolean;
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

function ShowMoreButton(props: IProps) {
  const { pagination, loading, classes, t, locale, ...restProps } = props;
  const { perPage, total, loadMore } = pagination;
  const isDisabled = loading || perPage >= total;
  return (
    <Button {...restProps} color="primary" variant="outlined" onClick={loadMore} disabled={isDisabled}>
      {t(tKeys.services.dataProvider.showMoreButton.getKey())}
      <div className={classes.icon}>
        {loading
          ? <CircleProgressBar size={22} />
          : <Arrow />
        }
      </div>
    </Button>
  );
}

export default i18nConnect(provideStyles(ShowMoreButton));
