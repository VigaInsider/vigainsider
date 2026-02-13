<?php
$links = [
    ['href' => '#compra', 'text' => 'Compra'],
    ['href' => '#join', 'text' => 'Unisciti a noi']
];
?>
<?php layout('components/layout'); ?>

       <?php component('hero/hero-section', [
              'background' => '../../img/vigasolidale/hero.jpeg',
              'titolo' => 'Vigasolidale',
              'links' => $links
       ]);
       ?>

        <div class="container mx-auto px-4 py-16 max-w-7xl">
         <section class="bg-white p-8 md:p-12">
           <h2 class="text-4xl md:text-5xl font-bold text-green-700 mb-8 text-center">Descrizione</h2>
           <div class="space-y-6 text-gray-700 text-justify leading-relaxed text-lg">
                <p>Il progetto, organizzato dal professore Fabio Carlini, è rivolto a tutti gli studenti della scuola interessati a vivere un’esperienza di volontariato presso un’azienda agricola a Maida, in Calabria, affiliata all’organizzazione Mato Grosso. Qui verranno raccolte arance i cui proventi saranno interamente destinati alle missioni in America Latina. Durante l’esperienza, gli studenti avranno l’opportunità di vivere pienamente il valore del volontariato: trascorreranno giornate insieme, imparando a conoscersi meglio e a collaborare, e scopriranno l’importanza di dedicare tempo e energie agli altri. Le attività permetteranno inoltre di conoscere da vicino le iniziative di aiuto ai poveri che il Mato Grosso organizza in Perù, Brasile, Ecuador e Bolivia, rafforzando la consapevolezza del ruolo attivo che ciascuno può avere nel fare del bene. La partenza è prevista nei giorni del ponte dell’Immacolata, con data precisa che sarà comunicata a breve.</p>
           </div>
        </section>

        <!-- Sections Grid -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Attività -->
                <?php component('cards/section-card', [
                    'id' => 'compra',
                    'titolo' => 'Compra',
                    'descrizione' => 'I ricavi di tutte le arancie che verranno vendute saranno devoluti in beneficenza, per acquistare le arance clicca su "aquista arancie" nella barra di navigazione in alto che ti reindirizzerà al google forms per aquistarle, è disponibile sia la consegna a domicilio sia il ritiro diretamente a casa del prof, i prezzi sono 20€ per una cassetta (16kg) e 5€ per un sacchetto (3kg).',
                    'gradientFrom' => 'from-purple-500',
                    'gradientTo' => 'to-purple-700',
                    'iconPath' => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
                ]);
                ?>
                <!-- Storico -->
                <?php component('cards/section-card', [
                    'id' => 'join',
                    'titolo' => 'Unisciti a noi',
                    'descrizione' => 'Il progetto di volontariato si svolge presso l\'azienda agricola dell\'organizzazione Mato Grosso, l\'iscrizione costa 110€ vitto e alloggio compresi, per un\'esperienza che dura 4 giorni, dal 4 all\'8 dicembre essendo un\'iniziativa esterna alla scuola é neccessaria una assicurazione e i giorni di scuola saltati verranno segnati per le assenze, ma ricordiamoci lo scopo finale, LA BENEFICIENZA, potrai iscriverti e saperne di più cliccando "unisciti a noi!" sulla barra di navigazione in alto',
                    'gradientFrom' => 'from-yellow-500',
                    'gradientTo' => 'to-yellow-700',
                    'iconPath' => 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.72-7 8.77V12H5V6.3l7-3.11v8.8z'
                ]);
                ?>
            </div>
        </section>
        <hr>
        <!-- Immagine e testo -->
        <div class="container mx-auto px-4 py-16 max-w-7xl">
         <section class="bg-white p-8 md:p-12">
           <h2 class="text-4xl md:text-5xl font-bold text-green-700 mb-8 text-center">Vendite</h2>
           <div class="space-y-6 text-gray-700 text-justify leading-relaxed text-lg">
                <p><strong>Costo delle arance</strong><br>1.5 euro al kilo, è possibile comprare il sacchetto da 3Kg a 5€ oppure la cassetta da 15Kg a 20€, lo sappiamo che il prezzo è leggermete più elevato rispetto alla concorrenza, ma vi ricordiamo ch tutti i soldi guadagnati andranno in beneficenza</p>
           </div><br>
           <div class="space-y-6 text-gray-700 text-justify leading-relaxed text-lg">
                <p><strong>Guida all'acquisto</strong><br>per acquistare le arancie faccia click su "acquista" sotto questa casella, verrà reindirizzato ad un modulo google dove bisognerà inserire:<ul style="list-style-type:disc"><li>i propri dati</li><li>la modalità di spedizione</li></ul><br>il costo di spedizione è:</p>
           </div>
        </section>
        <hr>
        <!-- Immagine e testo -->
        <div class="container mx-auto px-4 py-16 max-w-7xl">
         <section class="bg-white p-8 md:p-12">
           <h2 class="text-4xl md:text-5xl font-bold text-green-700 mb-8 text-center">Iscrizioni</h2>
           <div class="space-y-6 text-gray-700 text-justify leading-relaxed text-lg">
                <p><strong>Perche' iscriversi</strong><br>abbiamo chiesto a tutti gli studenti che hanno partecipato, compresi noi stessi, e siamo giunti a questa conclusione: é una esperienza che ti può cambiare la vita dove sperimenterai l'aiuto verso gli altri, insieme alla convivenza con gli altri studenti che in molti casi diventano grandi amici. E' sicuramente un'esperienza da provare almeno una volta nella vita.</p>
           </div><br>
           <div class="space-y-6 text-gray-700 text-justify leading-relaxed text-lg">
                <p><strong>Guida all'iscrizione</strong><br>per unirti alla prossima spedizione faccia click su "unisciti" la casella presente sotto questa casella, verrà reindirizzato/a su un google forms da compilare, all'interno di esso dovrà inserire i dati personali di suo figlio/a, ricordiamo che questa attività non è un'uscita didattica ma bensì un'attività esterna all'istituto per questo motivo sarà neccessaria un'assicurazione esterna ed i giorni in cui si è in calabria verranno contati come giorni di assenza, seppur vitto e alloggio siano gentilmente offerti dall'associazione mata grosso, il prezzo del viaggio è comunque da pagare e ammonta a 110€.</p>
           </div>
        </section>
       </div>