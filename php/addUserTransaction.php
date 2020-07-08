<?php
require_once "connect.php";
session_start();
if(!$_SESSION['login']) {
    header('Location: ./');
    exit;
}

$login = $_SESSION['login'];

$query = "SELECT id FROM users WHERE login='$login'";
$result = mysqli_query($link, $query);
$mysqlUserId = mysqli_fetch_assoc($result);
$mysqlUserId = $mysqlUserId['id'];
$transactionId = $_POST['transaction_id'];
$date = Date('Y-m-d-h-m-s');
$query = "INSERT INTO user_transactions (user_id, transaction_id, date) 
      VALUES ('$mysqlUserId', '$transactionId', '$date')";
$result = mysqli_query($link, $query);
header('Location: ../profile.php');
exit;