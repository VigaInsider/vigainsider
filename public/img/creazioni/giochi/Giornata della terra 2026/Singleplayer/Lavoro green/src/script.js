let score1=0, score2=0, selectedTopic='', selectedDifficulty=1, currentTeam=1, currentRotation=0;

let usedQuestions = {};

updateActiveTeam();

function spinWheel(){
    document.getElementById("spin-button").style.display="none";

    const wheel = document.getElementById("wheel");
    const topics = ['Cambiamento climatico','Biodiversità','Inquinamento','Energia rinnovabile','Agricoltura sostenibile','Gestione risorse','Sostenibilità urbana','Politiche ambientali','Economia circolare','Trasporti sostenibili','Economia verde','Rifiuti e gestione'];

    const spin = 360 * 5 + Math.floor(Math.random() * 360);
    currentRotation += spin;

    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        const degrees = currentRotation % 360;
        const pointer = 300;
        const adjusted = (360 - degrees + pointer) % 360;
        const index = Math.floor(adjusted / (360 / topics.length));
        selectedTopic = topics[index];

        document.getElementById("question").innerHTML = `Categoria: <b>${selectedTopic}</b>`;
        document.getElementById("answers-container").innerHTML = "";
        document.getElementById("message-container").innerText = "";

        if (!usedQuestions[selectedTopic]) usedQuestions[selectedTopic] = [];

        const totalQuestions = Object.keys(questions[selectedTopic]).length;

        if (usedQuestions[selectedTopic].length >= totalQuestions) {
            document.getElementById("difficulty-buttons").style.display = "none";
            document.getElementById("message-container").innerText = "⚠️ Tutte le domande di questa categoria sono già state usate!";
            document.getElementById("spin-button").style.display = "inline-block";
            return;
        }

        document.getElementById("difficulty-buttons").style.display = "flex";
        document.querySelectorAll(".diff-btn").forEach((btn, idx) => {
            if (usedQuestions[selectedTopic].includes(idx + 1)) {
                btn.disabled = true;
                btn.style.opacity = 0.4;
                btn.style.cursor = "default";
            } else {
                btn.disabled = false;
                btn.style.opacity = 1;
                btn.style.cursor = "pointer";
            }
        });
    }, 4000);
}

