"use client";

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export default function LoadingSpinner({ 
  size = 'medium', 
  color = 'text-white' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  return (
    <div className="flex items-center justify-center">
      <div 
        className={`${sizeClasses[size]} ${color} animate-spin`}
        style={{ 
          border: '2px solid currentColor',
          borderRightColor: 'transparent',
          borderRadius: '50%'
        }}
      />
    </div>
  );
}