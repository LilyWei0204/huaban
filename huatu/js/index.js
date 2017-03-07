$(function () {
    var canvas=document.getElementsByTagName("canvas")[0];
    var cobj=canvas.getContext("2d");
    var canvas_box=document.querySelector(".canvas-box");
    var copy=document.querySelector(".copy");
    var canvasW=canvas_box.offsetWidth;
    var canvasH=canvas_box.offsetHeight;
    var xp=document.querySelector(".xp");
    canvas.width=canvasW;
    canvas.height=canvasH;
    var drawObj=new shape(canvas,copy,cobj,xp);
    var  file=document.querySelector("#file");
    var img=document.querySelector(".box-img");
    file.onchange=function(){
        var fileObj=this.files[0];
        var reader=new FileReader();
        reader.readAsDataURL(fileObj);
        reader.onload=function(e){
            img.src= e.target.result;
            cobj.drawImage(img,0,0,canvas.width,canvas.height)
            data=cobj.getImageData(0,0,canvas.width,canvas.height);
        }
    }
    $(".btn>li").click(function () {
        drawObj.isxp=false;
        console.log(drawObj.isxp)
        var index=$(".btn>li").index(this);
        $(".aside-menu-list").hide().eq(index).slideToggle(100);
        $(".xp").css("display","none");
        $("#file").css("display","none");
    })
    $(".imgchuli").click(function () {
        $("#file").css("display","block");
    })
    $(".aside-menu-list:eq(1) li").click(function(){
        drawObj.type = $(this).attr("data-role");

        var fn=$(this).attr("data-role");
        if(fn!=="pen") {


            if ($(this).attr("data-role") == "bian") {
                drawObj.bianNum = prompt("请输入边数", 5);
            }
            if ($(this).attr("data-role") == "xing") {
                drawObj.jiaoNum = prompt("请输入角数", 5);
            }
            drawObj.draw();
        }else{
            drawObj.pen();
        }
    })
    $(".aside-menu-list:eq(2) li").click(function () {
         var fn=$(this).attr("data-role");
        drawObj.style=fn;
        drawObj.draw();
    })
    $(".aside-menu-list:eq(3) input").change(function(){
        drawObj[$(this).attr("data-role")]=$(this).val();
        drawObj.draw();
    })
    $(".aside-menu-list:eq(4) li").click(function(){

        var num=$(this).attr("data-role");
        if(num!=="null") {
            drawObj.lineWidth =num
            drawObj.draw();
        }
    })

    $(".aside-menu-list:eq(4) li input").change(function(){
        var num=$(this).val();
        drawObj.lineWidth =num
        drawObj.draw();

    })
    //橡皮擦
    $(".aside-menu-list:eq(5) li").click(function () {
        drawObj.isxp=true;
        drawObj.cut();
        console.log(drawObj.isxp)
        })
    $(".aside-menu-list:eq(5) li input").change(function () {
        drawObj.isxp=true;
        drawObj.xpsize=$(this).val();
    })
    //图片处理
    $(".aside-menu-list:eq(6) li").click(function () {
        var index=$(".aside-menu-list:eq(6) li").index(this);
        if(index==0){
            drawObj.blur(data,5,0,0)
        }else if(index==1){
            drawObj.m(data,20,0,0)
        }else if(index==2){
            drawObj.fx(data,0,0)
        }
    })
    /*文件*/
    $(".aside-menu-list:eq(0) li ").click(function(){
        var index=$(".aside-menu-list:eq(0) li").index(this);
        if(index==0){
            if(drawObj.hostory.length>0){
                var yes=confirm("是否保存");
                if(yes){
                    var url=canvas.toDataURL();
                    var newurl=url.replace("image/png","stream/octet")
                    location.href=newurl;
                }
            }

            cobj.clearRect(0,0,canvas.width,canvas.height);
            drawObj.hostory=[];

        }else if(index==1){
            //返回


            if(drawObj.hostory.length==0){
                //no
                cobj.clearRect(0,0,canvas.width,canvas.height);
                setTimeout(function(){
                    alert("不能返回");
                },10)
            }else{
                if (drawObj.isback) {
                    if (drawObj.hostory.length == 1) {
                        drawObj.hostory.pop();
                        cobj.clearRect(0, 0, canvas.width, canvas.height);
                    } else {
                        drawObj.hostory.pop();
                        cobj.putImageData(drawObj.hostory[drawObj.hostory.length-1], 0, 0);
                    }
                } else {
                    cobj.putImageData(drawObj.hostory.pop(), 0, 0);
                }

                drawObj.isback = false;

            }
        }else if(index==2) {
            if(drawObj.hostory.length==0){
                setTimeout(function () {
                    alert("不能保存");
                },50)
            }else{
                var url=canvas.toDataURL();
                var newurl=url.replace("image/png","stream/octet")
                location.href=newurl;
            }


        }



    })

})