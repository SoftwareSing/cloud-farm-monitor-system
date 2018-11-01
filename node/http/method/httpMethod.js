import { methodGo } from "~/http/method/methodGo";
import { methodChangeLedState } from "~/http/method/methodChangeLedState";
import { methodControlFertilizerPump } from "~/http/method/methodControlFertilizerPump";
import { methodControlWaterPump } from "~/http/method/methodControlWaterPump";
import { methodGoPoint, methodBackPoint } from "~/http/method/methodPoint";

const url = require("url");

export function httpMethod(req, res) {
    const { pathname } = url.parse(req.url, true);
    switch (pathname.slice(8)) {
        case "Go":
            methodGo(req, res);
            break;
        case "changeLedState":
            methodChangeLedState(req, res);
            break;
        case "controlFertilizerPump":
            methodControlFertilizerPump(req, res);
            break;
        case "controlWaterPump":
            methodControlWaterPump(req, res);
            break;
        case "goPoint":
            methodGoPoint(req, res);
            break;
        case "backPoint":
            methodBackPoint(req, res);
            break;
        default:
            res.end("Invalid Request!");
            break;
    }
}
