$(function () {

    $("#main p a").each(function () {

        var demoLink = $(this).attr("href");
        var demoImgName = demoLink.slice(10);
        console.log(demoImgName);

        var lastUnderLineIndex = demoImgName.lastIndexOf("_");
        console.log(lastUnderLineIndex);
        var firstUnderLineIndex = demoImgName.indexOf("_");
        var demoImgNameNew = "";
        var lastCharOfDemoImgName = demoImgName.slice(-1);
        console.log(lastCharOfDemoImgName);
        console.log(typeof(lastCharOfDemoImgName));
        console.log(isNaN(lastCharOfDemoImgName));
        console.log(isNaN("adadada"));

        // 根据demo url自动添加链接锚文本
        if (firstUnderLineIndex < 0) { // 没有下划线的情况：没有下划线时两者返回的都是-1
            demoImgNameNew = demoImgName;
        } else if (lastUnderLineIndex == firstUnderLineIndex && isNaN(lastCharOfDemoImgName) == true) { // 只有1个下划线并且最后一个字符不是数字的情况（如果“_”首次出现的位置和最后出现的位置相同，说明图片名称中只有一个“_”）
            demoImgNameNew = demoImgName;
        } else if (lastUnderLineIndex == firstUnderLineIndex && isNaN(lastCharOfDemoImgName) == false) { // 只有1个下划线并且最后一个字符是数字的情况
            demoImgNameNew = demoImgName.slice(0,lastUnderLineIndex);
        } else { // 有多个下划线的情况
            demoImgNameNew = demoImgName.slice(0,lastUnderLineIndex);
        }

        switch (demoImgNameNew) {
            case "index":
                $(this).html("首页");
                break;
            case "brand":
                $(this).html("品牌");
                break;
            case "company":
                $(this).html("公司");
                break;
            case "about":
                $(this).html("关于我们");
                break;
            case "news":
                $(this).html("新闻");
                break;
            case "news_detail":
                $(this).html("新闻详情");
                break;
            case "products":
                $(this).html("产品");
                break;
            case "products_detail":
                $(this).html("产品详情");
                break;
            case "case":
                $(this).html("案例");
                break;
            case "case_detail":
                $(this).html("案例详情");
                break;
            case "join":
                $(this).html("加盟");
                break;
            case "contact":
                $(this).html("联系");
                break;
            case "message":
                $(this).html("留言");
                break;

            default:
                $(this).html(demoImgNameNew);
        }

        // 将已设置demo url的p显示出来
        if (demoLink != "demo.html?") {
            $(this).parent().show();
        }

    });

});
