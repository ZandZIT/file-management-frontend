import { Bell, File, Star, UsersRound } from "lucide-react";
import { useMemo } from "react";
import { useExpiredFiles } from "./use-expired-files";


export const useRoutes = () => {
  const pathname = window.location.pathname;
  const {childFiles} = useExpiredFiles()


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
        icon: Bell,
        count: childFiles.length,
        active: pathname === "/expired",
        allAccess: true,
      },
    ],
    [pathname, childFiles]
  );

  return routes;
};
