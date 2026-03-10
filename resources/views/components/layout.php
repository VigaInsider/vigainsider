<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title><?php echo $title ?? 'VigaInsider'; ?></title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600,700&display=swap" rel="stylesheet" />

        <!-- Tailwind CSS via CDN -->
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="font-sans antialiased flex flex-col min-h-screen">
        <?php component('navbar'); ?>
        <main class="flex-grow">
            <?php echo $slot ?? ''; ?>
        </main>
        <?php component('footer'); ?>
    </body>
    </body>
</html>