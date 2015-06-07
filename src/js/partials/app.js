$( document ).ready(function() {
    "use strict";
    $(".menu-link[href*='" + location.pathname + "']").addClass("current");

    $('.open-btn').on('click', function () {
        $('.popup-wrapper').fadeIn();
        $('.popup-window').addClass('active');
    });

    $('.icon-close').on('click', function () {
        $('.popup-window').removeClass('active');
        $('.popup-wrapper').fadeOut();
    });

    $('.input-submit').on('click', function (e) {
        e.preventDefault();
        $('.input').addClass('error');
        $('.input').each(function() {
            var tooltip = $(this).data('title');
            $(this).after('<span class="error-tooltip">' + tooltip + '</span>');
        });
        $('.error-tooltip').each(function() {
            var tipwidth = $(this).width();
            $(this).css('left', - tipwidth - 37);
        });
    });

});