<?php layout('components/layout'); ?>

<?php component('hero/hero-section', [
       'background' => '../../img/gdt.jpg',
       'titolo' => 'Giornata della Terra'
]);
?>

<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <!-- Attività -->
              <?php component('cards/section-card', [
                     'id' => 'attivitaGdt',
                     'titolo' => 'Ecco le nostre Attività per la Giornata della Terra',
                     'descrizione' => 'Scopri le iniziative e le attività speciali che abbiamo organizzato per celebrare la Giornata della Terra. Partecipa e fai la differenza!',
                     'gradientFrom' => 'from-green-500',
                     'gradientTo' => 'to-green-700',
                     'iconPath' => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z'
              ]);
              ?>

              <!-- Orario -->
              <?php component('cards/section-card', [
                     'id' => 'orarioGdt',
                     'titolo' => 'Orario Speciale Giornata della Terra',
                     'descrizione' => 'Consulta l\'orario speciale delle nostre attività in occasione della Giornata della Terra. Unisciti a noi per celebrare e proteggere il nostro pianeta!',
                     'gradientFrom' => 'from-green-500',
                     'gradientTo' => 'to-green-700',
                     'iconPath' => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z'
              ]);
              ?>
       </div>
</section>