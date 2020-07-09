<?php
require_once "connect.php";
session_start();
if(!$_SESSION['login']) {
    header('Location: ./');
    exit;
}

$query = "SELECT * FROM privilegies WHERE title != 'admin'";
$result = mysqli_query($link, $query);
$arr = [];
while($mysqlPrivilegies = mysqli_fetch_assoc($result)) {
    array_push($arr, $mysqlPrivilegies);
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);
