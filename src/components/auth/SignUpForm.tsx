
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, ShieldAlert } from "lucide-react";
import ReCaptchaComponent from "./ReCaptcha";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

interface SignUpFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  passwordStrength: {
    score: number;
    feedback: string;
  };
  handleSignUp: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
  recaptchaToken: string | null;
  handleRecaptchaChange: (token: string | null) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  passwordStrength,
  handleSignUp,
  loading,
  recaptchaToken,
  handleRecaptchaChange,
}) => {
  return (
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
            <PasswordStrengthIndicator passwordStrength={passwordStrength} />
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
        <Button 
          type="submit" 
          className="w-full bg-elvis-gold hover:bg-elvis-gold/90 text-elvis-navy" 
          disabled={loading || !recaptchaToken || passwordStrength.score < 3}
        >
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
  );
};

export default SignUpForm;
