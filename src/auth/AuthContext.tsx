import { createContext } from 'react';

export interface AuthUser {

  id: number;

  name: string;

  email: string;

  role: 'ADMIN' | 'PARTICIPANT';

}

export interface AuthContextType {

  user: AuthUser | null;

  token: string | null;

  isAuthenticated: boolean;

  login: (
    token: string,
    user: AuthUser,
  ) => void;

  logout: () => void;

}

const AuthContext =
createContext<AuthContextType>({

  user: null,

  token: null,

  isAuthenticated: false,

  login: () => {},

  logout: () => {},

});

export default AuthContext;