import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";


export const getRenameDocById = async(type, data) => {
  try {
    const docRef = doc(db, type, data.id);
    updateDoc(docRef, {
      star: !data?.star,
    }).then(() => {
        let message;
        if(data.type){
          message = data?.star
            ? "File remove from Favorites!"
            : "File added to Favorites!";
        }else{
          message = data?.star
            ? "Folder remove from Favorites!"
            : "Folder added to Favorites!";
        }
        toast.success(message);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  } catch (error) {
    console.error("Error updating document:", error);
  }
};