import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config.js";
import { useGetUserInfo } from "./useGetUserInfo.js";

export const UseAddtransaction = () => {
  const docCollectionRef = collection(db, "transactions"); // Reference to the Firestore collection
  const { userId } = useGetUserInfo(); 

  const addTransaction = async ({ description, transactionAmount, transactionType }) => {
    try {
      // Add a new document to the 'transactions' collection
      await addDoc(docCollectionRef, {
        userId,
        description,
        transactionAmount,
        transactionType,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error adding transaction: ", error.message);
     
    }
  };

  return { addTransaction };
};
