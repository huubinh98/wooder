$(document).ready(function () {
    const btnBar = $(".btnbar");
    const nav = $(".nav");
    const header = $(".header");

    function setNavHeader() {
        btnBar.on('click', () => {
            btnBar.toggleClass("clicked");
            nav.toggleClass("active");
            header.toggleClass("activebg");
        })

        $(window).on('resize', () => {
            let clienWidth = nav.width();
            if (clienWidth >= 975) {
                nav.removeClass("active");
                btnBar.removeClass("clicked");
                header.removeClass("activebg");
            }
        })
    }

    function setSliderActive() {
        let heightHeader = header.height();
        let heightSlider = $(".slider").height();
        $(window).on('scroll', () => {
            let scroll = $(window).scrollTop();
            if (scroll > heightSlider - heightHeader) {
                header.addClass("activebg");
            } else {
                header.removeClass("activebg");
            }
        })
    }

    function langEvent() {
        let lang = $('.lang');
        let langCurrent = $('.lang_current');
        let langOptions = $('.lang_options a');
        langCurrent.on('click', function (e) {
            e.stopPropagation();
            lang.toggleClass('active');
        })
        langOptions.on('click', function (e) {
            e.preventDefault();
            let current = langCurrent.text();
            let langItem = $(this).text();
            $(this).html(current);
            langCurrent.html(langItem);
        })

        $(window).on('click', function () {
            lang.removeClass('active');
        })
    }

    function setSlickSlide() {
        let sliderList = $('.slider_list')
        let sliderItems = $('.slider_item')

        // button
        let nextBtn = $('.--next')
        let prewBtn = $('.--prew')

        // number
        let number = $('.paging .paging_num')
        let dotted = $('.dotted li')

        let sliderWidth = sliderItems[0].offsetWidth;
        let postionX = 0;
        let currentIndex = 0;

        $(dotted[currentIndex]).addClass("active");

        nextBtn.on('click', function () {
            if (currentIndex >= sliderItems.length - 1) {
                currentIndex = -1;
                postionX = 0;
                sliderList.css('transform', `translateX(${postionX}px)`)
            } else {
                postionX = postionX - sliderWidth;
                sliderList.css('transform', `translateX(${postionX}px)`)
            }
            currentIndex++;
            showNumber(currentIndex + 1);
            dotActive(currentIndex);
        })

        prewBtn.on('click', function () {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = sliderItems.length - 1;
                postionX = -currentIndex * sliderWidth;
                sliderList.css('transform', `translateX(${postionX}px)`)
            } else {
                postionX = postionX + sliderWidth;
                sliderList.css('transform', `translateX(${postionX}px)`)
            }
            showNumber(currentIndex + 1);
            dotActive(currentIndex);
        })

        function showNumber(indexNum) {
            number.html(indexNum.toString().padStart(2, '0'));
        }
        showNumber(currentIndex + 1);

        function dotActive(index) {
            dotted.removeClass('active');
            dotted.eq(index).addClass('active');
        }

        dotted.on('click', function (e) {
            dotActive();
            $(this).addClass('active');
            const sliderIndex = parseInt($(this).attr('data-index'))
            currentIndex = sliderIndex;
            showNumber(currentIndex + 1);
            postionX = -currentIndex * sliderWidth;
            sliderList.css('transform', `translateX(${postionX}px)`)
        })
    }

    // function setFlickkity() {
    $(".slider_list").flickity({
        cellAlign: 'left',
        // autoPlay: 3000,
        contain: true,
        wrapAround: true,
        prevNextButtons: false,
        on: {
            ready: function () {
                let dotted = $(".flickity-page-dots");
                let paging = $('.dotted');
                dotted.appendTo(paging);
            },
            change: function (index) {
                let number = $('.paging_num');
                let indexPage = index + 1;
                number.text(indexPage.toString().padStart(2, 0))
            }
        }

    })

    $('.--prew').on('click', function () {
        $(".slider_list").flickity('previous')
    })
    $('.--next').on('click', function () {
        $(".slider_list").flickity('next')
    })
    // }

    function scrollMenu() {
        let menuItems = $(".menu_item a");
        let heightHeader = header.height();
        let sections = [];

        menuItems.each(function (index, menuItem) {
            let atrMenuItem = $(menuItem).attr('href');
            let classSection = atrMenuItem.replace('#', '')
            let section = $('.' + classSection)
            sections.push(section);
            $(menuItem).on('click', function (e) {
                e.preventDefault();
                menuItems.removeClass('active');
                $(this).addClass('active');
                // document.documentElement.scrollTop = sections[index].offset().top - heightHeader + 1;
                console.log($(sections[index]).offset())
                $(window).scrollTop(
                   $(sections[index]).offset().top - heightHeader + 1
                )
            })
        })
        $(window).on("scroll", function () {
            let scrollY = $(window).scrollTop();
            $(sections).each(function (index, section) {
                let sTop = section.offset().top;
                let sHeight = section.outerHeight();
                if (scrollY > sTop - heightHeader && scrollY < sTop + sHeight) {
                    $(menuItems).removeClass('active');
                    $(menuItems).eq(index).addClass("active");
                } else {
                    $(menuItems).eq(index).removeClass("active");
                }

            })
        });

    }

    function handleVideo() {
        let qttimg = $(".quantity_img");
        let playBtn = $(".btn-play");
        let videoModal = $(".videomodal");
        let iframe = $(".videomodal iframe");
        let close = $(".close");

        let attIds = [];

        function handlePlay(dataId) {
            videoModal.css('display', 'flex')
            iframe.attr(
                "src",
                "https://www.youtube.com/embed/" + dataId + "?autoplay=1"
            );
        }

        function removeVd() {
            videoModal.css('display', 'none')
            iframe.attr("src", "");
        }

        qttimg.on('click', function (e) {
            e.stopPropagation();
            handlePlay($(this).attr('data-id'))
        })

        close.on("click", function () {
            removeVd();
        });

        $(window).on("click", function () {
            removeVd();
        });

        playBtn.on('click', function (e) {
            e.preventDefault();
        })
    }

    function handleChangeNew() {
        let newBtnItems = $(".new_btn-item");
        let newList = $(".new_list");

        $(newList[0]).css('display', 'grid');
        newBtnItems.on('click', function () {
            newBtnItems.removeClass('active');
            $(this).addClass('active');
            const indexBtn = $(this).index();
            newList.css('display', 'none');
            $(newList[indexBtn]).css({ 'display': 'grid' })
        })
    }

    function showAccordion() {
        $('.panel').slideUp();
        $('.accordion').on('click', function (e) {
            if($(this).hasClass('active')){
                //click roi
                $(this).removeClass('active')
                $(this).next().slideUp()
            }
            else{
                //chua click\
                //reset accordian 
                $('.panel').slideUp();
                $(".accordion").removeClass('active');

                $(this).addClass('active');
                $(this).next().slideToggle();
            }
        })
    }


    function headleBackToTop() {
        let backToTop = $(".toback #backtotop");
        backToTop.on("click", function () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        });
    }

    function setHeadtop() {
        let headTop = $(".headtop");
        let hBody = $("body").outerHeight();
        let vh = $(window).outerHeight();
        let scrollY = $(window).scrollTop();
        let ratio = parseInt(scrollY / (hBody - vh) * 100);
        $(headTop).css('width', `${ratio}%`);
        if ($(window).outerWidth()) {
            $(headTop).css('width', `${ratio + 1}%`);
            if (scrollY == 0) {
                $(headTop).css('width', `0`);
            }
        }
    }
    setTimeout(() => {
        setHeadtop();
    }, 500);

    $(window).on("scroll", () => {
        setHeadtop();
    })


    // var initPhotoSwipeFromDOM = function(gallerySelector) {
    //     var parseThumbnailElements = function(el) {
    //         var thumbElements = el.childNodes,
    //             numNodes = thumbElements.length,
    //             items = [],
    //             figureEl,
    //             linkEl,
    //             size,
    //             item;
    //         for(var i = 0; i < numNodes; i++) {
    //             figureEl = thumbElements[i]; // <figure> element
    //             if(figureEl.nodeType !== 1) {
    //                 continue;
    //             }
    //             linkEl = figureEl.children[0]; // <a> element
    //             size = linkEl.getAttribute('data-size').split('x');
    //             item = {
    //                 src: linkEl.getAttribute('href'),
    //                 w: parseInt(size[0], 10),
    //                 h: parseInt(size[1], 10)
    //             };
    //             if(figureEl.children.length > 1) {
    //                 item.title = figureEl.children[1].innerHTML; 
    //             }
    //             if(linkEl.children.length > 0) {
    //                 // <img> thumbnail element, retrieving thumbnail url
    //                 item.msrc = linkEl.children[0].getAttribute('src');
    //             } 
    //             item.el = figureEl; // save link to element for getThumbBoundsFn
    //             items.push(item);
    //         }
    //         return items;
    //     };
    //     var closest = function closest(el, fn) {
    //         return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    //     };
    //     var onThumbnailsClick = function(e) {
    //         e = e || window.event;
    //         e.preventDefault ? e.preventDefault() : e.returnValue = false;
    //         var eTarget = e.target || e.srcElement;
    //         var clickedListItem = closest(eTarget, function(el) {
    //             return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
    //         });
    //         if(!clickedListItem) {
    //             return;
    //         }
    //         var clickedGallery = clickedListItem.parentNode,
    //             childNodes = clickedListItem.parentNode.childNodes,
    //             numChildNodes = childNodes.length,
    //             nodeIndex = 0,
    //             index;
    //         for (var i = 0; i < numChildNodes; i++) {
    //             if(childNodes[i].nodeType !== 1) { 
    //                 continue; 
    //             }
    //             if(childNodes[i] === clickedListItem) {
    //                 index = nodeIndex;
    //                 break;
    //             }
    //             nodeIndex++;
    //         }
    //         if(index >= 0) {
    //             openPhotoSwipe( index, clickedGallery );
    //         }
    //         return false;
    //     };
    //     var photoswipeParseHash = function() {
    //         var hash = window.location.hash.substring(1),
    //         params = {};
    //         if(hash.length < 5) {
    //             return params;
    //         }
    //         var vars = hash.split('&');
    //         for (var i = 0; i < vars.length; i++) {
    //             if(!vars[i]) {
    //                 continue;
    //             }
    //             var pair = vars[i].split('=');  
    //             if(pair.length < 2) {
    //                 continue;
    //             }           
    //             params[pair[0]] = pair[1];
    //         }
    //         if(params.gid) {
    //             params.gid = parseInt(params.gid, 10);
    //         }
    //         return params;
    //     };
    //     var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
    //         var pswpElement = document.querySelectorAll('.pswp')[0],
    //             gallery,
    //             options,
    //             items;
    //         items = parseThumbnailElements(galleryElement);
    //         options = {
    //             galleryUID: galleryElement.getAttribute('data-pswp-uid'),
    //             getThumbBoundsFn: function(index) {
    //                 var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
    //                     pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
    //                     rect = thumbnail.getBoundingClientRect(); 
    
    //                 return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
    //             },
    //             showAnimationDuration : 0,
    //             hideAnimationDuration : 0
    //         };
    //         if(fromURL) {
    //             if(options.galleryPIDs) {
    //                 for(var j = 0; j < items.length; j++) {
    //                     if(items[j].pid == index) {
    //                         options.index = j;
    //                         break;
    //                     }
    //                 }
    //             } else {
    //                 options.index = parseInt(index, 10) - 1;
    //             }
    //         } else {
    //             options.index = parseInt(index, 10);
    //         }
    //         if( isNaN(options.index) ) {
    //             return;
    //         }
    //         if(disableAnimation) {
    //             options.showAnimationDuration = 0;
    //         }
    //         gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    //         gallery.init();
    //     };
    //     var galleryElements = document.querySelectorAll( gallerySelector );
    //     for(var i = 0, l = galleryElements.length; i < l; i++) {
    //         galleryElements[i].setAttribute('data-pswp-uid', i+1);
    //         galleryElements[i].onclick = onThumbnailsClick;
    //     }
    //     var hashData = photoswipeParseHash();
    //     if(hashData.pid && hashData.gid) {
    //         openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    //     }
    // };
    // initPhotoSwipeFromDOM('.carousel-img');
    



    // Carousel progressBar
    var $carousel = $('.carousel').flickity({
        freeScroll: true,
        align: 'left',
        contain: 'true',
        prevNextButtons: false,
        pageDots: false
    });
    var $progressBar = $('.progress-bar .inner');

    $carousel.on('scroll.flickity', function (event, progress) {
        progress = Math.max(0, Math.min(1, progress));
        $progressBar.width(progress * 100 + '%');
    });

    lightGallery(document.querySelector('.gallery_grid'), {
        plugins: [lgZoom,
             lgThumbnail,
              lgComment],
    });

    // AOS ANIMATE
    AOS.init();


    function start() {
        setNavHeader();
        setSliderActive();
        langEvent();
        // setSlickSlide();
        // setFlickkity();
        scrollMenu();
        handleChangeNew();
        handleVideo();
        showAccordion();
        headleBackToTop()
        // handChangeHeadtop()
    }

    start()
})