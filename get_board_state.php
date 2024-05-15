<?php
require 'db.php';

$stmt = $pdo->query("SELECT * FROM pixels");
$boardState = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($boardState);
?>
