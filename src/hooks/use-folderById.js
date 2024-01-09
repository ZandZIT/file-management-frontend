import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const useFolderById = async(folderId) => {

  // Create a reference to the specific document
  const documentRef = doc(db, 'folders', folderId);
  // Retrieve the document
  return (await getDoc(documentRef)).data();
};
