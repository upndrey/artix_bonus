<?php
require_once "connect.php";
session_start();
if(!$_SESSION['login']) {
    header('Location: ./');
    exit;
}

$login = $_SESSION['login'];

$query = "SELECT id FROM users WHERE login = '$login'";
$result = mysqli_query($link, $query);
$mysqlId = mysqli_fetch_assoc($result);
$mysqlId = $mysqlId['id'];

$query = "SELECT * FROM user_transactions WHERE user_id = '$mysqlId'";
$result = mysqli_query($link, $query);
$arr = [];
while($mysqlTransaction = mysqli_fetch_assoc($result)) {
    $transactionId = $mysqlTransaction['transaction_id'];
    $query2 = "SELECT * FROM transactions WHERE id = '$transactionId'";
    $result2 = mysqli_query($link, $query2);
    $mysqlTransactionInfo = mysqli_fetch_assoc($result2);
    $mysqlTransaction = array_merge($mysqlTransaction, $mysqlTransactionInfo);
    array_push($arr, $mysqlTransaction);
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);
