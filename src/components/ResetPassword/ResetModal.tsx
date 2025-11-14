import { useCallback, useEffect, useRef, useState } from 'react';
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
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusVariant, setStatusVariant] = useState<'success' | 'error' | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const latestRequestRef = useRef(0);

  interface CheckEmailOptions {
    showInvalidToast?: boolean;
    showNotFoundToast?: boolean;
    showErrorToast?: boolean;
  }

  const handleCheckEmail = useCallback(
    async (
      emailToCheck: string,
      {
        showInvalidToast = true,
        showNotFoundToast = true,
        showErrorToast = true,
      }: CheckEmailOptions = {}
    ) => {
      const trimmedEmail = emailToCheck.trim();

      if (!trimmedEmail) {
        latestRequestRef.current += 1;
        setUserExists(null);
        setStatusMessage(null);
        setStatusVariant(null);
        setIsChecking(false);
        return null;
      }

      if (!validateEmail(trimmedEmail)) {
        latestRequestRef.current += 1;
        setUserExists(null);
        setStatusMessage(null);
        setStatusVariant(null);
        setIsChecking(false);

        if (showInvalidToast) {
          toast({
            title: "Invalid Email",
            description: "Please enter a valid email address",
            variant: "destructive",
          });
        }

        return null;
      }

      const currentRequestId = ++latestRequestRef.current;
      setIsChecking(true);

      try {
        const response = await authApi.checkEmail({ email: trimmedEmail });

        if (latestRequestRef.current !== currentRequestId) {
          return response;
        }

        setUserExists(response.data.exists);
        setStatusMessage(response.data.exists ? "User found" : "No user found with this email");
        setStatusVariant(response.data.exists ? 'success' : 'error');

        if (!response.data.exists && showNotFoundToast) {
          toast({
            title: "User Not Found",
            description: "No user found with this email address",
            variant: "destructive",
          });
        }

        return response;
      } catch (error) {
        if (latestRequestRef.current === currentRequestId) {
          setUserExists(null);
          setStatusMessage("Failed to check email. Please try again.");
          setStatusVariant('error');

          if (showErrorToast) {
            toast({
              title: "Error",
              description: "Failed to check email. Please try again.",
              variant: "destructive",
            });
          }
        }

        return null;
      } finally {
        if (latestRequestRef.current === currentRequestId) {
          setIsChecking(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      latestRequestRef.current += 1;
      setUserExists(null);
      setStatusMessage(null);
      setStatusVariant(null);
      setIsChecking(false);
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      latestRequestRef.current += 1;
      setUserExists(null);
      setStatusMessage(null);
      setStatusVariant(null);
      setIsChecking(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      handleCheckEmail(trimmedEmail, {
        showInvalidToast: false,
        showNotFoundToast: false,
        showErrorToast: false,
      });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [email, handleCheckEmail]);

  const handleSendResetLink = () => {
    // TODO: Implement email sending API
    setIsSendingEmail(true);
    
    // Dummy timer for now
    setTimeout(() => {
      setIsSendingEmail(false);
      window.open(`http://localhost:8081/auth/resetPassword?userID=UGKaIJnllbacKA&email=jasmeet@gmail.com&token=abc123XfdYZ789token456def`, '_blank');
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
    setStatusMessage(null);
    setStatusVariant(null);
    setIsChecking(false);
    setIsSendingEmail(false);
    onHide();
  };

  const handlePrimaryAction = () => {
    if (userExists) {
      handleSendResetLink();
    } else {
      handleCheckEmail(email);
    }
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

          {statusMessage ? (
            <p
              className={`text-sm font-bold absolute right-[20px] ${
                statusVariant === 'success' ? 'text-green-600' : 'text-destructive'
              }`}
            >
              {statusMessage}
            </p>
          ) : null}

          <div className="flex flex-col gap-2">
            <Button
              onClick={handlePrimaryAction}
              disabled={!email || isChecking || isSendingEmail}
              className={`w-full ${userExists ? 'btn-3d' : ''}`}
            >
              {isSendingEmail ? 'Sending Email...' : 'Get Reset Link'}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
