//Parallax

jQuery.browser = {};
(function() {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();


const ParallaxItems = document.querySelectorAll('.parallax');

for (const item of ParallaxItems) {
    const parallaxInstance = new Parallax(item);
}

/* $('.intro__bg-1').scrollingParallax({
    loopIt: false,
    staticScrollLimit: false,
    bgHeight: '20%',
    bgRepeat: false,
    disableIE6: true,
    bgWidth: '100%',
    staticSpeed: 1.5,

});

$('.intro__bg-2').scrollingParallax({
    loopIt: false,
    staticScrollLimit: false,
    bgHeight: '20%',
    bgRepeat: false,
    disableIE6: true,
    bgWidth: '100%',
    staticSpeed: 1,

});
 */

$(function() {
    window.addEventListener("scroll", function(event) {

        let top = this.pageYOffset;

        let layers = $(".parallax__layer");
        let speed, yPos;
        layers.each(function() {
            speed = $(this).attr('data-speed');

            let yPos = -(top * speed / 100);
            $(this).attr('style', 'transform: translateY(' + yPos + 'px)');
        });
    });
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

$(window).on('load resize', function() {
    if ($(window).width() < 550) {
        $('.vantage__wrapper:not(.slick-initialized)').slick({
            dots: true,
            slidesToShow: 2,
            infinite: false,
            slidesToScroll: 1,
            arrows: false
        });
        $('.ProductWhy__wrapper:not(.slick-initialized)').slick({
            dots: true,
            slidesToShow: 2,
            infinite: false,
            slidesToScroll: 1,
            arrows: false
        });

        $('.ProductFeatures__wrapper:not(.slick-initialized)').slick({
            dots: true,
            slidesToShow: 2,
            infinite: false,
            slidesToScroll: 1,
            arrows: false
        });
        $('.office__list:not(.slick-initialized)').slick({
            dots: true,
            slidesToShow: 1,
            infinite: false,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 2000,
        });

        $(window).scroll(function() {
            if ($(this).scrollTop() > 1) {
                header.addClass('header_fixed')
                    //header.addClass('overflow')

                //$('main').css('overflow', 'hidden');
            } else {
                //header.removeClass('overflow')
                header.removeClass('header_fixed')

                //$('main').css('overflow', 'initial');
            }
        })
    } else {

        $(".ProductWhy__wrapper.slick-initialized").slick("unslick");
        $(".vantage__wrapper.slick-initialized").slick("unslick");
        $(".ProductFeatures__wrapper.slick-initialized").slick("unslick");
        $(".office__list.slick-initialized").slick("unslick");
        $(window).scroll(function() {
            if ($(this).scrollTop() > 1) {
                header.addClass('header_fixed')
                    //header.addClass('overflow')

                $('main').css('overflow', 'hidden');

                $('.header__menu ul .has-child .child').css({
                    visibility: 'hidden',
                    maxHeight: 0
                })


            } else {
                //header.removeClass('overflow')
                header.removeClass('header_fixed')

                $('main').css('overflow', 'initial');
            }
        })
    }


});

$('.origami__slider').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
})

//Fix header

let header = $('.header')
let hederHeight = header.height()



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



//Btn effect
/* $(function() {
    $('.Btn')
        .on('mouseenter', function(e) {
            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;

            $(this).find('span').css({ top: relY, left: relX })
        })
        .on('mouseout', function(e) {
            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            $(this).find('span').css({ top: relY, left: relX })
        });

});
 */
//Title


$(document).ready(function() {
        const chars = ['$', '%', '#', '@', '&', '(', ')', '=', '*', '/'];
        const charsTotal = chars.length;
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        class Entry {
            constructor(el) {
                this.DOM = {
                    el: el
                };

                this.DOM.title = {
                    word: this.DOM.el.querySelector('.content__text')
                };

                charming(this.DOM.title.word);
                this.DOM.title.letters = Array.from(this.DOM.title.word.querySelectorAll('span'));
                this.DOM.title.letters.forEach(letter => letter.dataset.initial = letter.innerHTML);
                this.lettersTotal = this.DOM.title.letters.length;
                observer.observe(this.DOM.el);
            }
            enter(direction = 'down') {

                this.DOM.title.word.style.opacity = 1;

                this.timeouts = [];
                this.complete = false;
                let cnt = 0;
                this.DOM.title.letters.forEach((letter, pos) => {
                    const timeout = setTimeout(() => {
                        letter.innerHTML = chars[getRandomInt(0, charsTotal - 1)];
                        setTimeout(() => {
                            letter.innerHTML = letter.dataset.initial;
                            ++cnt;
                            if (cnt === this.lettersTotal) {
                                this.complete = true;
                            }
                        }, 100);
                    }, pos * 80);
                    this.timeouts.push(timeout);
                });
            }
            exit(direction = 'down') {
                this.DOM.title.word.style.opacity = 0;
                if (this.complete) return;
                for (let i = 0, len = this.timeouts.length; i <= len - 1; ++i) {
                    clearTimeout(this.timeouts[i]);
                }
            }
        }

        let observer;
        let current = -1;
        let allentries = [];
        const sections = Array.from(document.querySelectorAll('.content__section'));
        let content__text = document.querySelectorAll('.content__text');
        let mobilesize = window.matchMedia("(max-width: 550px)");

        if ('IntersectionObserver' in window) {
            document.body.classList.add('ioapi');

            observer = new IntersectionObserver((entries) => {

                entries.forEach(entry => {
                    console.log(mobilesize.matches)
                    if (entry.intersectionRatio > 0.1) {
                        for (item of document.querySelectorAll(".content__text")) {
                            item.style.left = '0';
                            item.style.visibility = 'visible';
                        }
                        const newcurrent = sections.indexOf(entry.target);
                        if (newcurrent === current) return;
                        const direction = newcurrent > current;
                        if (current >= 0) {
                            allentries[current].exit(direction ? 'down' : 'up');
                        }
                        allentries[newcurrent].enter(direction ? 'down' : 'up');
                        current = newcurrent;

                    }

                });
            }, {
                threshold: 0.1
            });

            sections.forEach(section => allentries.push(new Entry(section)));
        }


        document.addEventListener("scroll", function() {
            const scrolled = window.pageYOffset;
            let content__text = document.querySelector('.content__text');
            let FirstBlock = document.querySelectorAll(".content__text")[0];
            let lastBlock = document.querySelectorAll(".content__text")[document.querySelectorAll(".content__text").length - 1];
            /*  let FooterHeight = document.querySelector(".footer").offsetHeight;

             if ($(window).scrollTop() + $(window).height() + FooterHeight - 100 >= $(document).height() && !mobilesize.matches) {
                 for (item of document.querySelectorAll(".content__text")) {
                     item.style.left = '-100vw';
                     item.style.visibility = 'hidden';
                 }

             } */
        });
        const content = document.querySelectorAll('.content__text');
        const Newobserver = new window.IntersectionObserver((entries) => {
            console.log(entries)
            entries.forEach(entry => {
                console.log(entry.isIntersecting);
                if (entry.isIntersecting) {
                    for (item of content) {
                        item.style.left = '-100vw';
                        console.log(item.style.left)
                        item.style.visibility = 'hidden';
                    }

                }
            })
        }, {
            root: null,
            threshold: 0.3
        })
        if (document.querySelector(".mainblock") !== null) {
            let InnerBlock = document.querySelectorAll(".mainblock");
            for (item of InnerBlock) {
                Newobserver.observe(item)
            }
        }

    })
    //Script for load elements

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

/*loadSvg*/
$('[data-svg]').each(function() {
    var $this = $(this);
    var $svg = $this.data('svg');
    var $filename = $svg.split('\\').pop().split('/').pop().replace(".svg", "");

    $this.load($svg, function(responseTxt, statusTxt) {
        if (statusTxt == "success") {
            $this.find('svg').addClass('svg svg-' + $filename + '');
        }
    });

    waitForElm('#Map').then((item) => {




        //Map

        const forEach = function(array, callback, scope) {
            for (var i = 0; i < array.length; i++) {
                callback.call(scope, i, array[i]); // passes back stuff we need
            }
        };

        const randomIntFromInterval = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        var $mapPins = document.querySelectorAll('#Map #pulse');

        // Setup timelines attached to each map pin
        forEach($mapPins, function(index, value) {
            // Group opacity timeline
            value.groupTimeline = new TimelineMax({
                paused: true
            });

            value.groupTimeline
                .to(value, 0.25, {
                    opacity: 0
                });

            // Pulse animation
            var pinTimeline = new TimelineMax({
                repeat: -1,
                delay: randomIntFromInterval(1, 3),
                repeatDelay: randomIntFromInterval(0, 1)
            });
            if (value.querySelector('.Pin-back')) {
                pinTimeline.
                to(value.querySelector('.Pin-back'), 3, {
                    scale: 50,
                    transformOrigin: 'center center',
                    opacity: 0
                });
            }
        });
        const $pin = document.querySelectorAll('.office__item');
        $('.office-country [data-location]')
            .on('mouseover', function(e) {
                const location = this.getAttribute('data-location');

                forEach($pin, function(index, value) {

                    if (value.getAttribute('location') == location && getComputedStyle(value).visibility == 'hidden') {
                        value.style.opacity = '1'
                        value.style.visibility = 'visible';
                    }
                });
            })
            .on('mouseout', function(e) {
                const location = this.getAttribute('data-location');
                forEach($pin, function(index, value) {
                    if (value.getAttribute('location') == location) {
                        value.style.opacity = '0'
                        value.style.visibility = 'hidden';
                    }
                });
            });
    });


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




// Mobile menu

$('.menu__icon, .hamburger-menu__close').on('click', function(e) {
    $('.hamburger-menu').fadeToggle()
    $('body').toggleClass('scroll_disabled')
    $('main').toggleClass('zindex')
    $('footer').toggleClass('zindex')
        //$('.header_fixed').toggleClass('overflow')
})

$('.hamburger-menu').on('click', function(e) {
    const $hamburgerMenuContent = $('.hamburger-menu__content');
    const $hamburgermenu = $('.hamburger-menu');
    if ($hamburgermenu.is(e.target) && !$hamburgerMenuContent.is(e.target) && $hamburgerMenuContent.has(e.target).length === 0 && $('.hamburger-menu').css('display') == 'block') {
        $('.hamburger-menu').fadeOut();
        $('body').removeClass('scroll_disabled')
        $('main').removeClass('zindex')
        $('footer').removeClass('zindex')
            // $('.header_fixed').removeClass('overflow')
    }

})

//Rocket animation
$(document).ready(function() {
    var waypoint = new Waypoint({
        element: document.querySelector('.rocket_animation'),
        handler: function(direction) {
            if (direction == 'up') {
                $('#rocket img').animate({
                    "top": "0"
                }, 1500);
            } else if (direction == 'down') {
                $('#rocket img').animate({
                    "top": "-=100vh"
                }, 1500);
            }
        },
        offset: '40%'
    })
});