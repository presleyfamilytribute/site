
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { checkPasswordStrength, createRateLimiter } from "@/utils/security";

// Rate limiter for auth attempts
const authRateLimiter = createRateLimiter(5, 60000); // 5 attempts within 60 seconds

export const useAuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '' });
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check password strength whenever password changes
  useEffect(() => {
    if (password) {
      setPasswordStrength(checkPasswordStrength(password));
    } else {
      setPasswordStrength({ score: 0, feedback: '' });
    }
  }, [password]);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if reCAPTCHA is completed
    if (!recaptchaToken) {
      toast({
        title: "Please complete the CAPTCHA",
        description: "We need to verify that you're not a robot.",
        variant: "destructive",
      });
      return;
    }
    
    // Check password strength
    if (passwordStrength.score < 3) {
      toast({
        title: "Password too weak",
        description: passwordStrength.feedback,
        variant: "destructive",
      });
      return;
    }
    
    // Rate limiting check
    if (!authRateLimiter("signup")) {
      toast({
        title: "Too many attempts",
        description: "Please wait a moment before trying again",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          captchaToken: recaptchaToken
        }
      });

      if (error) throw error;
      
      toast({
        title: "Verification email sent",
        description: "Please check your inbox to verify your email address.",
      });
      
    } catch (error: any) {
      toast({
        title: "Error during sign up",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRecaptchaToken(null);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if reCAPTCHA is completed
    if (!recaptchaToken) {
      toast({
        title: "Please complete the CAPTCHA",
        description: "We need to verify that you're not a robot.",
        variant: "destructive",
      });
      return;
    }
    
    // Rate limiting check
    if (!authRateLimiter("signin")) {
      toast({
        title: "Too many attempts",
        description: "Please wait a moment before trying again",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          captchaToken: recaptchaToken
        }
      });

      if (error) throw error;
      
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      
      navigate("/");
      
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRecaptchaToken(null);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    recaptchaToken,
    passwordStrength,
    handleRecaptchaChange,
    handleSignUp,
    handleSignIn
  };
};
