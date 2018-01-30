### demo

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="./myCal.css">
</head>
<body>
  <div class="mycal-container">
    <div class="slide-wrapper">
      <div class="slide-item">
      </div>
    </div>
  </div>
</body>
<script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
"></script>
<script src="./myCal.js"></script>
<script>
  var myCal = new MyCal('mycal-container',{
    //默认参数
    this.defaultConfig = {
      isAutoplay: true, //是否自动轮播
      speed: 3000,//轮播速度
      hasDot: true, //有无分页点
      duration: "slow",//动画时间
      hasBtn:true //有无左右切换按钮
    };
  })
</script>

</html>
```
