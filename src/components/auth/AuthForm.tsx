
import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthForm } from "@/hooks/useAuthForm";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export function AuthForm() {
  const {
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
  } = useAuthForm();

  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs defaultValue="signin">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="signin">
          <SignInForm 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSignIn={handleSignIn}
            loading={loading}
            recaptchaToken={recaptchaToken}
            handleRecaptchaChange={handleRecaptchaChange}
          />
        </TabsContent>
        
        <TabsContent value="signup">
          <SignUpForm 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            passwordStrength={passwordStrength}
            handleSignUp={handleSignUp}
            loading={loading}
            recaptchaToken={recaptchaToken}
            handleRecaptchaChange={handleRecaptchaChange}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
}

export default AuthForm;
