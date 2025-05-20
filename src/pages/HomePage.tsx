import Navbar from "@/components/Navbar";
import { buttonVariants } from "@/components/ui/button";
import { BASE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";

const HomePage = () => {
  const { setUser, user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${BASE_URL}/auth`, {
          credentials: "include",
        });
        const data = await response.json();

        if (response.ok) {
          setUser({ ...data });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [setUser]);

  return (
    <div className="h-full flex flex-col gap-2 dark:bg-neutral-950">
      <Navbar />
      <div className="relative flex-1 flex justify-center items-center">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(50,50,50,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(50,50,50,0.15)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]" />

        <div className="relative z-20 max-w-6xl mx-auto flex flex-col gap-8 justify-center">
          {user && (
            <h1 className="capitalize text-3xl text-center">
              Welcome, {user.username}
            </h1>
          )}
          <h2 className="dark:gradient-text pb-3 text-center text-5xl sm:text-6xl md:text-7xl font-semibold">
            Your All-in-One Task Management Companion
          </h2>
          <p className="text-accent-foreground text-center max-w-4xl md:text-lg mx-auto px-2">
            Simplify task management, team collaboration, and project tracking
            with cutting-edge tools designed for everyone—from beginners to
            pros.
          </p>

          <div className="text-center group">
            <Link
              to="/dashboard"
              className={cn(
                buttonVariants({ size: "lg" }),
                "py-6 rounded-3xl cursor-pointer"
              )}
            >
              <ChevronRight className="transition-transform group-hover:translate-x-1" />{" "}
              <span className="sm:text-base font-medium">Get Started Now</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
