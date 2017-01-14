function shape(canvas,copy,cobj){
    this.canvas=canvas;
    this.copy=copy;
    this.cobj=cobj;
    this.width=canvas.width;
    this.height=canvas.height;
    this.type="line";
    this.style="stroke";
    this.strokeStyle="#000";
    this.fillStyle="#000";
    this.lineWidth=1;
    this.history=[];
    this.bianNum=5;
    this.jiaoNum=5;
    this.isback=true;
    //this.xp=xp;
    this.xpsize=10;
    this.isshowxp=true;
}

 shape.prototype={
    init:function(){
        this. cobj.lineWidth=this.lineWidth;
        this. cobj.strokeStyle=this.strokeStyle;
        this. cobj.fillStyle=this.fillStyle;
        //$(".xp").css("display","none");
    },
    draw:function(){
        var that=this;
        that.copy.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.copy.onmousemove=function(e){
                that.isback=true;
                that.init();
                var movex= e.offsetX;
                var movey= e.offsetY;
                that.cobj.clearRect(0,0,that.canvas.width,that.canvas.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                that.cobj.beginPath();
                that[that.type](startx,starty,movex,movey);
            };
            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height));
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
            }
        }
    },
    line:function(x,y,x1,y1){
        var that=this;
        that.cobj.beginPath();
        that.cobj.moveTo(x,y);
        that.cobj.lineTo(x1,y1);
        that.cobj.stroke();
    },
    rect:function(x,y,x1,y1){
        var that=this;
        that.cobj.beginPath();
         that.cobj.rect(x,y,x1-x,y1-y);
        that.cobj[this.style]();
        that.cobj.closePath();
     },
     arc:function(x,y,x1,y1){
         this.cobj.beginPath();
         var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
         this.cobj.arc(x,y,r,0,2*Math.PI);
         this.cobj[this.style]();
     },
     dbx:function(x,y,x1,y1){
         var angle=360/this.bianNum*Math.PI/180;
         var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
         this.cobj.beginPath();
         for(var i=0;i<this.bianNum;i++ ){
             this.cobj.lineTo(x+r*Math.cos(angle*i),y+r*Math.sin(angle*i));
         }
         this.cobj.closePath();
         this.cobj[this.style]();
     },
     djx:function(x,y,x1,y1){
         var angle=360/(this.jiaoNum*2)*Math.PI/180;
         var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
         var r1=r/2;
         this.cobj.beginPath();
         for(var i=0;i<this.jiaoNum*2;i++ ){
             if(i%2!=0){
                 this.cobj.lineTo(x+r*Math.cos(angle*i),y+r*Math.sin(angle*i));
             }else{
                 this.cobj.lineTo(x+r1*Math.cos(angle*i),y+r1*Math.sin(angle*i));
             }
         }
         this.cobj.closePath();
         this.cobj[this.style]();
     },
     pen:function(){
         var that=this;
         that.copy.onmousedown=function(e){
             var startx= e.offsetX;
             var starty= e.offsetY;
             that.cobj.beginPath();
             that.cobj.moveTo(startx,starty);
             that.copy.onmousemove=function(e){
                 that.init();
                 var movex= e.offsetX;
                 var movey= e.offsetY;
                 that.cobj.clearRect(0,0,that.canvas.width,that.canvas.height);
                 if(that.history.length>0){
                     that.cobj.putImageData(that.history[that.history.length-1],0,0);
                 }
                 that.cobj.lineTo(movex,movey);
                 that.cobj.stroke();
             };
             that.copy.onmouseup=function(){
                 that.history.push(that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height));
                 that.copy.onmousemove=null;
                 that.copy.onmouseup=null;
             }
         }
     },
     clear:function(xpObj) {
         var that=this;
         that.copy.onmousemove=function(e){
             if(!that.isshowxp){
                 return false;
             }
             var movex= e.offsetX;
             var movey= e.offsetY;
             var lefts=movex-that.xpsize/2;
             var tops=movey-that.xpsize/2;
             if(lefts<0){
                 lefts=0;
             }
             if(lefts>that.width-that.xpsize){
                 lefts=that.width-that.xpsize;
             }
             if(tops<0){
                 tops=0;
             }
             if(tops>that.height-that.xpsize){
                 tops=that.height-that.xpsize;
             }
             xpObj.css({
                 display:"block",
                 left:lefts,top:tops,
                 width:that.xpsize+"px",
                 height:that.xpsize+"px"
             });
             that.cobj.clearRect(0,0,that.xpsize,that.xpsize);
         };
         that.copy.onmousedown=function(){
             if(!that.isshowxp){
                 return false;
             }
             that.copy.onmousemove=function(e){
                 var movex= e.offsetX;
                 var movey= e.offsetY;
                 var lefts=movex-that.xpsize/2;
                 var tops=movey-that.xpsize/2;
                 if(lefts<0){
                     lefts=0;
                 }
                 if(lefts>that.width-that.xpsize){
                     lefts=that.width-that.xpsize;
                 }
                 if(tops<0){
                     tops=0;
                 }
                 if(tops>that.height-that.xpsize){
                     tops=that.height-that.xpsize;
                 }
                 xpObj.css({
                     display:"block",
                     left:lefts,top:tops,
                     width:that.xpsize+"px",
                     height:that.xpsize+"px"
                 });
                 that.cobj.clearRect(lefts,tops,that.xpsize,that.xpsize);
             };
             that.copy.onmouseup=function(){
                 that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                 that.copy.onmousemove=null;
                 that.copy.onmouseup=null;
                 that.clear(xpObj);
                 //that.history.push(that.cobj.getImageData(0,0,that.width,that.height))
             }
         }

     }
};