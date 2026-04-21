<?php
// file per testare save_score.php
// richiesta post a save_score.php con i seguenti dati:
// nome: "Simone"
// score1: 120
// score2: 118
// scoreT: 80
$data = [
    'nome' => 'TEST',
    'score1' => 120,
    'score2' => 118,
    'scoreT' => 6611,
    'data_partita' => date("Y-m-d")
];
// richiesta post a save_score.php con i dati richiesti
$options = [
    'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data),
    ],
];
$context  = stream_context_create($options);
$result = file_get_contents('http://simonez-cloud.ddns.net:30200/www/GDT/php/save_score.php', false, $context);
if ($result === FALSE) {
    echo "Errore nella richiesta";
} else {
    echo "Punteggio salvato con successo";
}
?>