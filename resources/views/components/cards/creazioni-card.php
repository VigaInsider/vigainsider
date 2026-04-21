<?php /**
 * Component: Section Card
 *
 * @param string $id ID css/js della card (es., "gdt")
 * @param string $titolo Titolo della card (es., "Giornata della terra")
 * @param string $descrizione Descizione del contenuto della card (es., "Giornata della terra 2026.")
 * @param string $gradientFrom Classe Tailwind CSS per il colore di inizio del gradiente (es., "from-red-500")
 * @param string $gradientTo Classe Tailwind CSS per il colore di fine del gradiente (es., "to-red-700")
 * @param string $iconPath SVG path per lo sfondo della card (es., "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM11 17h2v-6h-2v6zm0-8h2V7h-2v2z")
 */ ?>
<div id="<?= $id ?>" class="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
    <div class="bg-gradient-to-br <?= $gradientFrom ?> <?= $gradientTo ?> h-40 flex items-center justify-center" style="background: url('<?=  $iconPath ?>'); background-size: cover;">
        <!--<img src="<?= $iconPath ?>" class="w-24 h-24 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">-->
    </div>
    <div class="p-6 bg-white">
        <h3 class="text-2xl font-bold text-gray-800 mb-2"><?= $titolo ?></h3>
        <p class="text-gray-600 mb-4"><?= $descrizione ?></p>
        <?php
        if(isset($route)) {
            ?>
            <a href=<?= $route?> class="inline-block text-red-600 font-bold hover:text-red-700" target="_blank">Leggi di più →</a>
        <?php
        }
        ?>
    </div>
</div>