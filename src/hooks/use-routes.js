import { signOut } from "firebase/auth";
import { File, LogOut, Star, UsersRound } from "lucide-react";
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
        label: "File",
        href: "/files",
        icon: File,
        active: pathname === "/files",
      },
      {
        label: "Chat",
        href: "/conversations",
        icon: Star,
        active: pathname === "/conversations",
      },
      {
        label: "Users",
        href: "/users",
        icon: UsersRound,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => logout(),
        icon: LogOut,
      },
    ],
    [pathname]
  );

  return routes;
};
