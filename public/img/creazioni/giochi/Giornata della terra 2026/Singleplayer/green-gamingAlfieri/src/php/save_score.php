<?php
    require 'db.php';
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data_partita = $_POST['data_partita'];
        $score1 = $_POST['score1'];
        $score2 = $_POST['score2'];
        $scoreT = $_POST['scoreT'];
        $nome = $_POST['nome'];

        $stmt = $conn->prepare("INSERT INTO punteggi_test (data_partita, score1, score2, scoreT, nome) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("siiis", $data_partita, $score1, $score2, $scoreT, $nome);
        $stmt->execute();
        $stmt->close();
    }
?>