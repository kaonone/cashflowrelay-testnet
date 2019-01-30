import * as React from 'react';
import { bind } from 'decko';

import { StylesProps, provideStyles } from './TokenCard.style';

// import { ExpansionPanelSummary } from '@material-ui/core';

import Header from './Header/Header';
import { ExpansionPanel, ExpansionPanelDetails, Button, DonutChart, ExpansionPanelSummary } from 'shared/view/elements';
import { ContentCopy, QrCode, CircleArrow } from 'shared/view/elements/Icons';
import { i18nConnect, ITranslateProps, tKeys as tKeysAll } from 'services/i18n';
import { toFixed } from 'shared/helpers/integer';
import { IToken, TokenType } from 'shared/types/models';

const tKeys = tKeysAll.features.manageCashFlows;

type MetricKeys =
  keyof Pick<IToken, 'id' | 'payer' | 'lender' | 'instalmentSize' | 'firstInstalmentDate' | 'lastInstalmentDate'>;

interface IOwnProps {
  type: TokenType;
  token: IToken;
  expanded: boolean;
  onToggle(id: number): void;
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

class TokenCard extends React.PureComponent<IProps> {
  public render() {
    const {
      classes, type, expanded, token,
      t, theme } = this.props;

    const { instalmentSize, instalments, totalInstalment } = token;
    const paided = instalmentSize * instalments.paid;
    const paidedPercent = toFixed(paided / instalmentSize, 1);

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded} onChange={this.onToggle}>
          <ExpansionPanelSummary className={classes.summary} >
            <Header
              token={token}
              expanded={expanded}
              type={type}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.main}>
              <div className={classes.leftSection} >
                {(['id', 'payer', 'lender'] as MetricKeys[]).map(this.renderMetric)}
              </div>
              <div className={classes.rightSection}>
                {(['instalmentSize', 'firstInstalmentDate', 'lastInstalmentDate'] as MetricKeys[])
                  .map(this.renderMetric)}
              </div>
              <div className={classes.progress}>
                <DonutChart
                  title={t(
                    tKeys.howMuchInstalmentIsComplete.getKey(),
                    { paid: paided, total: totalInstalment, percent: paidedPercent },
                  )}
                  total={totalInstalment}
                  segments={[
                    { color: theme!.extra.colors.salem, value: paided },
                    { color: theme!.extra.colors.monza, value: instalmentSize * instalments.missed },
                    { color: theme!.extra.colors.buttercup, value: instalmentSize * instalments.due },
                  ]}
                />
              </div>
            </div>
            {['Repayment history', 'Withdrawal history'].map(stub => (
              <div key={stub} className={classes.stubSection}>
                <span>{stub}</span>
                <CircleArrow />
              </div>
            ))}
          </ExpansionPanelDetails>
          <div className={classes.footer}>
            {this.renderActions()}

          </div>
        </ExpansionPanel>
      </div>
    );
  }

  @bind
  public onToggle() {
    const { token, onToggle } = this.props;
    onToggle(token.id);
  }

  @bind
  public renderMetric(key: MetricKeys) {
    const { classes, t, token } = this.props;
    return (
      <div key={key} className={classes.metricField}>
        <div className={classes.metricTitle}>
          {t(tKeys[key].getKey())}
        </div>
        <div className={classes.metricValue}>
          {key === 'instalmentSize' ? t(tKeys.daiMonthly.getKey(), { amount: token[key] }) : token[key]}
          {
            (key === 'lender' || key === 'payer') &&
            <>
              <ContentCopy className={classes.icon} />
              <QrCode className={classes.icon} />
            </>
          }
        </div>
      </div>
    );
  }

  public renderActions() {
    const { classes, t, type } = this.props;
    switch (type) {
      case 'incoming':
        return (
          <>
            <Button className={classes.footerButton} variant="contained" color="primary">
              {t(tKeys.sellCashflow.getKey())}
            </Button>
            <Button className={classes.footerButton} variant="contained" color="primary" >
              {t(tKeys.withdrawDai.getKey())}
            </Button>
          </>
        );
      case 'obligations':
        return (
          <>
            <Button className={classes.footerButton} variant="contained" color="primary" >
              {t(tKeys.payInstalment.getKey())}
            </Button>
            <Button className={classes.footerButton} variant="contained" color="primary">
              {t(tKeys.sellCashflow.getKey())}
            </Button>
          </>
        );
      case 'selling':
        return (
          <>
            <Button className={classes.footerButton} variant="contained" color="primary">
              {t(tKeys.buyCashflow.getKey())}
            </Button>
          </>
        );
    }
  }
}

export default i18nConnect(provideStyles(TokenCard));
