$( document ).ready(function() {
    "use strict";
    $("#ajax-contact-form").submit(function() {
        var str = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "php/contact_process.php",
            data: str,
            success: function(msg) {
                if(msg == 'OK') {
                    var result = '<div class="notification_ok">Your message has been sent. Thank you!</div>';
                    $("#fields").hide();
                } else {
                    $('.input').addClass('error');
                    $('.input').each(function() {
                        var
                            tooltip = $(this).data('title'),
                            index = $('.input').index( this ) + 1;
                        $(this).after('<span class="error-tooltip title-' + index + '">' + tooltip + '</span>');
                        $(document).on("keyup", '.input', function(){
                            var errormsg = $(this).next();
                            $(this).removeClass('error');
                            $(errormsg).remove();
                        });

                    });
                }
                $('#note').html(result);
            }
        });
        return false;
    });
    $('.reset .input-submit').on('click', function () {
            $('.error-tooltip').remove();
        $('.input').each(function() {
            $(this).removeClass('error');
        });
    });
});