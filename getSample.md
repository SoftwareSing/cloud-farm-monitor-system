為了示範用法，接下來將會使用 `jquery`

如果你想在瀏覽器的console測試，可以透過以下code引入`jquery`
```js
var importJs=document.createElement('script')  //在页面新建一个script标签
importJs.setAttribute("type","text/javascript")  //给script标签增加type属性
importJs.setAttribute("src", 'http://ajax.microsoft.com/ajax/jquery/jquery-1.4.min.js') //给script标签增加src属性， url地址为cdn公共库里的
document.getElementsByTagName("head")[0].appendChild(importJs) //把importJs标签添加在页面
```

以下code示範如何透過http取得資訊
```js
$.ajax({
  url: 'http://127.0.0.1:10423/get/getStepperPoints',
  dataType: 'json',
  success: (points) => {
    const {x, y, z} = points;
    console.log(`x: ${x}, y: ${y}, z: ${z}`);
  },
  error: () => {
    console.log(`error`);
  }
});
```
