import { goPoint, backPoint } from "~/control/commands/point";

const url = require("url");

// /method/goPoint?x=5000&y=5000&z=1000
export function methodGoPoint(req, res) {
    const { query } = url.parse(req.url, true);
    const { x, y, z } = query;
    console.log(`method goPoint: ${x} ${y} ${z}`);
    goPoint({ x, y, z });
    res.end();
}

// /method/backPoint?x=5000&y=5000&z=1000
export function methodBackPoint(req, res) {
    const { query } = url.parse(req.url, true);
    const { x, y, z } = query;
    console.log(`method backPoint: ${x} ${y} ${z}`);
    backPoint({ x, y, z });
    res.end();
}
