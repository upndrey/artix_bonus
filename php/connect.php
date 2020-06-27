<?php
$link = mysqli_connect('localhost', 'u0351174_default', '7_f3AGq2', 'u0351174_weborders');
mysqli_set_charset($link, "utf8");
//$link = mysqli_connect('localhost', 'root', '', 'kors_order');
if (!$link) {
    die('Ошибка соединения: ' . mysqli_error($link));
}