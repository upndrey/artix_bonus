<?php
$link = mysqli_connect('localhost', 'root', '', 'artix_bonus');
mysqli_set_charset($link, "utf8");

if (!$link) {
    die('Ошибка соединения: ' . mysqli_error($link));
}