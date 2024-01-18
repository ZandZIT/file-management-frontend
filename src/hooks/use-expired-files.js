import { useEffect, useState } from "react";
import { useCurrentUser } from "./use-current-user";
import { getExpiredFilesByUser } from "../../actions/get-expired-files";

export const useExpiredFiles = () => {
  const { user } = useCurrentUser();
  const [childFiles, setChildFiles] = useState([]);

  useEffect(() => {
    const getData = async (user) => {
      return await getExpiredFilesByUser(user);
    };

    if (user.uid && !childFiles.length) {
      getData(user).then((doc) => {
        setChildFiles(doc);
      });
    }
  }, [user, childFiles]);

  useEffect(() => {
    if (childFiles.length) return;
  }, [childFiles]);

  return { childFiles };
};
