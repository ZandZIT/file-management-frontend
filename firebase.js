// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
import { collection, getFirestore } from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcOEkj7uJIM0NSLJWuhLiTjoYXgVCPAEM",
  authDomain: "file-store-9bc94.firebaseapp.com",
  projectId: "file-store-9bc94",
  storageBucket: "file-store-9bc94.appspot.com",
  messagingSenderId: "987491187517",
  appId: "1:987491187517:web:9afeaaa5aeb9b66a5ce354",
  measurementId: "G-S34NRGB19R",
};

// Initialize Firebase
const app = getApps().length ? getApp() :  initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const  storage = getStorage(app)
const db = getFirestore(app)
const collections = {
  folders: collection(db, "folders"),
  files: collection(db, "files"),
  formatedDoc: (doc) => ({
    id: doc.id,
    ...doc.data()
  })
};
const auth = getAuth(app)
export {app, storage, db, auth, collections}