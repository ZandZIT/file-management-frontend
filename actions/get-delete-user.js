import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";


export const getDeleteUserById = async(id) => {
  try {
    const docRef = doc(db, "users", id)
    await deleteDoc(docRef).then(doc =>{
      return doc
    })
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};