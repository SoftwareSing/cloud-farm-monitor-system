import firebase from "firebase";
import { firebaseConfig } from "#/firebaseConfig";

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export function updateToDb(data) {
    const time = Date.now();
    db.ref(`/monitorData/${time}`).set(data);
}
