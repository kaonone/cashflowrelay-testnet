import * as React from 'react';
import LoadingContainer from './LoadingContainer/LoadingContainer';

class App extends React.Component {
  public render() {
    const { children } = this.props;

    return (
      <LoadingContainer>
        {children}
      </LoadingContainer>
    );
  }
}

export default App;
