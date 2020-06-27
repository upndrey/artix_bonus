<?
session_start();
if(!isset($_SESSION['login'])){
    header('Location: ./');
}
require_once "./php/connect.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width">
    <title>Личный кабинет</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/media.css">
</head>
<body>
<div class="wrapper">
    <h1 class="wrapper__title">Личный кабинет</h1>
</div>
<script src="js/index.js" charset="utf-8"></script>
</body>
</html>