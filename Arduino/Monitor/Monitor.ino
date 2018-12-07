#include <SPI.h>
#include <Ethernet.h>
#include <dht11.h>
#include <Streaming.h>
#include <SHT1x.h>
#include "DHT.h"

#define SensorPin A2            //pH meter Analog output to Arduino Analog Input 0
#define Offset 0.43    
#define ArrayLenth 40    //times of collection
#define samplingInterval 20
//#define dataPin 3
//#define clockPin 4
#define dhtPin 2      //讀取DHT11 Data
#define dhtType DHT11 //選用DHT11 

int pHArray[ArrayLenth];   //Store the average value of the sensor feedback
int pHArrayIndex = 0;   

DHT dht(dhtPin, dhtType);

//SHT1x sht1x(2, 3); //前面是data後面是clock //燒毀中

//const byte dataPin = 8;//dht11 pin
const int SW1[3] = {4, 5, 6};//第一組水位
const int SW2[3] = {7, 8, 9};

unsigned long past = 0; 
const unsigned long interval = 2 * 1000L;

byte mac[] = {0x00, 0xa0, 0x96, 0x7b, 0x87, 0xb3};

// 要連接的伺服器IP位址，這你們要給我
IPAddress server(172, 23, 99, 99);

// 本機的IP位址，也是你們要給我
IPAddress ip(172, 23, 99, 20);
//B class時要用這個
//default是C class的subnet跟gateway
IPAddress subnet(255, 255, 0, 0);

IPAddress gateway(172, 23, 39, 39);

// 初始化乙太用戶端
EthernetClient client;

void setup(){
    dht.begin();
    Serial.begin(9600);
    for(int i = 0; i < 3; i++){
        pinMode(SW1[i],INPUT);//指撥開關腳位水位
        pinMode(SW2[i],INPUT);
    }
    Ethernet.begin(mac, ip,subnet , gateway);  // 初始化乙太網路連線

    // 等待一秒鐘，讓乙太網路卡有時間進行初始化
    delay(1000);
    Serial.println("connecting...");

    if (client.connect(server, 5438)) {
        Serial.println("connected");
        // 發送HTTP請求
        client.println("GET /a?pin=10&state=1 HTTP/1.1");
        client.println();
        Serial.println("Fuck");
    } else {
        // if you couldn't make a connection:
        Serial.println("connection failed");
    }

}

void loop(){
  
    static float pHValue,voltage;
    static unsigned long samplingTime = millis();
    static unsigned long printTime = millis();

    if(millis()-samplingTime > samplingInterval){
        pHArray[pHArrayIndex++] = analogRead(SensorPin);
        if(pHArrayIndex == ArrayLenth){
            pHArrayIndex = 0;
        }
        voltage = avergearray(pHArray, ArrayLenth)*5.0/1024;
        samplingTime = millis();
    }
//GET{
//opt1
//  if (millis() - past > interval) {
//    int chk = DHT11.read(dataPin);
//    int moisture = analogRead(A0);
//    int moisture2 = analogRead(A5);

//    if (chk == 0) {
//      httpSend(moisture, voltage, waterLevel());
//    } else {
//      Serial.println("Sensor Error");
//    }
//  }

//opt2
    // if (millis() - past > interval) {
    //     int moisture1 = analogRead(A0);//土壤濕度pin
    //     int moisture2 = analogRead(A5);
    //     httpSend(moisture1, moisture2, 
    //         voltage, waterLevelTank1(), waterLevelTank2());
    //     Serial.println("fuck");
    // }
//}

//Post
    float airtemp = dht.readTemperature();
    float airhum = dht.readHumidity();
    int moisture1 = analogRead(A0);
    int moisture2 = analogRead(A5);
    double ph = 3.5*voltage + Offset;
    //double ph = 7.01;
    int waterlevel1 = waterLevelTank1();
    int waterlevel2 = waterLevelTank2();
    Serial.print("ph:");
    Serial.println(ph);
    //String jsonStr = "{\"temp\":11,\"humid\":11}";  // 定義JSON字串
    
    if (millis() - past > interval) {
        String jsonStr = String("") 
        + "{\"airtemp\":" + airtemp 
        + ",\"airhumid\":" + airhum 
        + ",\"soild1humid1\":" + String(moisture1) 
        + ",\"soild1humid2\":" + String(moisture2) 
        + ",\"ph\":" + String(ph)
        + ",\"waterLevelTank1\":" + String(waterlevel1)
        + ",\"waterLevelTank2\":" + String(waterlevel2)
        +"}";
      
        httpSend(jsonStr);   // 每隔5秒發送一次JSON資料
    }
}

