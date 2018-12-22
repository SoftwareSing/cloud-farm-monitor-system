import { getStepperPoints } from "~/control/detail/_controlPoint";

// /get/getStepperPoints
export function httpGetStepperPoints(req, res) {
    const pointsString = JSON.stringify(getStepperPoints());
    console.log(`get getStepperPoints: ${pointsString}`);
    res.end(pointsString);
}
