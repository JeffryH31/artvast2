import React from 'react';

interface CardProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'gradient' | 'glass';
  badge?: {
    icon: string;
    color: string;
  };
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  variant = 'default',
  badge,
  className = '',
  style,
  children
}) => {
  const baseClasses = 'group rounded-3xl p-10 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500';
  
  const variantClasses = {
    default: 'bg-white/95 backdrop-blur-sm shadow-2xl hover:shadow-white/10 border border-white/10',
    gradient: 'hero-gradient text-white shadow-2xl hover:shadow-blue-500/25',
    glass: 'bg-white/10 backdrop-blur-sm border border-white/20 text-white'
  };
  
  const textColorClasses = {
    default: 'text-gray-600',
    gradient: 'text-white/90',
    glass: 'text-white/90'
  };
  
  const titleColorClasses = {
    default: 'text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text',
    gradient: 'text-white',
    glass: 'text-white'
  };
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  return (
    <div className={combinedClasses} style={style}>
      {children ? (
        children
      ) : (
        <div className="text-center">
          {icon && (
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                {icon}
              </div>
              {badge && (
                <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r ${badge.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                  {badge.icon}
                </div>
              )}
            </div>
          )}
          
          {title && (
            <h3 className={`text-2xl md:text-3xl font-bold mb-6 group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500 ${titleColorClasses[variant]}`}>
              {title}
            </h3>
          )}
          
          {description && (
            <p className={`leading-relaxed text-lg mb-6 ${textColorClasses[variant]}`}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;