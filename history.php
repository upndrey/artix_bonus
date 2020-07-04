<?
session_start();
if(!isset($_SESSION['login'])){
    header('Location: ./');
    exit;
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
            <a href="profile.php">Профиль</a>
            <a class="menu__current-page">История транзакций</a>
            <?
            if($_SESSION['status'] === "admin")
                echo "<a href='admin.php'>Админ</a>";
            ?>
        </div>
        <div class="header__short-info short-info">
            <a class="short-info__name js-name"></a>
            <a href="index.php">Выход</a>
        </div>
    </div>
</div>
<script src="js/index.js" charset="utf-8"></script>
</body>
</html>