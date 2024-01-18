import { query, where, orderBy, getDocs } from "firebase/firestore";
import { compareDesc } from "date-fns";
import { collections } from "../firebase";

export const getExpiredFilesByUser = async(user) => {

  // return user
  const q = query(
    collections.files,
    where("userId", "==", user.uid),
    where("expiredAt", "!=", null),
    orderBy("expiredAt"), // First sort order on "expiredAt"
    orderBy("createdAt") // Second sort order on "createdAt" if needed
  );
  try {
    const querySnapshot = await getDocs(q);

    const expiredFiles = [];

    querySnapshot.forEach((doc) => {
      const result = compareDesc(new Date(), doc.data().expiredAt.toDate());
      if (result === -1) {
        expiredFiles.push({ ...doc.data(), id: doc.id });
      }
    });

    return expiredFiles;
  } catch (error) {
    console.error("Error getting expired files:", error);
    throw error;
  }
};


//   const unsubscribe = onSnapshot(q, (snapshot) => {
//     const expiredFiles = [];

//     // Check if there are changes in the snapshot
    
//       snapshot.forEach((doc) => {
        
//         const result = compareDesc(new Date(), doc.data().expiredAt.toDate());

//         if (result === -1) {
//           expiredFiles.push({ ...doc.data(), id: doc.id });
//         }
        
//       });

//       // If you want to trigger a callback with the updated data
//       if (callback) {
//         callback(expiredFiles);
//       }
    
//   });
//   return unsubscribe; // Return the unsubscribe function
// };