const questions = {

"Cambiamento climatico": {
1:{q:"Quale gas contribuisce maggiormente all'effetto serra causato dall'uomo?",a:["Metano","Protossido di azoto","Anidride carbonica","Vapore acqueo"],c:2},
2:{q:"Quale attività umana aumenta maggiormente le emissioni di gas serra?",a:["Deforestazione","Combustione di combustibili fossili","Allevamento","Agricoltura intensiva"],c:1},
3:{q:"Quale gas viene rilasciato dallo scioglimento del permafrost?",a:["Metano","Ozono","Anidride carbonica","Protossido di azoto"],c:0},
4:{q:"Gli aerosol in atmosfera tendono generalmente a:",a:["Aumentare l'umidità","Raffreddare riflettendo la luce solare","Bloccare completamente la radiazione","Riscaldare intrappolando calore"],c:1},
5:{q:"Quale parametro misura lo squilibrio energetico terrestre?",a:["Temperatura media globale","Concentrazione di CO2","Albedo terrestre","Bilancio radiativo"],c:3}
},

"Biodiversità":{
1:{q:"Che cosa indica il termine biodiversità?",a:["Distribuzione geografica","Numero di ecosistemi","Varietà di specie viventi","Numero di individui"],c:2},
2:{q:"Quale fattore minaccia maggiormente la biodiversità?",a:["Specie invasive","Inquinamento","Distruzione degli habitat","Cambiamento climatico"],c:2},
3:{q:"Quale ambiente ha generalmente più specie diverse?",a:["Foresta temperata","Zona umida","Foresta tropicale","Savana"],c:2},
4:{q:"La perdita di habitat porta a:",a:["Migrazione delle specie","Riduzione della biodiversità","Aumento della fertilità","Aumento della competizione"],c:1},
5:{q:"Quale teoria spiega la relazione specie-area negli ecosistemi isolati?",a:["Biogeografia insulare","Teoria ecologica classica","Selezione naturale","Teoria dell'evoluzione"],c:0}
},

"Inquinamento":{
1:{q:"Che cos'è l'inquinamento?",a:["Alterazione dell'ambiente naturale","Introduzione di sostanze nocive nell'ambiente","Riduzione delle risorse","Aumento della temperatura"],c:1},
2:{q:"Quale è una fonte comune di inquinamento atmosferico?",a:["Industrie","Agricoltura","Automobili","Riscaldamento domestico"],c:2},
3:{q:"Quale tipo di particolato è più dannoso per la salute?",a:["PM10","PM1","PM2.5","Particolato grossolano"],c:2},
4:{q:"Lo smog si forma soprattutto per:",a:["Accumulo di polveri","Reazioni chimiche tra inquinanti","Condensazione del vapore","Aumento della pressione"],c:1},
5:{q:"Quale modello descrive la dispersione degli inquinanti in atmosfera?",a:["Modello lineare","Modello gaussiano","Modello climatico","Modello turbolento"],c:1}
},

"Energia rinnovabile":{
1:{q:"Quale tra queste è una fonte rinnovabile?",a:["Biomassa","Gas naturale","Carbone","Sole"],c:3},
2:{q:"L'energia eolica sfrutta:",a:["Il vento","Correnti d'aria","Differenze di pressione","Movimenti atmosferici"],c:0},
3:{q:"Quale fattore può ridurre l'efficienza dei pannelli solari?",a:["Ombreggiamento","Temperatura elevata","Nuvolosità","Angolo di incidenza"],c:2},
4:{q:"I pannelli solari funzionano meglio quando:",a:["Bassa temperatura","Alta radiazione solare diretta","Alta umidità","Assenza di vento"],c:1},
5:{q:"Quale parametro descrive la variabilità della produzione rinnovabile?",a:["Produzione media","Potenza nominale","Capacity factor","Efficienza"],c:2}
},

"Agricoltura sostenibile":{
1:{q:"L'agricoltura sostenibile mira a:",a:["Ridurre i costi","Espandere i terreni","Proteggere ambiente e risorse","Aumentare la produzione"],c:2},
2:{q:"La rotazione delle colture serve a:",a:["Ridurre i parassiti","Migliorare la fertilità del suolo","Limitare l'erosione","Aumentare la resa"],c:1},
3:{q:"Quale pratica aiuta a proteggere il suolo?",a:["Rotazione","Riduzione lavorazioni","Piante di copertura","Pacciamatura"],c:2},
4:{q:"Quale tecnica usa meno acqua?",a:["Irrigazione superficiale","Irrigazione a goccia","Subirrigazione","Irrigazione a spruzzo"],c:1},
5:{q:"Quale approccio integra tecnologia e sostenibilità agricola avanzata?",a:["Agroecologia","Agricoltura biologica","Agricoltura di precisione","Agricoltura conservativa"],c:2}
},

"Gestione risorse":{
1:{q:"Che cosa sono le risorse naturali?",a:["Materiali utilizzabili dall'uomo","Risorse economiche","Elementi della natura utilizzati dall'uomo","Beni industriali"],c:2},
2:{q:"Quale è una risorsa non rinnovabile?",a:["Carbone","Uranio","Petrolio","Gas naturale"],c:2},
3:{q:"Quale indicatore misura il nostro impatto sull'ambiente?",a:["Consumo energetico","Impronta ecologica","Indice ambientale","Impronta carbonica"],c:1},
4:{q:"Quale pratica riduce lo spreco di risorse?",a:["Efficienza","Riduzione","Riciclo","Riutilizzo"],c:2},
5:{q:"Quale modello descrive i limiti planetari delle risorse?",a:["Sistema Terra","Planetary boundaries","Modello ecologico","Limiti dello sviluppo"],c:1}
},

"Sostenibilità urbana":{
1:{q:"Una città sostenibile cerca di:",a:["Ridurre emissioni","Ridurre l'impatto ambientale","Migliorare servizi","Aumentare efficienza"],c:1},
2:{q:"Il verde urbano aiuta a:",a:["Ridurre temperature","Assorbire CO2","Ridurre inquinamento e calore","Migliorare qualità aria"],c:2},
3:{q:"Quale fattore migliora la qualità della vita in città?",a:["Trasporti efficienti","Accesso ai servizi","Parchi urbani","Basso inquinamento"],c:2},
4:{q:"Quale soluzione riduce l'uso dell'auto?",a:["Mobilità condivisa","Trasporto pubblico","Zone pedonali","Piste ciclabili"],c:1},
5:{q:"Quale approccio integra dati e tecnologia per città sostenibili?",a:["Città resiliente","Smart city","Città digitale","Città sostenibile"],c:1}
},

"Politiche ambientali":{
1:{q:"Le politiche ambientali servono a:",a:["Gestire risorse","Proteggere ecosistemi","Ridurre emissioni","Proteggere l'ambiente"],c:3},
2:{q:"Le leggi sulle emissioni regolano:",a:["Scarichi atmosferici","Inquinanti rilasciati","Emissioni industriali","Gas serra"],c:1},
3:{q:"Quale accordo riguarda il clima globale?",a:["Protocollo di Kyoto","Accordo di Parigi","Convenzione ONU","Accordo COP"],c:1},
4:{q:"Quale misura riduce l'inquinamento facendo pagare chi inquina?",a:["Sistema ETS","Carbon tax","Tassa ambientale","Sanzioni"],c:1},
5:{q:"Quale teoria giustifica l'intervento pubblico per l'ambiente?",a:["Economia pubblica","Regolazione","Fallimento del mercato","Esternalità negative"],c:2}
},

"Economia circolare":{
1:{q:"L'economia circolare mira a:",a:["Riutilizzare materiali","Ridurre sprechi","Chiudere i cicli","Ottimizzare risorse"],c:1},
2:{q:"Il riciclo consiste nel:",a:["Recuperare materiali","Trasformare materiali usati in nuovi prodotti","Ridurre rifiuti","Riutilizzare prodotti"],c:1},
3:{q:"Quale azione allunga la vita dei prodotti?",a:["Manutenzione","Riparazione","Rigenerazione","Riuso"],c:1},
4:{q:"Quale modello prevede l'uso condiviso dei prodotti?",a:["Servitizzazione","Sharing economy","Noleggio","Uso collettivo"],c:1},
5:{q:"Quale principio riduce l'uso di materie prime vergini?",a:["Riciclo","Closed loop","Riduzione","Riutilizzo"],c:1}
},

"Trasporti sostenibili":{
1:{q:"Quale mezzo produce meno emissioni?",a:["Treno","Auto elettrica","Bicicletta","Trasporto pubblico"],c:2},
2:{q:"Il trasporto pubblico contribuisce a:",a:["Migliorare mobilità","Ridurre traffico","Ridurre traffico e emissioni","Ridurre emissioni"],c:2},
3:{q:"Quale carburante è più pulito?",a:["Gas naturale","Elettricità","Biocarburanti","Idrogeno"],c:1},
4:{q:"Quale soluzione riduce il traffico urbano maggiormente?",a:["Mobilità condivisa","Trasporto pubblico","Car sharing","Pianificazione urbana"],c:1},
5:{q:"Quale modello riduce domanda di trasporto?",a:["Digitalizzazione","Smart working","Telelavoro","Decentralizzazione"],c:2}
},

"Economia verde":{
1:{q:"L'economia verde promuove:",a:["Economia sostenibile","Crescita sostenibile","Sviluppo sostenibile","Crescita economica sostenibile"],c:3},
2:{q:"Le imprese verdi investono in:",a:["Innovazione verde","Tecnologie sostenibili","Energie rinnovabili","Efficienza energetica"],c:1},
3:{q:"Quale sigla indica criteri sostenibili per aziende?",a:["ISO","CSR","ESG","SDG"],c:2},
4:{q:"Quale concetto indica crescita con meno impatto ambientale?",a:["Sostenibilità","Transizione","Decoupling","Efficienza"],c:2},
5:{q:"Quale approccio integra economia e ambiente a lungo termine?",a:["Green economy","Transizione ecologica","Sviluppo sostenibile","Economia circolare"],c:2}
},

"Rifiuti e gestione":{
1:{q:"La raccolta differenziata serve a:",a:["Recuperare materiali","Separare i rifiuti","Gestire i rifiuti","Ridurre i rifiuti"],c:1},
2:{q:"Quale rifiuto è organico?",a:["Rifiuti biodegradabili","Scarti alimentari","Residui vegetali","Resti di cibo"],c:3},
3:{q:"Quale metodo permette di recuperare energia dai rifiuti?",a:["Recupero energetico","Incenerimento","Termovalorizzazione","Combustione controllata"],c:2},
4:{q:"Quale azione riduce i rifiuti prodotti?",a:["Prevenzione","Riduzione alla fonte","Minimizzazione","Riduzione consumi"],c:1},
5:{q:"Quale principio stabilisce priorità nella gestione rifiuti?",a:["Economia circolare","Gestione integrata","Gerarchia dei rifiuti","Riduzione rifiuti"],c:2}
}

};

