import { controlWaterPump } from "~/control/commands/controlWaterPump";

const url = require("url");

// /method/controlWaterPump?state=true&time=1000
export function methodControlWaterPump(req, res) {
    const { query } = url.parse(req.url, true);
    const state = query.state === "true";
    const time = Number(time) || 0;
    console.log(`method controlWaterPump: ${state} ${time}`);
    controlWaterPump({ state, time });
    res.end();
}
