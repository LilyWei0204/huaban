function shape(canvas,copy,cobj,xp) {
    this.canvas = canvas;
    this.copy=copy;
    this.cobj = cobj;
    this.xp=xp;
    this.width = canvas.width;
    this.height = canvas.height;
    this.type = "line";
    this.style = "stroke";
    this.strokeStyle = "#000";
    this.fillStyle = "#000";
    this.lineWidth = 1;
    this.hostory = [];
    this.bianNum=5;
    this.jiaoNum=5;
    this.isback=true;
    this.xpsize=10;
    this.isxp=true;


}
    shape.prototype={
       init:function () {
           this.cobj.lineWidth=this.lineWidth;
           this.cobj.strokeStyle=this.strokeStyle;
           this.cobj.fillStyle=this.fillStyle;
           this.cobj.xp=this.xp;


       },
        draw:function () {
            var that=this;
            this.copy.onmousedown=function (e) {
               var startX=e.offsetX;
               var startY=e.offsetY;
               that.copy.onmousemove=function (e) {
                   that.init();
                   that.cobj.clearRect(0,0,that.width,that.height);
                   if(that.hostory.length>0){
                       that.cobj.putImageData(that.hostory[that.hostory.length-1],0,0)//放入
                   }
                   var endX=e.offsetX;
                   var endY=e.offsetY;
                   that.cobj.beginPath()
                   that[that.type](startX,startY,endX,endY)
               }
                that.copy.onmouseup=function () {
                    that.hostory.push(that.cobj.getImageData(0,0,that.width,that.height))
                    that.copy.onmousemove=null;
                    that.copy.onmouseup=null;
                }

            }

        },
        line:function (x,y,x1,y1) {
            this.cobj.moveTo(x,y);
            this.cobj.lineTo(x1,y1);
            this.cobj.stroke();
        },
        rect:function (x,y,x1,y1) {
            this.cobj.rect(x,y,x1-x,y1-y);
            this.cobj[this.style]();
        },

        // 画圆 cobj.src(100,100,50,0,2*Math*PI) cobj.stroke()
        arc:function (x,y,x1,y1) {
            var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
            this.cobj.arc(x,y,r,0,2*Math.PI);
            this.cobj[this.style]();
        },
        bian:function (x,y,x1,y1) {
            var angle=360/this.bianNum*Math.PI/180;
            var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
            for(var i=0;i<this.bianNum;i++){
                this.cobj.lineTo(Math.cos(angle*i)*r+x, Math.sin(angle*i)*r+y)
            }
            this.cobj.closePath();
            this.cobj[this.style]();
        },
        xing:function (x,y,x1,y1) {
            var angel=360/this.bianNum*Math.PI/180/2;
            var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
            var r1=r/3;
            for(var i=0;i<this.jiaoNum*2;i++){
                if(i%2==0){
                    this.cobj.lineTo(Math.cos(angel*i)*r+x,Math.sin(angel*i)*r+y);
                }else{
                    this.cobj.lineTo(Math.cos(angel*i)*r1+x,Math.sin(angel*i)*r1+y);
                }
            }
            this.cobj.closePath();
            this.cobj[this.style]();
        },
        pen:function () {
            var that=this;
            this.copy.onmousedown=function(e){
                var startx= e.offsetX;
                var starty= e.offsetY;
                that.cobj.beginPath();
                that.cobj.moveTo(startx,starty);
                that.copy.onmousemove=function(e){
                    that.init();
                    var endx= e.offsetX;
                    var endy= e.offsetY;
                    that.cobj.clearRect(0,0,that.width,that.height);
                    if(that.hostory.length>0){
                        that.cobj.putImageData(that.hostory[that.hostory.length-1],0,0);
                    }
                    that.cobj.lineTo(endx,endy);
                    that.cobj.stroke();

                }

                that.copy.onmouseup=function(){
                    that.copy.onmouseup=null;
                    that.copy.onmousemove=null;
                    that.hostory.push(that.cobj.getImageData(0,0,that.width,that.height));
                }
            }
        },
        cut:function () {
            var that=this;

            that.copy.onmousemove=function(e){
                if(!that.isxp){
                    return false;
                }
                var movex= e.offsetX;
                var movey= e.offsetY;
                var left=movex-that.xpsize/2;
                var top=movey-that.xpsize/2;
                if(left<0){
                    left=0;
                }
                if(left>that.width-that.xpsize){
                    left=that.width-that.xpsize
                }
                if(top<0){
                    top=0;
                }
                if(top>that.height-that.xpsize){
                    top=that.height-that.xpsize
                }
                that.xp.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.xpsize+"px;height:"+that.xpsize+"px";

            }

            that.copy.onmousedown=function(){
                if(!that.isxp){
                    return false;
                }
                that.copy.onmousemove=function(e){
                    var movex= e.offsetX;
                    var movey= e.offsetY;
                    var left=movex-that.xpsize/2;
                    var top=movey-that.xpsize/2;
                    if(left<0){
                        left=0;
                    }
                    if(left>that.width-that.xpsize){
                        left=that.width-that.xpsize
                    }
                    if(top<0){
                        top=0;
                    }
                    if(top>that.height-that.xpsize){
                        top=that.height-that.xpsize
                    }
                    that.xp.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.xpsize+"px;height:"+that.xpsize+"px";

                    that.cobj.clearRect(left,top,that.xpsize,that.xpsize);
                }

                that.copy.onmouseup=function(){
                    that.hostory.push(that.cobj.getImageData(0,0,that.width,that.height));
                    that.copy.onmousemove=null;
                    that.copy.onmouseup=null;
                    that.cut();
                }

            }
        },
        fx:function fx(dataobj,x,y){
            var that=this;
            for(var i=0;i<dataobj.width*dataobj.height;i++){
                dataobj.data[i*4+0]=255-dataobj.data[i*4+0];
                dataobj.data[i*4+1]=255-dataobj.data[i*4+1];
                dataobj.data[i*4+2]=255-dataobj.data[i*4+2];
                dataobj.data[i*4+3]=255
            }
            that.cobj.putImageData(dataobj,x,y);
        },
        blur:function blur(dataobj,num,x,y) {
            var that=this;
            var width = dataobj.width, height = dataobj.height;
            var arr=[];
            var num = num;
            for (var i = 0; i < height; i++) {//行
                for (var j = 0; j < width; j++) {//列  x
                    var x1=j+num>width?j-num:j;
                    var y1=i+num>height?i-num:i;
                    var dataObj = that.cobj.getImageData(x1, y1,num, num);
                    var r = 0, g = 0, b = 0;
                    for (var k = 0; k < dataObj.width * dataObj.height; k++) {
                        r += dataObj.data[k * 4 + 0];
                        g += dataObj.data[k * 4 + 1];
                        b += dataObj.data[k * 4 + 2];
                    }
                    r = parseInt(r / (dataObj.width * dataObj.height));
                    g = parseInt(g / (dataObj.width * dataObj.height));
                    b = parseInt(b / (dataObj.width * dataObj.height));
                    arr.push(r,g,b,255);
                }
            }
            for(var i=0;i<dataobj.data.length;i++){
                dataobj.data[i]=arr[i]
            }
            that.cobj.putImageData(dataobj,x,y);
        },
        m:function m(dataobj,num,x,y) {
            var that=this;
             var width = dataobj.width, height = dataobj.height;
             var num = num;
             var w = width / num;
             var h = height / num;
            for (var i = 0; i < num; i++) {//行
                for (var j = 0; j < num; j++) {//列  x
                    var dataObj = that.cobj.getImageData(j * w, i * h, w, h);
                    var r = 0, g = 0, b = 0;
                    for (var k = 0; k < dataObj.width * dataObj.height; k++) {
                       r += dataObj.data[k * 4 + 0];
                       g += dataObj.data[k * 4 + 1];
                       b += dataObj.data[k * 4 + 2];
                    }
                    r = parseInt(r / (dataObj.width * dataObj.height));
                    g = parseInt(g / (dataObj.width * dataObj.height));
                    b = parseInt(b / (dataObj.width * dataObj.height));
                    // console.log(r + "--" + g + "--" + b);
                    for (var k = 0; k < dataObj.width * dataObj.height; k++) {
                          dataObj.data[k * 4 + 0] = r;
                          dataObj.data[k * 4 + 1] = g;
                          dataObj.data[k * 4 + 2] = b;
                    }
                    that.cobj.putImageData(dataObj, x + j * w, y+i * h);
                }
            }
        }


}




