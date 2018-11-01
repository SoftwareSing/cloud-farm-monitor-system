import { controlWaterPump } from "~/control/commands/controlWaterPump";

const url = require("url");

// /method/controlWaterPump?state=true&time=1000
export function methodControlWaterPump(req, res) {
    const { query } = url.parse(req.url, true);
    const { state, time } = query;
    console.log(`method controlWaterPump: ${state} ${time}`);
    controlWaterPump({ state, time });
    res.end();
}
