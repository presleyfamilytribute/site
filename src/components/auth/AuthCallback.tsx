
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(true);
  
  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        // Check if we have a session
        const { error } = await supabase.auth.getSession();
        if (error) throw error;

        // Give Supabase a moment to process the verification
        setTimeout(() => {
          setVerifying(false);
          setTimeout(() => navigate('/'), 2000);
        }, 2000);
      } catch (err: any) {
        console.error('Error during email confirmation:', err);
        setError(err.message || 'An error occurred during email verification');
        setVerifying(false);
      }
    };

    handleEmailConfirmation();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-elvis-navy">
      <div className="w-full max-w-md p-8 bg-elvis-cream rounded-lg shadow-lg text-center">
        {verifying ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 text-elvis-gold animate-spin" />
            <h2 className="text-2xl font-playfair text-elvis-navy font-bold">Verifying your email...</h2>
            <p className="text-elvis-navy/70">Please wait while we confirm your account.</p>
          </div>
        ) : error ? (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Verification Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
            <h2 className="text-2xl font-playfair text-elvis-navy font-bold">Email Verified!</h2>
            <p className="text-elvis-navy/70">Your account has been successfully verified.</p>
            <p className="text-elvis-navy/70">Redirecting you to the home page...</p>
          </div>
        )}
      </div>
    </div>
  );
}
