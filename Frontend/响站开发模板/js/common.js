// Code by ZHJ/ZenLiver
// 项目名称

$(function () {

    // 手机下：点击菜单项显示/隐藏子菜单
    $("#app_5500345888940088 li.family.navItem").click(function () {
        $(this).toggleClass("selected active");
        $(this).find("ul.navSon").slideToggle(500);
    });

    // 移动设备下：顶部导航子菜单改为点击切换显示/隐藏
    var screenWidth=$(window).width();
    if (screenWidth<1025) {
        $(".nav_1 .navList li.family.navItem").click(function () {
            $(this).find("ul.navSon").toggleClass("visibility_toggle");

        });

        $("#el_14908598674884xw11").off();
        $("#el_14908598674884xw11").click(function () {
            $("#app_2378630758728660").slideToggle(500);
        });
    }

    // 右侧悬浮条：微信二维码
    $("#app_6757174153088972, #el_1492068048406vsms1").click(function () {
        $("#app_8010177416361774 > .appMask, #app_8010177416361774 > .appContent").show();
    });
    $("#app_8010177416361774 > .appMask").click(function () {
        $(this).hide();
        $("#app_8010177416361774 > .appContent").hide();
    });



});
