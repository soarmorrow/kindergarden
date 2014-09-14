/*! 
 Document   : site script
 Created on : Nov 10, 2013, 5:10:54 AM
 Author     : Vineeth Krishnan
 Author URL : http://vineethkrishnan.in
 Author mail: me@vineethkrishnan.in
 */
$(document).ready(function() {
    var slider = $('#slider').flexslider({
        animation: "fade",
        controlNav: true,
        animationLoop: true,
        slideshow: true,
        directionNav: false
    });

    /*--- Home button link direct ---*/
    $("div[class='logo']").on('click', function() {
        window.location.href = $(this).data("home-link");
    });
    /*--------- Slogan --------*/
    function rotateSlogan() {
        $current = $("ol[class*='flex-control-paging']").find("a.flex-active").text();
        switch ($current) {
            case '1':
                $(".slider-bottom-content").css({marginLeft: '10px', marginTop: '175px'});
                $(".aa,.cc,.db,.tptm").stop().animate({opacity: 0}, function() {
                    $(this).hide();
                    $(".em").stop().show().animate({opacity: 1});
                });
                break;
            case '2':
                $(".em,.cc,.db,.tptm").stop().animate({opacity: 0}, function() {
                    $(this).hide();
                    $(".aa").stop().show().animate({opacity: 1});
                });

                break;
            case '3':
                $(".em,.aa,.db,.tptm").stop().animate({opacity: 0}, function() {
                    $(this).hide();
                    $(".cc").stop().show().animate({opacity: 1});
                });

                break;
            case '4':
                $(".slider-bottom-content").css({marginTop: '130px'});
                $(".em,.aa,.cc,.tptm").stop().animate({opacity: 0}, function() {
                    $(this).hide();
                    $(".db").stop().show().animate({opacity: 1});
                });

                break;
            case '5':
                $(".slider-bottom-content").css({marginTop: '176px'});
                $(".em,.aa,.cc,.db").stop().animate({opacity: 0}, function() {
                    $(this).hide();
                    $(".tptm").stop().show().animate({opacity: 1});
                });
                break;
        }
    }
    $t = setInterval(rotateSlogan, 1000);
    /*--- Dropdown menu ---*/
    $("#main-nav li.hasChild").hover(function() {
        $(this).find('.child-list').stop().hide().slideDown();
    }, function() {
        $(this).find('.child-list').stop().slideUp();
    });
    $("#main-nav li.hasChild").find('a.top-menu').attr({"href": "#dropmenu"});
    $("a[href='#dropmenu']").on('click', function(e) {
        e.preventDefault();
    });
    /*--- scrollTop button ---*/
    var scrollTopShowPoint = 200;
    var scroller = $("#scrollTop");
    $(window).scroll(function() {
        if (jQuery(window).scrollTop() > scrollTopShowPoint) {
            scroller.fadeIn();
        } else {
            scroller.fadeOut();
        }
    });
    scroller.on('click', function() {
        jQuery('html, body').animate({scrollTop: 0}, 3000, 'easeOutExpo');
    });
    $("#downloads a[class*='file']").on('click', function(e) {
        $("input:password[name='sid']").val("");
        $file = $(this).data('item');
        $category = $(this).data('category');
        $("#item").val($file);
        $("#category").val($category);
        $filename = $file.replace(/_/g, ' ');
        $(".filename").empty().append($filename + ".pdf");
    });
    /*
     * padding adjust to align download links (manual adjustment)
     */
    $("[data-item='Calendar_2014_for_Parents']").css({paddingRight: '72px'});
    $("[data-item='2_Shoes']").css({paddingRight: '76px'});
    $("[data-item='C_for_Clown']").css({paddingRight: '50px'});
    $("[data-item='A_Ball']").css({paddingRight: '80px'});
    $("[data-item='1_House']").css({paddingRight: '59px'});

    $("[data-item='Tadika_Cerah_2014_Time_Table_for_KG1_Joyful_Class']").css({paddingRight: '88px'});
    $("[data-item='Tadika_Cerah_2014_Time_Table_for_Nursery_Lovely_Class']").css({paddingRight: '54px'});

    $("[data-item='Tadika_EraBaru_2014_Time_Table_for_KG1_Nur_Class']").css({paddingRight: '72px'});
    $("[data-item='Tadika_EraBaru_2014_Time_Table_for_KG2B_Aftn_Class']").css({paddingRight: '61px'});

    $("[data-item='Si_Bijak_Time_Table_Class_KG2A_2014'],[data-item='Si_Bijak_Time_Table_Class_KG2B_2014'],[data-item='Si_Bijak_Time_Table_Class_KG1B_2014'],[data-item='Si_Bijak_ Time_Table_Class_KG1A_2014']").css({paddingRight: '134px'});
    
    $(".about-column,.event-column, .announcement-column").hover(function(){
        $(this).addClass("show-content").stop().animate({'height':$(this).children("section").css('height')},1500, "easeInOutQuint");
    },function(){
        $(this).removeClass("show-content").stop().animate({'height':'280px'}, 1500, "easeInOutQuint");
    });
});