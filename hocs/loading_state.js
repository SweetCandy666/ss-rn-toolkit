import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default ({ keypaths }) => Wrapped =>
  class WithLoadingHOC extends React.Component {
    render() {
      const { props } = this;
      const isLoading = keypaths && keypaths.some((kp) => {
        const state = kp.reduce((res, k) => res[k], props);
        return state && state.status === 'LOADING';
      });

      return (
        <View style={{ flex: 1 }}>
          <Wrapped {...props} />
          {
            !!isLoading &&
            <View
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                right: 0,
                top: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              pointerEvents="none"
            >
              <ActivityIndicator animating />
            </View>
          }
        </View>
      );
    }
  };
