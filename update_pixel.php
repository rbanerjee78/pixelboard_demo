<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $x = $_POST['x'];
    $y = $_POST['y'];
    $color = $_POST['color'];

    if (isset($x, $y, $color)) {
        $stmt = $pdo->prepare("REPLACE INTO pixels (x, y, color) VALUES (?, ?, ?)");
        $result = $stmt->execute([$x, $y, $color]);

        if ($result) {
            echo "Success";
        } else {
            echo "Failed to update pixel";
        }
    } else {
        echo "Invalid data";
    }
} else {
    echo "Invalid request method";
}
?>
