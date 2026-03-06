<?php /**
 * Component: Button
 * TODO: trovare un'alternativa a $destination che sia piu' flessibile
 *
 * @param string $content           Contenuto da mostrare dentro il pulsante (es., "Iscriviti alla newsletter")
 * @param string $bg_color          Classe Tailwind CSS per il colore dello sfondo (es., "bg-sky-500")
 * @param string $gradientFrom      Classe Tailwind CSS per il colore iniziale del gradiente dello sfondo (es., "from-red-500")
 * @param string $gradientTo        Classe Tailwind CSS per il colore finale del gradiente dello sfondo (es., "to-blue-500")
 * @param string $text_color        Classe Tailwind CSS per il colore dello testo (es., "color-blue-300")
 * @param string $destination       Percorso della pagina dove indirizzare l'utente alla pressione del pulsante (es., "/", "#paragrafo-stupendo", "/gdt")
 * 
 */ ?>

<!-- Questo component e' stato scritto completamente da un'essere umano. Chiunque osi intaccare la purezza dell'errore umano
     con il pensiero psicotico di un macchinario subira' la tortura piu' atroce nel suo soggiorno agli inferi -->
<div class="<?php
    // Controllo parametri del colore dello sfondo
    if (isset($gradientFrom) && isset(($gradientTo)) && !isset($bg_color)) echo "bg-gradient-to-tr $gradientFrom $gradientTo ";
    else if (isset($bg_color) && !(isset($gradientFrom) || !isset($gradientTo))) echo "$bg_color ";
    else echo "bg-blue-500 ";

    // Controllo parametro del colore del testo
    echo $text_color ?? "text-white-500";
    ?> rounded-xl p-2 inline-block hover:shadow-lg hover:cursor-pointer transition ease-in-out delay-100 duration-210 hover:-translate-y-1">
    <a href='<?= $destination ?? ' ' ?>'><?= $content ?? "Pulsante" ?></a>
</div>