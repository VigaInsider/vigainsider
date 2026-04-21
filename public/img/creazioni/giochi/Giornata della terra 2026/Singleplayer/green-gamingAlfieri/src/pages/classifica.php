<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Classifica completa</title>
    <link rel="stylesheet" href="css/classifica.css">
</head>
<body>
    <h1>Classifica</h1>

    <?php
        require 'php/leaderboard_utils.php';
        $sort = $_GET['sort'] ?? 'score';

        // Carico la mappa delle posizioni (logica ID -> Posizione)
        $rankMap = getRankMap();

        // Carico i dati in base all'ordinamento scelto
        if ($sort === 'data') {
            $leaderboard = getSortedLeaderboardByDate();
        } else {
            $leaderboard = getSortedLeaderboardByScore();
        }
    ?>

    <div class="sorting-buttons">
        <a href="?pagina=leaderboard&sort=data" class="sort-button <?php echo $sort === 'data' ? 'active' : ''; ?>">Ordina per data</a>
        <a href="?pagina=leaderboard&sort=score" class="sort-button <?php echo $sort === 'score' ? 'active' : ''; ?>">Ordina per punteggio</a>
    </div>

    <table>
        <thead>
            <tr>
                <th>Posizione</th>
                <th>Nome</th>
                <th>1° Fase (RPS)</th>
                <th>2° Fase (%)</th>
                <th>Punteggio Totale (% isola pulita)</th>
                <th>Data</th>
            </tr>
        </thead>
        <tbody>
            <?php if (empty($leaderboard)): ?>
                <tr><td colspan="6" style="text-align:center;">Nessun punteggio registrato.</td></tr>
            <?php else: ?>
                <?php foreach ($leaderboard as $entry): ?>
                    <?php
                        // Recupero la posizione reale (1, 2, 3...)
                        $posizioneReale = $rankMap[$entry['id']] + 1;

                        // Determiniamo la classe del podio
                        $classePodio = '';
                        if ($posizioneReale === 1) $classePodio = 'rank-gold';
                        elseif ($posizioneReale === 2) $classePodio = 'rank-silver';
                        elseif ($posizioneReale === 3) $classePodio = 'rank-bronze';

                        // Formattazione dati (tua logica esistente)
                        $rps = number_format(intval($entry['score1']) / 60, 2);
                        $fase2_perc = (intval($entry['score1']) > 0) ? intval(intval($entry['score2']) / intval($entry['score1']) * 100) : 0;
                        $punteggio_finale = number_format(intval($entry['scoreT']) / 100, 2);
                        $data_formattata = date("d/m/Y", strtotime($entry['data_partita']));
                    ?>
                    <tr class="<?php echo $classePodio; ?>">
                        <td><strong><?php echo $posizioneReale; ?>°</strong></td>
                        <td><?php echo htmlspecialchars($entry['nome']); ?></td>
                        <td><?php echo $rps; ?> rps</td>
                        <td><?php echo $fase2_perc; ?>%</td>
                        <td><?php echo $punteggio_finale; ?>%</td>
                        <td><?php echo $data_formattata; ?></td>
                    </tr>
                <?php endforeach; ?>
            <?php endif; ?>
        </tbody>
    </table>
</body>
</html>