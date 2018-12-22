import firebase from "firebase";
import { firebaseConfig } from "@/firebaseConfig";

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export function updateSteppersInfoToDb(steppers) {
    db.ref(`/control/steppers`).set(steppers);
}

export function getSteppersInfoFromDb(callback) {
    db.ref(`/control/steppers`).once("value", (dataSnapshot) => {
        callback(dataSnapshot.val());
    });
}
