// @codekit-prepend "/vendor/hammer-2.0.8.js";

$(document).ready(function() {

    // DOMMouseScroll included for firefox support
    var canScroll = true,
        scrollController = null;
    $(this).on('mousewheel DOMMouseScroll', function(e) {

        if (!($('.outer-nav').hasClass('is-vis'))) {



            var delta = (e.originalEvent.wheelDelta) ? -e.originalEvent.wheelDelta : e.originalEvent.detail * 20;

            if (delta > 50 && canScroll) {
                canScroll = false;
                clearTimeout(scrollController);
                scrollController = setTimeout(function() {
                    canScroll = true;
                }, 800);
                updateHelper(1);
            } else if (delta < -50 && canScroll) {
                canScroll = false;
                clearTimeout(scrollController);
                scrollController = setTimeout(function() {
                    canScroll = true;
                }, 800);
                updateHelper(-1);
            }

        }


    });

    $('.side-nav li, .outer-nav li').click(function() {

        if (!($(this).hasClass('is-active'))) {

            var $this = $(this),
                curActive = $this.parent().find('.is-active'),
                curPos = $this.parent().children().index(curActive),
                nextPos = $this.parent().children().index($this),
                lastItem = $(this).parent().children().length - 1;

            updateNavs(nextPos);
            updateContent(curPos, nextPos, lastItem);

        }

    });

    $('.cta').click(function() {

        var curActive = $('.side-nav').find('.is-active'),
            curPos = $('.side-nav').children().index(curActive),
            lastItem = $('.side-nav').children().length - 1,
            nextPos = lastItem;

        updateNavs(lastItem);
        updateContent(curPos, nextPos, lastItem);

    });

    // swipe support for touch devices
    var targetElement = document.getElementById('viewport'),
        mc = new Hammer(targetElement);
    mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    mc.on('swipeup swipedown', function(e) {

        updateHelper(e);

    });

    $(document).keyup(function(e) {

        if (!($('.outer-nav').hasClass('is-vis'))) {
            e.preventDefault();
            updateHelper(e);
        }

    });

    // determine scroll, swipe, and arrow key direction
    function updateHelper(param) {

        var curActive = $('.side-nav').find('.is-active'),
            curPos = $('.side-nav').children().index(curActive),
            lastItem = $('.side-nav').children().length - 1,
            nextPos = 0;

        if (param.type === "swipeup" || param.keyCode === 40 || param > 0) {
            if (curPos !== lastItem) {
                nextPos = curPos + 1;
                updateNavs(nextPos);
                updateContent(curPos, nextPos, lastItem);
            } else {
                updateNavs(nextPos);
                updateContent(curPos, nextPos, lastItem);
            }
        } else if (param.type === "swipedown" || param.keyCode === 38 || param < 0) {
            if (curPos !== 0) {
                nextPos = curPos - 1;
                updateNavs(nextPos);
                updateContent(curPos, nextPos, lastItem);
            } else {
                nextPos = lastItem;
                updateNavs(nextPos);
                updateContent(curPos, nextPos, lastItem);
            }
        }

    }

    // sync side and outer navigations
    function updateNavs(nextPos) {

        $('.side-nav, .outer-nav').children().removeClass('is-active');
        $('.side-nav').children().eq(nextPos).addClass('is-active');
        $('.outer-nav').children().eq(nextPos).addClass('is-active');

    }

    // update main content area
    function updateContent(curPos, nextPos, lastItem) {

        $('.main-content').children().removeClass('section--is-active');
        $('.main-content').children().eq(nextPos).addClass('section--is-active');
        $('.main-content .section').children().removeClass('section--next section--prev');

        if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
            $('.main-content .section').children().removeClass('section--next section--prev');
        } else if (curPos < nextPos) {
            $('.main-content').children().eq(curPos).children().addClass('section--next');
        } else {
            $('.main-content').children().eq(curPos).children().addClass('section--prev');
        }

        if (nextPos !== 0 && nextPos !== lastItem) {
            $('.header--cta').addClass('is-active');
        } else {
            $('.header--cta').removeClass('is-active');
        }

    }

    function outerNav() {

        $('.header--nav-toggle').click(function() {


            $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis');

        });

        $('.outer-nav--return, .outer-nav li').click(function() {


            $('.outer-nav, .outer-nav li, .outer-nav--return').removeClass('is-vis');

        });

    }

    function workSlider() {

        $('.slider--prev, .slider--next').click(function() {

            var $this = $(this),
                curLeft = $('.slider').find('.slider--item-left'),
                curLeftPos = $('.slider').children().index(curLeft),
                curCenter = $('.slider').find('.slider--item-center'),
                curCenterPos = $('.slider').children().index(curCenter),
                curRight = $('.slider').find('.slider--item-right'),
                curRightPos = $('.slider').children().index(curRight),
                totalWorks = $('.slider').children().length,
                $left = $('.slider--item-left'),
                $center = $('.slider--item-center'),
                $right = $('.slider--item-right'),
                $item = $('.slider--item');

            $('.slider').animate({ opacity: 0 }, 400);

            setTimeout(function() {

                if ($this.hasClass('slider--next')) {
                    if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
                        $left.removeClass('slider--item-left').next().addClass('slider--item-left');
                        $center.removeClass('slider--item-center').next().addClass('slider--item-center');
                        $right.removeClass('slider--item-right').next().addClass('slider--item-right');
                    } else {
                        if (curLeftPos === totalWorks - 1) {
                            $item.removeClass('slider--item-left').first().addClass('slider--item-left');
                            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
                            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
                        } else if (curCenterPos === totalWorks - 1) {
                            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
                            $item.removeClass('slider--item-center').first().addClass('slider--item-center');
                            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
                        } else {
                            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
                            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
                            $item.removeClass('slider--item-right').first().addClass('slider--item-right');
                        }
                    }
                } else {
                    if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
                        $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
                        $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
                        $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
                    } else {
                        if (curLeftPos === 0) {
                            $item.removeClass('slider--item-left').last().addClass('slider--item-left');
                            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
                            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
                        } else if (curCenterPos === 0) {
                            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
                            $item.removeClass('slider--item-center').last().addClass('slider--item-center');
                            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
                        } else {
                            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
                            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
                            $item.removeClass('slider--item-right').last().addClass('slider--item-right');
                        }
                    }
                }

            }, 400);

            $('.slider').animate({ opacity: 1 }, 400);



        });

    }

    function transitionLabels() {

        $('.work-request--information input').focusout(function() {

            var textVal = $(this).val();

            if (textVal === "") {
                $(this).removeClass('has-value');
            } else {
                $(this).addClass('has-value');
            }

            // correct mobile device window position
            window.scrollTo(0, 0);

        });

        $('.work-request--information textarea').focusout(function() {

            var textVal = $(this).val();

            if (textVal === "") {
                $(this).removeClass('has-value');
            } else {
                $(this).addClass('has-value');
            }

            // correct mobile device window position
            window.scrollTo(0, 0);

        });

    }

    function slider() {
        const $status = $('.work--lockup  .slider--pagingInfo');
        const $slickElement = $('.work--lockup .slider');
        const $slickNext = $('.slider--next');
        const $slickPrev = $('.slider--prev');
        $slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
            var i = (currentSlide ? currentSlide : 0) + 1;
            $status.text(i + '/' + slick.slideCount);
        });

        $slickElement.slick({
            nextArrow: $slickNext,
            prevArrow: $slickPrev,
            centerMode: true,
            centerPadding: '15px',
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [{
                    breakpoint: 770,
                    settings: {
                        slidesToShow: 1,
                    }
                }

            ]
        });

    }


    outerNav();
    transitionLabels();
    slider();

    const ParallaxItems = document.querySelectorAll('.parallax');

    for (const item of ParallaxItems) {
        const parallaxInstance = new Parallax(item);
    }


    //Popup

    $(function() {
        $('.popup-modal').magnificPopup({
            type: 'inline',
            modal: true,
            fixedContentPos: false,
            closeOnBgClick: true,
            callbacks: {
                open: function() {
                    $('body').addClass('scroll_disabled')
                },
                close: function() {
                    $('body').removeClass('scroll_disabled')
                },
            },
        });
    })

    // Mobile menu

    $('.menu__icon, .hamburger-menu__close').on('click', function(e) {
        $('.hamburger-menu').fadeToggle()
        $('body').toggleClass('scroll_disabled')

        $('footer').toggleClass('zindex')
            //$('.header_fixed').toggleClass('overflow')
    })

    $('.hamburger-menu').on('click', function(e) {
        const $hamburgerMenuContent = $('.hamburger-menu__content');
        const $hamburgermenu = $('.hamburger-menu');
        if ($hamburgermenu.is(e.target) && !$hamburgerMenuContent.is(e.target) && $hamburgerMenuContent.has(e.target).length === 0 && $('.hamburger-menu').css('display') == 'block') {
            $('.hamburger-menu').fadeOut();
            $('body').removeClass('scroll_disabled')

            $('footer').removeClass('zindex')
                // $('.header_fixed').removeClass('overflow')
        }

    })

    //Video Play

    jQuery(document).ready(function($) {
        (function initPlayVideo() {
            let $videoCover = $(".ProductVideo__cover");
            let $videoPlayerIframe = $(".ProductVideo__player iframe");

            $videoCover.on("click", function() {
                $videoCover.fadeOut();
                $(".ProductVideo__player").css({
                    opacity: 1,
                    visibility: "visible"
                });
                $videoPlayerIframe[0].src += "&autoplay=1";
            });
        })();
    });

    //More text
    $(document).ready(function() {
        const $moreText = () => (`<span class="more_text">....more</span>`);

        $('.hiddeText_container').find('p:first').append($moreText);

        $('.more_text').on('click', function() {
            $(this).parent().parent().find('.hidden').css('max-height', '100%');
            $(this).remove();
        });
    })

});





