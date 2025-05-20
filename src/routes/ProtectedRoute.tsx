import { BASE_URL } from "@/lib/constants";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user`, {
          credentials: "include",
        });
        const data = await response.json();

        if (data === null) navigate("/login", { replace: true });
        if (response.ok) {
          setUser({ ...data });
        }
      } catch (error) {
        console.log(error);
        navigate("/login", { replace: true });
      }
    };

    getUser();
  }, [navigate, setUser]);

  return <>{children}</>;
};

export default ProtectedRoute;
