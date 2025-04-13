
import React from 'react';
import AuthForm from './AuthForm';
import { motion } from 'framer-motion';

export default function AuthPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-elvis-navy/90 to-black text-elvis-cream flex items-center justify-center py-20">
      <div className="container max-w-md">
        <motion.div 
          className="text-center mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          <motion.h1 
            variants={fadeIn}
            className="font-playfair text-4xl md:text-5xl font-bold text-elvis-gold mb-4"
          >
            Join The Legacy
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="text-lg"
          >
            Create an account to access exclusive content and features about the Presley family.
          </motion.p>
        </motion.div>
        
        <AuthForm />
      </div>
    </div>
  );
}
