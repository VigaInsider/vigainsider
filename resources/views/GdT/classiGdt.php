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
        <h2 class="text-4xl md:text-5xl font-bold text-green-700 mb-8 text-center">Classi</h2>

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

<?php
$classeSelezionata = $_GET['classe'] ?? '1A';
?>

<div class="flex justify-center my-8">
    <form method="GET">
        <select name="classe" onchange="this.form.submit()"
            class="border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-green-600">

            <?php
            $classi = ["1A","1B","1C","1D","1E","1G","1H","1I","1M","1N","1P","1Q",
                       "2A","2B","2C","2D","2E","2F","2G","2H","2I","2M","2N","2O",
                       "3A","3B","3C","3D","3E","3G","3H","3I","3L","3N",
                       "4A","4B","4C","4E","4G","4H","4I","4L","4N",
                       "5A","5B","5C","5D","5E","5G","5H","5I","5L"];

            foreach ($classi as $classe) {
                $selected = ($classe == $classeSelezionata) ? "selected" : "";
                echo "<option value='$classe' $selected>$classe</option>";
            }
            ?>

        </select>
    </form>
</div>

<table class="w-1/2 mx-auto border border-gray-300 rounded-lg overflow-hidden">
    <thead>
        <tr>
            <th class="px-6 py-3 bg-green-100 text-left text-sm font-semibold text-green-700 border-b">Orario</th>
            <th class="px-6 py-3 bg-green-100 text-left text-sm font-semibold text-green-700 border-b">Attività</th>
        </tr>
    </thead>
    <tbody>
        <?php
        if (($file = fopen("orari.csv", "r")) !== FALSE) {

            // salta intestazione
            fgetcsv($file);

            while (($dati = fgetcsv($file, 1000, ",")) !== FALSE) {

                if (count($dati) < 3) continue;

                $classe = trim($dati[0]);
                $orario = trim($dati[1]);
                $attivita = trim($dati[2]);

                if ($classe === $classeSelezionata) {
                    echo "<tr>
                            <td class='px-6 py-3 border-b'>$orario</td>
                            <td class='px-6 py-3 border-b'>$attivita</td>
                          </tr>";
                }
            }

            fclose($file);
        } else {
            echo "<tr><td colspan='2'>Errore apertura file CSV</td></tr>";
        }
        ?>
    </tbody>
</table>
</div>
