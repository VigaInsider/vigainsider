<?php
/*
database schema:
CREATE TABLE punteggi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_partita DATE NOT NULL,
    score1 INT NOT NULL,
    score2 INT NOT NULL,
    scoreT INT NOT NULL,
    nome VARCHAR(100) NOT NULL
);
*/

define('TABLE_NAME', 'punteggi_test'); // Cambia in 'punteggi_test' se necessario
require 'db.php';

/**
 * Crea una mappa [ID => Posizione] basata sullo scoreT
 * Utile per sapere la posizione di una partita a prescindere dall'ordinamento visivo
 */
function getRankMap() {
    global $conn;
    $result = $conn->query("SELECT id FROM " . TABLE_NAME . " ORDER BY scoreT DESC");
    $orderedIds = array_column($result->fetch_all(MYSQLI_ASSOC), 'id');
    // array_flip trasforma [0 => id1, 1 => id2] in [id1 => 0, id2 => 1]
    $rankMap = array_flip($orderedIds);
    return $rankMap;
}

function getSortedLeaderboardByDate() {
    global $conn;
    $result = $conn->query("SELECT * FROM " . TABLE_NAME . " ORDER BY data_partita DESC, id DESC");
    return $result->fetch_all(MYSQLI_ASSOC);
}

function getSortedLeaderboardByScore() {
    global $conn;
    $result = $conn->query("SELECT * FROM " . TABLE_NAME . " ORDER BY scoreT DESC");
    return $result->fetch_all(MYSQLI_ASSOC);
}

// Altre funzioni di utility se necessarie...
function getTop10byScore() {
    global $conn;
    $result = $conn->query("SELECT * FROM " . TABLE_NAME . " ORDER BY scoreT DESC LIMIT 10");
    return $result->fetch_all(MYSQLI_ASSOC);
}
?>