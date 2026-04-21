<?php /**
 * Component: Hero Section
 *
 * @param string $titolo Titolo principale della sezione (es., "Benvenuti su VigaInsider")
 * @param string $background URL dell'immagine di sfondo (es., "/public/img/hero-bg.jpg")
 */ ?>

<!-- Hero Section -->
 
<section class="relative bg-cover bg-center bg-no-repeat text-white py-32 " style="background-image:linear-gradient(rgba(0, 0, 0, 0.18), rgba(0,0, 0, 0.9)), url('<?= $background ?? ''; ?>')">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-6"><?= $titolo ?></h1>
    </div>
    <div class="absolute inset-0 "></div>
    <!-- Secondary Navbar -->
    <?php component('hero/secondary-navbar', [
        'links' => $links
    ]); ?>
</section>