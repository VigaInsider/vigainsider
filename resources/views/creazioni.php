<?php
$links = [
    ['href' => '../', 'text' => 'Home'],
];
?>
<?php layout('components/layout'); ?>

       <?php component('hero/hero-section', [
              'background' => '../../img/gdt/hero.jpg',
              'titolo' => 'Creazioni',
              'links' => $links
       ]); 
       ?>

       <div class="container mx-auto px-4 py-16 max-w-7xl">
         <section class="bg-white p-8 md:p-12">
           <h2 class="text-4xl md:text-5xl font-bold text-green-700 mb-8 text-center">Creazioni</h2>
           
           <div class="space-y-6 text-gray-700 text-justify leading-relaxed text-lg">
              <p>Cosa succede quando la teoria appresa in classe incontra la <strong>passione pura</strong> e un pizzico di sana ambizione? La risposta risiede nei <strong>progetti originali</strong> firmati dagli studenti ed ex studenti <strong>dell'Istituto Viganò.</strong></p>
           </div>
         </section>

         <!-- Sections Grid -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                <!-- Classi -->
                <?php component('cards/section-card', [
                    'id' => 'classi',
                    'titolo' => 'Acchiappa la spazzatura!',
                    'descrizione' => 'Pulisci la città prima che sia troppo tardi!',
                    'gradientFrom' => 'from-red-500',
                    'gradientTo' => 'to-red-700',
                    'iconPath' => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z'
                ]); 
                ?>

                <!-- Attività -->
                 <?php component('cards/section-card', [
                    'id' => 'attivita',
                    'titolo' => 'Trash collector',
                    'descrizione' => 'Raccogli la spazzatura in tempo',
                    'gradientFrom' => 'from-purple-500',
                    'gradientTo' => 'to-purple-700',
                    'iconPath' => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
                ]); 
                ?>
                
                <!-- Storico -->
                  <?php component('cards/section-card', [
                    'id' => 'storico',
                    'titolo' => 'Ricicla',
                    'descrizione' => 'Pulisci riciclando nel bosco',
                    'gradientFrom' => 'from-yellow-500',
                    'gradientTo' => 'to-yellow-700',
                    'iconPath' => 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.72-7 8.77V12H5V6.3l7-3.11v8.8z'
                ]); 
                ?>

                <!-- Storico -->
                  <?php component('cards/section-card', [
                    'id' => 'storico',
                    'titolo' => 'Minigames ecologici',
                    'descrizione' => 'Minigiochi ecologici per salvare il mondo',
                    'gradientFrom' => 'from-yellow-500',
                    'gradientTo' => 'to-yellow-700',
                    'iconPath' => 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.72-7 8.77V12H5V6.3l7-3.11v8.8z'
                ]); 
                ?>

                <!-- Storico -->
                  <?php component('cards/section-card', [
                    'id' => 'storico',
                    'titolo' => 'Aura farming',
                    'descrizione' => "guadagna aura e salva l'ambiente",
                    'gradientFrom' => 'from-yellow-500',
                    'gradientTo' => 'to-yellow-700',
                    'iconPath' => 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.72-7 8.77V12H5V6.3l7-3.11v8.8z'
                ]); 
                ?>

                <!-- Storico -->
                  <?php component('cards/section-card', [
                    'id' => 'storico',
                    'titolo' => 'Raccolta differenziata',
                    'descrizione' => 'dividi la spazzatura nei giusti componenti',
                    'gradientFrom' => 'from-yellow-500',
                    'gradientTo' => 'to-yellow-700',
                    'iconPath' => 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.72-7 8.77V12H5V6.3l7-3.11v8.8z'
                ]); 
                ?>

                <!-- Storico -->
                  <?php component('cards/section-card', [
                    'id' => 'storico',
                    'titolo' => 'Brick Breaker',
                    'descrizione' => 'Un gioco realizzato dagli studenti di quarta stile arkanoid',
                    'gradientFrom' => 'from-yellow-500',
                    'gradientTo' => 'to-yellow-700',
                    'iconPath' => 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.72-7 8.77V12H5V6.3l7-3.11v8.8z'
                ]); 
                ?>

                <!-- Storico -->
                  <?php component('cards/section-card', [
                    'id' => 'storico',
                    'titolo' => 'Tomb of the Mask',
                    'descrizione' => 'Un gioco realizzato dagli studenti di quarta, copia di tomb of the mask',
                    'gradientFrom' => 'from-yellow-500',
                    'gradientTo' => 'to-yellow-700',
                    'iconPath' => 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.72-7 8.77V12H5V6.3l7-3.11v8.8z'
                ]); 
                ?>

                <!-- Storico -->
                  <?php component('cards/section-card', [
                    'id' => 'storico',
                    'titolo' => 'Storico',
                    'descrizione' => 'Visualizza il programma degli scorsi anni!',
                    'gradientFrom' => 'from-yellow-500',
                    'gradientTo' => 'to-yellow-700',
                    'iconPath' => 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.72-7 8.77V12H5V6.3l7-3.11v8.8z'
                ]); 
                ?>
              </section>
       </div>

       