<?php
require_once "connect.php";
session_start();
if(!$_SESSION['login']) {
    header('Location: ./');
    exit;
}

$oldLogin = $_SESSION['login'];

$query = "SELECT * FROM users WHERE login='$oldLogin'";
$result = mysqli_query($link, $query);
if($mysqlData = mysqli_fetch_assoc($result)) {
    $pass = $_POST['password'];
    $pass = mysqli_real_escape_string($link, $pass);
    if(password_verify($pass, $mysqlData['password'])){
        $login = $mysqlData['login'];
        $password = $mysqlData['password'];
        $firstname = $mysqlData['firstname'];
        $lastname = $mysqlData['lastname'];
        $address = $mysqlData['address'];
        $email = $mysqlData['email'];

        if(isset($_POST['login']) && $_POST['login'] !== ""){
            $login = $_POST['login'];
            $login = mysqli_real_escape_string($link, $login);
            if($login !== $oldLogin) {
                $query = "SELECT * FROM users WHERE login='$login'";
                $result = mysqli_query($link, $query);
                if($loginExist = mysqli_fetch_assoc($result)) {
                    session_start();
                    $_SESSION['message'] = "Аккаунт с таким логином уже существует!";
                    header('Location: ../edit.php');
                    exit;
                }
            }
        }

        if(isset($_POST['newPassword']) && $_POST['newPassword'] !== ""){
            $password = $_POST['newPassword'];
            $password = mysqli_real_escape_string($link, $password);
            $password = password_hash($password, PASSWORD_DEFAULT);
        }

        if(isset($_POST['firstname']) && $_POST['firstname'] !== ""){
            $firstname = $_POST['firstname'];
            $firstname = mysqli_real_escape_string($link, $firstname);
        }

        if(isset($_POST['lastname']) && $_POST['lastname'] !== ""){
            $lastname = $_POST['lastname'];
            $lastname = mysqli_real_escape_string($link, $lastname);
        }

        if(isset($_POST['address']) && $_POST['address'] !== ""){
            $address = $_POST['address'];
            $address = mysqli_real_escape_string($link, $address);
        }

        if(isset($_POST['email']) && $_POST['email'] !== ""){
            $email = $_POST['email'];
            $email = mysqli_real_escape_string($link, $email);
        }

        $query = "UPDATE users SET login='$login', password='$password', firstname='$firstname', lastname='$lastname', email='$email', address='$address' WHERE login='$oldLogin'";
        $result = mysqli_query($link, $query);
        session_start();
        $_SESSION['login'] = $login;
        header('Location: ../edit.php');
        exit;
    }
    else{
        session_start();
        $_SESSION['message'] = "Пароль введен неверно!";
        header('Location: ../edit.php');
        exit;
    }
}