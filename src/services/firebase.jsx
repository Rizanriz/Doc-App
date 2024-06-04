import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBH3pXwP7BgShtAtkr2CCHavXtBvs1bGt8",
  authDomain: "note-app-b7377.firebaseapp.com",
  projectId: "note-app-b7377",
  storageBucket: "note-app-b7377.appspot.com",
  messagingSenderId: "1055220631617",
  appId: "1:1055220631617:web:0c2f94f540813157c19ec0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
