<?php
require 'php/leaderboard_utils.php';
$sort = $_GET['sort'] ?? 'data';

// Carico la mappa delle posizioni (logica ID -> Posizione)
$rankMap = getRankMap();
// Carico i dati in base all'ordinamento scelto
$leaderboard = getTop10byScore();
?>
<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Schermata Finale</title>
        <link rel="stylesheet" href="css/risultatiFinali.css">
    </head>
    <body>
        <!-- Fase 2: separazione dei rifiuti tramite drag&drop -->
        <!-- Layout simile a div#start in pages/fase1.html -->
        <div id="start">
            <div class="overlay"></div>
            <div class="content">
                <div class="left1">
                    <div class="top">
                        <h1>MISSIONE COMPIUTA</h1>
                    </div>
                    <div class="bottom">
                        <div class="left2">
                            <button type="button" onclick="window.open('?pagina=leaderboard', '_blank')">Classifica Completa</button>
                            <button type="button" onclick="localStorage.clear(); window.location = '?pagina=start'">Gioca Ancora</button>
                        </div>
                        <div class="right2">
                            <p>
                                <b>Punteggi:</b>
                                <br>
                                Prima fase: <i><span id="score1a"></span>/180</i>
                                <br>
                                Seconda fase: <i><span id="score2"></span>/<span id="score1b"></span></i>
                                <br>
                                Totale: <i><span id="scoreTotale"></span>/100</i>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="right1">
                    <h2>Top 10</h2>
                    <table class="container">
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Nome</th>
                                <th>Punteggio</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (empty($leaderboard)): ?>
                                <tr><td colspan="3" style="text-align:center;">Nessun punteggio registrato.</td></tr>
                            <?php else: ?>
                                <?php foreach ($leaderboard as $entry): ?>
                                    <?php
                                        // Recupero la posizione reale dalla mappa tramite l'ID
                                        $posizioneReale = $rankMap[$entry['id']] + 1;
                                        $punteggio_finale = number_format(intval($entry['scoreT']) / 100, 2);
                                    ?>
                                    <tr>
                                        <td><strong><?php echo $posizioneReale; ?>°</strong></td>
                                        <td><?php echo htmlspecialchars($entry['nome']); ?></td>
                                        <td><?php echo $punteggio_finale; ?>%</td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <script defer>
            const score1 = localStorage.getItem('punteggioFase1') || 0;
            const score2 = localStorage.getItem('punteggioFase2') || 0;
            const scoreT = 10_000 * ((score1 / MAX_SCORE) + (score2 / MAX_SCORE)) / 2;
            document.getElementById('score1a').textContent = score1;
            document.getElementById('score1b').textContent = score1;
            document.getElementById('score2').textContent = score2;
            document.getElementById('scoreTotale').textContent = scoreT.toFixed(0) / 100;
        </script>
    </body>
</html>