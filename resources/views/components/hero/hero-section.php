<!-- Hero Section -->
<section class="relative bg-cover bg-center text-white py-32" style="background-image: url('<?= $background ?? ''; ?>');">
    <div class="absolute inset-0 bg-black/40"></div>
    
    <!-- Secondary Navbar -->
    <?php component('hero/secondary-navbar', [
        'links' => $links
    ]); ?>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-6"><?= $titolo ?></h1>
    </div>
</section>