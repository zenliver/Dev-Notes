// 产品详情页swiper

// 初始化swiper
var productsDetailSwiper = new Swiper ('#products_detail .swiper-container', {
    // direction: 'vertical',
    loop: true,
    pagination: '#products_detail .swiper-pagination',
    paginationClickable: true,
    // slidesPerView: 4,
    // spaceBetween: 50,
    // nextButton: '#products_detail .swiper-button-next',
    // prevButton: '#products_detail .swiper-button-prev',
    autoplay: 3000,
    autoplayDisableOnInteraction: false,
    speed: 500
});

// 添加缩略图和自定义按钮控制
console.log(productsDetailSwiper);
console.log(productsDetailSwiper.classNames);
if (productsDetailSwiper.classNames.length > 0) { // 只有当前页面上存在该swiper时才执行下面的代码，防止报错。只有当前页面上存在该swiper时swiper的classNames属性才不为空，否则swiper的classNames属性是一个空的数组。

    // 点击左右按钮控制swiper滑动
    $(".swiper_gallery_thumbs_btn_prev").click(function () {
        productsDetailSwiper.slidePrev();
    });
    $(".swiper_gallery_thumbs_btn_next").click(function () {
        productsDetailSwiper.slideNext();
    });

    // swiper滑动时给对应的缩略图添加active效果
    productsDetailSwiper.on("SlideChangeStart",function () {
        var realIndex = productsDetailSwiper.realIndex;
        console.log("realIndex:"+realIndex);
        var activeIndex = productsDetailSwiper.activeIndex;
        console.log("activeIndex:"+activeIndex);
        $("li.swiper_gallery_thumbs_img").removeClass("active");
        $(".swiper_gallery_thumbs_list").children("li").eq(realIndex).addClass("active");
    });

    // 点击缩略图swiper滑动到对应的大图
    $(".swiper_gallery_thumbs_img").click(function () {
        var thumbImgIndex = $(this).index();
        var thumbImgNum = $(".swiper_gallery_thumbs_img").length;
        var activeIndex;
        console.log(thumbImgIndex);
        // activeIndex 和 realIndex 的关系
        // thumbImgIndex = realIndex
        if (thumbImgIndex == 0) {
            activeIndex = thumbImgNum+2-1;
        }
        else {
            activeIndex = thumbImgIndex+1;
        }
        productsDetailSwiper.slideTo(activeIndex,500); // slideTo方法的参数 index 是activeIndex而不是realIndex
    });

    // 移动设备下限制swiper-container的高度
    if (screenWidth < 1200) {
        $(window).load(function () {
            var swiperContainerWidth = $("#products_detail .swiper-container").width();
            $("#products_detail .swiper-container").css("max-height",swiperContainerWidth+"px");
        });
    }

}
