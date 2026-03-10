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
        <h2 class="text-4xl md:text-5xl font-bold text-green-700 mb-8 text-center">Attività</h2>

        <div class="space-y-6 text-gray-700 text-justify leading-relaxed text-lg">
            <p>La <strong>Giornata della Terra</strong> è una festa che si celebra il <strong>22 aprile</strong> di ogni
                anno in tutto il mondo. L'obiettivo principale di questa giornata è quello di
                <strong>sensibilizzare</strong> le persone sull'importanza di <strong>proteggere e conservare il nostro
                    pianeta.</strong>
            </p>

            <p>Durante la Giornata della Terra, molte comunità e scuole organizzano <strong>attività ed eventi</strong>
                per promuovere la conservazione ambientale e la sostenibilità. Ci sono tante cose che possiamo fare per
                proteggere il nostro pianeta, come ridurre il consumo di energia, riciclare, utilizzare mezzi di
                trasporto eco-sostenibili, ridurre l'utilizzo della plastica e delle sostanze tossiche.</p>

            <p>Partecipare alla Giornata della Terra è un modo per ricordare <strong>l'importanza di prendersi cura del
                    nostro pianeta</strong> e di fare la nostra parte per proteggerlo.</p>

            <p>Ricordate ragazze e ragazzi, il nostro pianeta <strong>è la nostra unica casa</strong> e dobbiamo fare
                tutto il possibile per <strong>proteggerlo e preservarlo per le generazioni future.</strong></p>
        </div>
    </section>

    <?php component('cards/section-card', [
                    'id' => 'Note-di-Natura',
                    'titolo' => 'Note di Natura - Claudia Colombo e Catalano Saverio',
                    'descrizione' => "La nostra attività prevede l'esecuzione di tre canzoni a tema ambientale, intervallate da momenti di interazione con il pubblico che verrà coinvolto attraverso Kahoot/domande-stimolo",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
    <?php component('cards/section-card', [
                    'id' => 'Green-Gaming',
                    'titolo' => 'Green Gaming - Pietro Codara, Guerrina Ceci',
                    'descrizione' => "Green Gaming è un'iniziativa di sensibilizzazione ambientale attraverso sfide ludiche con i videogiochi. I partecipanti si confronteranno in gare utilizzando giochi sviluppati dagli stessi studenti, progettati per esplorare tematiche come il cambiamento climatico, la gestione sostenibile delle risorse e la conservazione della biodiversità. Questa attività trasforma il gaming in un'occasione per riflettere in modo coinvolgente e interattivo sul nostro impatto sul pianeta.",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
    <?php component('cards/section-card', [
                    'id' => "Open-Data",
                    'titolo' => "Open Data per l'ambiente e il clima - Pietro Codara",
                    'descrizione' => "\"Open Data per l'ambiente e il clima\" è un'iniziativa di sensibilizzazione ambientale attraverso l'analisi e la visualizzazione di dati pubblici. Gli studenti di quinta progetteranno siti web che raccolgono, elaborano e presentano dati aperti su tematiche come qualità dell'aria, temperature globali, emissioni di CO2 e biodiversità. Questa attività permette di scoprire la realtà del cambiamento climatico attraverso numeri e grafici concreti, trasformando informazioni complesse in strumenti accessibili per comprendere e comunicare le sfide ambientali del nostro tempo.",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
    <?php component('cards/section-card', [
                    'id' => 'Dora',
                    'titolo' => 'Dora nella Terra delle Meraviglie - Casiraghi Sara',
                    'descrizione' => "Attraverso un’escape room educativa, gli studenti scopriranno alcune delle più importanti meraviglie naturali del pianeta e rifletteranno sulle minacce causate dall’uomo, sviluppando consapevolezza ambientale, pensiero critico e, magari, volontà attiva di cambiamento.",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
    <?php component('cards/section-card', [
                    'id' => 'Green-Gaming',
                    'titolo' => 'Green Gaming - Pietro Codara, Guerrina Ceci',
                    'descrizione' => "Green Gaming è un'iniziativa di sensibilizzazione ambientale attraverso sfide ludiche con i videogiochi. I partecipanti si confronteranno in gare utilizzando giochi sviluppati dagli stessi studenti, progettati per esplorare tematiche come il cambiamento climatico, la gestione sostenibile delle risorse e la conservazione della biodiversità. Questa attività trasforma il gaming in un'occasione per riflettere in modo coinvolgente e interattivo sul nostro impatto sul pianeta.",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
    <?php component('cards/section-card', [
                    'id' => 'Green-Gaming',
                    'titolo' => 'Green Gaming - Pietro Codara, Guerrina Ceci',
                    'descrizione' => "Green Gaming è un'iniziativa di sensibilizzazione ambientale attraverso sfide ludiche con i videogiochi. I partecipanti si confronteranno in gare utilizzando giochi sviluppati dagli stessi studenti, progettati per esplorare tematiche come il cambiamento climatico, la gestione sostenibile delle risorse e la conservazione della biodiversità. Questa attività trasforma il gaming in un'occasione per riflettere in modo coinvolgente e interattivo sul nostro impatto sul pianeta.",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
    <?php component('cards/section-card', [
                    'id' => 'Green-Gaming',
                    'titolo' => 'Green Gaming - Pietro Codara, Guerrina Ceci',
                    'descrizione' => "Green Gaming è un'iniziativa di sensibilizzazione ambientale attraverso sfide ludiche con i videogiochi. I partecipanti si confronteranno in gare utilizzando giochi sviluppati dagli stessi studenti, progettati per esplorare tematiche come il cambiamento climatico, la gestione sostenibile delle risorse e la conservazione della biodiversità. Questa attività trasforma il gaming in un'occasione per riflettere in modo coinvolgente e interattivo sul nostro impatto sul pianeta.",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>


</div>