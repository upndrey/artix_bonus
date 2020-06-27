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
    <title>Заказ</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/indexV2.css">
    <link rel="stylesheet" href="css/media.css">
</head>
<body>
<div class="wrapper">

    <div class="wrapper__logo">
        <img src="images/logo.png" alt="">
    </div>
    <div class="wrapper__content-block content-block" id="content-block">
        <h1 class="content-block__title" id="content-block__title">Заказ</h1>
        <form action="/webOrders/php/generateXML.php" method="post" class="content-block__order-form order-form" id="order-form">
            <div class="order-form__product-row order-form__title order-form__title_hidden" id="order-form__title">
                <div class="product-row__elem product-row__name">Наименование</div>
                <div class="product-row__elem product-row__price">Цена</div>
                <div class="product-row__elem product-row__count">Кол.</div>
                <div class="product-row__elem product-row__total">Сумма</div>
            </div>
            <div class="order-form__product-block product-block" id="product-block"></div>
            <div class="product-block__add" onclick="addProduct(null)">Добавить товары</div>
            <input type="hidden" class="order-form__max-count" id="order-form__max-count-hidden" name="maxCount" value="0">
            <input type="hidden" class="order-form__address" id="order-form__address-hidden" name="address" required>
            <div class="order-form__address-button" id="order-form__address-button" onclick="selectAddress()">Выбрать адрес</div>
            <div id="order-form__address-textarea">Не выбран</div>

            <div class="order-form__date-block date-block">
                <div class="date-block__label">Введите дату доставки</div>
                <input required type="date" name="date" placeholder="Дата" class="date-block__print-date" id="date-block__print-date">
            </div>

            <div class="order-form__send-block send-block">
                <div class="send-block__total-price" id="total-price">Итого: <span>0</span><span>&nbsp;р.</span></div>
                <button name="submit" value="Отправить" class="send-block__submit" id="send-block__submit">Отправить</button>
            </div>
        </form>
    </div>

    <div class="wrapper__content-block content-block content-block_hidden" id="select-product">
        <div class="content-block__close close" onclick="closeSelectProduct()"></div>
        <h1 class="content-block__title">Выберите товар</h1>
        <input type="text" placeholder="Поиск" id="search">
        <div class="content-block__select-table select-table" id="select-table">
        </div>
    </div>

    <div class="wrapper__content-block content-block address-block_hidden" id="select-address">
        <div class="content-block__close close" onclick="closeSelectAddress()"></div>
        <h1 class="content-block__title">Выберите адрес</h1>
        <div class="content-block__select-table select-address-table" id="order-form__address">
        </div>
    </div>
</div>
<?php
$sqlCustomers = [];
$rootCustomer = null;
$login = $_SESSION['login'];
$query = "(SELECT * FROM customers WHERE login='$login')";
$resultCustomers = mysqli_query($link, $query);
if($rowCustomers = mysqli_fetch_array($resultCustomers)) {
    $rootCustomer = $rowCustomers;
    array_push($sqlCustomers, $rowCustomers);
}

$query = "(SELECT * FROM customers WHERE parent='$rootCustomer[0]')";
$resultCustomers = mysqli_query($link, $query);
while($rowCustomers = mysqli_fetch_array($resultCustomers)) {
    array_push($sqlCustomers, $rowCustomers);
}


$sqlProducts = [];
$query = "(SELECT * FROM products)";
$resultProducts = mysqli_query($link, $query);
while($rowProducts = mysqli_fetch_array($resultProducts)) {
    array_push($sqlProducts, $rowProducts);
}

$sqlPrices = [];
$query = "(SELECT * FROM prices WHERE price_type='$rootCustomer[6]')";
$resultPrices = mysqli_query($link, $query);
while($rowPrices = mysqli_fetch_array($resultPrices)) {
    array_push($sqlPrices, $rowPrices);
}

$sqlRemains = [];
$query = "(SELECT * FROM remains WHERE warehouse='$rootCustomer[7]')";
$resultRemains = mysqli_query($link, $query);
while($rowRemains = mysqli_fetch_array($resultRemains)) {
    array_push($sqlRemains, $rowRemains);
}
?>
<script>
    <?
    echo "var js_login = ". $login . ";\n";
    $js_customers = json_encode($sqlCustomers);
    echo "var js_customers = ". $js_customers . ";\n";
    $js_products = json_encode($sqlProducts);
    echo "var js_products = ". $js_products . ";\n";
    $js_prices = json_encode($sqlPrices);
    echo "var js_prices = ". $js_prices . ";\n";
    $js_remains = json_encode($sqlRemains);
    echo "var js_remains = ". $js_remains . ";\n";
    ?>

    delete js_customers[0].password;
    for(var i = 0; i < js_customers.length; i++) {
        for(var j = 0; j < 8; j++) {
            delete js_customers[i][j];
        }
    }
    for(var i = 0; i < js_products.length; i++) {
        for(var j = 0; j < 5; j++) {
            delete js_products[i][j];
        }
    }

    for(var i = 0; i < js_prices.length; i++) {
        for(var j = 0; j < 4; j++) {
            delete js_prices[i][j];
        }
    }
    for(var i = 0; i < js_remains.length; i++) {
        for(var j = 0; j < 4; j++) {
            delete js_remains[i][j];
        }
    }

    <?
    if(isset($_SESSION['order-send'])){
        echo "alert('" . $_SESSION['order-send'] . "')";
        $_SESSION['order-send'] = null;
    }
    ?>
</script>
<script src="js/polyfillV5.js" charset="utf-8"></script>
</body>
</html>