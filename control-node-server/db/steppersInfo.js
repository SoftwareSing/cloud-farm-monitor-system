import { db } from "~/db/db";

export function updateSteppersInfoToDb(steppers) {
    db.ref(`/control/steppers`).set(steppers);
}

export function getSteppersInfoFromDb(callback) {
    db.ref(`/control/steppers`).once("value", (dataSnapshot) => {
        callback(dataSnapshot.val());
    });
}
