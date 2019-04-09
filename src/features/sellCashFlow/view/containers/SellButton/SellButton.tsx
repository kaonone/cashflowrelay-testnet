import * as React from 'react';
import { connect } from 'react-redux';

import { ITranslateProps, i18nConnect } from 'services/i18n';
import { IAppReduxState } from 'shared/types/app';
import { IToken } from 'shared/types/models';
import { ICommunication } from 'shared/types/redux';
import { CashFlowInfo, SellingPriceField } from 'shared/view/model';
import { DrawerModal } from 'shared/view/components';
import { Button, CircleProgressBar } from 'shared/view/elements';
import { useOnChangeState } from 'shared/helpers/react';
import { useRecommendedPrice } from 'shared/model/hooks';

import * as actions from './../../../redux/actions';
import * as selectors from './../../../redux/selectors';
import { StylesProps, provideStyles } from './SellButton.style';

interface IOwnProps {
  cashflow: IToken;
  disabled?: boolean;
}

interface IStateProps {
  selling: ICommunication;
}

type IActionProps = typeof mapDispatch;

type IProps = IStateProps & IActionProps & IOwnProps & StylesProps & ITranslateProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    selling: selectors.selectCommunication(state, 'selling'),
  };
}

const mapDispatch = {
  sell: actions.sell,
};

function SellButton(props: IProps) {
  const { cashflow, sell, disabled, selling, classes } = props;
  const [isOpenSellModal, setIsOpenSellModal] = React.useState(false);
  const [price, setPrice] = React.useState(0);

  const closeModal = React.useCallback(() => setIsOpenSellModal(false), []);
  const openModal = React.useCallback(() => setIsOpenSellModal(true), []);
  const onConfirm = React.useCallback(() => {
    sell({ cashflow, price });
  }, [price, cashflow, sell]);

  const { isLoading: isLoadingRecommendedPrice, recommendedPrice } = useRecommendedPrice(cashflow.id);

  useOnChangeState(
    props.selling.isRequesting,
    (prev, cur) => prev && !cur,
    () => setIsOpenSellModal(false),
  );

  useOnChangeState(
    isLoadingRecommendedPrice,
    (prev, cur) => prev && !cur,
    () => !!recommendedPrice && setPrice(recommendedPrice.avg.toNumber()),
  );

  return (
    <>
      <Button variant="contained" color="primary" onClick={openModal} disabled={disabled}>Sell cashflow</Button>
      <DrawerModal
        open={isOpenSellModal}
        title={cashflow.name}
        onClose={closeModal}
        actions={[(
          <Button
            variant="contained"
            color="primary"
            key=""
            fullWidth
            onClick={onConfirm}
            disabled={selling.isRequesting}
          >
            Sell cashflow
            {selling.isRequesting && <div className={classes.preloader}><CircleProgressBar size={22} /></div>}
          </Button>
        )]}
      >
        <>
          <SellingPriceField
            sellPrice={price}
            onChangeSellPrice={setPrice}
            disabled={isLoadingRecommendedPrice}
          />
          <CashFlowInfo
            recommendedPrice={
              recommendedPrice
                ? `${recommendedPrice.min.toString()} - ${recommendedPrice.max.toString()} DAI`
                : undefined
            }
            token={cashflow}
            fields={['instalmentSize', 'stakeSize', 'duration', 'firstInstalmentDate', 'lastInstalmentDate']}
          />
        </>
      </DrawerModal>
    </>
  );
}

export { SellButton };
export default (
  connect(mapState, mapDispatch)(
    i18nConnect(provideStyles(SellButton)),
  )
);
