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
    $_SESSION['message'] = "Транзакция добавлена!";
}
else if(isset($_POST['removeTransactions'])) {
    $transactionsCount = $_POST['max_id'];
    $i = 1;
    while($i <= $transactionsCount) {
        if(isset($_POST['transaction_' . $i]) && $_POST['transaction_' . $i] == "on") {
            $query = "DELETE FROM transactions WHERE id='$i'";
            $result = mysqli_query($link, $query);
        }
        $i++;
    }
    $_SESSION['message'] = "Транзакции удалены!";
}
else if(isset($_POST['addPoints']) &&
        isset($_POST['userType']) &&
        isset($_POST['points'])) {
    $userType = $_POST['userType'];
    $points = $_POST['points'];
    $query = "UPDATE users SET points=points + '$points' WHERE privilege_id='$userType'";
    $result = mysqli_query($link, $query);
    $_SESSION['message'] = "Баллы начислены!";
}
header('Location: ../admin.php');
exit;