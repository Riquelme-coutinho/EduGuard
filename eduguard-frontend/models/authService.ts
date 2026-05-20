import { API_BASE_URL } from '../constants/theme';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'MANAGER' | 'TEACHER' | 'PARENT';
  cpf: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Erro ao realizar login');
    }

    return response.json();
  },
};
