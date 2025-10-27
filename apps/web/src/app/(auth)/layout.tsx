import type { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="from-background via-background to-muted flex min-h-screen items-center justify-center bg-gradient-to-br">
      {children}
    </div>
  );
};

export default AuthLayout;
