<?php
$links = [
    ['href' => 'attachi_vigasec', 'text' => 'Attachi'],
    ['href' => 'comeproteggersi_vigasec', 'text' => 'Come proteggersi'],
    ['href' => 'chisiamo_vigasec', 'text' => 'Chi siamo']
];
?>
<?php layout('components/layout'); ?>

       <?php component('hero/hero-section', [
              'background' => '../../img/vigasec/hero.jpg',
              'titolo' => 'VigaSecurity',
              'links' => $links
       ]); 
       ?>

       <div class="container mx-auto px-4 py-16 max-w-7xl">
         <section class="bg-white p-8 md:p-12">
           <h2 class="text-4xl md:text-5xl font-bold text-indigo-500 mb-8 text-center">Chi siamo</h2>
           
           <div class="space-y-6 text-gray-700 text-justify leading-relaxed text-lg static">
            <p class="italic text-center">VigaSecurity: L'informazione per voi</p>
            <div class="flex basis-128">
            <div class="mx-auto max-w-2xl m-8 " >
                <div class="flex justify-left ">
                <img src="img/vigasec/chisiamovigasec_4H.jpg" alt="4H" class="rounded-lg">
                </div>
              </div>
              <div class="pl-12">
              <h3 class="text-2xl md:text-5xl font-semibold  mb-8 text-center" >Il nostro obbiettivo</h3>
              <p class="pb-5">L'obiettivo principale di VigaSecurity è quello di promuovere la consapevolezza e l'educazione sulla sicurezza informatica tra gli studenti del biennio della nostra scuola. Attraverso una serie di iniziative educative e pratiche, miriamo a:</p>
              <ul class="list-disc">
                <li>Sensibilizzare gli studenti sulla necessità di proteggere le proprie informazioni personali e sensibili online.</li>
                <li>Fornire conoscenze di base sulla sicurezza informatica, inclusi concetti come password sicure, phishing, malware e privacy online.</li>
                <li>Educare gli studenti sull'importanza di utilizzare strumenti e pratiche di sicurezza informatica per proteggere i propri dispositivi e account online.</li>
                <li>Incentivare la responsabilità e l'etica digitale tra gli studenti, incoraggiandoli a comportarsi in modo sicuro e rispettoso online.</li>
                <li>Promuovere l'adozione di comportamenti sicuri e consapevoli non solo tra gli studenti, ma anche tra i membri della comunità scolastica, compresi insegnanti e genitori.</li>
                <li>Sviluppare risorse educative e materiali informativi che possano essere utilizzati in modo continuativo per mantenere viva l'attenzione sulla sicurezza informatica.</li>
              </ul>
              </div>
              </div>
            
            






            </div>
            
                               
              
           
         </section>