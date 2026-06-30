
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import AuthContext from './AuthContext';
import type { AuthUser } from './AuthContext';
import authService from '../services/auth.service';

interface Props {

  children: ReactNode;

}

export default function AuthProvider({
  children,
}: Props) {

  const [
    user,
    setUser,
  ] =
  useState<AuthUser | null>(null);

  const [
    token,
    setToken,
  ] =
  useState<string | null>(() =>
    localStorage.getItem(
      'accessToken',
    ),
  );

 useEffect(() => {

    const token =
        localStorage.getItem(
            'accessToken',
        );

    if (!token) {
        return;
    }

    async function loadProfile() {

        try {

            const response =
                await authService.profile();

            const currentUser =
                response.data.data;

            setUser(currentUser);

            localStorage.setItem(
                'user',
                JSON.stringify(currentUser),
            );

        }
        catch {

            logout();

        }

    }

    loadProfile();

}, []);

  function login(
    jwt: string,
    authUser: AuthUser,
  ) {

    localStorage.setItem(
      'accessToken',
      jwt,
    );

    localStorage.setItem(
      'user',
      JSON.stringify(authUser),
    );

    setToken(jwt);

    setUser(authUser);

  }
function logout(){

    localStorage.clear();

    setUser(null);

    setToken(null);

}

  return (

    <AuthContext.Provider

      value={{

        user,

        token,

        login,

        logout,

        isAuthenticated:
          !!token,

      }}

    >

      {children}

    </AuthContext.Provider>

  );
  

}
