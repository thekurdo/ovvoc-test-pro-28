import { useNavigate, useLocation, useMatch } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

export function useQueryParams() {
  const location = useLocation();
  return useMemo(() => new URLSearchParams(location.search), [location.search]);
}

export function useNavigation() {
  const history = useNavigate();

  return {
    navigate: useCallback((path, state) => history.push(path, state), [history]),
    replace: useCallback((path, state) => history.replace(path, state), [history]),
    goBack: useCallback(() => history.goBack(), [history]),
    goForward: useCallback(() => history.goForward(), [history]),
  };
}

export function useActiveRoute() {
  const match = useMatch();
  const location = useLocation();
  return { match, location, isExact: match?.isExact };
}
