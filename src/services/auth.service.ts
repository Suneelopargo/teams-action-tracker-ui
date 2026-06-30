import api from '../api/axios';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoggedInUser {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'PARTICIPANT';
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: LoggedInUser;
  };
}

class AuthService {

  login(request: LoginRequest) {
    return api.post<LoginResponse>(
      '/auth/login',
      request,
    );
  }

  profile() {
    return api.get('/auth/profile');
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }

}

export default new AuthService();