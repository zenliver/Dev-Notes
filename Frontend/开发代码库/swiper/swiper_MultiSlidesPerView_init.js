if ($('#index_slides .swiper-container').length > 0) {
    var swiperName = new Swiper('#index_slides .swiper-container', {
        // direction: 'vertical',
        slidesPerView: 4,
        // spaceBetween: 50,

        breakpoints: {
            991: {
                slidesPerView: 3,
                // spaceBetween: 40
            },
            767: {
                slidesPerView: 2,
                // spaceBetween: 30
            },
            479: {
                slidesPerView: 1,
                // spaceBetween: 20
            }
        },

        // slides play options
        autoplay: 3000,
        speed: 800,
        loop: true,
        autoplayDisableOnInteraction: false,

        // pagination
        // pagination: '#index_slides .swiper-pagination',
        // paginationClickable: true,

        // Navigation arrows
        nextButton: '#index_slides .swiper-button-next',
        prevButton: '#index_slides .swiper-button-prev'

        // scrollbar
        // scrollbar: '#index_slides .swiper-scrollbar',
    });

}
