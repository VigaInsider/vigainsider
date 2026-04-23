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
                    'id' => 'Ecologia-della-Mente',
                    'titolo' => 'Ecologia della Mente - Corcione Davide',
                    'descrizione' => "L’ecologia della mente è un concetto che esplora come i processi mentali e culturali interagiscono e influenzano l’ambiente e la società. Sperimenteremo come è possibile vivere maggior calma e chiarezza mentale durante le azioni quotidiane.",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
    <?php component('cards/section-card', [
                    'id' => 'Il-quadro-della-natura',
                    'titolo' => 'Il quadro della natura - Fabio Carlini',
                    'descrizione' => "L'attività comporta la produzione di pannelli colorati dai ragazzi per due ore ogni classe.",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
    <?php component('cards/section-card', [
                    'id' => 'Re-Music',
                    'titolo' => 'Re-Music - Rosario Pepe',
                    'descrizione' => "Alcuni studenti del Progetto Musica trasformano materiali di recupero in strumenti musicali e “sound objects”.
A seguire, performance dal vivo: gli strumenti autocostruiti si uniscono a strumenti tradizionali per eseguire brani e arrangiamenti a tema.
Un evento tra creatività, sostenibilità e musica d’insieme: meno sprechi, più suono!",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
    <?php component('cards/section-card', [
                    'id' => 'Climatic-Debate',
                    'titolo' => 'Climatic Debate: Viga vs Agnesi - Silvia Pistaceci',
                    'descrizione' => "Sfida di DEBATE su un tema ambientale tra Viganò e Agnesi
",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
                <?php component('cards/section-card', [
                    'id' => 'Fashion victims',
                    'titolo' => 'Fashion victims - Crippa Monica',
                    'descrizione' => "Lo spettacolo “Fashion Victims” si propone di mostrare, attraverso il
racconto di una ragazza e di un ragazzo, due facce della
stessa medaglia: un occidente bulimico e inconsapevole
delle proprie azioni, e un altro mondo, quello in cui ogni risorsa,
compresa quella umana, viene sfruttata fino a esaurirsi.
",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
                <?php component('cards/section-card', [
                    'id' => 'la-partita-della-vita',
                    'titolo' => 'la partita della vita - Filippo Ughi',
                    'descrizione' => "sfida pratica per le classi interessate a tema ambientale (riciclaggio), seguita da una parte di dibattito sui temi affrontati",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
                <?php component('cards/section-card', [
                    'id' => 'l’eco-oca',
                    'titolo' => 'l’eco-oca - Filippo Ughi',
                    'descrizione' => "gioco dell’oca a tema goal 15 con quiz/puzzle/carte seguita da un momento di riflessione che porta a comporre un mondo di “buoni propositi” formato da post it scritti dai ragazzi coinvolti nel laboratorio",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
                <?php component('cards/section-card', [
                    'id' => 'Giochi per la terra',
                    'titolo' => 'Giochi per la terra - Colotta Francesco',
                    'descrizione' => "Possiamo cambiare il mondo anche giocando. È quello che nel nostro piccolo cercheremo di fare in questo laboratorio. Cambiare il mondo richiede la sua conoscenza, che non passa solo attraverso il pensiero, ma anche attraverso percezioni, emozioni e azioni.
Se è vero che la dignità della vita umana è messa in discussione ed il nostro pianeta è in pericolo, attraverso il gioco cercheremo di propiziare attitudini ed azioni individuali e collettive volte alla trasformazione della realtà.",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
            <?php component('cards/section-card', [
                    'id' => 'Economia-circolare',
                    'titolo' => 'Incontro su economia circolare e sostenibilità: capire il ciclo di vita dei prodotti e ripensare il nostro rapporto con le risorse - Colotta Francesco',
                    'descrizione' => "Interverrà Carlo Brondi, ricercatore CNR-STIIMA. L’incontro introdurrà i principi dell’economia circolare attraverso esempi concreti e momenti interattivi, con l’obiettivo di riflettere su come progettazione, innovazione e scelte quotidiane possano contribuire a una transizione più sostenibile.
",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
            <?php component('cards/section-card', [
                    'id' => 'Ambientalismo',
                    'titolo' => 'Ambientalismo e partecipazione nelle questioni ambientali - Colotta Francesco',
                    'descrizione' => "Incontro con l'associazione Legambiente. L’ambientalismo sembrerebbe essere passato di moda tra governanti e potenti del mondo. Da capi di stato che sostengono che la crisi climatica sia una truffa, a banche e aziende che continuano a investire su fossile e guerre, nessuno pare più intenzionato a seguire i buoni propositi fatti nei decenni precedenti. Chi protesta viene bollato come “ecovandalo”. Le regolamentazioni e i difensori ambientali sono sotto attacco in tutto il mondo, così come la partecipazione democratica. Ma che relazione c’è tra queste due cose? Il tema della giornata della terra 2026 è “Il nostro potere, il nostro pianeta”, proprio per mettere al centro l’importanza della partecipazione democratica e dell’attivismo nel cercare di mantenere il nostro pianeta vivibile anche per le generazioni future. Il circolo Meratese di Legambiente propone un laboratorio per capire cosa vogliono dire partecipazione e attivismo su temi ambientali, oggi come in passato. Rifletteremo insieme sul significato di “attivismo” e “ambientalismo” per capire il loro significato, andando oltre alcune narrative stereotipiche molto diffuse. 
Il workshop alternerà momenti di discussione e riflessione fra i partecipanti a momenti più frontali, in cui verranno fornite le informazioni storiche e di contesto che possano permettere di ragionare in maniera più approfondita e cosciente. L’obiettivo è che tutti possano uscire dal workshop con idee e pensieri nuovi, che possano aiutare a sviluppare anche riflessioni future riguardo all’attivarsi come società democratica e/o come ambientalisti.",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
            <?php component('cards/section-card', [
                    'id' => 'Crisi-Eco-Climatica',
                    'titolo' => 'Crisi Eco-Climatica: Consapevolezza scientifica e strategia di azione collettiva - Colotta Francesco',
                    'descrizione' => "L'Istituto 'F. Viganò'  incontra Extinction Rebellion Brianza. In occasione della Giornata Internazionale della Terra, il movimento Extinction Rebellion Brianza propone un incontro dedicato alle classi dell'ultimo biennio della scuola secondaria di secondo grado, con l’obiettivo di trasformare la consapevolezza ecologica in cittadinanza attiva.",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
            <?php component('cards/section-card', [
                    'id' => 'Comitato-cittadini-Ponti',
                    'titolo' => 'Incontro con il Comitato cittadini Ponti - Colotta Francesco',
                    'descrizione' => "Il Comitato Cittadini Ponti di Paderno, Robbiate, Verderio fin dal 2022 si impegna con diffusione di materiale informativo, ricerche, raccolte di firme, Assemblee pubbliche, incontri con le Amministrazioni a vari livelli per scongiurare 
    • Lo scempio del Ponte storico S. Michele e della valle leonardesca che lo ospita, vanto paesaggistico conosciuto in tutta Europa, con relativa perdita di prestigio e della candidatura a bene dell’Unesco.
    • Lo sconvolgimento ambientale di tutta la zona dovuta alla nuova imponente costruzione (che si tratti di un solo ponte a doppia funzione o di due ponti separati) che, oltre a modificare pesantemente fisicamente i luoghi, attirerebbe volumi di traffico veicolare di auto e di tir in un continuum riversato sulle arterie locali già congestionate con enorme peggioramento dell’aria, dei rumori, della mobilità interna dei paesi.
    • L’ipotesi di un raddoppio dei binari nel canale esistente per ospitare una gronda ferroviaria est-ovest di livello europeo che porta in mezzo ai paesi e zone urbanizzate passaggi frequentissimi di lunghi e rumorosi treni merci.
e per proporre soluzioni alternative a quelle disastrose e semplicistiche previste in posizione razionale e molto meno impattante, recuperando progetti già studiati da decenni per la soluzione degli attraversamenti che sono un problema che richiede interventi da anni e anni.",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
            <?php component('cards/section-card', [
                    'id' => "Oro-colato",
                    'titolo' => "Oro colato. L'eredità per pochi delle olimpiadi di Milano Cortina - Claudia Colombo",
                    'descrizione' => "presentazione del libro con DUCCIO FACCHINI Autore e Direttore di Altreconomia
",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
<?php component('cards/section-card', [
                    'id' => "Ecomafie",
                    'titolo' => "Ecomafie - Casiraghi Sara ",
                    'descrizione' =>" Il fenomeno delle Ecomafie: cos'è e come si manifesta. Casi del territorio e attività del Nucleo Investigativo di Polizia Ambientale, Agroalimentare e Forestale dei Carabinieri di Lecco.
",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
                <?php component('cards/section-card', [
                    'id' => "FAST-FASHION",
                    'titolo' => "FAST FASHION FAST POLLUTION - Sala Carola",
                    'descrizione' => "Il laboratorio propone una riflessione sull'inquinamento provocato dalla produzione e dall'acquisto di capi di abbigliamento a basso costo e di scarsa qualità. L'attività propone agli studenti del biennio anche lo scambio e il riutilizzo di magliette. I capi da scambiare saranno raccolti nelle settimane precedenti la Giornata della Terra.

",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
                <?php component('cards/section-card', [
                    'id' => "Il-disastro-di-Seveso",
                    'titolo' => "Il disastro di Seveso: ambiente, industria e comunità - Francesco Colotta",
                    'descrizione' => "
",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
                <?php component('cards/section-card', [
                    'id' => "gruppo-ambientalista",
                    'titolo' => "Incontro col Gruppo ambientalista del Liceo Agnesi - ELENA TORNAGHI - CRISTINA MAZZA - LINDA GATTI",
                    'descrizione' => " Presentazione del gruppo ambientalista e laboratorio sulla fast-fashion

",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
                <?php component('cards/section-card', [
                    'id' => "Volontariato-ambientale",
                    'titolo' => "Volontariato ambientale - Serena Ratti",
                    'descrizione' => " Presentazione del gruppo ambientalista e laboratorio sulla fast-fashion",
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>
</div>