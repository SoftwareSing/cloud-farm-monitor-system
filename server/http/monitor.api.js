import { ArduinoData } from "~/monitor/ArduinoData";

export function addMonitorApi(app, baseApiUrl = "") {
    baseApiUrl += "/monitor";
    const arduinoData = new ArduinoData();

    app.post(`${baseApiUrl}/temp`, (req, res) => {
        arduinoData.set(req.body);
        console.log("溫度：" + arduinoData.airtemp); // 在控制台顯示溫度值
        console.log("濕度：" + arduinoData.airhumid); // 顯示濕度值
        console.log("土壤濕度：" + arduinoData.soild1humid1); // 顯示土壤濕度
        console.log("土壤濕度：" + arduinoData.soild1humid2); // 顯示土壤濕度
        console.log("PH：" + arduinoData.ph); // 顯示ph值
        console.log("水箱一水位：" + arduinoData.waterLevelTank1); // 顯示水位
        console.log("水箱二水位：" + arduinoData.waterLevelTank2); // 顯示水位
        res.end();
    });

    app.get(`${baseApiUrl}/data`, (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ humidity: arduinoData.airhumid,
            temperture: arduinoData.airtemp,
            soild1humid1: arduinoData.soild1humid1,
            soild1humid2: arduinoData.soild1humid2,
            ph: arduinoData.ph,
            waterLevelTank1: arduinoData.waterLevelTank1,
            waterLevelTank2: arduinoData.waterLevelTank2 }));
        console.log("data retrieved");
    });
}
