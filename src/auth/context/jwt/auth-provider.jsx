'use client';

import { useMemo, useEffect, useCallback } from 'react';

import { useSetState } from 'src/hooks/use-set-state';

import axios, { endpoints } from 'src/utils/axios';

import { STORAGE_KEY } from './constant';
import { AuthContext } from '../auth-context';
import { setSession, isValidToken } from './utils';

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const { state, setState } = useSetState({
    user: null,
    loading: true,
  });

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        // // Intentar obtener usuario mock primero
        // const mockUser = sessionStorage.getItem('user');
        // if (mockUser) {
        //   // Log raw value so we can inspect why JSON.parse might fail
        //   console.log('Raw sessionStorage.user value:', mockUser, 'typeof:', typeof mockUser);
        //   try {
        //     const user = JSON.parse(mockUser);
        //     setState({ user: { ...user, accessToken }, loading: false });
        //     return;
        //   } catch (parseError) {
        //     // If parsing fails, remove the corrupt value and continue to the API path
        //     console.warn('Failed to parse sessionStorage.user, removing corrupt value.', parseError);
        //     sessionStorage.removeItem('user');
        //   }
        // }

        // Si no hay mock, usar API real (comentado por ahora)
        // throw new Error('API real no implementada');
        
        const res = await axios.get(endpoints.auth.me);
        console.log('Response from me endpoint auth.me:', res);
        // The API sometimes returns the user object directly as res.data
        // and sometimes nests it as res.data.user. Accept both shapes.
        const user = res.data?.user ?? res.data;
        console.log('User data from me endpoint:', { user });
        console.log('User data to setState:', { ...user, accessToken });
        if (user) {
          sessionStorage.setItem('user', JSON.stringify(user));
          setState({ user: { ...user, accessToken }, loading: false });
        } else {
          console.warn('No user object found in me endpoint response:', res.data);
          sessionStorage.removeItem('user');
          setState({ user: null, loading: false });
        }
        
      } else {
        setState({ user: null, loading: false });
      }
    } catch (error) {
      console.error(error);
      setState({ user: null, loading: false });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user
        ? {
            ...state.user,
            user_role: state.user?.user_role ?? 'CLIENT',
          }
        : null,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
