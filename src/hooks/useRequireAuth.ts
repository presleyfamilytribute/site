
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useToast } from '@/components/ui/use-toast';

/**
 * Custom hook to protect routes that require authentication
 * @param redirectTo The path to redirect to if not authenticated
 * @returns The authenticated user or null while checking
 */
export const useRequireAuth = (redirectTo = '/auth') => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Only redirect after we've checked authentication status
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access this page",
        variant: "destructive",
      });
      navigate(redirectTo);
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo, toast]);

  // Return the user for convenience
  return { user, isLoading };
};
