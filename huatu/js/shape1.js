function shape(canvas,cobj) {
    this.canvas = canvas;
    this.cobj = cobj;
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
}
    shape.prototype={
       init:function () {
           this.cobj.lineWidth=this.lineWidth;
           this.cobj.strokeStyle=this.strokeStyle;
           this.cobj.fillStyle=this.fillStyle;

       },
        draw:function () {
            var that=this;
            that.canvas.onmousedown=function (e) {
               var startX=e.offsetX;
               var startY=e.offsetY;
               that.canvas.onmousemove=function (e) {
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
                that.canvas.onmouseup=function () {
                    that.hostory.push(that.cobj.getImageData(0,0,that.width,that.height))
                    that.canvas.onmousemove=null;
                    that.canvas.onmouseup=null;
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
        // xing:function (x,y,x1,y1) {
        //     var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        //     for (var i = 0; i < 5; i++) {
        //         this.cobj.lineTo(Math.cos((18+i*72)/180*Math.PI)*r+x,
        //             -Math.sin((18+i*72)/180*Math.PI)*r+y);
        //         this.cobj.lineTo(Math.cos((54+i*72)/180*Math.PI)*r/2.5+x,
        //             -Math.sin((54+i*72)/180*Math.PI)*r/2.5+y);
        //     }
        //     this.cobj.closePath();
        //     this.cobj[this.style]();
        // }
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
        }

    }
