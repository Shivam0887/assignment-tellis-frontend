import { Menu } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import Sidebar from "./dashboard/Sidebar";

const MobileNavbar = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <Menu />
      </DrawerTrigger>
      <DrawerContent className="!w-fit">
        <Sidebar className="w-72" />
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavbar;
