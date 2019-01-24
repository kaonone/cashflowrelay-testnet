import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { MuiThemeProvider } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import { DrizzleContext } from 'drizzle-react';
import { Drizzle } from 'drizzle';
import 'normalize.css';

import { I18nProvider } from 'services/i18n';
import { IAppData, IModule, IJssDependencies } from 'shared/types/app';
import { JssProvider, SheetsRegistry, BaseStyles } from 'shared/styles';

import createRoutes from './routes';

interface IAppProps {
  jssDeps: IJssDependencies;
  disableStylesGeneration?: boolean;
}

export function App({ modules, store, jssDeps, disableStylesGeneration, drizzle }: IAppData & IAppProps) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {renderSharedPart(modules, drizzle, jssDeps, disableStylesGeneration)}
      </BrowserRouter>
    </Provider >
  );
}

interface IServerAppProps {
  jssDeps: IJssDependencies;
  registry?: SheetsRegistry;
  disableStylesGeneration?: boolean;
}

export function ServerApp(props: IAppData & IServerAppProps & StaticRouter['props']) {
  const { modules, store, registry, jssDeps, disableStylesGeneration, drizzle, ...routerProps } = props;
  return (
    <Provider store={store}>
      <StaticRouter {...routerProps}>
        {renderSharedPart(modules, drizzle, jssDeps, disableStylesGeneration, registry)}
      </StaticRouter>
    </Provider>
  );
}

function renderSharedPart(
  modules: IModule[],
  drizzle: Drizzle,
  jssDeps: IJssDependencies,
  disableStylesGeneration?: boolean,
  registry?: SheetsRegistry,
) {
  const { generateClassName, jss, theme } = jssDeps;

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DrizzleContext.Provider drizzle={drizzle}>
        <I18nProvider>
          <JssProvider
            jss={jss}
            registry={registry}
            generateClassName={generateClassName}
            disableStylesGeneration={disableStylesGeneration}
          >
            <MuiThemeProvider theme={theme} disableStylesGeneration={disableStylesGeneration}>
              {/* <React.StrictMode> */}
              <BaseStyles />
              {createRoutes(modules)}
              {/* </React.StrictMode> */}
            </MuiThemeProvider>
          </JssProvider>
        </I18nProvider>
      </DrizzleContext.Provider>
    </MuiPickersUtilsProvider>
  );
}
