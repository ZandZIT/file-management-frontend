import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";


export const getRenameDocById = async(type, data) => {
  try {
    const docRef = doc(db, type, data.id);
    updateDoc(docRef, {
      star: !data?.star,
    }).then(() => {
        toast.success(`${data.name} is ${data?.star ? "Unstared" : "Stared"}`);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Somethong went wrong");
      });
  } catch (error) {
    console.error("Error updating document:", error);
  }
};