double avergearray(int* arr, int number){

    int i;
    int max,min;
    double avg;
    long amount = 0;

    if(number <= 0){
        Serial.println("Error number for the array to avraging!/n");
        return 0;
    }
    if(number < 5){   //less than 5, calculated directly statistics
        for(i = 0; i < number; i++){
            amount+=arr[i];
        }
        avg = amount/number;
        return avg;
    }else{
        if(arr[0] < arr[1]){
        min = arr[0];
        max = arr[1];
        }else{
            min = arr[1];
            max = arr[0];
        }
        for(i = 2; i < number; i++){
            if(arr[i] < min){
                amount += min;        //arr<min
                min = arr[i];
            }else{
                if(arr[i] > max){
                    amount += max;    //arr>max
                    max = arr[i];
                }else{
                    amount += arr[i]; //min<=arr<=max
                }
            }//if
        }//for
        avg = (double)amount/(number-2);
    }//if
    return avg;
}

int checkWaterLevel(int a, int b, int c){

    if (a==0 && b==0 && c==0){
        Serial.print("FULL");
        return 3;      
    }else if (a==0 && b==0 && c==1){
        Serial.print("2");
        return 2;
    }else if (a==0 && b==1 && c==1){
        Serial.print("1");
        return 1;
    }else if (a==1 && b==1 && c==1){
        Serial.print("EMPTY");
        return 0;
    }else{
      return 0;
    }

    
//Serial.print("\n");

}

//untest 水位副程式
int waterLevelTank1(){
 int a,b,c;

    a=digitalRead(SW1[0]);
    b=digitalRead(SW1[1]);
    c=digitalRead(SW1[2]);

    Serial.print(a);
    Serial.print(b);
    Serial.print(c);
    Serial.print("\n");
    return checkWaterLevel(a,b,c);

//    if (a==0 && b==0 && c==0){
//        Serial.println("FULL");
//        return 3;      
//    }else if (a==0 && b==0 && c==1){
//        Serial.println("2");
//        return 2;
//    }else if (a==0 && b==1 && c==1){
//        Serial.println("1");
//        return 1;
//    }else if (a==1 && b==1 && c==1){
//        Serial.println("EMPTY");
//        return 0;
//    }else {
//        return 0;  
//    }
//    Serial.print("\n");
}

int waterLevelTank2(){
  
    int a,b,c;

    a = digitalRead(SW2[0]);
    b = digitalRead(SW2[1]);
    c = digitalRead(SW2[2]);
    return checkWaterLevel(a,b,c);

    
//Serial.print(a);
//Serial.print(b);
//Serial.print(c);
//Serial.print("\n");

}
// GET
// void httpSend(int moisture1 ,int moisture2, double voltage ,String waterLevelTank1, String waterLevelTank2) {
//     char temperatureBuffer[6] = "";
//     char humidityBuffer[6] = "";
//     char soidmoistureBuffer[6] = "";
//     char phBuffer[6] = "";
  
//     client.stop();

// // 連線到指定伺服器的5438埠號
//     if (client.connect(server, 5438)) {
//         Serial.println("connected");
// // 發送HTTP請求
//         client << "GET /th?airtemperature=" << dtostrf(sht1x.readTemperatureC(), 5, 2, temperatureBuffer)
//                << "&airhumidity=" << dtostrf(sht1x.readHumidity(), 5, 2, humidityBuffer)
//                << "&soidmoisture1=" << dtostrf(moisture1, 5, 2, soidmoistureBuffer)
//                << "&soidmoisture2=" << dtostrf(moisture2, 5, 2, soidmoistureBuffer)
//              //<< "&ph=" << dtostrf(3.5*voltage + Offset, 5, 3, phBuffer)//untest
//                << "&waterLevelTank1=" << waterLevelTank1//untest
//                << "&waterLevelTank2=" << waterLevelTank2//untest
//                << " HTTP/1.1\n";
//         client.println();

//         past = millis();
//     }else{
//         Serial.println("connection failed");
//     }
// }

//Post
void httpSend(String jsonStr) {
  client.stop();

  // 連線到指定伺服器的5438埠號
  if (client.connect(server, 5438)) {
    Serial.println("connected");// 開始傳送JSON資料
    client.println("POST /temp HTTP/1.1");
    client.println("Content-Type: application/json");
    client.print("Content-Length: ");
    client.println(jsonStr.length());
    client.println();
    client.print(jsonStr);
    past = millis();
    } else {
    Serial.println("connection failed");
  }
}
