# cloud-farm-monitor-system

## config
Before build, you need have some config file in `config` directory

You can see [config-explanation.md](/config-explanation.md), it will explain how to write config files


## start server
Use build command to build server
```sh
npm run build-control
npm run build-monitor
```
and then start them
```sh
npm run serve-control
npm run serve-monitor
```



# HTTP
HTTP server on port `10423`

To use HTTP control, you will use those URL


## getStepperPoints
```
/get/getStepperPoints
```
http://127.0.0.1:10423/get/getStepperPoints

## changeLedState
```
/method/changeLedState?color=FFFFFF
```
http://127.0.0.1:10423/method/changeLedState?color=FFFFFF

## controlFertilizerPump
```
/method/controlFertilizerPump?state=true&time=1000
```
http://127.0.0.1:10423/method/controlFertilizerPump?state=true&time=1000

## controlWaterPump
```
/method/controlWaterPump?state=true&time=1000
```
http://127.0.0.1:10423/method/controlWaterPump?state=true&time=1000

## goPoint
```
/method/goPoint?x=5000&y=5000&z=1000
```
http://127.0.0.1:10423/method/goPoint?x=5000&y=5000&z=1000

## backPoint
```
/method/backPoint?x=5000&y=5000&z=1000
```
http://127.0.0.1:10423/method/backPoint?x=5000&y=5000&z=1000
