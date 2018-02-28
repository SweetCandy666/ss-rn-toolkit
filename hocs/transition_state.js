import React from 'react';
import { InteractionManager } from 'react-native';

export default WrappedComponent => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { $isTransitioning: true };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ $isTransitioning: false });
    });
  }

  render() {
    return (
      <WrappedComponent
        {...this.props}
        {...this.state}
      />
    );
  }
};
