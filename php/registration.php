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

    $firstname = $_POST['firstname'];
    $firstname = mysqli_real_escape_string($link, $firstname);
    $lastname = $_POST['lastname'];
    $lastname = mysqli_real_escape_string($link, $lastname);
    $email = $_POST['email'];
    $email = mysqli_real_escape_string($link, $email);
    $address = $_POST['address'];
    $address = mysqli_real_escape_string($link, $address);
    $query = "INSERT INTO users (login, password, firstname, lastname, email, address) VALUES ('$login', '$hash', '$firstname', '$lastname', '$email', '$address')";
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