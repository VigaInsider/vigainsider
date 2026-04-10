<?php /**
  * Component: Button
  * TODO: trovare un'alternativa a $destination che sia piu' flessibile
  *
  * @param string $content           Contenuto da mostrare dentro il pulsante (es., "Iscriviti alla newsletter")
  * @param string $destination       Percorso della pagina dove indirizzare l'utente alla pressione del pulsante (es., "/", "#paragrafo-stupendo", "/gdt")
  * 
  */ ?>

<!-- Questo component e' stato scritto completamente da un'essere umano. Chiunque osi intaccare la purezza dell'errore umano
     con il pensiero psicotico di un macchinario subira' la tortura piu' atroce nel suo soggiorno agli inferi -->

<!-- bg-gradient-to-l from-[#fb7185] via-[#a21caf] to-[#6366f1] -->
<div>
    <a href='<?= $destination ?? ' ' ?>'>
        <span class="bg-[#fb7185] text-neutral-50 rounded-xl px-4 py-3 inline-block hover:shadow-lg hover:cursor-pointer hover:bg-[#e16577] transition ease-in-out delay-50 duration-210 active:translate-y-1 active:bg-[#b4505f]">
            <?= $content ?? "Pulsante" ?>
        </span>
    </a>
</div>