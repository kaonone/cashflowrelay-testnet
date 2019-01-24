import * as React from 'react';
import { connect } from 'react-redux';
import { bind } from 'decko';

import { MobileView } from 'services/adaptability';
import { i18nConnect, ITranslateProps, tKeys as tKeysAll } from 'services/i18n';
import { IAppReduxState } from 'shared/types/app';
import { ICommunication } from 'shared/types/redux';
import { deppLinkToMobileApp } from 'shared/constants';
import { QRCode, CircleProgressBar, Button, Notification } from 'shared/view/elements';
import { copyToClipboard } from 'shared/helpers/copyToClipboard';

import * as selectors from '../../../redux/selectors';
import { IQRCodeData } from '../../../namespace';
import { provideStyles, StylesProps } from './SignTransaction.style';
import * as phone from './images/phone.png';
import googlePlay from './images/googlePlay.svg';
import appstore from './images/appstore.svg';

const tKeys = tKeysAll.features.signTransaction;

interface IStateProps {
  abiGenerating: ICommunication;
  qrCodeData: IQRCodeData | null;
}

interface IState {
  showCopyClipboardNotification: boolean;
}

type IProps = IStateProps & StylesProps & ITranslateProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    abiGenerating: selectors.selectCommunication(state, 'abiGeneration'),
    qrCodeData: selectors.selectQRCodeData(state),
  };
}

class SignTransaction extends React.Component<IProps, IState> {

  public state: IState = { showCopyClipboardNotification: false };
  public render() {
    const { classes, t, qrCodeData, abiGenerating } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.title}>{t(tKeys.title.getKey())}</div>
        <div className={classes.description}>{t(tKeys.description.getKey())}</div>
        <div className={classes.scanQrCode}>
          <img className={classes.phone} src={phone} />
          <div className={classes.qrCode}>
            {abiGenerating.isRequesting
              ? <CircleProgressBar variant="indeterminate" size={100} value={85} />
              : <QRCode value={JSON.stringify(qrCodeData)} />
            }
          </div>
        </div>
        <div className={classes.buttons}>
          <MobileView>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={this.openMobileApp}
              fullWidth
              disabled={abiGenerating.isRequesting}
            >
              {t(tKeys.openApp.getKey())}
            </Button>
          </MobileView>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={this.copyLinkToClipboard}
            fullWidth
            disabled={abiGenerating.isRequesting}
          >
            {t(tKeys.copyLink.getKey())}
          </Button>
        </div>
        <div className={classes.linksToMarket}>
          <a href={'#'} className={classes.link}><img className={classes.image} src={appstore} /></a>
          <a href={'#'} className={classes.link}><img className={classes.image} src={googlePlay} /></a>
        </div>
        {<Notification
          isOpen={this.state.showCopyClipboardNotification}
          title={t(tKeysAll.shared.copiedAtClipboard.getKey())}
          onClose={this.closeNotification}
        />}
      </div>
    );
  }

  @bind
  public openMobileApp() {
    const { qrCodeData } = this.props;
    if (qrCodeData) {
      window.location.href = deppLinkToMobileApp + JSON.stringify(qrCodeData);
    }
  }

  @bind
  public copyLinkToClipboard() {
    const { qrCodeData } = this.props;

    if (qrCodeData) {
      copyToClipboard(deppLinkToMobileApp + JSON.stringify(qrCodeData));
      this.setState({ showCopyClipboardNotification: true });
    }
  }

  @bind
  public closeNotification() {
    this.setState({ showCopyClipboardNotification: false });
  }
}

export { IProps };
export default (
  connect(mapState)(
    i18nConnect(provideStyles(SignTransaction)),
  )
);
