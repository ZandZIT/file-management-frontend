import { query, where, orderBy, onSnapshot } from "firebase/firestore";
import { compareDesc } from "date-fns";
import { collections } from "../firebase";

export const getAllFilesByUser = (user, callback) => {
  if (!user?.uid) return null;
  
  const q = query(
    collections.files,
    where("userId", "==", user?.uid),
    orderBy("createdAt")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const expiredFiles = [];

    snapshot.forEach((doc) => {
      const result = compareDesc(new Date(), doc.data().expiredAt.toDate());

      if (result === -1) {
        expiredFiles.push({ ...doc.data(), id: doc.id });
      }
    });

    // If you want to trigger a callback with the updated data
    if (callback) {
      callback(expiredFiles);
    }
  });

  return unsubscribe; // Return the unsubscribe function
};
