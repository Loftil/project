<?php

include dirname(dirname(__FILE__)) . '/mail.php';

error_reporting(E_ALL ^ E_NOTICE);

$post = (!empty($_POST)) ? true : false;

if ($post) {
    include 'email_validation.php';

    $name = stripslashes($_POST['name']);
    $email = trim($_POST['email']);
    $message = stripslashes($_POST['message']);
    $captcha = stripslashes($_POST['captcha']);
    $subject = 'Test message subject';

    $error = '';

    if (!$name) {
        $error .= true;
    }

    if (!$email) {
        $error .= true;
    }

    if ($email && !ValidateEmail($email)) {
        $error .= true;
    }

    if (!$message || strlen($message) < 10) {
        $error .= true;
    }

    if ($captcha != 'e0ed3r') {
        $error .= true;
    }


    if ($error == false) {
        $mail = mail(CONTACT_FORM, $subject, $message,
            "From: " . $name . " <" . $email . ">\r\n"
            . "Reply-To: " . $email . "\r\n"
            . "X-Mailer: PHP/" . phpversion());

        if ($mail) {
            echo 'OK';
        }

    } else {
        echo '<div class="notification_error">' . $error . '</div>';
    }

}