import { getDocs, orderBy, query, where } from "firebase/firestore";
import { collections } from "../firebase";


export const getTotalFilesByUser = async(data) => {
    const q = query(
      collections.files,
      where("folderId", "==", data.id),
      where("userId", "==", data.userId),
      orderBy("createdAt")
    );
    try {
      const snapshot = await getDocs(q);
      const length = snapshot.size;
      return length;
    } catch (error) {
      console.error("Error getting documents:", error);
    }
}