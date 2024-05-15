<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pdo->exec("TRUNCATE TABLE pixels");
}
?>
