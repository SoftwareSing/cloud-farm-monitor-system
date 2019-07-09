import express from "express";
import path from "path";

import { addControlApi } from "~/http/control.api";
import { addMonitorApi } from "~/http/monitor.api";

const app = express();
app.use(express.json());

const apiBaseUrl = "/api";
addControlApi(app, apiBaseUrl);
addMonitorApi(app, apiBaseUrl);

app.use(express.static(path.resolve(__dirname, "../dist")));

app.listen(5438, function() {
    console.log("start on 5438");
});
