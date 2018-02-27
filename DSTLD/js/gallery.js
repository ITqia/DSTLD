$(document).ready(function () {
    var imgs=new Array("slim-raw-denim-jeans-in-dip-indigo-grey-stitch-product.jpg",
        "slim-raw-denim-jeans-in-dip-indigo-grey-stitch-product (1).jpg",
        "slim-raw-denim-jeans-in-dip-indigo-grey-stitch-product (2).jpg",
        "slim-raw-denim-jeans-in-dip-indigo-grey-stitch-product (3).jpg",
        "slim-raw-denim-jeans-in-dip-indigo-grey-stitch-product (4).jpg",
        "slim-raw-denim-jeans-in-dip-indigo-grey-stitch-product (5).jpg",
        "slim-raw-denim-jeans-in-dip-indigo-grey-stitch-product (6).jpg",
        "slim-raw-denim-jeans-in-dip-indigo-grey-stitch-product (7).jpg"
    );
    var current=1;
    var magnifierWidth;
    var magnifierHeight;
    var rate;

    $('.prev').click(function (event) {
        event.stopImmediatePropagation();
        if (current==1){
            current=8;
        }else {
            current--;
        }
        setImages(current);
    });
    $('.next').click(function (event) {
        event.stopImmediatePropagation();
        if (current==8){
            current=1;
        }else {
            current++;
        }
        setImages(current);
    });
    function setImages(index) {
        var imgLocal="../../assets/detail/"+imgs[index-1];
        $('#image').attr("src",imgLocal);
        $('#zoomed-img').attr("src",imgLocal);
    }
    //鼠标移入监听事件
   function mouseover () {
        $('#zoomed').css("display","block");
        $('#magnifier').css("display","block");
        // 设置放大镜的大小
        var zoomedWidth= $('#zoomed').outerWidth(false);
        var zoomedHeight=$('#zoomed').outerHeight(false);
        rate=$('#zoomed-img').outerWidth(false)/$('#image-container').outerWidth(false);
        magnifierWidth=zoomedWidth/rate;
        magnifierHeight=zoomedHeight/rate;
        $('#magnifier').css("width",magnifierWidth);
        $('#magnifier').css("height",magnifierHeight);
   }
   //鼠标移开
    $('.main-container').mouseleave(function () {
        $('#zoomed').css("display","none");
        $('#magnifier').css("display","none");
    });
    // 鼠标移动监听事件
    function mousemove (event) {
        var srollTop= $(document).scrollTop();
        var y=event.clientY-90-magnifierHeight/2;
        if(srollTop>0){
            y=y+srollTop;
        }
        var x=event.clientX-30-magnifierWidth/2;
        if(x<0){
            x=0;
        }else if(x>$('#image-container').outerWidth(false)-magnifierWidth){
            x=$('#image-container').outerWidth(false)-magnifierWidth;
        }
        if(y<0){
            y=0;
        }else if(y>$('#image-container').outerHeight(false)-magnifierHeight){
            y=$('#image-container').outerHeight(false)-magnifierHeight;
        }
        console.log("x=="+x);
        console.log("y=="+y);
        $('#magnifier').css("top",y);
        $('#magnifier').css("left",x);
        var zoomImgX=-x * rate;
        var zoomImgY=-y * rate;
        $('#zoomed-img').css("left",zoomImgX);
        $('#zoomed-img').css("top",zoomImgY);
    }
    $('#image-container').click(function (event) {
        if ($('#magnifier').is(':visible')){
            $('#image-container').unbind("mousemove",mousemove);
            $('#zoomed').css("display","none");
            $('#magnifier').css("display","none");
        }else {
            mouseover();
            mousemove (event);
            $('#image-container').bind("mousemove",mousemove);
        }
    });
    /**
     *  thumb
     */
    var thumbIms= $('#thumb-container').children();
    for (var i=0;i<thumbIms.length;i++){
        var img=thumbIms[i];
        $(img).click(function (event) {
            var index=$(this).attr("data-index");
            current=index;
            setImages(current);
        });
    }
})