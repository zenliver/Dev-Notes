if ($('#index_slides .swiper-container').length > 0) {
    var swiperName = new Swiper('#index_slides .swiper-container', {
        // direction: 'vertical',
        // slidesPerView: 4,
        // spaceBetween: 50,

        // slides play options
        autoplay: 3000,
        speed: 800,
        loop: true,
        autoplayDisableOnInteraction: false,

        // pagination
        pagination: '#index_slides .swiper-pagination',
        paginationClickable: true,

        // navigation arrows
        nextButton: '#index_slides .swiper-button-next',
        prevButton: '#index_slides .swiper-button-prev'

        // scrollbar
        // scrollbar: '#index_slides .swiper-scrollbar'
    });

}
