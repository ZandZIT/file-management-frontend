import { signOut } from "firebase/auth";
import { BellDot, File, LogOut, Star, UsersRound } from "lucide-react";
import { useMemo } from "react";
import { auth } from "../../firebase";


export const useRoutes = () => {
  const pathname = window.location.pathname;

  const logout = () => {
    signOut(auth);
    
  };

  const routes = useMemo(
    () => [
      {
        label: "Drive",
        href: "/",
        icon: File,
        active: pathname === "/",
        allAccess: true,
      },
      {
        label: "Star",
        href: "/stared",
        icon: Star,
        active: pathname === "/stared",
        allAccess: true,
      },
      {
        label: "Users",
        href: "/users",
        icon: UsersRound,
        active: pathname === "/users",
        allAccess: false,
      },
      {
        label: "Notification",
        href: "/expired",
        icon: BellDot,
        active: pathname === "/expired",
        allAccess: true,
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => logout(),
        icon: LogOut,
        allAccess: true,
      },
    ],
    [pathname]
  );

  return routes;
};
