import { Link, useNavigate } from "react-router";
import ToggleTheme from "./ToggleTheme";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { BASE_URL } from "@/lib/constants";
import { toast } from "sonner";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        credentials: "include",
      });

      const data = await response.json();
      toast(data.message);

      if (response.status === 200) {
        setUser(null);
        navigate("/");
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <header className="sticky top-0 inset-x-0 p-2 md:px-6 md:py-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-semibold">
          TaskMaster
        </Link>
        <div className="flex items-center gap-x-4">
          <ToggleTheme />
          {user === null ? (
            <div className="flex gap-4">
              <Link
                to="/register"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Register
              </Link>
              <Link
                to="/login"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="space-x-4">
              <Button type="button" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
