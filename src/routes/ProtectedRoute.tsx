import { useAuth } from "@/providers/AuthProvider";
import { useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) navigate("/login", { replace: true });
  }, [navigate, user]);

  return <>{children}</>;
};

export default ProtectedRoute;
