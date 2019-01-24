import { IAppReduxState } from 'shared/types/app';
<% if ((reduxConfig ? reduxConfig.parts : []).includes('communication')) { -%>
import { makeCommunicationSelector } from 'shared/helpers/redux';
<% } %>
import * as NS from '../namespace';

export function selectState(state: IAppReduxState): NS.IReduxState {
  return state.<%= featureName %>;
}
<% if ((reduxConfig ? reduxConfig.parts : []).includes('communication')) { %>
export const selectCommunication = makeCommunicationSelector(selectState);
<% } -%>
