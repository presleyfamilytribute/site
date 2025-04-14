
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, ShieldCheck } from "lucide-react";
import ReCaptchaComponent from "./ReCaptcha";

interface SignInFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSignIn: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
  recaptchaToken: string | null;
  handleRecaptchaChange: (token: string | null) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSignIn,
  loading,
  recaptchaToken,
  handleRecaptchaChange,
}) => {
  return (
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
  );
};

export default SignInForm;
