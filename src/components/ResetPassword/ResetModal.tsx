import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { authApi } from '@/lib/api';
import { validateEmail } from '@/lib/validation';
import { toast } from '@/hooks/use-toast';

interface ResetModalProps {
  show: boolean;
  onHide: () => void;
}

export const ResetModal = ({ show, onHide }: ResetModalProps) => {
  const [email, setEmail] = useState('');
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const handleCheckEmail = async () => {
    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    try {
      const response = await authApi.checkEmail({ email });
      
      if (response.status === 200) {
        setUserExists(response.data.exists);
        if (!response.data.exists) {
          toast({
            title: "User Not Found",
            description: "No user found with this email address",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleSendResetLink = () => {
    // TODO: Implement email sending API
    setIsSendingEmail(true);
    
    // Dummy timer for now
    setTimeout(() => {
      setIsSendingEmail(false);
      toast({
        title: "Success",
        description: "Link sent successfully, check your email",
      });
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setEmail('');
    setUserExists(null);
    setIsChecking(false);
    setIsSendingEmail(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="text-xl font-bold">Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Email Address</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setUserExists(null);
              }}
              disabled={isSendingEmail}
            />
          </div>

          {userExists === false && (
            <p className="text-sm text-destructive">No user found with this email</p>
          )}

          <div className="flex flex-col gap-2">
            <Button
              onClick={handleCheckEmail}
              disabled={!email || isChecking || isSendingEmail}
              className="w-full"
            >
              {isChecking ? 'Checking...' : 'Check Email'}
            </Button>

            {userExists && (
              <Button
                onClick={handleSendResetLink}
                disabled={isSendingEmail}
                className="w-full btn-3d"
              >
                {isSendingEmail ? 'Sending Email...' : 'Get Reset Link'}
              </Button>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
