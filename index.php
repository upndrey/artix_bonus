<?
session_start();
$_SESSION['order-send'] = null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width">
    <title>Авторизация</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/indexV2.css">
    <link rel="stylesheet" href="css/media.css">
    <script src='https://www.google.com/recaptcha/api.js'></script>
</head>
<body>
    <div class="wrapper">

        <div class="wrapper__logo">
            <img src="images/logo.png" alt="">
        </div>
        <div class="wrapper__content-block content-block">
            <h1 class="content-block__title">Авторизация</h1>
            <form action="/webOrders/php/login.php" method='post' class="content-block__login-form login-form">
                <input type="hidden" name="token" id="token">
                <input type="hidden" name="action" id="action">
                <input type="text" name="login" placeholder="ИНН" required class="login-form__text">
                <input type="password" name="pass" placeholder="Пароль" required class="login-form__text">
                <div class="login-form__enter enter">
                    <div class="g-recaptcha" data-sitekey="6LfmYuoUAAAAAEg3tnBQ6SS4vxmr8Fh0w7k0yOOV"></div>
                    <input type="submit" value="Вход" class="enter__submit">
                </div>
            </form>
        </div>
    </div>
    <script>
        <?
        if(isset($_SESSION['message'])){
            echo "alert('". $_SESSION['message'] . "')";
            $_SESSION['message'] = null;
        }
        ?>
    </script>
</body>
</html>