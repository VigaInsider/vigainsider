<!-- Hero Section -->
<section class="relative bg-cover bg-center text-white py-32" style="background-image: url('<?= $background ?? ''; ?>');">
    <div class="absolute inset-0 bg-black/40"></div>
    
    <!-- Secondary Navbar -->
    <nav class="absolute top-0 left-0 right-0 bg-black/30 backdrop-blur-sm text-white z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-center items-center h-14">
                <div class="flex items-center space-x-6">
                    <a href="#" class="hover:bg-white/20 px-3 py-2 rounded-md text-sm font-medium transition">Home</a>
                    <a href="#" class="hover:bg-white/20 px-3 py-2 rounded-md text-sm font-medium transition">About</a>
                    <a href="#" class="hover:bg-white/20 px-3 py-2 rounded-md text-sm font-medium transition">Services</a>
                    <a href="#" class="hover:bg-white/20 px-3 py-2 rounded-md text-sm font-medium transition">Contact</a>
                </div>
            </div>
        </div>
    </nav>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-6"><?= $titolo ?></h1>
    </div>