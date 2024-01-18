import { useEffect, useReducer } from "react";
import { auth, collections, db } from "../../firebase";
import { doc, getDoc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDataWithUserDetail } from "../utils";

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FOLDERS: "set-child-folders",
  SET_CHILD_FILES: "set-child-files",
};

export const ROOT_FOLDER ={
    name: "My Drive",
    id: null,
    path:[]
}

function reducer(state, { type, payload}){
    switch (type) {
      case ACTIONS.SELECT_FOLDER:
        return {
          ...state,
          folderId: payload.folderId,
          folder: payload.folder,
        };
      case ACTIONS.UPDATE_FOLDER:
        return {
          ...state,
          folder: payload,
        };
      case ACTIONS.SET_CHILD_FOLDERS:
        return {
          ...state,
          childFolders: payload.childFolders,
        };
      case ACTIONS.SET_CHILD_FILES:
        return {
          ...state,
          childFiles: payload.childFiles,
        };
      default:
        return state;
    }
}

export function useFolder(folderId = null, folder = null, showStared, isAdmin) {
  const [user] = useAuthState(auth);
  const curerntUser = user.providerData[0];
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });

  // trigger this whenever folder or folderId changes
  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
  }, [folder, folderId]);

  // update folder
  useEffect(() => {
    if (folderId == null) {
      return dispatch({ type: ACTIONS.UPDATE_FOLDER, payload: ROOT_FOLDER });
    }

    getDoc(doc(db, "folders", folderId))
      .then((doc) => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: collections.formatedDoc(doc),
        });
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: ROOT_FOLDER,
        });
      });
  }, [folderId]);

  // update chidFolder of a specific folderId
  useEffect(() => {
    const setChildFodlers = async () => {
      try {
        var q;
        if (showStared) {
          q = query(
            collections.folders,
            // where("parentId", "==", folderId),
            where("userId", "==", curerntUser.uid),
            where("star", "==", showStared),
            orderBy("createdAt")
          );
        } else if (isAdmin) {
          q = query(
            collections.folders,
            where("parentId", "==", folderId),
            orderBy("createdAt")
          );
        } else {
          q = query(
            collections.folders,
            where("parentId", "==", folderId),
            where("userId", "==", curerntUser.uid),
            orderBy("createdAt")
          );
        }

        // Execute the query
        onSnapshot(q, async (snapshot) => {
          const data = await getDataWithUserDetail(snapshot)

          dispatch({
            type: ACTIONS.SET_CHILD_FOLDERS,
            payload: { childFolders: data },
          });
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (curerntUser?.uid) setChildFodlers();
  }, [folderId, curerntUser, showStared, isAdmin]);

  // update chidFiles of a specific folderId
  useEffect(() => {
    const setChildFiles = async () => {
      try {
        var q;
        if (showStared) {
          q = query(
            collections.files,
            where("userId", "==", curerntUser.uid),
            where("star", "==", showStared),
            orderBy("createdAt")
          );
        } else if (isAdmin) {
          q = query(
            collections.files,
            where("folderId", "==", folderId),
            orderBy("createdAt")
          );
        } else {
          q = query(
            collections.files,
            where("folderId", "==", folderId),
            where("userId", "==", curerntUser.uid),
            orderBy("createdAt")
          );
        }

        // Execute the query
        onSnapshot(q, async (snapshot) => {
          const data = await getDataWithUserDetail(snapshot)

          dispatch({
            type: ACTIONS.SET_CHILD_FILES,
            payload: { childFiles: data },
          });
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (curerntUser?.uid) setChildFiles();
  }, [folderId, curerntUser, showStared, isAdmin]);



  return state;
}