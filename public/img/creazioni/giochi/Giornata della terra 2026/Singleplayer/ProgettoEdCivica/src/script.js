let rifiuti = [
    { icona: '🧴', tipoRifiuto: 'plastica' },
    { icona: '🥤', tipoRifiuto: 'plastica' },
    { icona: '🛍️', tipoRifiuto: 'plastica' },
    { icona: '🧃', tipoRifiuto: 'plastica' },
    { icona: '📦', tipoRifiuto: 'carta' },
    { icona: '📰', tipoRifiuto: 'carta' },
    { icona: '📄', tipoRifiuto: 'carta' },     
    { icona: '📚', tipoRifiuto: 'carta' },      
    { icona: '🥬', tipoRifiuto: 'umido' },
    { icona: '🍌', tipoRifiuto: 'umido' },
    { icona: '🍎', tipoRifiuto: 'umido' },
    { icona: '🥕', tipoRifiuto: 'umido' },
    { icona: '🍾', tipoRifiuto: 'vetro' },
    { icona: '🫙', tipoRifiuto: 'vetro' },
    { icona: '🍶', tipoRifiuto: 'vetro' },
    { icona: '🧪', tipoRifiuto: 'vetro' }
];

    let punteggio = 0;
    let rifiutoCorrente = rifiuti[0];

    let punteggioPagina = document.getElementById("punteggio");
    let rifiutoPagina = document.getElementById("rifiuti");

    function prossimoRifiuto(){
         if (rifiuti.length == 0) {
            rifiutoPagina.innerHTML = "Raccolta differenziata completata!!!<br>";
            rifiutoPagina.innerHTML += "Ecco il tuo punteggio: " + punteggio;
            return;
        }

        let indice = Math.floor(Math.random() * rifiuti.length);
        rifiutoCorrente = rifiuti[indice];
        rifiuti.splice(indice, 1);
        rifiutoPagina.innerHTML = rifiutoCorrente.icona;
    }

    function controllo(tipoRifiuto){
        if(tipoRifiuto == rifiutoCorrente.tipoRifiuto){
            punteggio += 10;
            alert("Bravo! Smistamento corretto +10")}
        else{
            punteggio -= 5;
            alert("Errato! Smistamento errato -5")}

        punteggioPagina.innerHTML = `Punteggio: ${punteggio}`;
        prossimoRifiuto();}

    
    rifiutoPagina.addEventListener('dragstart', (e) => {e.dataTransfer.setData('text/plain', 'dragging');});

    prossimoRifiuto();