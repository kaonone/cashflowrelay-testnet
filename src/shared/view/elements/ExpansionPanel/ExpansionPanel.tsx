import * as React from 'react';
import MuiExpansionPanel, { ExpansionPanelProps } from '@material-ui/core/ExpansionPanel';

function ExpansionPanel(props: ExpansionPanelProps) {
  return (
    <MuiExpansionPanel {...props} />
  );
}

export default ExpansionPanel;
