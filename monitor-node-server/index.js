import { updateToDb } from "#/updateToDb";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let json = "";

app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get("/", function(req, res) {
    res.send("arduino資訊網頁");
});

app.use(bodyParser.json()); // 解析POST參數的JSON資料

app.post("/temp", function(req, res) { // JSON資料的處理程式
    json = req.body; // 取出POST資料本體
    console.log("溫度：" + json.airtemp); // 在控制台顯示溫度值
    console.log("濕度：" + json.airhumid); // 顯示濕度值
    console.log("土壤濕度：" + json.soild1humid1); // 顯示土壤濕度
    console.log("土壤濕度：" + json.soild1humid2); // 顯示土壤濕度
    console.log("PH：" + json.ph); // 顯示ph值
    console.log("水箱一水位：" + json.waterLevelTank1); // 顯示水位
    console.log("水箱二水位：" + json.waterLevelTank2); // 顯示水位
});

app.get("/data", function(req, res) { // for testing
    //res.json(json);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ humidity: json.airhumid,
        temperture: json.airtemp,
        soild1humid1: json.soild1humid1,
        soild1humid2: json.soild1humid2,
        ph: json.ph,
        waterLevelTank1: json.waterLevelTank1,
        waterLevelTank2: json.waterLevelTank2 }));
    console.log("data retrieved");
});

app.get("*", function(req, res) {
    res.status(404);
    res.send("找不到網頁！");
});

app.listen(5438, function(req, res) {
    console.log("網站伺服器在5438埠口開工了！");
});


function autoUpdate() {
    updateToDb(json);
    setTimeout(autoUpdate, 60000);
}
autoUpdate();
