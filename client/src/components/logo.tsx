import { Coins } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-sm",
    md: "w-10 h-10 text-lg",
    lg: "w-12 h-12 text-xl"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl"
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`bg-gradient-to-br from-primary to-green-500 rounded-lg flex items-center justify-center ${sizeClasses[size]}`}>
        <Coins className="text-white" />
      </div>
      <span className={`font-poppins font-bold gradient-text ${textSizeClasses[size]}`}>
        LoanVeda
      </span>
    </div>
  );
}
