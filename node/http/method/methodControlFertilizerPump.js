import { controlFertilizerPump } from "~/control/commands/controlFertilizerPump";

const url = require("url");

// /method/controlFertilizerPump?state=true&time=1000
export function methodControlFertilizerPump(req, res) {
    const { query } = url.parse(req.url, true);
    const state = query.state === "true";
    const time = Number(query.time) || 0;
    console.log(`method controlFertilizerPump: ${state} ${time}`);
    controlFertilizerPump({ state, time });
    res.end();
}
