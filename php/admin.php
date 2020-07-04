<?php
require_once "connect.php";
session_start();
if(!$_SESSION['login'] && $_SESSION['status'] === "admin") {
    header('Location: ./');
    exit;
}
if( isset($_POST['addTransaction']) &&
    isset($_POST['transactionTitle']) &&
    isset($_POST['transactionAbout']) &&
    isset($_POST['transactionPrice'])) {
    $title = $_POST['transactionTitle'];
    $about = $_POST['transactionAbout'];
    $price = $_POST['transactionPrice'];
    $query = "INSERT INTO transactions (title, about, price) VALUES ('$title', '$about', '$price')";
    $result = mysqli_query($link, $query);
}

header('Location: ../admin.php');
exit;