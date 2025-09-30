import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  className = '',
  icon,
  href
}) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25',
    secondary: 'bg-white text-gray-900 hover:bg-gray-50 shadow-2xl hover:shadow-white/20',
    outline: 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20'
  };
  
  const sizeClasses = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg'
  };
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  const content = (
    <>
      <span>{children}</span>
      {icon && <span className="group-hover:translate-x-1 transition-transform duration-300">{icon}</span>}
    </>
  );
  
  if (href) {
    return (
      <a href={href} className={`group ${combinedClasses}`}>
        {content}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={`group ${combinedClasses}`}>
      {content}
    </button>
  );
};

export default Button;