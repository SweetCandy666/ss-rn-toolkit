import { padStart } from 'lodash';

// 获取格式化时间
export const getFormatTime = (time = 0, type = 'standard', duration) => {
  const hours = Math.floor(time / 60 / 60 / 1000);
  const minutes = Math.floor((time - (hours * 60 * 60 * 1000)) / 60 / 1000);
  const seconds =
    Math.floor((time - (hours * 60 * 60 * 1000) - (minutes * 60 * 1000)) / 1000);

  if (type === 'standard') {
    let res = duration >= 60 * 60 * 1000 ? `${padStart(hours.toString(), 2, '0')}:` : '';
    res += `${padStart(minutes.toString(), 2, '0')}:`;
    res += padStart(seconds.toString(), 2, '0');

    return res;
  }

  if (type === 'hours') {
    if (hours === 0) {
      return `${minutes}分钟`;
    }

    return `${hours + Math.round(minutes / 60)}小时`;
  }

  if (type === 'minutes') {
    return seconds > 0 ? `${hours * 60 + minutes}分${seconds}秒` : `${hours * 60 + minutes}分钟`;
  }

  if (type === 'minutes-en') {
    return `${hours * 60 + minutes}mins`;
  }
};

// 获取年月日
export const getYearMonthDate = (time = new Date()) => {
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();

  return `${year}-${month}-${date}`;
};
