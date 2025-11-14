import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { authApi, type UserResponse } from '@/lib/api';
import { validateEmail, validatePassword } from '@/lib/validation';
import { useToast } from '@/hooks/use-toast';

interface SignUpProps {
  onSwitchToLogin: () => void;
  onSignupSuccess: (user: UserResponse) => void;
}

export const SignUp = ({ onSwitchToLogin, onSignupSuccess }: SignUpProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      toast({
        title: "Error",
        description: passwordValidation.message,
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const response = await authApi.signup({
        email,
        passwordEncoded: password,
        name,
      });
      
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Account created successfully!",
        });
        onSignupSuccess({
          userId: response.data.userId,
          name,
          email,
        });
      } else {
        toast({
          title: "Error",
          description: response.message || "Signup failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold mb-8">Sign Up</h2>
      
      <form onSubmit={handleSignup} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Enter your password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating account...' : 'Sign Up'}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onSwitchToLogin}
          disabled={loading}
          className="w-full"
        >
          Already a user? Login
        </Button>
      </form>
    </div>
  );
};
