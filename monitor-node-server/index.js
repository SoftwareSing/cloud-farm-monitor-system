const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.get("/", function(req, res) {
    res.send("arduino資訊網頁");
});

app.use(bodyParser.json()); //解析POST參數的JSON資料

//Get
// app.get("/th", function(req, res) {
//     const temp = req.query.airtemperature; // 讀取查詢字串的temp值
//     const humid = req.query.airhumidity; // 讀取查詢字串的humid值
//     const soidhumid1 = req.query.soidmoisture1;
//     const soidhumid2 = req.query.soidmoisture2;// 讀取查詢字串的humid值
//     const ph = req.query.ph;// 讀取查詢字串的humid值
//     const waterLevelTank1 = req.query.waterLevelTank1;// 讀取查詢字串的第一水箱水位值
//     const waterLevelTank2 = req.query.waterLevelTank2;// 讀取查詢字串的第二水箱水位值
//     // 確認有收到溫度和濕度值（兩者都不是undefined）
//     if (temp !== undefined && humid !== undefined) {
//         //印出值
//         console.log("溫度 :" + temp + "，濕度 :" + humid + ",土地濕度1 :" + soidhumid1 + ",土地濕度2 :" + soidhumid2 + "PH值:" + ph + " 水位1:" + waterLevelTank1 + " 水位2:" + waterLevelTank2);
//         res.send("溫度: " + temp + "°C，濕度： " + humid + ",土地濕度1 :" + soidhumid1 + ",土地濕度2 :" + soidhumid2 + "PH值" + ph + "水位1:" + waterLevelTank1 + " 水位2:" + waterLevelTank2);
//     } else {
//         console.log("沒收到資料！");
//     }
// });


app.post("/temp", function(req, res) { // JSON資料的處理程式
    const json = req.body; // 取出POST資料本體

    console.log("溫度：" + json.airtemp); // 在控制台顯示溫度值
    console.log("濕度：" + json.airhumid); // 顯示濕度值
    console.log("土壤濕度：" + json.soild1humid1); // 顯示土壤濕度
    console.log("土壤濕度：" + json.soild1humid2); // 顯示土壤濕度
    console.log("PH：" + json.ph); // 顯示ph值
    console.log("水箱一水位：" + json.waterLevelTank1); // 顯示水位
    console.log("水箱二水位：" + json.waterLevelTank2); // 顯示水位
});

app.use("*", function(req, res) {
    res.status(404).send("查無此頁！");
});

const server = app.listen(5438, function() {
    console.log("網站伺服器在5438埠口開工了！");
});
