import { changeLedState } from "~/control/commands/changeLedState";

const url = require("url");

// /method/changeLedState?color=#39C5BB
export function methodChangeLedState(req, res) {
    const { query } = url.parse(req.url, true);
    const color = query.color;
    console.log(`method changeLedState: ${color}`);
    changeLedState(color);
    res.end();
}
