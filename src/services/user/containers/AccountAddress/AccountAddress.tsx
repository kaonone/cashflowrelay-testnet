import * as React from 'react';
import { connect } from 'react-redux';

import { IAppReduxState } from 'shared/types/app';
import { Button } from 'shared/view/elements';
import { shortenString } from 'shared/helpers/format';
import { AngleArrow } from 'shared/view/elements/Icons';

import * as selectors from './../../redux/selectors';
import { provideStyles, StylesProps } from './AccountAddress.style';

interface IOwnProps {
  onClick(): void;
}
interface IStateProps {
  confirmedAddress: string | null;
}

type IProps = IOwnProps & IStateProps & StylesProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    confirmedAddress: selectors.selectConfirmedAddress(state),
  };
}

class AccountAddress extends React.PureComponent<IProps> {
  public render() {
    const { confirmedAddress, onClick, classes } = this.props;
    return confirmedAddress && (
      <Button
        className={classes.root}
        onClick={onClick}
        variant="contained"
        color="primary"
      >
        {shortenString(confirmedAddress, 12)}
        <AngleArrow className={classes.arrowIcon} />
      </Button>
    );
  }
}

export { AccountAddress };
export default (
  connect(mapState)(provideStyles(AccountAddress))
);
