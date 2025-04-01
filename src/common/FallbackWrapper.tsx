import React from "react";

interface FallbackWrapperProps {
  fn: Function;
  fallback: React.ReactNode;
  children: React.ReactNode;
}

const FallbackWrapper: React.FC<FallbackWrapperProps> = ({
  fn,
  fallback,
  children,
}) => {
  if (!fn()) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default FallbackWrapper;
