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
                    'iconPath' => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z'
                ]); 
                ?>

                <!-- Creazioni -->
                 <?php component('cards/section-card', [
                    'id' => 'creazioni',
                    'titolo' => 'Creazioni',
                    'descrizione' => 'Esplora i progetti creativi della comunità. Da arte digitale a progetti innovativi, scopri le creazioni straordinarie dei nostri membri.',
                    'gradientFrom' => 'from-purple-500',
                    'gradientTo' => 'to-purple-700',
                    'iconPath' => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
                ]); 
                ?>
                
                <!-- ViGASecurity -->
                  <?php component('cards/section-card', [
                    'id' => 'vigasecurity',
                    'titolo' => 'VigaSecurity',
                    'descrizione' => 'Informazioni essenziali sulla sicurezza informatica. Scopri come proteggerti online e rimani al sicuro nel mondo digitale.',
                    'gradientFrom' => 'from-yellow-500',
                    'gradientTo' => 'to-yellow-700',
                    'iconPath' => 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.72-7 8.77V12H5V6.3l7-3.11v8.8z'
                ]); 
                ?>

                <!-- Giornata della Terra -->
                  <?php component('cards/section-card', [
                    'id' => 'giornata-terra',
                    'titolo' => 'Giornata della Terra',
                    'descrizione' => 'Celebriamo il nostro pianeta con iniziative sostenibili. Scopri come contribuire a un futuro più verde e responsabile.',
                    'gradientFrom' => 'from-green-500',
                    'gradientTo' => 'to-green-700',
                    'iconPath' => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4 15l-4-4 1.41-1.41L8 14.17l6.59-6.59L16 9l-8 8z'
                ]); 
                ?>

            

                <!-- ViGASolidale -->
                <div id="vigasolidale" class="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
                    <div class="bg-gradient-to-br from-pink-500 to-pink-700 h-40 flex items-center justify-center">
                        <svg class="w-24 h-24 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                    </div>
                    <div class="p-6 bg-white">
                        <h3 class="text-2xl font-bold text-gray-800 mb-2">ViGASolidale</h3>
                        <p class="text-gray-600 mb-4">Progetti di solidarietà e responsabilità sociale. Unisciti a noi per fare la differenza nella comunità e nel mondo.</p>
                        <a href="#" class="inline-block text-pink-600 font-bold hover:text-pink-700">Scopri →</a>
                    </div>
                </div>

                <!-- Giochi di Informatica -->
                <div id="giochi" class="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
                    <div class="bg-gradient-to-br from-indigo-500 to-indigo-700 h-40 flex items-center justify-center">
                        <svg class="w-24 h-24 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21 6h-7V3c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v3H3c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1zm-1 14H4V7h16v13zm-6-4c.83 0 1.5-.67 1.5-1.5S14.83 12 14 12s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-4 0c.83 0 1.5-.67 1.5-1.5S10.83 12 10 12s-1.5.67-1.5 1.5.67 1.5 1.5 1.5z"/>
                        </svg>
                    </div>
                    <div class="p-6 bg-white">
                        <h3 class="text-2xl font-bold text-gray-800 mb-2">Giochi di Informatica</h3>
                        <p class="text-gray-600 mb-4">Partecipa a competizioni stimolanti e sfida le tue abilità informatiche. Divertiti e apprendi con i nostri giochi interattivi.</p>
                        <a href="#" class="inline-block text-indigo-600 font-bold hover:text-indigo-700">Gioca →</a>
                    </div>
                </div>

                <!-- CICLab -->
                <x-card 
                    titolo="CICLab" 
                    descrizione="Il nostro laboratorio di innovazione e ricerca. Esplora progetti all'avanguardia e collabora con esperti nel campo dell'informatica." 
                    gradient="from-cyan-500 to-cyan-700"
                    path="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54 1.96 2.36h5.98L19 9z"
                />
            </div>
        </section>
