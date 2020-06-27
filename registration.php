<?
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width">
    <title>Регистрация</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/media.css">
    <script src='https://www.google.com/recaptcha/api.js'></script>
</head>
<body>
<div class="wrapper">
    <div class="wrapper__content-block content-block">
        <h1 class="content-block__title">Регистрация</h1>
        <form action="/php/registration.php" method='post' class="content-block__login-form login-form">
            <input type="hidden" name="token" id="token">
            <input type="hidden" name="action" id="action">
            <input type="text" name="login" placeholder="Логин" required class="login-form__text">
            <input type="password" name="pass" placeholder="Пароль" required class="login-form__text">
            <div class="login-form__enter enter">
                <div class="g-recaptcha" data-sitekey="6LdiJqoZAAAAAHArBJPLVOv7vop6JvID8eSAvQs2"></div>
                <input type="submit" value="Вход" class="enter__submit">
            </div>
        </form>
        <a href="index.php" class="login-link">Вход</a>
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