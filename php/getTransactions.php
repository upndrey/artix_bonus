<?php
require_once "connect.php";
session_start();
if(!$_SESSION['login'] && $_SESSION['status'] === "admin") {
    header('Location: ./');
    exit;
}

$login = $_SESSION['login'];

$query = "SELECT * FROM transactions";
$result = mysqli_query($link, $query);
$arr = [];
while($mysqlTransaction = mysqli_fetch_assoc($result)) {
    array_push($arr, $mysqlTransaction);
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);
