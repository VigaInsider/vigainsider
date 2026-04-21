<?php
$links = [
    ['href' => 'attachi_vigasec', 'text' => 'Attachi'],
    ['href' => 'comeproteggersi_vigasec', 'text' => 'Come proteggersi'],
    ['href' => 'chisiamo_vigasec', 'text' => 'Chi siamo']
];
?>
<?php layout('components/layout'); ?>

       <?php component('hero/hero-section', [
              'background' => '../../img/vigasec/hero.jpg',
              'titolo' => 'VigaSecurity',
              'links' => $links
       ]); 
       ?>

       <div class="container mx-auto px-4 py-16 max-w-7xl">
         <section class="bg-white p-8 md:p-12">
           <h2 class="text-4xl md:text-5xl font-bold text-indigo-500 mb-8 text-center">VigaSecurity</h2>
           
           <div class="space-y-6 text-gray-700 text-justify leading-relaxed text-lg">
              <p>Ciao ragazzi! Noi studenti dell'indirizzo informatico abbiamo deciso, sotto la guida dei nostri insegnanti, di realizzare questa guida sugli <strong>attacchi informatici</strong>, in modo da rendervi preparati a proteggervi e in caso anche a reagire a un attacco informatico.</p>
                            
              
           </div>
         </section>

         <!-- Sections Grid -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                <!-- attachi e tipi -->
                <?php component('cards/section-card', [
                    'id' => 'attachi_vigasec',
                    'titolo' => 'Attachi ',
                    'descrizione' => 'Impara di quali attachi puoi essere vittima',
                    'gradientFrom' => 'from-red-500',
                    'gradientTo' => 'to-red-700',
                    'route' => '/attachi_vigasec',
                    'iconPath' => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z'
                ]); 
                ?>

                <!-- come proteggersi o cmq difesa generale se la si vuole reworkare -->
                 <?php component('cards/section-card', [
                    'id' => 'comeproteggersi_vigasec',
                    'titolo' => 'Come proteggersi',
                    'descrizione' => 'Impara come prottegerti dalle angherie della rete',
                    'gradientFrom' => 'from-purple-500',
                    'gradientTo' => 'to-purple-700',
                    'route' => '/comeproteggersi_vigasec',
                    'iconPath' => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
                ]); 
                ?>
                
                <!-- Chi siamo -->
                  <?php component('cards/section-card', [
                    'id' => 'chisiamo_vigasec',
                    'titolo' => 'Chi siamo',
                    'descrizione' => 'conosci ci si è occupato dei queste pagine',
                    'gradientFrom' => 'from-yellow-500',
                    'gradientTo' => 'to-yellow-700',
                    'route' => '/chisiamo_vigasec',
                    'iconPath' => 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.72-7 8.77V12H5V6.3l7-3.11v8.8z'
                ]); 
                ?>
              </section>