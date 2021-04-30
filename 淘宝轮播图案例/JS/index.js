window.addEventListener('load',function(){
   var slidebar = document.querySelector('.slide-bar');
   var arrowl = document.querySelector('.arrow-l');
   var arrowr = document.querySelector('.arrow-r');
   var slidebarWidth = slidebar.offsetWidth;
   //1.鼠标经过轮播盒子，左右两个箭头显示出来，鼠标离开时隐藏
   slidebar.addEventListener('mouseenter',function(){
       arrowl.style.display = 'block';
       arrowr.style.display = 'block';  
       clearInterval(timer);
       timer=null; 
   });
   slidebar.addEventListener('mouseleave',function(){
    arrowl.style.display = 'none';
    arrowr.style.display = 'none';
    timer = setInterval(autoPlay,2000);
   });

   //2.动态生成小圆圈
   // 核心原理：小圆圈的个数与图片的张数一致，所以先得到ul里面图片的张数，即li的个数，利用动态循环 生成小圆圈（这个小圆圈要放入ol里面）
   var ul = document.querySelector('ul');
   var ol = document.querySelector('ol');
   for (var i = 0;i < ul.children.length;i++){
       var li = document.createElement('li');
       //通过自定义属性，设置当前小圆圈的索引号
       li.setAttribute('index',i);
       ol.appendChild(li);
       //鼠标停留在哪个小圆圈，哪个小圆圈就变色(利用排他思想)
       li.addEventListener('mouseenter',function(){
           var _this = this;
            setTimeout(function(){
                for(var j=0;j<ol.children.length;j++){
                    ol.children[j].className='';
                }
                _this.className='current';
                 //3.鼠标停留在小圆圈上时，还能实现图片切换
                    //核心算法:图片滚动的距离=小圆圈的索引号*图片的宽度，以此作为ul的移动距离
                var index=_this.getAttribute('index');
                num=index;
                circle=index;
                animate(ul,-index*slidebarWidth);
            }, 500);            
       });
   }
   ol.children[0].className = 'current';

  //4.点击右侧箭头按钮时，图片进行切换 
  var first = ul.children[0].cloneNode(true); //先克隆第一张图片，放到ul的最后面,实现无缝滚动
  ul.appendChild(first);
  var num = 0; //图片的索引号
  var circle=0; //circle控制小圆圈的播放
  arrowr.addEventListener('click',function(){
      //如果走到了最后复制的一张图片，此时ul快速跳到第一张图片，即ul的left值改为0
      if(num==ul.children.length-1){
          ul.style.left=0;
          num=0;
      }
      num++;
      animate(ul,-num*slidebarWidth);
      //点击右侧箭头按钮的同时，下面的小圆点也能同步点亮
      circle++;
      if(circle==ol.children.length){  //当circle等于图片的张数时，说明ul走到了克隆的那张图片，此时让circle归零
          circle=0;
      }
      circleChange();
  });

    //5.点击左侧箭头按钮时，图片进行切换 
    arrowl.addEventListener('click',function(){
        //如果走到了第一张图片，此时ul快速跳到最后一张图片，即ul的left值改为:图片索引号*图片宽度
        if(num==0){
            num=ul.children.length-1;
            ul.style.left=-num*slidebarWidth+'px';  
        }
        num--;
        animate(ul,-num*slidebarWidth);
        //点击右侧箭头按钮的同时，下面的小圆点也能同步点亮
        circle--;
        if(circle<0){  //当circle小于零时，说明ul走到了第一张图片，此时让circle等于最后一张图的索引号
            circle=ol.children.length-1;
        }
        circleChange();
    });

    function circleChange(){
        for (var i=0;i<ol.children.length;i++){
            ol.children[i].className='';
        }
        ol.children[circle].className='current';
    }

    //6.鼠标离开图片时，自动播放。鼠标进去时，停止播放
    function autoPlay(){
        arrowr.click();
    }
    var timer = setInterval(autoPlay,2000)
})