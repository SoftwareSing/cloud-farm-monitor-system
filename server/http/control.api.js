import { methodChangeLedState } from "~/http/method/methodChangeLedState";
import { methodControlFertilizerPump } from "~/http/method/methodControlFertilizerPump";
import { methodControlWaterPump } from "~/http/method/methodControlWaterPump";
import { methodGoPoint, methodBackPoint } from "~/http/method/methodPoint";

export function addControlApi(app, baseApiUrl = "") {
    baseApiUrl += "/control";
    app.post(`${baseApiUrl}/changeLedState`, methodChangeLedState);
    app.post(`${baseApiUrl}/controlFertilizerPump`, methodControlFertilizerPump);
    app.post(`${baseApiUrl}/controlWaterPump`, methodControlWaterPump);
    app.post(`${baseApiUrl}/goPoint`, methodGoPoint);
    app.post(`${baseApiUrl}/backPoint`, methodBackPoint);
}
