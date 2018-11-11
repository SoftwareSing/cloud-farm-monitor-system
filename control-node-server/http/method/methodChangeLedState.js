import { changeLedState } from "~/control/commands/changeLedState";

const url = require("url");

// /method/changeLedState?red=true&green=true&blue=true
export function methodChangeLedState(req, res) {
    const { query } = url.parse(req.url, true);
    const red = query.red === "true";
    const green = query.green === "true";
    const blue = query.blue === "true";
    console.log(`method changeLedState: ${red} ${green} ${blue}`);
    changeLedState({ red, green, blue });
    res.end();
}
