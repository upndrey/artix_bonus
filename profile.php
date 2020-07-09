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
            <a class="menu__current-page">Профиль</a>
            <a href="history.php">История транзакций</a>
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
    <div class="wrapper__content content content_profile">

        <div class="content__info info">
            <h2 class="content__title">Профиль</h2>
            <div class="info__block">
                <span>Логин</span><span class="js-login"></span>
            </div>
            <div class="info__block">
                <span>Имя</span><span class="js-firstname"></span>
            </div>
            <div class="info__block">
                <span>Фамилия</span><span class="js-lastname"></span>
            </div>
            <div class="info__block">
                <span>Бонусный баланс</span><span><span class="js-points"></span><span>&nbsp;б.</span></span>
            </div>
            <div class="info__block">
                <span>Почта</span><span class="js-email"></span>
            </div>
            <div class="info__block">
                <span>Статус</span><span class="js-status"></span>
            </div>
            <a href="edit.php" class="content__edit">Редактировать</a>
        </div>
        <form action="./php/addUserTransaction.php" method="post" class="content__transaction transaction" id="js-addTransaction">
            <h2 class="content__title">Совершить транзакцию</h2>
            <select name="transaction_id" class="js-transaction__select" required>
                <option value="" selected disabled hidden>Выберите транзакцию</option>
            </select>
            <input type="hidden" name="cost" class="js-price">
            <input type="submit" name="submit" value="Выбрать">
        </form>
    </div>
</div>
<script>
    let js_page = "profile";
    <?
    if(isset($_SESSION['message'])){
        echo "alert('". $_SESSION['message'] . "');";
        $_SESSION['message'] = null;
    }
    ?>
</script>
<script src="js/index.js" charset="utf-8"></script>
</body>
</html>