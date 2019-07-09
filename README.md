# cloud-farm-monitor-system

## config
Before build, you need have some config file in `project_config` directory

You can see [config-explanation.md](/docs/config-explanation.md), it will explain how to write config files


## start server
1. set up your config file ([config-explanation.md](/docs/config-explanation.md))
2. `npm install`
3. `npm run build`
4. clone our client project https://github.com/SoftwareSing/VueLogin2
5. `npm install` & `npm run build` in client project folder
6. copy `dist` folder from client to this project's [server-dist](/server-dist) folder
![](/docs/copy_dist_to_server-dist.jpg)
7. `npm run serve`

server will run on port 5438
http://127.0.0.1:5438/
