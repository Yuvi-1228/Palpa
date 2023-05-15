/*	################################################################
 
 
 1) PRELOADER
 2) MOBILE MENU
 3) ISOTOPE
 4) STICKY MENU
 5) ISOTOPE
 6) TOP BUTTON
 7) PRETTY PHOTO
 8) OWL CLIENT ACTIVATION
 9) OWL TESTIMONIAL ACTIVATION
 10) SKILL PROGRESS BAR
 11) COUNTER UP
 12) CONTACT FORM
 13) GOOGLE MAP
 
 ################################################################# */


/* LOAD EVENT */
jQuery(window).on('load', function () {
    /* PRELOADER */
    $('#preloader').hide();
});

jQuery('document').ready(function ($) {

    "use strict"; // Start of use strict

    /* MOBILE MENU */
    $(".navbar-toggle").on("click", function () {
        $(this).toggleClass("mbl-menu");
    });


    /* ISOTOPE */
    var selectedCategory;
    var $grid = $('.work').isotope({
        itemSelector: '.col-md-3',
        masonry: {
            columnWidth: '.col-md-3',
        },
        getSortData: {
            selectedCategory: function (itemElem) {
                return $(itemElem).hasClass(selectedCategory) ? 0 : 1;
            }
        }
    });
    var $items = $('.work').find('.work-item');
    $('.sort-button-group').on('click', '.button', function () {
        selectedCategory = $(this).attr('data-category');
        if (selectedCategory == 'all') {
            $grid.isotope({
                sortBy: 'original-order'
            });
            $items.css({
                opacity: 1
            });
            return;
        }
        var selectedClass = '.' + selectedCategory;
        $items.filter(selectedClass).css({
            opacity: 1
        });
        $items.not(selectedClass).css({
            opacity: 0.1
        });
        $grid.isotope('updateSortData');
        $grid.isotope({sortBy: 'selectedCategory'});

        $('.button-group').each(function (i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'li', function () {
                $buttonGroup.find('.active').removeClass('active');
                $(this).addClass('active');
            });
        });

    });
     $('.grid').isotope({
        itemSelector: '.col-md-4',
        masonry: {
            columnWidth: '.col-md-4'
        }
    });

    /* STICKY MENU */
   var navHeight = window.innerHeight - 86;
    var topNavHeight = 50;
    var nav = $('.header-section');

    $(window).scroll(function () {
        if($(nav).hasClass('agency-header')){
            if ($(this).scrollTop() > topNavHeight) {
                nav.addClass("fixed");
            } else {
                nav.removeClass("fixed");
            }
        }else{
            if ($(this).scrollTop() > navHeight) {
                nav.addClass("fixed");
            } else {
                nav.removeClass("fixed");
            }
        }

    });

    // Cache selectors
    var lastId,
        topMenu = $("#top-menu"),
        topMenuHeight = topMenu.outerHeight() + 15,
        menuItems = topMenu.find("a"),
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });

    // Bind click handler to menu items
    menuItems.on("click", function (e) {
        var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function () {
        var fromTop = $(this).scrollTop() + topMenuHeight;
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";
        if (lastId !== id) {
            lastId = id;
            menuItems
                    .parent().removeClass("active")
                    .end().filter("[href='#" + id + "']").parent().addClass("active");
        }
    });

    /* ANCHOR CLICK ANIMATION */
    $('#easy-top').on("click", function (e) {
        var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });


    /* PRETTY PHOTO */
    $("area[data-gal^='prettyPhoto']").prettyPhoto();
    $(".gallery:first a[data-gal^='prettyPhoto']").prettyPhoto({animation_speed: 'normal', theme: 'pp_default', slideshow: 3000, autoplay_slideshow: false, social_tools: ''});
    $(".gallery:gt(0) a[data-gal^='prettyPhoto']").prettyPhoto({animation_speed: 'fast', slideshow: 10000, hideflash: true});


    /* OWL CLIENT ACTIVATION */
    var owl = $("#recent-project");
    owl.owlCarousel({
        items: 4,
        itemsDesktop: [1000, 3],
        itemsDesktopSmall: [900, 2],
        itemsTablet: [600, 1],
        itemsMobile: false
    });
    $(".recent-next").on('click', function () {
        owl.trigger('owl.next');
    })
    $(".recent-prev").on('click', function () {
        owl.trigger('owl.prev');
    })

    /* OWL CLIENT ACTIVATION */
    var owl = $("#client");
    owl.owlCarousel({
        items: 4,
        itemsDesktop: [1000, 3],
        itemsDesktopSmall: [900, 2],
        itemsTablet: [600, 1],
        itemsMobile: false
    });
    $(".client-next").on('click', function () {
        owl.trigger('owl.next');
    })
    $(".client-prev").on('click', function () {
        owl.trigger('owl.prev');
    })


    /*  OWL TESTIMONIAL ACTIVATION */
    var owl = $("#testimonial");
    owl.owlCarousel({
        items: 1,
        itemsDesktop: [1000, 1],
        itemsDesktopSmall: [900, 1],
        itemsTablet: [600, 1],
        itemsMobile: false
    });
    $(".testimonial-next").on('click', function () {
        owl.trigger('owl.next');
    })
    $(".testimonial-prev").on('click', function () {
        owl.trigger('owl.prev');
    })


    /* SKILL PROGRESS BAR */
    $('.skillbar').each(function () {
        $(this).appear(function () {
            $(this).find('.count-bar').animate({
                width: $(this).attr('data-percent')
            }, 3000);
            var percent = jQuery(this).attr('data-percent');
            $(this).find('.count').html('<span>' + percent + '</span>');
        });
    });


    /* COUNTER UP */
    jQuery('.counter').counterUp({
        delay: 10,
        time: 1000
    });


    /* CONTACT FORM */
    $('#contact-form').on("submit", function () {
        var action = $(this).attr('action');
        $("#message").slideUp(750, function () {
            $('#message').hide();
            $('#submit')
                    .after('<img src="images/ajax-loader.gif" class="loader" />')
                    .attr('disabled', 'disabled');
            $.post(action, {
                name: $('#name').val(),
                email: $('#email').val(),
                subject: $('#subject').val(),
                comments: $('#comments').val()
            },
            function (data) {
                document.getElementById('message').innerHTML = data;
                $('#message').slideDown('slow');
                $('#contact-form img.loader').fadeOut('slow', function () {
                    $(this).remove()
                });
                $('#submit').removeAttr('disabled');
                if (data.match('success') != null)
                    $('#contact-form').show('slow');
            }
            );

        });
        return false;
    });

    /* Mailchimp */
    $('#subscribe').ajaxChimp({
        url: 'http://themencoder.us11.list-manage.com/subscribe/post?u=c891be02cd2b3f7ebaf6b0fef&id=a9e3d365f5'
    });

    /* GOOGLE MAP */
    function initGoogleMaps() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 11,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            draggable: false,
            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(27.674901, 85.330608), // New york

            // How you would like to style the map.
            // This is where you would paste any style found on Snazzy Maps.
            styles: [{"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]}, {"featureType": "landscape", "elementType": "geometry", "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]}, {"featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{"color": "#ffffff"}, {"lightness": 17}]}, {"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]}, {"featureType": "road.arterial", "elementType": "geometry", "stylers": [{"color": "#ffffff"}, {"lightness": 18}]}, {"featureType": "road.local", "elementType": "geometry", "stylers": [{"color": "#ffffff"}, {"lightness": 16}]}, {"featureType": "poi", "elementType": "geometry", "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]}, {"featureType": "poi.park", "elementType": "geometry", "stylers": [{"color": "#dedede"}, {"lightness": 21}]}, {"elementType": "labels.text.stroke", "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]}, {"elementType": "labels.text.fill", "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]}, {"elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {"featureType": "transit", "elementType": "geometry", "stylers": [{"color": "#f2f2f2"}, {"lightness": 19}]}, {"featureType": "administrative", "elementType": "geometry.fill", "stylers": [{"color": "#fefefe"}, {"lightness": 20}]}, {"featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2}]}]
        };

        // Get the HTML DOM element that will contain your map
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');

        // Create the Google Map using our element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);

        // Let's also add a marker while we're at it
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(27.674901, 85.330608),
            map: map,
            title: 'Find us here!'
        });
    }
    if ($("#map").length > 0) {
        // When the window has finished loading create our google map below
        var googleMaps = google.maps.event.addDomListener(window, 'load', initGoogleMaps);
    }    
     /* === for onepage menu scroll === */
        if( typeof smoothScroll == 'object'){
            smoothScroll.init();
        }

});