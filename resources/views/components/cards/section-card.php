<div id="<?= $id ?>" class="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
    <div class="bg-gradient-to-br <?= $gradientFrom ?> <?= $gradientTo ?> h-40 flex items-center justify-center">
        <svg class="w-24 h-24 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
            <path d="<?= $iconPath ?>"/>
        </svg>
    </div>
    <div class="p-6 bg-white">
        <h3 class="text-2xl font-bold text-gray-800 mb-2"><?= $titolo ?></h3>
        <p class="text-gray-600 mb-4"><?= $descrizione ?></p>
        <a href="#" class="inline-block text-red-600 font-bold hover:text-red-700">Leggi di più →</a>
    </div>
</div>