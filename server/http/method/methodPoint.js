import { goPoint, backPoint } from "~/control/commands/point";

// /api/control/goPoint
export function methodGoPoint(req, res) {
    const { x, y, z } = getXYZ(req);
    console.log(`method goPoint: ${x} ${y} ${z}`);
    goPoint({ x, y, z });
    res.end();
}

// /api/control/backPoint
export function methodBackPoint(req, res) {
    const { x, y, z } = getXYZ(req);
    console.log(`method backPoint: ${x} ${y} ${z}`);
    backPoint({ x, y, z });
    res.end();
}

function getXYZ(req) {
    const x = Number(req.body.x) || 0;
    const y = Number(req.body.y) || 0;
    const z = Number(req.body.z) || 0;
    return { x, y, z };
}
