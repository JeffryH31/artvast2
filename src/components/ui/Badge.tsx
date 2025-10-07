import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gradient" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  className = "",
}) => {
  const baseClasses =
    "inline-block backdrop-blur-sm rounded-full font-medium border";

  const variantClasses = {
    default: "bg-white/10 text-white/90 border-white/20",
    gradient:
      "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200",
    outline: "bg-transparent text-white border-white/30",
    secondary: "bg-yellow-300/20 text-yellow-300 border-yellow-300/30",
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return <span className={combinedClasses}>{children}</span>;
};

export default Badge;
