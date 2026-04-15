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
              'titolo' => 'Attachi',
              'links' => $links
       ]); 
       ?>

       <div class="container mx-auto px-4 py-16 max-w-7xl">
         <section class="bg-white p-8 md:p-12">
           <h2 class="text-4xl md:text-5xl font-bold text-indigo-500 mb-8 text-center">Attacchi informatici</h2>
           
           <div class="space-y-6 text-gray-700 text-justify leading-relaxed text-lg">
            <h3 class="text-2xl md:text-3xl font-bold text-indigo-500 mb-8 text-center">Cos'è un attacco informatico?</h3>
            <p class="text-center">Un attacco informatico è un insieme di azioni che vanno a colpire un singolo dispositivo o altri sistemi informatici, non facendoli più funzionare come dovrebbero.</p>                            
            <video class="h-full w-full rounded-lg" controls>
      <source
        src="https://youtu.be/7UcLFEoAgYk?si=eUlAmczpkTjdHgBu"
        type="video/mp4"
      />
      il tuo browser non supporta questa tag del video (ᗒᗣᗕ)՞.
    </video>
            <h3 class="text-2xl md:text-3xl font-bold text-indigo-500 mb-8 text-center">Quali scopi ha un attacco informatico?</h3>
            <p>Un attacco informatico può avere diversi scopi, tra cui:</p>
            <ul>
                <li>
                    <p>
                    <strong>Rubare i tuoi segreti: </strong>Immagina che qualcuno voglia entrare nel tuo account Instagram o nei tuoi messaggi per rubare le tue foto, le tue chat o le tue informazioni personali. Sarebbe come se cercassero rubare i tuoi segreti per conoscere i tuoi pensieri più intimi!
                    </p>
                </li>
                <li><strong>Rubare un progetto: </strong> Se tu e i tuoi amici state pensando di iniziare a rivendere le puff o i vestiti comparati su Pandabuy oppure avete un'idea artistica; se condividente tra di voi quest'idea e subite un attacco informatico, gli hacker potrebbero rubare le vostre idee e metterle in pratica prima di voi.</li>
                <li><strong>Truffarti online: </strong> Immagina che stai comprendo qualcosa da un sito poco affidabile, potresti incorrere in una truffa online perciò evita di dare i dati della tua carta al massimo paga con PayPal</li>
                <li><strong>Furto di identità online: </strong> Gli Hacker potrebbero cercare di rubare le credenziali di accesso dei vostri account, come quelle di Instagram o di YouTube, al fine di impersonarli o utilizzare le loro identità per scopi fraudolenti.</li>
                <li><strong>Rubare</strong> le tue credenziali di accesso ai giochi o ai social media: Se hai un account molto vincente o importante su un gioco online come Clash Royale, potresti diventare il bersaglio di qualcuno che vuole rubare il tuo nome utente e la tua password per giocare con il tuo team fortissimo.</li>
                <li><strong>Fare brutti scherzi online:</strong> Immagina che qualcuno voglia modificare i tuoi post su Instagram o diffondere voci false su di te. Sarebbe come se qualcuno cercasse di rovinare la tua reputazione, solo che invece di mettere in giro voci tra i corridoi di scuola, lo fanno da un IPhone.</li>
                <li><strong>Cyberbullismo:</strong> Gli Hacker potrebbero accedere in modo non autorizzato ai vostri account per diffondere false informazioni, inviare messaggi intimidatori ad altri, o manipolare e condividere contenuti privati al fine di danneggiare la reputazione dei ragazzi e causare disagio emotivo</li>
                <li><strong>Bloccare il tuo accesso ai giochi online:</strong> Immagina che, mentre stai giocando a FIFA o a brawl Stars, qualcuno interrompa la connessione Internet o blocchi il server del gioco per farti perdere, oltre a lanciare il joypad o il telefono; saresti in una brutta situazione perché potresti essere diventato il bersaglio di qualcuno che vuole rubare i tuoi Fifa Points o i tuoi Brawler rari. Sarebbe come se qualcuno cercasse di la tua collana o il tuo orologio.</li>
                <li><strong>Cancellare i tuoi compiti:</strong> Immagina che qualcuno cerchi di cancellare tutti i tuoi documenti e compiti dal computer poco prima di una consegna di un progetto. Sarebbe come se qualcuno cercasse di far sparire tutto il tuo lavoro duro, rendendoti impossibile completare i tuoi compiti!</li>
            </ul>
        <h3 class="text-2xl md:text-3xl font-bold text-indigo-500 mb-8 text-center">I Tipi di Attacchi più Comuni</h3>
        <video class="h-full w-full rounded-lg" controls>
      <source
        src="https://youtu.be/x6W2pxz-aV8?si=fQzrMvDridHdV4bj"
        type="video/mp4"
      />
      il tuo browser non supporta questa tag del video (ᗒᗣᗕ)՞.
    </video>
        <ul>
            <li><strong>Messaggi phishing:</strong> Immaginate i messaggi phishing come persone false nella vostra cerchia di conoscenti. Sono messaggi che sembrano amici, ma in realtà sono falsi! Questi messaggi finti cercano di rubarvi le chiavi della vostra casa online: username e password. Ricordatevi di non abboccare a questi finti messaggi e state sempre attenti! Foto esempi di phishing link:</li>
            <li><strong>Malware:</strong> I malware sono software progettati per infiltrarsi nei sistemi informatici al fine di danneggiare, rubare o controllare dati; immaginate un software che se scaricato si colleghi a Instagram e vi rubi le password non piacevole vero? I malware includono molti tipi virus, spyware, ma soprattutto i più pericolosi i trojan.</li>
            <li><strong>Trojan:</strong> Immaginate il trojan come il cavallo di Troia, quello dell'Odissea. I troiani lo presero tutti contenti per il regalo, ma non sapevano che dentro c'erano dei soldati pronti a distruggere la città. Bene il trojan è la stessa cosa. Tu scarichi un'applicazione dal web e sei contento del nuovo acquisto, ma non sai che al suo interno ci potrebbero essere dei virus pronti a conquistare il tuo dispositivo. Se trovi un’applicazione gratuita che solitamente è a pagamento, stai attento, potrebbe essere facilmente un trojan.</li>
            <li><strong>Siti cloni:</strong> pensate ai siti cloni come gemelli digitali. Sono come copie perfette dei vostri siti preferiti; ma i siti cloni vengono creati per rubare le vostre informazioni come dati personali oppure dati della carta. Quindi, quando siete online, assicuratevi di essere nei siti originali e non quelli creati da Pandabuy.</li>
            <li><strong>Social Engineering:</strong> Per social engineering si intende un attacco informatico in cui Gli hacker manipolano in maniera tendenzialmente psicologica le persone per ottenere informazioni riservate o per eseguire azioni dannose. Immagina di trovare una chiavetta in un parcheggio che fai non la raccogli? Ovvio che raccoglieresti; poi la metteresti nel tuo PC che inizierà a eliminare o a modificare tutti i dati presenti in memoria, facendoti perdere il controllo del tuo PC. Oppure immagina di trovare un QR-code lo scannerizzeresti? Probabilmente si, ma questo QR-code ti clona i dati presenti nel cellulare e ti ruba tutte le tue password sarebbe un problema vero? Questo è il funzionamento del social engineering, farà sorridere ma tramite questo metodo sono stati fatti attacchi informatici di rilevanza; Leggi come gli USA hanno fatto esplodere una centrale nucleare Iraniana: <a href="https://www.zeusnews.it/n.php?c=17293", class="font-bold text-indigo-500">cliccami</a>.</li>
            <li><strong>Spyware</strong> Uno spyware è un malware quindi un software malevolo che potrebbe essere contenuto in alcune mod o Hack dei vostri giochi preferiti. Immaginate di scaricare il mod menu su gta5 e dopo un anno scoprite che siete stati ascoltati e registrati per un anno intero quale sarebbe la vostra reazione? Già la immagino; per questo state molto attenti quando scaricate qualcosa da internet e cercate di evitare le Hack che rischiate anche il ban. Infatti gli spyware sono molto pericolosi possono monitorare in maniera silenziosa le vostre attività, raccogliere informazioni personali, persino registrare le vostre conversazioni.</li>
        </ul>
        
        </div>
         </section>
