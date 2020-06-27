<?
session_start();
if(!isset($_SESSION['login'])){
    header('Location: ./');
}
require_once "./php/connect.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width">
    <title>Личный кабинет</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/media.css">
</head>
<body>
<a class="title">Личный кабинет</a>
<div class="wrapper wrapper_profile">
    <div class="wrapper__header header">
        <div class="header__menu menu">
            <a href="profile.php" class="menu__current-page">Профиль</a>
            <a href="history.php">История транзакций</a>
        </div>
        <div class="header__short-info short-info">
            <a class="short-info__name js-name"></a>
        </div>
    </div>
    <form method="post" id="sendDataForm" action="php/changeData.php" class="wrapper__content content">
        <h2 class="content__title">Профиль</h2>

        <div class="content__info info">
            <div class="info__block">
                <label for="login">Логин</label><input name="login" id="login" type="text" class="js-login-input">
            </div>
            <div class="info__block">
                <label for="firstname">Имя</label><input name="firstname" id="firstname" type="text" class="js-firstname-input">
            </div>
            <div class="info__block">
                <label for="lastname">Фамилия</label><input name="lastname" id="lastname" type="text" class="js-lastname-input">
            </div>
            <div class="info__block">
                <label for="address">Адрес</label><input name="address" id="address" type="text" class="js-address-input">
            </div>
            <div class="info__block">
                <label for="email">Почта</label><input name="email" id="email" type="email" class="js-email-input">
            </div>
            <div class="info__block">
                <label for="newPassword">Новый пароль</label><input name="newPassword" id="newPassword" type="password" class="js-newPassword-input">
            </div>
            <div class="info__block">
                <label for="repeatPassword">Повторите пароль</label><input name="repeatPassword" id="repeatPassword" type="password" class="js-repeatPassword-input">
            </div>
            <div class="info__block">
                <label for="password">Старый пароль*</label><input name="password" id="password" type="password" required class="js-password-input">
            </div>
        </div>
        <input type="submit" value="Редактировать" class="content__edit">
    </form>
</div>
<script>
    <?
    if(isset($_SESSION['message'])){
        echo "alert('". $_SESSION['message'] . "')";
        $_SESSION['message'] = null;
    }
    ?>
</script>
<script src="js/index.js" charset="utf-8"></script>
</body>
</html>