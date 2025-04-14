
import React from "react";
import { Progress } from "@/components/ui/progress";

interface PasswordStrengthIndicatorProps {
  passwordStrength: {
    score: number;
    feedback: string;
  };
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ passwordStrength }) => {
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
    <div className="mt-2 space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs">Password strength</span>
        <span className="text-xs">{passwordStrength.score}/5</span>
      </div>
      <Progress 
        value={passwordStrength.score * 20} 
        className="h-1" 
        indicatorClassName={getPasswordStrengthColor()}
      />
      <p className="text-xs mt-1">{passwordStrength.feedback}</p>
    </div>
  );
};

export default PasswordStrengthIndicator;
