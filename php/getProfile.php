<?php
require_once "connect.php";
session_start();
if(!$_SESSION['login']) {
    header('Location: ./');
    exit;
}

$login = $_SESSION['login'];

$query = "SELECT * FROM users WHERE login='$login'";
$result = mysqli_query($link, $query);
if($mysqlName = mysqli_fetch_assoc($result)) {
    $statusId = $mysqlName['privilege_id'];

    $query2 = "SELECT title FROM privilegies WHERE id='$statusId'";
    $result2 = mysqli_query($link, $query2);
    $mysqlStatus = mysqli_fetch_assoc($result2);
    $mysqlName['privilege_id'] = $mysqlStatus['title'];
    echo json_encode($mysqlName, JSON_UNESCAPED_UNICODE);
}