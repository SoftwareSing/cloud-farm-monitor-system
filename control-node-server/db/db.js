import firebase from "firebase";
import { firebaseConfig } from "@/firebaseConfig";

firebase.initializeApp(firebaseConfig);
export const db = firebase.database();
