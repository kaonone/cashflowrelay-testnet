import * as React from 'react';

import { BaseLayout } from 'modules/shared';
import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';
import { TokensList } from 'features/manageCashFlow';

import { provideStyles, StylesProps } from './CashFlow.style';
import { TokenType } from 'shared/types/models';
import { ToggleButtonGroup, ToggleButton } from 'shared/view/elements';
import { withComponent } from 'shared/helpers/react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import routes from 'modules/routes';

const links = [
  { type: 'incoming', title: 'Incoming' },
  { type: 'obligations', title: 'Obligations' },
];

const NavToggleButton = withComponent(Link)(ToggleButton);

type IProps = InjectedAuthRouterProps & StylesProps & RouteComponentProps<{ type: TokenType }>;

class Marketplace extends React.PureComponent<IProps> {
  public render() {

    const { classes, match: { params: { type: selectedType } } } = this.props;
    return (
      <BaseLayout>
        <div className={classes.root}>
          <ToggleButtonGroup className={classes.links} value={selectedType} exclusive nullable={false} >
            {links.map(({ type, title }, index: number) => (
              <NavToggleButton
                className={classes.link}
                key={index}
                to={routes.cashFlows.type.getRedirectPath({ type })}
                variant="outlined"
                value={type}
              >
                <span>{title}</span>
              </NavToggleButton>
            ))}
          </ToggleButtonGroup>
          <TokensList type={selectedType} />
        </div>
      </BaseLayout>
    );
  }

}

export default withRouter(provideStyles(Marketplace));
