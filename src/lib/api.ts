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
  name?: string;
  email?: string;
}

export interface CheckEmailData {
  email: string;
}

export interface CheckEmailResponse {
  exists: boolean;
  userId: string | null;
}

export interface ResetPasswordData {
  email: string;
  userId: string;
  token: string;
  newPasswordEncoded: string;
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

  async checkEmail(data: CheckEmailData): Promise<ApiResponse<CheckEmailResponse>> {
    const response = await fetch(`${API_BASE_URL}/vys/auth/check-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return response.json();
  },

  async resetPassword(data: ResetPasswordData): Promise<ApiResponse<UserResponse>> {
    const response = await fetch(`${API_BASE_URL}/vys/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return response.json();
  },
};
