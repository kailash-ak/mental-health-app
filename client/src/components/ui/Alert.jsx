import React from 'react';

const Alert = ({ variant, children, className }) => {
  const baseStyles = "p-4 rounded-md";
  const variantStyles = {
    destructive: "bg-red-100 text-red-800",
    success: "bg-green-100 text-green-800",
    info: "bg-blue-100 text-blue-800",
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ children }) => {
  return <div>{children}</div>;
};

export default Alert;
