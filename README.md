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
To use HTTP control, you will use those URL
```
/method/changeLedState?color=FFFFFF
```
```
/method/controlFertilizerPump?state=true&time=1000
```
```
/method/controlWaterPump?state=true&time=1000
```
```
/method/goPoint?x=5000&y=5000&z=1000
```
```
/method/backPoint?x=5000&y=5000&z=1000
```
