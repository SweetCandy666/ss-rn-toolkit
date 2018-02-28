import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import { createAction } from 'redux-actions';
import { isDataReady, isDataExpired } from './data_validator';
import { isIntEqual, promisify, promisifySingle, hasValue } from './js';
import { getFormatTime, getYearMonthDate } from './datetime';

// 创建请求动作
export const createRequestAction = base => ({
  success: createAction(`${base}_SUCCESS`),
  failure: createAction(`${base}_FAILURE`),
  reset: createAction(`${base}_RESET`),
});


export { default as alert } from './alert';
export {
  isDataReady,
  isDataExpired,
  isIntEqual,
  promisify,
  promisifySingle,
  getFormatTime,
  getYearMonthDate,
  hasValue
};

export const isDebug = process.env.NODE_ENV === 'development';
// 是不是iPhone X
export const isPhoneX = Platform.OS === 'ios' && DeviceInfo.getModel() === 'iPhone X';

// 创建Promise
export const createPromise = (action, payload) => (
  new Promise((resolve, reject) => {
    action({ payload, resolve, reject });
  })
);

// 生成随机字符串
export const getRandomString = (length = 32, seed = '') => {
  const dict = seed || 'abcdefghikmnpqrstwxyzABCDEFGHKLMNPQRSTUVWXYZ123456789';
  let res = '';
  for (let i = 0; i < length; i += 1) {
    res += dict[parseInt(Math.random() * dict.length, 10)];
  }

  return res;
};
