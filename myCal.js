;(function(){
  var MyCal = function(ele, params) {
    //全局变量
    var slideIndex = 1;
    var slideList = $(".slide-wrapper");
    var isClickable = true;
    var container = $(".mycal-container")

    //检测滑动节点数量大于1
    var nodeCount = slideList.children("div").length;
    if(nodeCount<=1){
      return
    }
      
    //默认参数
    this.defaultConfig = {
      isAutoplay: true,
      speed: 3000,
      hasDot: true,
      duration: "slow",
      hasBtn:true
    };
    this.config = Object.assign({}, this.defaultConfig, params)

    //添加第一个和最后一个节点复制，防止闪回现象
    var firstNode = $(".slide-wrapper > div:first").clone();
    var lastNode = $(".slide-wrapper > div:last").clone();
    $(".slide-wrapper").prepend(lastNode);
    $(".slide-wrapper").append(firstNode);

    // 分页点
    if(this.config.hasDot==true){
      //创建节点
      container.append("<div class='slide-dot'></div>")
      for(var i = 0; i < nodeCount; i++){
        $(".slide-dot").append("<span></span>")
      }
      $(".slide-dot span:eq(0)").addClass("active")
      var _that = this
      //点击事件
      $(".slide-dot").children("span").click(function(){
        slideIndex = $(this).index()+1;
        var animateLength = slideIndex * (-600) + "px";
        slideList.animate({"left":animateLength},_that.config.duration);
        $(".slide-dot span").removeClass("active")
        $(".slide-dot span:eq("+(slideIndex - 1)+")").addClass("active")
      })
    }

    // 自动播放
    if(isClickable==true){
      var autoplay = ()=>{
        slideIndex++;
        var animateLength = slideIndex * (-600) + "px";
        slideList.animate({"left":animateLength},this.config.duration,function(){
          // animate的回调函数(即执行完动画之后才会执行函数里面的内容)
          if(slideIndex >= nodeCount+1){
              slideList.css({"left":"-600px"});
              slideIndex = 1;
          }
        });
        var num = slideIndex - 1;
        if(num >= nodeCount){
          num = 0
        }
        $(".slide-dot span").removeClass("active")
        $(".slide-dot span:eq("+num+")").addClass("active")
      }

      var init = setInterval(autoplay,this.config.speed)
      container.hover(
        ()=>{
         clearInterval(init);
         init = null;
        },
        ()=>{
          init = setInterval(autoplay,this.config.speed)
      })
    };

    //前后滚动按钮
    if(this.config.hasBtn==true){
      container.append("<div class='slideLeftBtn'>&lt;</div>")
      container.append("<div class='slideRightBtn'>&gt;</div>")
      // 向左滚动
      $(".slideLeftBtn").on("click",()=>{
        if(isClickable==true){
          slideIndex--;
        }else{
          return
        };
        isClickable = false;
        var animateLength = slideIndex * (-600) + "px";
        slideList.animate({"left":animateLength},this.config.duration,()=>{
          // animate的回调函数(即执行完动画之后才会执行函数里面的内容)
          isClickable = true;
          if(slideIndex <= 0){
            slideList.css({"left": -nodeCount*600 + "px"});
            slideIndex = nodeCount;
          }
        });
        var num = slideIndex-1
        $(".slide-dot span").removeClass("active")
        $(".slide-dot span:eq("+num+")").addClass("active")
      });

      //向右滚动
      $(".slideRightBtn").on("click",()=>{
        if(isClickable==true){
          slideIndex++;
        }else{
          return
        }
        isClickable = false;
        var animateLength = slideIndex * (-600) + "px";
        slideList.animate({"left":animateLength},this.config.duration,()=>{
          // animate的回调函数(即执行完动画之后才会执行函数里面的内容)
          isClickable = true;
          if(slideIndex >= nodeCount+1){
              slideList.css({"left":"-600px"});
              slideIndex = 1;
          } 
        });
        var num = slideIndex - 1;
        if(num >= nodeCount){
          num = 0
        }
        $(".slide-dot span").removeClass("active")
        $(".slide-dot span:eq("+num+")").addClass("active")
      });
    }
  
  }
  //暴露接口
  window.MyCal = MyCal;
})()