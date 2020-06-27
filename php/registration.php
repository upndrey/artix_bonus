<?php
require_once "connect.php";
if(!isset($_POST['login']) || !isset($_POST['password'])) {
    header('Location: ../');
}

$login = $_POST['login'];
$login = mysqli_real_escape_string($link, $login);
$result = mysqli_query($link, "(SELECT * FROM users WHERE login='$login')");
$isUserExist = mysqli_fetch_array($result);
if(!$isUserExist){
    $pass = $_POST['pass'];
    $pass = mysqli_real_escape_string($link, $pass);
    $hash = password_hash($pass, PASSWORD_DEFAULT);
    $query = "INSERT INTO users (login, password) VALUES ('$login', '$hash')";
    $result = mysqli_query($link, $query);

    session_start();
    $_SESSION['login'] = $login;
    header('Location: ../profile.php');
    exit;
}
else{
    session_start();
    $_SESSION['message'] = "Аккаунт с таким логином существует!";
    header('Location: ../index.php');
}

?>