<?php
$links = [
    ['href' => '#classi', 'text' => 'Classi'],
    ['href' => '#attivita', 'text' => 'Attività'],
    ['href' => '#storico', 'text' => 'Storico']
];
?>
<?php layout('components/layout'); ?>

       <?php component('hero/hero-section', [
              'background' => '../../img/gdt/hero.jpg',
              'titolo' => 'Giornata della Terra',
              'links' => $links
       ]); 
       ?>

       <div class="container mx-auto px-4 py-16 max-w-7xl">
         <section class="bg-white p-8 md:p-12">
           <h2 class="text-4xl md:text-5xl font-bold text-green-700 mb-8 text-center">Giornata della Terra</h2>
           
           <div class="space-y-6 text-gray-700 text-justify leading-relaxed text-lg">
              <p>La <strong>Giornata della Terra</strong> è una festa che si celebra il <strong>22 aprile</strong> di ogni anno in tutto il mondo. L'obiettivo principale di questa giornata è quello di <strong>sensibilizzare</strong> le persone sull'importanza di <strong>proteggere e conservare il nostro pianeta.</strong></p>
                            
              <p>Durante la Giornata della Terra, molte comunità e scuole organizzano <strong>attività ed eventi</strong> per promuovere la conservazione ambientale e la sostenibilità. Ci sono tante cose che possiamo fare per proteggere il nostro pianeta, come ridurre il consumo di energia, riciclare, utilizzare mezzi di trasporto eco-sostenibili, ridurre l'utilizzo della plastica e delle sostanze tossiche.</p>
                            
              <p>Partecipare alla Giornata della Terra è un modo per ricordare <strong>l'importanza di prendersi cura del nostro pianeta</strong> e di fare la nostra parte per proteggerlo.</p>

              <p>Ricordate ragazze e ragazzi, il nostro pianeta <strong>è la nostra unica casa</strong> e dobbiamo fare tutto il possibile per <strong>proteggerlo e preservarlo per le generazioni future.</strong></p> 
           </div>
         </section>

         <!-- Sections Grid -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                <!-- Classi -->
                <?php component('cards/section-card', [
                    'id' => 'classi',
                    'titolo' => 'Classi',
                    'descrizione' => 'Visualizza le attività a cui parteciperà la tua classe!',
                    'gradientFrom' => 'from-red-500',
                    'gradientTo' => 'to-red-700',
                    'iconPath' => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z'
                ]); 
                ?>

                <!-- Attività -->
                 <?php component('cards/section-card', [
                    'id' => 'attivita',
                    'titolo' => 'Attività',
                    'descrizione' => 'Visualizza le classi che parteciperanno alla tua attività!',
                    'gradientFrom' => 'from-purple-500',
                    'gradientTo' => 'to-purple-700',
                    'iconPath' => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
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

         <!-- Immagine e testo -->
         <section class="py-16">
           <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
             <!-- Colonna manifesto -->
             <div class="flex justify-center">
               <img src="../../img/gdt/manifesto.jpg" alt="Manifesto Giornata della Terra" class="rounded-lg shadow-lg w-full max-w-md">
             </div>

             <!-- Colonna testo -->
             <div class="space-y-4 text-gray-700 leading-relaxed text-lg text-justify">
               <p>
                 La <strong>Giornata della Terra, quest'anno si svolgerà l'11 aprile.</strong> Per celebrare questo giorno, la scuola ha organizzato ben <strong>18 attività</strong> a cui gli studenti e le studentesse avranno la possibilità di partecipare.
               </p>

               <p>
                 Tutto questo è stato possibile grazie alla <strong>collaborazione di studenti, studentesse, professori e professoresse e organizzazioni esterne.</strong>
               </p>

               <div class="bg-green-50 p-6 rounded-lg">
                 <p class="font-semibold text-green-900 mb-3">Organizzatori della giornata:</p>
                 <p>prof. <strong>Colotta, Tornaghi</strong> e <strong>Corcione</strong></p>
               </div>

               <div class="bg-blue-50 p-6 rounded-lg">
                 <p class="font-semibold text-blue-900 mb-3">Studenti e studentesse organizzatori:</p>
                 <ul class="space-y-1">
                   <li><strong>Bianchi Michele</strong> (5H)</li>
                   <li><strong>Furfaro Penna Jacopo</strong> (5H)</li>
                   <li><strong>Hajek Manuel</strong> (5H)</li>
                   <li><strong>Ciccarese Milena</strong> (4H)</li>
                   <li><strong>Sanguedolce Matteo</strong> (4H)</li>
                   <li><strong>Bonanno Samuele</strong> (4H)</li>
                   <li><strong>Ferlin Marco</strong> (4H)</li>
                 </ul>
               </div>

               <p class="text-gray-600">
                 La locandina è stata realizzata dagli studenti di <strong>3L.</strong>
               </p>
             </div>
           </div>
         </section>
       </div>

       