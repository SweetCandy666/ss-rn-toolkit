import { isDebug } from './index';

// 数据是否过期
export const isDataExpired = data => (
  isDebug || !data || !data.expiredTime || new Date(data.expiredTime) < new Date()
);

// 数据是否准备就绪
export const isDataReady = data => (
  data && data.status === 'SUCCESS' && (
    data.expiredTime === undefined ||
    new Date(data.expiredTime) >= new Date()
  )
);
