import * as React from 'react';
import { connect } from 'react-redux';

import { IAppReduxState } from 'shared/types/app';

import * as selectors from './../../redux/selectors';
import { Button } from 'shared/view/elements';
import { shortenString } from 'shared/helpers/format';

interface IOwnProps {
  onClick(): void;
}
interface IStateProps {
  confirmedAddress: string | null;
}

type IProps = IOwnProps & IStateProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    confirmedAddress: selectors.selectConfirmedAddress(state),
  };
}

class AccountAddress extends React.PureComponent<IProps> {
  public render() {
    const { confirmedAddress, onClick } = this.props;
    return confirmedAddress && (
      <Button onClick={onClick} variant="contained" color="primary">{shortenString(confirmedAddress, 12)}</Button>
    );
  }
}

export { AccountAddress };
export default (
  connect(mapState)(AccountAddress)
);
