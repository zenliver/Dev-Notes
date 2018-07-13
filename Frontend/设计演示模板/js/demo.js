// 设计稿演示系统
// Code by zenliver

﻿$(function () {

    var pageUrl=location.href;
    console.log(pageUrl);
    var lastGapIndex=pageUrl.lastIndexOf("/");
    console.log(lastGapIndex);

    var imgDir="demo_img"; // 设计稿目录

    var imgName=pageUrl.slice(lastGapIndex+1+10);
    console.log(imgName);
    var imgUrl=pageUrl.slice(0,lastGapIndex)+"/"+imgDir+"/"+imgName+".jpg";
    console.log(imgUrl);

    var lastUnderLineIndex = imgName.lastIndexOf("_");
    console.log(lastUnderLineIndex);
    var firstUnderLineIndex = imgName.indexOf("_");
    var imgNameProcessed = "";
    var lastCharOfimgName = imgName.slice(-1);
    console.log(lastCharOfimgName);
    console.log(typeof(lastCharOfimgName));
    console.log(isNaN(lastCharOfimgName));
    console.log(isNaN("adadada"));

    if (firstUnderLineIndex < 0) { // 没有下划线的情况：没有下划线时两者返回的都是-1
        imgNameProcessed = imgName;
    } else if (lastUnderLineIndex == firstUnderLineIndex && isNaN(lastCharOfimgName) == true) { // 只有1个下划线并且最后一个字符不是数字的情况（如果“_”首次出现的位置和最后出现的位置相同，说明图片名称中只有一个“_”）
        imgNameProcessed = imgName;
    } else if (lastUnderLineIndex == firstUnderLineIndex && isNaN(lastCharOfimgName) == false) { // 只有1个下划线并且最后一个字符是数字的情况
        imgNameProcessed = imgName.slice(0,lastUnderLineIndex);
    } else { // 有多个下划线的情况
        imgNameProcessed = imgName.slice(0,lastUnderLineIndex);
    }

    var pageTitle = document.getElementsByTagName("title")[0];

    // $("#demo_img").attr("src",imgUrl);
    // var img=document.getElementById("demo_img");
    // img.src=imgUrl;

    // 生成演示效果
    var img = new Image();
    img.src = imgUrl;

    img.onerror = function() {
        $("#loading").hide();
        alert("抱歉，设计稿加载失败，页面将自动关闭");
        window.close();
        return false;
    };

    if(img.complete) {
        imgHeight=img.height;
        // console.log(img.width+" "+img.height);

        // img.onload=null;//避免重复加载

        $("#loading").hide();
        // $("#demo_img").hide();
        $("#demo").css({
            "background-image":"url("+imgUrl+")",
            "height":imgHeight+"px"
        });
    }
    else {
        img.onload = function() {
            imgHeight=img.height;
            // console.log(img.width+" "+img.height);

            // img.onload=null;//避免重复加载

            $("#loading").hide();
            // $("#demo_img").hide();
            $("#demo").css({
                "background-image":"url("+imgUrl+")",
                "height":imgHeight+"px"
            });
        }
    }

    // 动态修改演示页标题
    switch (imgNameProcessed) {
        case "index":
            // pageTitle.innerHTML="首页";
            $("title").text("首页");
            break;
        case "brand":
            $("title").text("品牌");
            break;
        case "company":
            $("title").text("公司");
            break;
        case "about":
            $("title").text("关于我们");
            break;
        case "news":
            $("title").text("新闻");
            break;
        case "news_detail":
            $("title").text("新闻详情");
            break;
        case "products":
            $("title").text("产品");
            break;
        case "products_detail":
            $("title").text("产品详情");
            break;
        case "case":
            $("title").text("案例");
            break;
        case "case_detail":
            $("title").text("案例详情");
            break;
        case "join":
            $("title").text("加盟");
            break;
        case "contact":
            $("title").text("联系");
            break;
        case "message":
            $("title").text("留言");
            break;

        default:
            // pageTitle.innerHTML="设计演示";
            $("title").text(imgNameProcessed);
    }


});
