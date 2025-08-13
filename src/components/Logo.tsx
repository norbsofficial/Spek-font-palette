import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} flex flex-col justify-between`}>
        {/* Top: Purple star/burst shape */}
        <div className="w-full h-1/3 flex justify-center">
          <div className="w-3/4 h-full bg-purple-500 rounded-full transform rotate-45 scale-75"></div>
        </div>
        
        {/* Middle: Orange circle */}
        <div className="w-full h-1/3 flex justify-center">
          <div className="w-2/3 h-full bg-orange-500 rounded-full"></div>
        </div>
        
        {/* Bottom: Teal square with dark center */}
        <div className="w-full h-1/3 flex justify-center">
          <div className="w-2/3 h-full border-2 border-teal-400 rounded-sm relative">
            <div className="absolute inset-1 bg-gray-800 rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Logo Text */}
      <div className={`font-bold tracking-tight ${textSizes[size]}`}>
        <span className="text-gray-800">spek</span>
        <span className="text-purple-400 ml-1">palette</span>
      </div>
    </div>
  );
};

export default Logo;
