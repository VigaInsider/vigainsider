<?php layout('components/layout'); ?>

    <div class="container mx-5 my-3 inline text-center">
        <h1 class="text-9xl">404</h1>
        <p class="py-3">Purtroppo la pagina che cercavi non esiste (╥ ω ╥)</p>
        
        <div class="my-3">
            <?php component("button", [
            "content" => "Torna alla homepage",
            "gradientFrom" => "from-blue-500",
            "gradientTo" => "to-sky-400",
            "text_color" => "text-[#F8F8F8]",
            "destination" => "/"
        ]) ?>
        </div>
    </div>