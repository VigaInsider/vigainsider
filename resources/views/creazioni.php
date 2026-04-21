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
                    <?php
                        $mainPath = "img/creazioni/";
                        $categorie_giochi = json_decode(file_get_contents(__DIR__ . "/creazioni/categorie.json"), true);
                        foreach ($categorie_giochi as $categoria => $giochi) {
                            // usa $categoria per separare le varie categorie e in fondo alla categoria usa <hr>
                            echo "<h3 class=\"text-2xl font-bold text-green-700 mb-4\" style=\"text-align: center\">$categoria</h3>";
                            echo "<div class=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8\">";
                            foreach ($giochi as $gioco) {
                                $dati_gioco = json_decode(file_get_contents($mainPath . "giochi/" . $gioco['cartella'] . "/dati.json"), true);
                                $percorsoImmagine = $mainPath . "giochi/" . $gioco['cartella'] . "/cover.png";
                                if (!isset($dati_gioco['index'])) {
                                    continue;
                                }
                                component('cards/creazioni-card', [
                                    'titolo' => $gioco['nome'],
                                    'descrizione' => $dati_gioco['descrizione'],
                                    // Trasformiamo la cartella in un URL safe
                                    'route' => $mainPath . "giochi/" . implode("/", array_map("rawurlencode", explode("/", $gioco['cartella']))) . "/" . $dati_gioco['index'],
                                    'gradientFrom' => 'from-green-500',
                                    'gradientTo' => 'to-green-700',
                                    'id' => '',
                                    'iconPath' => file_exists($percorsoImmagine) ? $percorsoImmagine : ""
                                ]);
                                echo "<script>console.log('" . $mainPath . "giochi/" . $gioco['cartella'] . "/" . $dati_gioco['index'] . "')</script>";
                            }
                            echo "</div>";
                            echo "<hr class=\"my-8\">";
                        }
                    ?>
                </section>
            </div>