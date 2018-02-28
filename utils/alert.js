import { Alert } from 'react-native';

export default (title, message, buttons = [{ text: '确定', onPress: () => {} }]) => {
  return new Promise((resolve) => {
    const btns = buttons.map(({ onPress, ...btnConfig }, ii) => {
      return ({
        ...btnConfig,
        onPress: (...args) => {
          if (onPress) {
            onPress(...args);
          }
          resolve(ii);
        },
      });
    });

    Alert.alert(title, message, btns);
  });
};
