
import React from 'react';
import AuthForm from './AuthForm';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-elvis-navy/90 to-black text-elvis-cream flex items-center justify-center py-20">
      <div className="container max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-elvis-gold mb-4">
            Join The Legacy
          </h1>
          <p className="text-lg">
            Create an account to access exclusive content and features about the Presley family.
          </p>
        </div>
        
        <AuthForm />
      </div>
    </div>
  );
}
