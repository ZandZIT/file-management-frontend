import { getDocs, query, where } from "firebase/firestore";
import { collections } from "../firebase";


export const getTotalDocsByUser = async(data) => {
    const fileQuery = query(
      collections.files,
      where("folderId", "==", data.id),
      where("userId", "==", data.userId),
    );
    const folderQuery = query(
      collections.folders,
      where("parentId", "==", data.id),
      where("userId", "==", data.userId),
    );
    try {
      const snapshotFile = await getDocs(fileQuery);
      const snapshotFolder = await getDocs(folderQuery);
      const length = snapshotFile.size + snapshotFolder.size;
      return length;
    } catch (error) {
      console.error("Error getting documents:", error);
    }
}