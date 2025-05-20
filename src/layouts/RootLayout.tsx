import MobileNavbar from "@/components/MobileNavbar";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/providers/AuthProvider";

import ThemeProvider from "@/providers/ThemeProvider";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="h-dvh">
          <Outlet />
        </div>
        <div className="md:hidden absolute top-10 right-6">
          <MobileNavbar />
        </div>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
