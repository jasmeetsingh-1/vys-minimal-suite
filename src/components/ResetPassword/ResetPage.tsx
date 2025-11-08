import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { authApi } from '@/lib/api';
import { validatePassword } from '@/lib/validation';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

export const ResetPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    const userIdParam = searchParams.get('userID');
    const tokenParam = searchParams.get('token');

    if (!emailParam || !userIdParam || !tokenParam) {
      toast({
        title: "Invalid Link",
        description: "Reset password link is invalid or expired",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    setEmail(emailParam);
    setUserId(userIdParam);
    setToken(tokenParam);
  }, [searchParams, navigate]);

  const handleResetPassword = async () => {
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
      toast({
        title: "Invalid Password",
        description: passwordValidation.message,
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please ensure both passwords match",
        variant: "destructive",
      });
      return;
    }

    setIsResetting(true);
    try {
      const response = await authApi.resetPassword({
        email,
        userId,
        token,
        newPasswordEncoded: newPassword,
      });

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Password reset successfully. Please login with your new password.",
        });
        navigate('/auth');
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md border border-foreground p-8 subtle-float">
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
        
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Email</label>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">New Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isResetting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Confirm Password</label>
            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isResetting}
            />
          </div>

          <Button
            onClick={handleResetPassword}
            disabled={!newPassword || !confirmPassword || isResetting}
            className="w-full btn-3d"
          >
            {isResetting ? 'Resetting...' : 'Reset Password'}
          </Button>
        </div>
      </div>
    </div>
  );
};
