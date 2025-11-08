const API_BASE_URL = 'http://localhost:9944';

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface SignupData {
  email: string;
  passwordEncoded: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserResponse {
  userId: string;
}

export const authApi = {
  async signup(data: SignupData): Promise<ApiResponse<UserResponse>> {
    const response = await fetch(`${API_BASE_URL}/vys/auth/new-signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return response.json();
  },

  async login(data: LoginData): Promise<ApiResponse<UserResponse>> {
    const response = await fetch(`${API_BASE_URL}/vys/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return response.json();
  },
};
