import { goPage } from "~/http/page/goPage";
import { httpMethod } from "~/http/method/httpMethod";
import { httpGetStepperPoints } from "~/http/get/httpGetStepperPoints";

const http = require("http");
const url = require("url");

const server = http.createServer(function(req, res) {
    const { pathname, query } = url.parse(req.url, true);
    console.log(pathname);
    console.log(query);
    if (pathname === "/") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write("<html><body>This is Home Page.</body></html>");
        res.end();
    } else if (pathname === "/go") {
        goPage(req, res);
    } else if (pathname.slice(0, 8).includes("/method/")) {
        httpMethod(req, res);
    } else if (pathname.slice(0, 21).includes("/get/getStepperPoints")) {
        httpGetStepperPoints(req, res);
    } else {
        res.end("Invalid Request!");
    }
});

server.listen(10423);
