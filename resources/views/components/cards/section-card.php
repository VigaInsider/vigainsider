<?php /**
 * Component: Section Card
 *
 * @param string $id ID css/js della card (es., "gdt")
 * @param string $titolo Titolo della card (es., "Giornata della terra")
 * @param string $descrizione Descizione del contenuto della card (es., "Giornata della terra 2026.")
 * @param string $gradientFrom Classe Tailwind CSS per il colore di inizio del gradiente (es., "from-red-500")
 * @param string $gradientTo Classe Tailwind CSS per il colore di fine del gradiente (es., "to-red-700")
 * @param string $imgPath Percorso dell'immagine di sfondo della card (es., "card_giornalino.jpg")
 */ ?>
<div id="<?= $id ?>" class="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 flex flex-col h-full">
    <div class="bg-gradient-to-br <?= $gradientFrom ?> <?= $gradientTo ?> h-40 flex items-center justify-center">
        <img src="<?= $imgPath ?>" alt="<?= $titolo ?>" class="object-fill w-full h-full
">
    </div>
    <div class="p-6 bg-white flex flex-col flex-1">
        <h3 class="text-2xl font-bold text-gray-800 mb-2"><?= $titolo ?></h3>
        <p class="text-gray-600 mb-4 flex-shrink-0"><?= $descrizione ?></p>
        <?php
        if(isset($route)) {
            ?>
            <a href=<?= $route?> class="inline-block text-red-600 font-bold hover:text-red-700 mt-auto">Leggi di più →</a>
        <?php
        }
        ?>
    </div>
</div>