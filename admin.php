<?
session_start();
if(!isset($_SESSION['login']) && $_SESSION['status'] === "admin"){
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
            <a href="profile.php" class="menu__current-page">Профиль</a>
            <a href="history.php">История транзакций</a>
            <a class="menu__current-page">Админ</a>
        </div>
        <div class="header__short-info short-info">
            <a class="short-info__name js-name"></a>
            <a href="index.php">Выход</a>
        </div>
    </div>
    <div class="wrapper__content content">
        <h2 class="content__title">Админ панель</h2>
        <form action="./php/admin.php" method="post" class="content__admin admin">
            <div class="admin__transactions transactions">
                <div class="transactions__header js-transactions__header"></div>
                <div class="transactions__list js-transactions__list list"></div>
                <input type="submit" name="removeTransactions" value="Удалить выбранные транзакции">
                <div class="transactions__add">
                    <input type="text" name="transactionTitle" placeholder="Название транзакции">
                    <input type="text" name="transactionAbout" placeholder="Описание транзакции">
                    <input type="number" name="transactionPrice" placeholder="Цена">
                </div>
                <input type="submit" name="addTransaction" value="Добавить транзакцию">
            </div>
            <div class="admin__points points">
                <select name="userType" class="js-userType">
                    <option value="" selected disabled hidden>Выберите тип пользователя</option>
                </select>
                <input type="number" name="points" placeholder="Введите кол-во зачисляемых баллов">
                <input type="submit" name="addPoints" value="Начислить баллы">
            </div>
        </form>
    </div>
</div>
<script>
    let js_page = "admin";
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