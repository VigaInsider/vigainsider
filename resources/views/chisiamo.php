<?php
$links = [
    ['href' => '#classi', 'text' => 'Classi'],
    ['href' => '#attivita', 'text' => 'Attività'],
    ['href' => '#storico', 'text' => 'Storico']
];
?>

<?php layout('components/layout'); ?>

<style>
    :root {
        --violet: #7b2ff7;
        --pink: #f107a3;
        --light-pink: #fde2f5;
    }

    .title-gradient {
        background: linear-gradient(90deg, var(--violet), var(--pink));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    section {
        border-radius: 18px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.08);
        transition: transform .25s ease, box-shadow .25s ease;
    }

    section:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 30px rgba(0,0,0,0.12);
    }


</style>

<?php component('hero/hero-section', [
    'background' => '../../img/cs/chisiamo.jpg',
    'titolo' => 'Chi siamo',
    'links' => $links
]); 
?>

<div class="container mx-auto px-4 py-16 max-w-7xl">

    <!-- SEZIONE CHI SIAMO  -->
    <section id="classi" class="bg-white p-8 md:p-12">
        <div class="space-y-6 text-section text-justify leading-relaxed text-lg">

            <p>
                Nell'anno <strong>2022/2023</strong> hanno contribuito alla realizzazione di 
                <strong>vigainsider.it</strong> con attività di sviluppo, creazione dei contenuti, gestione e amministrazione, 
                o anche solo con supporto e idee, in ordine sparso, gli studenti:
                <strong>Cristian Acquaviva (4H), Alessandro Basile (4H), Hoan Casu (4H), 
                Gabriele Cecchini (4H), Francesca Polizzi (4H), Rayan Yessou (4H), 
                Stefano Riva (4G), Antonio Randazzo (5H), Kevin Takov (5H), 
                Mattia De Capitani (5G).</strong>
            </p>

            <p>
                Ringraziamo la classe <strong>4L</strong> e il prof. <strong>Dessì</strong> per lo studio della testata del neonato giornale 
                “Vigaweb” e il vincitore del mini concorso per la realizzazione della testata 
                <strong>Edoardo Crescenzio (4L).</strong>
            </p>
        </div>
    </section>

    <!-- SEZIONE STORICO -->
    <section id="storico" class="bg-white p-8 md:p-12 mt-12">
        <h2 class="title-gradient text-4xl md:text-5xl font-bold mb-8 text-center">A.S. 2021/2022 – La nascita di Vigainsider</h2>

        <div class="space-y-6 text-section text-justify leading-relaxed text-lg">

            <p>
                Con una collaborazione fra varie classi dell'istituto, ci siamo preposti di portare alla luce 
                quello che è oggi <strong>Vigainsider</strong>: il sito dagli studenti per gli studenti.
                
                <br>Si è occupato dell'amministrazione del sito <strong>Matteo Brambilla</strong>.
                
                <br>Hanno ideato il sito, contribuito alla scelta delle tecnologie da utilizzare e sviluppato i contenuti:
                <strong>Matteo Brambilla, Mattia De Capitani, Gabriele Ferron, Tommaso Fumagalli, 
                Simone Mazza, Andrea Pacchiani, Antonio Randazzo, Alessio Solagna, 
                Kevin Takov, Smilla Tomadon.</strong>
                
                <br>Hanno contribuito con idee, opinioni, suggerimenti, righe di codice o rispondendo ai sondaggi proposti:
                <strong>Gabriele Colombo, Tommaso Cunegatti, Riccardo Galizioli, Daniele Missaglia, 
                Federico Pino</strong> e molti altri studenti del triennio informatico.
                
                <br>Ha coordinato il progetto <strong>Pietro Codara</strong>.
            </p>
        </div>
    </section>

    <!-- SEZIONE RINGRAZIAMENTI -->
    <section class="bg-white p-8 md:p-12 mt-12">
        <h2 class="title-gradient text-4xl md:text-5xl font-bold mb-8 text-center">Ringraziamenti</h2>

        <div class="space-y-6 text-section text-justify leading-relaxed text-lg">
            <p>
                Ringraziamo la dirigenza e il collegio docenti del Viganò per aver approvato e reso possibile questo progetto.
                
                <br>Ringraziamo l'ufficio tecnico, e in particolare <strong>Giovanni Marra</strong>, 
                per l'aiuto dato nella fase di registrazione di questo dominio.
                
                <br>Un grazie ai docenti che, in qualsiasi forma, ci hanno aiutato.
            </p>
        </div>
    </section>

</div>
