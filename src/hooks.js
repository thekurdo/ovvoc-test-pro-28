import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

export function useQueryParams() {
  const location = useLocation();
  return useMemo(() => new URLSearchParams(location.search), [location.search]);
}

export function useNavigation() {
  const history = useHistory();

  return {
    navigate: useCallback((path, state) => history.push(path, state), [history]),
    replace: useCallback((path, state) => history.replace(path, state), [history]),
    goBack: useCallback(() => history.goBack(), [history]),
    goForward: useCallback(() => history.goForward(), [history]),
  };
}

export function useActiveRoute() {
  const match = useRouteMatch();
  const location = useLocation();
  return { match, location, isExact: match?.isExact };
}