function submitQuestion(difficulty){
    selectedDifficulty = difficulty;

    if (!usedQuestions[selectedTopic]) {
        usedQuestions[selectedTopic] = [];
    }

    if (usedQuestions[selectedTopic].includes(difficulty)) {
        return;
    }

    usedQuestions[selectedTopic].push(difficulty);

    const q = questions[selectedTopic][difficulty];
    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";
    document.getElementById("question").innerText = q.q;
    document.getElementById("difficulty-buttons").style.display = "none";

    document.querySelectorAll(".diff-btn").forEach((btn, idx) => {
        if (usedQuestions[selectedTopic].includes(idx + 1)) {
        btn.disabled = true;
        btn.style.opacity = 0.4;
        btn.style.cursor = "default";
        }
    });

    q.a.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.className = "answer-btn";
        btn.innerText = answer;
        btn.onclick = () => checkAnswer(index);
        answersContainer.appendChild(btn);
    });
}

function checkAnswer(selectedAnswer){
    const correctAnswer=questions[selectedTopic][selectedDifficulty].c;
    let message="";
    if(selectedAnswer===correctAnswer){
        if(currentTeam===1){score1+=selectedDifficulty; document.getElementById("score1").innerText=score1;}
        else{score2+=selectedDifficulty; document.getElementById("score2").innerText=score2;}
        message=`✅ Risposta corretta! +${selectedDifficulty} punti`;
    }else{message="❌ Risposta sbagliata!";}
    document.getElementById("message-container").innerText=message;
    document.querySelectorAll("#answers-container .answer-btn").forEach(btn=>{btn.disabled=true; btn.style.opacity="0.6"; btn.style.cursor="default";});

    setTimeout(()=>{
        currentTeam=currentTeam===1?2:1;
        updateActiveTeam();
        document.getElementById("question").innerHTML="";
        document.getElementById("answers-container").innerHTML="";
        document.getElementById("message-container").innerText="";
        document.getElementById("spin-button").style.display="inline-block";
    },2000);
}

function updateActiveTeam(){
    document.getElementById("team1").classList.remove("active-team");
    document.getElementById("team2").classList.remove("active-team");

    if(currentTeam === 1){
        document.getElementById("team1").classList.add("active-team");
    } else {
        document.getElementById("team2").classList.add("active-team");
    }
}