import { query, where, orderBy, onSnapshot } from "firebase/firestore";
import { compareDesc } from "date-fns";
import { collections } from "../../firebase";

export const getExpiredFilesByUser = async(user, isAdmin, callback) => {
  
  if (!user?.uid) return null;

  let q;

  if (isAdmin) {
    q = query(
      collections.files,
      where("expiredAt", "!=", null),
      orderBy("expiredAt"), // First sort order on "expiredAt"
      orderBy("createdAt") // Second sort order on "createdAt" if needed
    );
  } else {
    q = query(
      collections.files,
      where("userId", "==", user.uid),
      where("expiredAt", "!=", null),
      orderBy("expiredAt"), // First sort order on "expiredAt"
      orderBy("createdAt") // Second sort order on "createdAt" if needed
    );
  }

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const expiredFiles = [];

    // Check if there are changes in the snapshot
    // if (!snapshot.metadata.hasPendingWrites) {
      snapshot.forEach((doc) => {
        if (doc.data().expiredAt) {
          const result = compareDesc(new Date(), doc.data().expiredAt.toDate());

          if (result === -1) {
            expiredFiles.push({ ...doc.data(), id: doc.id });
          }
        }
      });

      // If you want to trigger a callback with the updated data
      if (callback) {
        callback(expiredFiles);
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


