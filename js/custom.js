//Parallax

const scene = document.getElementById('scene_intro');
const parallaxInstance = new Parallax(scene);

const ParallaxItems = document.querySelectorAll('.parallax');

for (const item of ParallaxItems) {
    const parallaxInstance = new Parallax(item);
}


// AOS
AOS.init({
    once: true,
    duration: 1000,
    offset: 0,
})

$(window).on('resize load', function() {
    AOS.refreshHard()
})

$(window).on('scroll load', function() {
        AOS.refresh()
    })
    // eof

// Hover menu
$(".header__menu a").on("mouseover", function() {
    if (!$(this).hasClass("active")) {
        let position = $(this)
            .position();
        let width = $(this)
            .width();
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
    $(".header__menu .slide2").css({ opacity: 0 }).removeClass("squeeze");
});


//Shadow
$('.shadow').realshadow({
    inset: true
});


//Sliders
$('.services__slider').slick({
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2
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
    } else {
        $(".vantage__wrapper.slick-initialized").slick("unslick");
    }

    if ($(window).width() < 550) {
        $('.office__list:not(.slick-initialized)').slick({
            dots: true,
            slidesToShow: 1,
            infinite: false,
            slidesToScroll: 1,
            arrows: false
        });
    } else {
        $(".office__list.slick-initialized").slick("unslick");
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

$(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
        header.addClass('header_fixed')
        header.addClass('overflow')
        $('body').css({
            paddingTop: hederHeight + 'px',
        })
        $('main').css('overflow', 'hidden');
    } else {
        header.removeClass('overflow')
        header.removeClass('header_fixed')
        $('body').css({
            paddingTop: 0,
        })
        $('main').css('overflow', 'initial');
    }
})

//Popup

$(function() {
    $('.popup-modal').magnificPopup({
        type: 'inline',
        modal: true,
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
$(function() {
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

//Title

{
    const chars = ['$', '%', '#', '@', '&', '(', ')', '=', '*', '/'];
    const charsTotal = chars.length;
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    class Entry {
        constructor(el) {
            this.DOM = { el: el };

            this.DOM.title = { word: this.DOM.el.querySelector('.content__text') };
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
    const sections = Array.from(document.querySelectorAll('.title'));

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0.5) {
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
    }, { threshold: 0.5 });

    sections.forEach(section => allentries.push(new Entry(section)));

}


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

            pinTimeline.
            to(value.querySelector('.Pin-back'), 3, {
                scale: 50,
                transformOrigin: 'center center',
                opacity: 0
            });
        });
        const $pin = document.querySelectorAll('.office__item');
        $('#Map [data-location]')
            .on('mouseenter', function(e) {
                const location = this.getAttribute('data-location');
                forEach($pin, function(index, value) {
                    if (value.getAttribute('location') == location) {

                        value.style.visibility = 'visible';
                    }
                });
            })
            .on('mouseout', function(e) {
                const location = this.getAttribute('data-location');
                forEach($pin, function(index, value) {
                    if (value.getAttribute('location') == location) {

                        value.style.visibility = 'hidden';
                    }
                });
            });
    });


});


//More text
$(document).ready(function() {
    const $moreText = () => (`<span class="more_text">....more</span>`);

    $('.services__wrapper .services__slider_item').find('.services__slider_item-text:first').append($moreText);

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
    $('.header_fixed').toggleClass('overflow')
})

$('.hamburger-menu').on('click', function(e) {
    const $hamburgerMenuContent = $('.hamburger-menu__content');
    const $hamburgermenu = $('.hamburger-menu');
    if ($hamburgermenu.is(e.target) && !$hamburgerMenuContent.is(e.target) && $hamburgerMenuContent.has(e.target).length === 0 && $('.hamburger-menu').css('display') == 'block') {
        $('.hamburger-menu').fadeOut();
        $('body').removeClass('scroll_disabled')
        $('main').removeClass('zindex')
        $('.header_fixed').removeClass('overflow')
    }

})

//Rocket animation

/* $('#rocket').waypoint(function(dir) {
    if (dir === 'down')
        $(this).css('top', '-100px');
    else
        $(this)
        .removeClass('fadeInUp')
        .addClass('fadeOutDown');
}, {
    offset: '80%'
})

$('#rocket').waypoint(function(dir) {
    if (dir === 'down')
        $(this)
        .removeClass('fadeInUp')
        .addClass('fadeOutDown');
    else
        $(this)
        .removeClass('fadeOutDown')
        .addClass('fadeInUp');
}, {
    offset: -50
}) */