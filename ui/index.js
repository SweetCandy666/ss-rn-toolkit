import { Dimensions, StatusBar, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { isIOS } from '../platform';


// 标准宽高
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
export const statusBarHeight = isIOS ? 20 : StatusBar.currentHeight;

// px转dp（标准屏幕宽度为375px）
const standardWidthPx = 375;
export const px2dp = (px, isInteger) => {
  const dp = (px * deviceWidth) / standardWidthPx;
  return isInteger ? parseInt(dp, 10) : dp;
};

// px转dp（标准屏幕高度为667px）
const standardHeightPx = 667;
export const px2dpHeight = (px, isInteger) => {
  const dp = (px * deviceHeight) / standardHeightPx;
  return isInteger ? parseInt(dp, 10) : dp;
};

export const NAV_BAR_CONTENT_HEIGHT = px2dp(44);

// PhoneX横屏padding
export const IPHONEX_PADDING_WIDTH = 88;

export const NAV_BAR_HEIGHT = Platform.select({
  ios: NAV_BAR_CONTENT_HEIGHT + statusBarHeight,
  android: Platform.Version >= 21 ? NAV_BAR_CONTENT_HEIGHT + statusBarHeight
    : NAV_BAR_CONTENT_HEIGHT,
});

export const STATUS_BAR_PADDING = Platform.select({
  ios: 0,
  android: Platform.Version >= 21 ? statusBarHeight : 0,
});

export const defaultTopPatchHeight = px2dp(100);

export const TEST_PROPS = Symbol(
  'props for test renderer: should be provided for required props; override default props'
);

export const STATUS_BAR_PADDING_PATCH_IOS10 = Platform.select({
  ios: parseInt(DeviceInfo.getSystemVersion(), 10) < 11 ? 20 : 0,
  android: 0,
});
