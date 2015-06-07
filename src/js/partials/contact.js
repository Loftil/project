$( document ).ready(function() {
    "use strict";
    // contact form
    jQuery("#ajax-contact-form").submit(function() {
        var str = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "php/contact_process.php",
            data: str,
            success: function(msg) {
                // Message Sent - Show the 'Thank You' message and hide the form
                if(msg == 'OK') {
                    var result = '<div class="notification_ok">Your message has been sent. Thank you!</div>';
                    jQuery("#fields").hide();
                } else {
                    var result = msg;
                }
                jQuery('#note').html(result);
            }
        });
        return false;
    });
});