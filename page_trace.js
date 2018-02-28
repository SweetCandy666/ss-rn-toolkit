// @flow
import { NavigationActions } from 'react-navigation';

const { EventEmitter } = require('events');


type StateGetter = () => Object;
type TransitionCallback = (oldRoute:Object, newRoute:Object) => void;
type Action = Object;
type Reducer = (action:Action) => Object;

// gets the current screen from navigation state
export function getCurrentRoute(navigationState) {
  if (!navigationState) {
    return {};
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRoute(route);
  }
  return route;
}

export const transitionEmiter = new EventEmitter();

type NavTreeAccessor = (store:Object) => Object
type ParamType = { onPageTransition?:TransitionCallback, navTreeAccessor:NavTreeAccessor };
export const pageTracer = (
  ({ onPageTransition, navTreeAccessor = (state => state.nav) }: ParamType) =>
    ({ getState } : { getState:StateGetter }) => (next:Reducer) => (action:Action) => {
      if (
        action.type !== NavigationActions.NAVIGATE
        && action.type !== NavigationActions.RESET
        && action.type !== NavigationActions.BACK
      ) {
        return next(action);
      }

      const currentRoute = getCurrentRoute(navTreeAccessor(getState()));
      const result = next(action);
      const nextRoute = getCurrentRoute(navTreeAccessor(getState()));
      if (nextRoute !== currentRoute) {
        if (onPageTransition) {
          onPageTransition(currentRoute, nextRoute);
        }
        transitionEmiter.emit('transition', { currentRoute, nextRoute, type: action.type });
      }
      return result;
    }
);
