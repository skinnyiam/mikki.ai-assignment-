import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";

const saveData = async (UID: string, data: any, time: any) => {
  try {
    const save = doc(db, "users", `${UID}`, "RandomData", `${time}`);
    await await setDoc(save, data);
    console.log("Data saved successfully!");
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

const getData = async (UID: string) => {
  let doc: any = [];

  try {
    const getDayDocRef = collection(db, "users", `${UID}`, "RandomData");
    const data = await getDocs(getDayDocRef);

    doc = data.docs.map((e) => {
      return { datas: e.data(), id: e.id };
    });
  } catch (e) {
    console.log(e);
  } finally {
    return doc;
  }
};

const useFirestore = () => {
  return { saveData, getData };
};

export default useFirestore;
