import _ from 'lodash';
import { handleActions } from 'redux-actions';

function getIndex(payload, options) {
  const { indexName } = options;
  if (typeof indexName === 'function') {
    return indexName(payload);
  }
  return payload[indexName];
}

// 创建响应动作
export const createReducer = (
  action, realAction, initialState = {}, options = {},
) => (
  handleActions({
    [realAction.request]: (state, { payload }) => {
      const ret = {
        status: 'LOADING',
        expiredTime: state.expiredTime,
        data: !options.clearData ? state.data : (
          _.isEqual(state.requestPayload, payload.requestPayload) ? state.data : initialState),
        requestPayload: payload.requestPayload,
        error: null,
      };

      if (options.isIndex) {
        return Object.assign({}, state, {
          [getIndex(payload, options)]: ret,
        });
      }

      // no loading
      if (options.isUpdate && state.status === 'SUCCESS') {
        return state;
      }

      return ret;
    },

    [realAction.success]: (state, { payload }) => {
      let { data } = payload;

      if (options.replaceDataType === 'function') {
        data = options.getData(state, data, payload.requestPayload);
      }
      if (options.updateTime) {
        // 客户端请求接口时间
        data.updateTime = new Date().getTime();
      }

      const ret = {
        status: 'SUCCESS',
        expiredTime: payload.expiredTime,
        data,
        requestPayload: payload.requestPayload,
        error: null,
      };

      if (options.isIndex) {
        return Object.assign({}, state, {
          [getIndex(payload.requestPayload, options)]: ret,
        });
      }

      return ret;
    },

    [realAction.failure]: (state, { payload }) => {
      const ret = {
        status: 'FAILURE',
        expiredTime: state.expiredTime,
        data: state.data,
        requestPayload: payload.requestPayload,
        error: payload.error,
      };

      if (options.isIndex) {
        return Object.assign({}, state, {
          [getIndex(payload.requestPayload, options)]: ret,
        });
      }

      return ret;
    },

    [realAction.reset]: (state, { payload }) => {
      return payload;
    },
  }, initialState)
);
