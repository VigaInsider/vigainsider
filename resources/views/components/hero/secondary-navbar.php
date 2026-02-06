<nav class="absolute top-0 left-0 right-0 bg-black/30 backdrop-blur-sm text-white z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-center items-center h-14">
                <div class="flex items-center space-x-6">
                    <?php
                    foreach($links as $link) {
                        ?>
                        <a href="<?= $link['href'] ?>?>" class="hover:bg-white/20 px-3 py-2 rounded-md text-sm font-medium transition"><?= $link['text'] ?></a>
                        <?php
                    }
                   ?>
                </div>
            </div>
        </div>
    </nav>