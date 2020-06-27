<?php
require_once "connect.php";
session_start();
if(!$_SESSION['login']) {
    header('Location: ./');
}

$login = $_SESSION['login'];

$query = "SELECT * FROM users WHERE login='$login'";
$result = mysqli_query($link, $query);
if($mysqlName = mysqli_fetch_assoc($result)) {
    echo json_encode($mysqlName, JSON_UNESCAPED_UNICODE);
}