import { useState } from 'react';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { useNavigate } from 'react-router-dom';
import { authReducers } from '@/react-store/slicesReducers';
import type { UserResponse } from '@/lib/api';
import store from '@/react-store/store.jsx';

export const LoginSignUpPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuthSuccess = (user: UserResponse) => {
    store.dispatch(
      authReducers.setAuthData({
        userId: user.userId,
        name: user.name ?? null,
        email: user.email ?? null,
      }),
    );
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {isLogin ? (
          <Login
            onSwitchToSignup={() => setIsLogin(false)}
            onLoginSuccess={handleAuthSuccess}
          />
        ) : (
          <SignUp
            onSwitchToLogin={() => setIsLogin(true)}
            onSignupSuccess={handleAuthSuccess}
          />
        )}
      </div>
    </div>
  );
};