//Sliders
$('.newsOther__slider').slick({
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [{
            breakpoint: 1600,
            settings: {
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 768,
            settings: {

                slidesToShow: 2,
            }
        },
        {
            breakpoint: 550,
            settings: {

                slidesToShow: 1,
            }
        }
    ]
});
$('.services__slider').slick({
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
    dots: true,
    responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 768,
            settings: {

                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        }
    ]
});



// Hover menu
$(".header__menu a.header__menu-link").on("mouseover", function() {
    if (!$(this).hasClass("active")) {
        let position = $(this)
            .position();
        let width = $(this)
            .width();
        console.log(position)
        let height = $('.header').height()
        $(".header__menu .slide2").css({
                opacity: 1,
                left: +position.left,
                width: width,
                top: -height / 2 + 10
            })
            .addClass("squeeze");
    }
});

$(".header__menu a").on("mouseout", function() {
    $(".header__menu .slide2").css({
        opacity: 0
    }).removeClass("squeeze");
});
//Fix header

let header = $('.header')
let hederHeight = header.height()


//Children menu
$(document).ready(function() {
    {
        $('.header__menu ul .has-child .child').css({
            top: hederHeight
        });
        var Timeoutmenu;
        $('.header__menu ul .has-child').on('mouseleave', function() {
            Timeoutmenu = setTimeout(() => {
                $(this).find('.child').css({
                    visibility: 'hidden',
                    maxHeight: '0',
                    pointerEvents: 'none',

                })
                $('.content__text').css('left', '0');
            }, 1000)
        })

        $('.header__menu ul .has-child').on('mouseover', function() {
            clearTimeout(Timeoutmenu);
            Timeoutmenu = null;
            $('.header__menu ul .has-child .child').css({
                visibility: 'hidden',
                maxHeight: '0',
                pointerEvents: 'none',


            })
            let HeightChild = $(this).find('.child ul:first').outerHeight();
            $(this).find('.child').css({
                visibility: 'visible',
                maxHeight: HeightChild,
                pointerEvents: 'initial',


            })
            $('.content__text').css('left', '-100%');

        })
        $('.header__menu ul .has-child .child ul.container').mouseenter(function() {
            clearTimeout(Timeoutmenu);
            Timeoutmenu = null;
            let HeightChild = $(this).find('.child ul:first').outerHeight();
            $(this).find('.child').css({
                visibility: 'visible',
                maxHeight: HeightChild,
                pointerEvents: 'initial'
            })

            $('.content__text').css('left', '-100%');
        })

        $('.hamburger-menu__nav .has-child.mobile-child').click(function() {
            $(this).find('.child').toggleClass('active-child')

        })
    }
})