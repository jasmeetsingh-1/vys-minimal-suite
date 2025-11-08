import { useState } from 'react';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { useNavigate } from 'react-router-dom';

export const LoginSignUpPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuthSuccess = (userId: string) => {
    localStorage.setItem('userId', userId);
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
