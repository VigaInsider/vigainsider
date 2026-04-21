<?php /**
 * Component: Hero Home
 */ ?>

    <!-- Hero Section -->
        <section class="bg-gradient-to-l from-[#ff2b4b] via-[#711879] to-[#6366f1] text-white py-32">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex items-center justify-center ">
                <img src="img/vigainsider_logo.png" alt="" class="">
                <?php
                    $dir = "img/highlightedContent/";

                    if (!is_dir_empty($dir)) {
                        ?>
                            <img src="img/highlightedContent/content.png" alt="">
                        <?php
                    }
                    function is_dir_empty($dir) {
                    return (count(scandir($dir)) == 2);
                    }
                ?>
            </div>
        </section>