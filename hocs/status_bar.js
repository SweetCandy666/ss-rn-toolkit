import React from 'react';
import { StatusBar, View } from 'react-native';

// eslint-disable-next-line
const addChildren = (extraChildren, prepend = true) => wrapped => class extends React.Component {
  render() {
    if (!extraChildren) {
      throw new Error('no extraChildren, why are you doing this?');
    }
    return (
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        {prepend ? extraChildren : null}
        {React.createElement(wrapped, this.props)}
        {prepend ? null : extraChildren }
      </View>
    );
  }
};

export const withLightStatusBar = addChildren(<StatusBar barStyle="light-content" backgroundColor="black" />);
export const withDarkStatusBar = addChildren(<StatusBar barStyle="dark-content" backgroundColor="black" />);
export const withLightThemeColorStatusBar = addChildren(<StatusBar barStyle="light-content" backgroundColor="#3399ff" />);

export function getThemeColorStatusBar(barStyle, backgroundColor) {
  return addChildren(<StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />);
}
