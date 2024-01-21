import { getDocs, orderBy, query, where } from "firebase/firestore";
import { collections } from "../../firebase";


export const useFoldersByParentId = async (folderId, user) => {
  // console.log(user)
  try {
    const q = query(
      collections.folders,
      where("parentId", "==", folderId),
      where("userId", "==", user.uid),
      orderBy("createdAt")
    );

    // Execute the query
    return  await getDocs(q);
    
  } catch (error) {
    console.error(error);
  }
};