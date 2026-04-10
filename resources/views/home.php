<?php layout('components/layout'); ?>

       <?php component('hero/hero-home'); ?>

        <!-- Sections Grid -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                <!-- ViGANews -->
                <?php component('cards/section-card', [
                    'id' => 'viganews',
                    'titolo' => 'ViGANews',
                    'descrizione' => 'Rimani aggiornato con le ultime notizie dal mondo della tecnologia e dell\'informatica. Scopri articoli, recensioni e approfondimenti su argomenti di tendenza.',
                    'gradientFrom' => 'from-red-500',
                    'gradientTo' => 'to-red-700',
                    'route' => '/viganews',
                    'imgPath' => 'img/cards/card_giornalino.jpg'
                ]); 
                ?>

                <!-- Creazioni -->
                 <?php component('cards/section-card', [
                    'id' => 'creazioni',
                    'titolo' => 'Creazioni',
                    'descrizione' => 'Esplora i progetti creativi della comunità. Da arte digitale a progetti innovativi, scopri le creazioni straordinarie dei nostri membri.',
                    'gradientFrom' => 'from-purple-500',
                    'gradientTo' => 'to-purple-700',
                    'route' => '/creazioni',
                    'imgPath' => 'img/cards/card_creazioni.jpg'
                ]); 
                ?>
                
                <!-- ViGASecurity -->
                  <?php component('cards/section-card', [
                    'id' => 'vigasecurity',
                    'titolo' => 'VigaSecurity',
                    'descrizione' => 'Informazioni essenziali sulla sicurezza informatica. Scopri come proteggerti online e rimani al sicuro nel mondo digitale.',
                    'gradientFrom' => 'from-yellow-500',
                    'gradientTo' => 'to-yellow-700',
                    'route' => '/vigasecurity',
                    'imgPath' => 'img/cards/card_vigasecurity.jpg'
                ]); 
                ?>

                <!-- Giornata della Terra -->
                  <?php component('cards/section-card', [
                    'id' => 'giornata-terra',
                    'titolo' => 'Giornata della Terra',
                    'descrizione' => 'Celebriamo il nostro pianeta con iniziative sostenibili. Scopri come contribuire a un futuro più verde e responsabile.',
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'route' => '/gdt',
                    'imgPath' => 'img/cards/card_gdt.jpg'
                ]); 
                ?>

                <!-- ViGASolidale -->
                  <?php component('cards/section-card', [
                    'id' => 'vigasolidale',
                    'titolo' => 'ViGASolidale',
                    'descrizione' => 'Progetti di solidarietà e responsabilità sociale. Unisciti a noi per fare la differenza nella comunità e nel mondo.',
                    'gradientFrom' => 'from-pink-500',
                    'gradientTo' => 'to-pink-700',
                    'route' => '/vigasolidale',
                    'imgPath' => 'img/cards/card_vigasolidale.jpg'
                ]); 
                ?>

                <!-- Giochi di Informatica -->
                  <?php component('cards/section-card', [
                    'id' => 'giochi',
                    'titolo' => 'Giochi di Informatica',
                    'descrizione' => 'Partecipa a competizioni stimolanti e sfida le tue abilità informatiche. Divertiti e apprendi con i nostri giochi interattivi.',
                    'gradientFrom' => 'from-indigo-500',
                    'gradientTo' => 'to-indigo-700',
                    'route' => '/giochi',
                    'imgPath' => 'img/cards/card_giochiInformatica.jpg'
                ]); 
                ?>
                
                <!-- CICLab -->
                  <?php component('cards/section-card', [
                    'id' => 'ciclab',
                    'titolo' => 'CICLab',
                    'descrizione' => 'Il nostro laboratorio di innovazione e ricerca. Esplora progetti all\'avanguardia e collabora con esperti nel campo dell\'informatica.',
                    'gradientFrom' => 'from-cyan-500',
                    'gradientTo' => 'to-cyan-700',
                    'route' => '/ciclab',
                    'imgPath' => 'img/cards/card_ciclab.png'
                ]); 
                ?>

                <!-- VIgaSpecialWeek -->
                  <?php component('cards/section-card', [
                    'id' => 'VIgaSpecialWeek',
                    'titolo' => 'VigaSpecialWeek',
                    'descrizione' => 'La settimana dedicata a eventi speciali e attività uniche. Un momento strutturato dedicato al recupero degli apprendimenti.',
                    'gradientFrom' => 'from-orange-500',
                    'gradientTo' => 'to-orange-700',
                    'route' => '/vsw',
                    'imgPath' => 'img/cards/card_vsw.jpeg'
                ]); 
                ?>



            </div>
        </section>
