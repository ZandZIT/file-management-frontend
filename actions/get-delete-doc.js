import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";


export const getDeleteDocById = async(type, id) => {
  try {
    const docRef = doc(db, type, id)
    return await deleteDoc(docRef)
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};