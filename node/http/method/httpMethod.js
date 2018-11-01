import { methodGo } from "~/http/method/methodGo";

const url = require("url");

export function httpMethod(req, res) {
    const { pathname } = url.parse(req.url, true);
    if (pathname.slice(8, 10).includes("Go")) {
        methodGo(req, res);
    }
}
