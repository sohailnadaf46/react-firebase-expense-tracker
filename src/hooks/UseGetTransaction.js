import { useEffect, useState } from "react";
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config.js";
import { useGetUserInfo } from "./useGetUserInfo.js";

export const UseGetTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsTotal, setTransactionsTotal] = useState({ totalBalance: 0, income: 0, expense: 0 });
  const { userId } = useGetUserInfo();

  useEffect(() => {
    if (!userId) return;

    const docCollectionRef = collection(db, "transactions");
    const queryTransactions = query(
      docCollectionRef,
      where("userId", "==", userId),
      orderBy("createdAt")
    );
    
    let totalIncome = 0;
    let totalExpense = 0;

    const unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
      const docs = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        docs.push({ id: doc.id, ...data });

        if (data.transactionType === "expense") {
          totalExpense += Number(data.transactionAmount);
        } else {
          totalIncome += Number(data.transactionAmount);
        }
      });

      const totalBalance = totalIncome - totalExpense;

      setTransactions(docs);
      setTransactionsTotal({ totalBalance, income: totalIncome, expense: totalExpense });
    });

    return () => unsubscribe();
  }, [userId]);

  return { transactions, transactionsTotal };
};
