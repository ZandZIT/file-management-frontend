import { query, where, orderBy, onSnapshot } from "firebase/firestore";
import { collections } from "../firebase";

export const getStaredFoldersByUser = async(user, callback) => {
  
  if (!user?.uid) return null;

  let q;

  q = query(
    collections.folders,
    where("userId", "==", user.uid),
    where("star", "==", true),
    orderBy("createdAt")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const staredFolders = [];

    // Check if there are changes in the snapshot
    // if (!snapshot.metadata.hasPendingWrites) {
      snapshot.forEach((doc) => {
            staredFolders.push({ ...doc.data(), id: doc.id });
      });

      // If you want to trigger a callback with the updated data
      if (callback) {
        callback(staredFolders);
      }
    // }
  });

  return unsubscribe; // Return the unsubscribe function
  // try {
  // const querySnapshot = await getDocs(q);

  // const expiredFiles = [];

  // querySnapshot.forEach((doc) => {
  //   const result = compareDesc(new Date(), doc.data().expiredAt.toDate());
  //   if (result === -1) {
  //     expiredFiles.push({ ...doc.data(), id: doc.id });
  //   }
  // });

  // return expiredFiles;

  // }
};


