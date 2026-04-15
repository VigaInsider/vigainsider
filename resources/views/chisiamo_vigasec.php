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
           
           <div class="space-y-6 text-gray-700 text-justify leading-relaxed text-lg">
            <h2></h2>                            
              
           </div>
         </section>