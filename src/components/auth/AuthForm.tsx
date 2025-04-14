
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createRateLimiter, checkPasswordStrength } from "@/utils/security";
import ReCaptchaComponent from "../auth/ReCaptcha";
import { Progress } from "@/components/ui/progress";

// Rate limiter for auth attempts
const authRateLimiter = createRateLimiter(5, 60000); // 5 attempts within 60 seconds

export function AuthForm() {
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

  const getPasswordStrengthColor = () => {
    switch(passwordStrength.score) {
      case 0: return "bg-slate-200";
      case 1: return "bg-red-500";
      case 2: return "bg-orange-500";
      case 3: return "bg-yellow-500";
      case 4: return "bg-green-400";
      case 5: return "bg-green-600";
      default: return "bg-slate-200";
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs defaultValue="signin">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="signin">
          <form onSubmit={handleSignIn}>
            <CardHeader>
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>Sign in to access exclusive features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-elvis-navy/40 border-elvis-gold/30"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="bg-elvis-navy/40 border-elvis-gold/30"
                />
              </div>
              
              <div className="pt-2">
                <ReCaptchaComponent onChange={handleRecaptchaChange} />
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <ShieldCheck className="h-4 w-4 text-elvis-gold" />
                <span className="text-elvis-gold">Your login is protected</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-elvis-gold hover:bg-elvis-gold/90 text-elvis-navy" disabled={loading || !recaptchaToken}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        
        <TabsContent value="signup">
          <form onSubmit={handleSignUp}>
            <CardHeader>
              <CardTitle className="text-2xl">Create an Account</CardTitle>
              <CardDescription>Join us for exclusive content and features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="signup-email" className="text-sm font-medium">Email</label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-elvis-navy/40 border-elvis-gold/30"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="signup-password" className="text-sm font-medium">Password</label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="bg-elvis-navy/40 border-elvis-gold/30"
                />
                
                {/* Password strength indicator */}
                {password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs">Password strength</span>
                      <span className="text-xs">{passwordStrength.score}/5</span>
                    </div>
                    <Progress value={passwordStrength.score * 20} className="h-1" indicatorClassName={getPasswordStrengthColor()} />
                    <p className="text-xs mt-1">{passwordStrength.feedback}</p>
                  </div>
                )}
              </div>
              
              <div className="pt-2">
                <ReCaptchaComponent onChange={handleRecaptchaChange} />
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <ShieldAlert className="h-4 w-4 text-elvis-gold" />
                <span className="text-elvis-gold">Use a unique password for better security</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-elvis-gold hover:bg-elvis-gold/90 text-elvis-navy" disabled={loading || !recaptchaToken || passwordStrength.score < 3}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

export default AuthForm;
