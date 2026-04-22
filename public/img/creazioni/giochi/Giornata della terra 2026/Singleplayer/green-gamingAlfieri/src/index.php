<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <script>
        const MAX_SCORE = 180;
    </script>
    <?php include 'php/config.php'; ?>
</head>
<?php
    $route = [
        'start' => 'fase1.html',
        'mid' => 'istruzioniFase2.html',
        'sep' => 'fase2.html',
        'end' => 'risultatiFinali.php',
        'leaderboard' => 'classifica.php',
        'error' => 'error.html'
    ];
    $p = $_GET['pagina'] ?? 'start';
    if (!array_key_exists($p, $route)) {
        http_response_code(404);
        $p = 'error';
    }
    include __DIR__ . '/pages/' . $route[$p];
?>