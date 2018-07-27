const express = require("express");
const app = express();

app.get("/", function(req, res) {
    res.send("arduino資訊網頁");
});

app.get("/th", function(req, res) {
    const temp = req.query.airtemperature; // 讀取查詢字串的temp值
    const humid = req.query.airhumidity; // 讀取查詢字串的humid值
    const soidhumid = req.query.soidmoisture;// 讀取查詢字串的humid值
    const ph = req.query.ph;// 讀取查詢字串的humid值
    const waterLevel = req.query.waterLevel;// 讀取查詢字串的humid值

    // 確認有收到溫度和濕度值（兩者都不是undefined）
    if (temp !== undefined && humid !== undefined) {
        //印出值
        console.log("溫度 :" + temp + "，濕度 :" + humid + ",土地濕度 :" + soidhumid + " PH值 :" + ph + " 水位 :" + waterLevel);
        res.send("溫度: " + temp + "°C，濕度： " + humid + " % ,土地濕度 " + soidhumid + "PH值" + ph + "水位" + waterLevel);
    } else {
        console.log("沒收到資料！");
    }
});

app.use("*", function(req, res) {
    res.status(404).send("查無此頁！");
});

const server = app.listen(5438, function() {
    console.log("網站伺服器在5438埠口開工了！");
});
