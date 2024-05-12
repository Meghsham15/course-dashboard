import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, off, runTransaction } from "firebase/database";

const firebaseConfig = {
  // Your Firebase configuration goes here
  databaseURL: "https://likesdb-d3b3d-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const transaction = async (databaseRef, updateFunction) => {
  try {
    await runTransaction(databaseRef, updateFunction);
  } catch (error) {
    console.error("Transaction failed:", error);
  }
};

export { database, ref, onValue, off, transaction };
