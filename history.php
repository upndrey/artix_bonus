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
<div class="wrapper wrapper_profile">
    <div class="wrapper__header header">
        <a class="title">Личный кабинет</a>
        <div>
            <div class="header__menu menu">
                <a href="profile.php">Профиль</a>
                <a class="menu__current-page">История транзакций</a>
                <?
                if($_SESSION['status'] === "admin")
                    echo "<a href='admin.php'>Админ</a>";
                ?>
            </div>
            <div class="header__short-info short-info">
                <a href="index.php">Выход</a>
            </div>
        </div>
    </div>
    <div class="wrapper__content content">
        <h2 class="content__title">История транзакций</h2>
        <div class="content__transaction-list transaction-header">
            <div class="transaction-list__row row">
                <div class="row__elem">Название</div>
                <div class="row__elem">Описание</div>
                <div class="row__elem">Цена</div>
                <div class="row__elem">Дата</div>
            </div>
        </div>
        <div class="content__transaction-list js-transaction-list"></div>
    </div>
</div>
<script>
    <?
    if(isset($_SESSION['message'])){
        echo "alert('". $_SESSION['message'] . "');";
        $_SESSION['message'] = null;
    }
    ?>
    let js_page = "history";
</script>
<script src="js/index.js" charset="utf-8"></script>
</body>
</html>