(function () {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');

  const COLORS = [
    'rgba(74,153,98,',
    'rgba(106,184,126,',
    'rgba(58,144,128,',
    'rgba(72,168,150,',
    'rgba(192,124,56,',
  ];

  let W, H, particles = [], mouse = { x: -999, y: -999 };

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 10;
      this.r = Math.random() * 1.8 + 0.4;
      this.baseR = this.r;
      this.speedY = Math.random() * 0.4 + 0.12;
      this.speedX = (Math.random() - 0.5) * 0.25;
      this.alpha = Math.random() * 0.45 + 0.08;
      this.baseAlpha = this.alpha;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.twinkle = Math.random() * Math.PI * 2;
      this.twinkleSpeed = Math.random() * 0.018 + 0.006;
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.012 + 0.004;
      if (Math.random() < 0.06) {
        this.r = Math.random() * 2.8 + 1.8;
        this.baseR = this.r;
        this.alpha = Math.random() * 0.18 + 0.05;
        this.baseAlpha = this.alpha;
        this.glow = true;
      } else {
        this.glow = false;
      }
    }
    update() {
      this.twinkle += this.twinkleSpeed;
      this.pulse += this.pulseSpeed;
      const tw = Math.sin(this.twinkle);
      this.alpha = Math.max(0, this.baseAlpha + tw * 0.08);
      this.r = this.baseR + Math.sin(this.pulse) * (this.glow ? 0.6 : 0.2);

      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        const force = (90 - dist) / 90;
        this.x += dx / dist * force * 0.6;
        this.y += dy / dist * force * 0.6;
      }

      this.x += this.speedX;
      this.y -= this.speedY;
      if (this.y < -10) this.reset(false);
    }
    draw() {
      if (this.glow) {
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 4);
        grad.addColorStop(0, this.color + this.alpha + ')');
        grad.addColorStop(1, this.color + '0)');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  function init() {
    resize();
    const count = Math.min(Math.floor(W * H / 7000), 160);
    particles = Array.from({ length: count }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 80) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(74,153,98,' + (0.045 * (1 - d / 80)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); init(); });
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

  init();
  loop();
})();

const KEY = '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';
const IS_ANTH = KEY.startsWith('sk-ant');

function nav(n) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.ntab').forEach(t => t.classList.remove('on'));
  document.getElementById('pg-' + n).classList.add('on');
  document.querySelectorAll('.ntab').forEach((t, i) => { if (['hl', 'scan'][i] === n) t.classList.add('on'); });
}


let imgB64 = '', imgType = 'image/jpeg', nSc = 0, nRe = 0, nPt = 0;
function dov(e) { e.preventDefault(); document.getElementById('upzone').classList.add('drag'); }
function ddrop(e) {
  e.preventDefault(); document.getElementById('upzone').classList.remove('drag');
  const f = e.dataTransfer.files[0]; if (f && f.type.startsWith('image/')) loadF(f);
}
function loadF(file) {
  if (!file) return; imgType = file.type || 'image/jpeg';
  const r = new FileReader();
  r.onload = ev => {
    const src = ev.target.result; imgB64 = src.split(',')[1];
    document.getElementById('prev-img').src = src;
    document.getElementById('prev-wrap').style.display = 'block';
    document.getElementById('iname').textContent = file.name;
    document.getElementById('imeta').textContent = (file.size / 1024).toFixed(0) + ' KB';
    document.getElementById('upzone').style.display = 'none';
    document.getElementById('abtn').disabled = false;
    hideErr();
  };
  r.readAsDataURL(file);
}
function resetScan() {
  imgB64 = '';
  ['prev-wrap', 'reswrap'].forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
  document.getElementById('prev-wrap').classList.remove('scanning');
  document.getElementById('upzone').style.display = 'block';
  document.getElementById('abtn').disabled = true;
  document.getElementById('ph').style.display = 'flex';
  document.getElementById('ldwrap').style.display = 'none';
  document.getElementById('fi').value = ''; document.getElementById('ci').value = '';
  hideErr();
}
function parseAIJson(text) {
  const clean = text.replace(/```json|```/g, '').trim();
  try { return JSON.parse(clean); } catch (_) {}
  const m = clean.match(/\{[\s\S]*\}/);
  if (m) { try { return JSON.parse(m[0]); } catch (_) {} }
  throw new Error('⚠ Impossibile analizzare questa immagine. Prova con una foto più chiara di un rifiuto o oggetto.');
}

async function analyze() {
  if (!imgB64) { showErr('⚠ Carica prima un\'immagine!'); return; }
  if (KEY.includes('INSERISCI')) { showErr('⚠ Imposta API_KEY nel codice sorgente'); return; }
  setLoad(true); hideErr();
  const p = `Sei esperto di gestione rifiuti. Analizza questa immagine.
Rispondi SOLO con JSON valido, nessun testo extra:
{"oggetto":"nome specifico","descrizione":"1 frase","categoria":"plastica|vetro|carta|organico|indifferenziato|raee|pericoloso","categoria_label":"etichetta bidone","riciclabilita":0-100,"istruzioni":["step1","step2","step3"],"impatto_co2":"es. 120g CO2","tempo_decomposizione":"es. 500 anni","curiosita":"fatto eco (2 frasi)","punti":5-50}`;
  try {
    let data;
    if (IS_ANTH) {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': KEY, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 700,
          messages: [{ role: 'user', content: [{ type: 'image', source: { type: 'base64', media_type: imgType, data: imgB64 } }, { type: 'text', text: p }] }]
        })
      });
      const d = await r.json(); if (!r.ok) throw new Error(d.error?.message || 'API error');
      data = parseAIJson(d.content[0].text);
    } else {
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + KEY },
        body: JSON.stringify({
          model: 'gpt-4o', max_tokens: 700,
          messages: [{ role: 'user', content: [{ type: 'image_url', image_url: { url: `data:${imgType};base64,${imgB64}` } }, { type: 'text', text: p }] }]
        })
      });
      const d = await r.json(); if (!r.ok) throw new Error(d.error?.message || 'API error');
      data = parseAIJson(d.choices[0].message.content);
    }
    setLoad(false); renderRes(data); addHist(data);
  } catch (e) { setLoad(false); showErr('✗ ' + e.message); }
}
function setLoad(on) {
  document.getElementById('prev-wrap').classList.toggle('scanning', on);
  document.getElementById('ph').style.display = 'none';
  document.getElementById('ldwrap').style.display = on ? 'flex' : 'none';
  document.getElementById('reswrap').style.display = 'none';
  document.getElementById('abtn').disabled = on;
}
function renderRes(d) {
  const cc = { plastica: 'plastica', vetro: 'vetro', carta: 'carta', organico: 'organico', indifferenziato: 'indiff', raee: 'raee', pericoloso: 'pericol' }[d.categoria] || 'plastica';
  const ce = { plastica: '🔵', vetro: '🟢', carta: '🟡', organico: '🟤', indifferenziato: '⚫', raee: '🔴', pericoloso: '☢️' }[d.categoria] || '♻️';
  const bc = d.riciclabilita > 70 ? 'var(--g)' : d.riciclabilita > 40 ? 'var(--amb)' : 'var(--red)';
  const st = (d.istruzioni || []).map((s, i) => `<div class="step"><div class="stepn">${i + 1}</div><div class="stept">${s}</div></div>`).join('');
  const rw = document.getElementById('reswrap');
  rw.innerHTML = `<div class="cbadge ${cc}">${ce} ${d.categoria_label || d.categoria}</div>
<div class="objname">${d.oggetto}</div><div class="objdesc">› ${d.descrizione}</div>
<div class="recrow"><div class="reclbl">Riciclabilità</div>
  <div class="recbg"><div class="recfill" id="rf" style="width:0%;background:${bc}"></div></div>
  <div class="recpct" style="color:${bc}">${d.riciclabilita}%</div></div>
<div class="improw">
  <div class="ic"><span class="v">${d.impatto_co2 || '—'}</span><span class="l">CO₂ risparmiata</span></div>
  <div class="ic"><span class="v" style="font-size:.85rem">${d.tempo_decomposizione || '—'}</span><span class="l">Decomposizione</span></div>
  <div class="ic"><span class="v" style="color:var(--amb)">+${d.punti || 10}⚡</span><span class="l">Eco-punti</span></div>
</div>
<div class="iblk"><div class="iblk-ttl"><div class="dot"></div>Come smaltirlo</div><div class="steps">${st}</div></div>
<div class="tipbox"><div style="font-size:1.2rem;flex-shrink:0">💡</div><p>${d.curiosita}</p></div>`;
  rw.style.display = 'block';
  setTimeout(() => { const f = document.getElementById('rf'); if (f) f.style.width = d.riciclabilita + '%'; }, 80);
  document.getElementById('iname').textContent = d.oggetto + ' ✓';
}
function addHist(d) {
  nSc++; if (d.riciclabilita >= 50) nRe++; nPt += (d.punti || 10);
  const esc = document.getElementById('h-sc'); if (esc) esc.textContent = nSc;
  const ere = document.getElementById('h-re'); if (ere) ere.textContent = nRe;
  const ept = document.getElementById('h-pt'); if (ept) ept.textContent = nPt;
  const src = document.getElementById('prev-img').src;
  const ce = { plastica: '🔵', vetro: '🟢', carta: '🟡', organico: '🟤', indifferenziato: '⚫', raee: '🔴', pericoloso: '☢️' }[d.categoria] || '♻️';
  const el = document.createElement('div'); el.className = 'hitem';
  el.innerHTML = `<img class="hthumb" src="${src}" alt="">
<div><div class="hname">${d.oggetto}</div><div class="hcat">${ce} ${d.categoria_label || d.categoria}</div></div>
<div class="hpts">+${d.punti}⚡</div>`;
  document.getElementById('hlist').prepend(el);
  document.getElementById('histsec').style.display = 'block';
}
function showErr(m) { const e = document.getElementById('errmsg'); e.textContent = m; e.style.display = 'block'; }
function hideErr() { document.getElementById('errmsg').style.display = 'none'; }

const HL_DATA = [

  { id: 1, img: "https://www.studiominoretti.it/wp-content/uploads/2024/05/effetti-volo-aereo-studio-minoretti.jpg", cat: 'co2', ico: '✈️', nome: 'Volo Roma → New York', desc: 'Emissioni CO₂ per passeggero (A/R)', valore: 1600, unità: 'kg CO₂', fatto: 'Un volo transatlantico A/R emette ~1.600 kg di CO₂: più di 2 mesi di guida media europea.' },
  { id: 2, img: "https://www.repstatic.it/content/nazionale/img/2024/04/04/001055088-a72e0816-8559-48b0-ad1b-810e3c51c889.jpg", cat: 'co2', ico: '🚗', nome: 'Auto a benzina (1 anno)', desc: 'Media europea, 12.000 km/anno', valore: 2100, unità: 'kg CO₂', fatto: 'Un\'auto europea media emette ~175 g CO₂/km: circa 2.100 kg in un anno tipico.' },
  { id: 3, img: "https://www.salepepe.it/files/2022/11/tagli-economici-del-manzo-1140x636.jpg", cat: 'co2', ico: '🍔', nome: '1 kg di manzo', desc: 'Emissioni totali per produrlo', valore: 27, unità: 'kg CO₂', fatto: 'L\'allevamento bovino è tra le cause principali di emissioni: 27 kg CO₂ per kg di carne.' },
  { id: 4, img: "https://admin.orogel.it/uploads/3_Fateunpienodivitaminacconunabuonaporzionedibroccoli_344c1c1f58.png?q=60&fit=outside&s=500x500&format=webp", cat: 'co2', ico: '🥦', nome: '1 kg di broccoli', desc: 'Emissioni totali per produrlo', valore: 0.4, unità: 'kg CO₂', fatto: 'Frutta e verdura hanno un\'impronta carbonica 10-50× inferiore alla carne bovina.' },
  { id: 5, img: "https://sm.pcmag.com/pcmag_me/photo/default/01rqetgksivdtvkxzlfmj7c-22_bd56.jpg", cat: 'co2', ico: '📱', nome: 'Smartphone nuovo', desc: 'CO₂ per produzione (lifecycle)', valore: 70, unità: 'kg CO₂', fatto: 'Il 70% dell\'impatto di uno smartphone avviene in fabbrica, prima ancora di accenderlo.' },
  { id: 6, img: "https://m.media-amazon.com/images/I/71dP5ll6V-L.jpg", cat: 'co2', ico: '💻', nome: 'Laptop nuovo', desc: 'CO₂ per produzione', valore: 300, unità: 'kg CO₂', fatto: 'Produrre un laptop richiede ~300 kg CO₂: tenerlo più anni è la scelta più ecologica.' },
  { id: 7, img: "https://guidegiardinaggio.it/wp-content/uploads/2025/12/albero-di-canfora.webp", cat: 'co2', ico: '🌲', nome: 'Albero adulto (1 anno)', desc: 'CO₂ assorbita in 12 mesi', valore: 22, unità: 'kg CO₂', fatto: 'Un albero adulto assorbe ~22 kg di CO₂ l\'anno: ne servono ~95 per compensare un\'auto.' },
  { id: 8, img: "https://energit.it/wp-content/uploads/quanto-consuma-la-ps4.jpg", cat: 'co2', ico: '🎮', nome: 'Console di gioco (1 anno)', desc: 'Emissioni uso + standby', valore: 65, unità: 'kg CO₂', fatto: 'Una console in standby continuo può consumare quanto una lampadina accesa tutto il giorno.' },
  { id: 9, img: "https://www.gardacon.it/wp-content/uploads/2026/03/cicciogamer89-gardacon-03-26.jpg", cat: 'co2', ico: '👕', nome: '1 t-shirt in cotone', desc: 'Emissioni produzione completa', valore: 5.5, unità: 'kg CO₂', fatto: 'La moda è responsabile del 10% delle emissioni globali; una maglietta produce ~5,5 kg CO₂.' },
  { id: 10, img: "https://www.todis.it/wp-content/uploads/2022/06/Varieta-di-cioccolato.webp", cat: 'co2', ico: '🍫', nome: '1 kg di cioccolato', desc: 'Emissioni totali per produrlo', valore: 19, unità: 'kg CO₂', fatto: 'Il cacao richiede deforestazione e trasporti intercontinentali: 19 kg CO₂ per kg.' },
  { id: 11, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjOEzCAxZ07RE6me5NEuVo_h6NtqwYmla2Rg&s", cat: 'co2', ico: '🚢', nome: 'Crociera 7 giorni', desc: 'Emissioni per passeggero', valore: 1870, unità: 'kg CO₂', fatto: 'Le crociere bruciano oli pesanti tra i più inquinanti: ~267 kg CO₂/giorno per persona.' },
  { id: 12, img: "https://thumbs.dreamstime.com/b/casa-italiana-5670044.jpg", cat: 'co2', ico: '🏠', nome: 'Casa media italiana (1 anno)', desc: 'Riscaldamento + elettricità', valore: 3200, unità: 'kg CO₂', fatto: 'Isolare bene una casa può ridurre del 40% le emissioni domestiche annue.' },
  { id: 13, img: "https://www.alcenero.com/cdn/shop/articles/5ebc4d4f9e36ed000879718b_1592417941328.jpg?v=1744301141", cat: 'co2', ico: '🥛', nome: '1 litro di latte vaccino', desc: 'Emissioni totali per produrlo', valore: 3.2, unità: 'kg CO₂', fatto: 'Il latte vaccino emette 3,2 kg CO₂/litro; il latte di avena ne emette solo ~0,9 kg.' },
  { id: 14, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzhRVFaA_ZWpWTiDf9FKUJLqL7aOapXt54hQ&s", cat: 'co2', ico: '🍾', nome: '1 bottiglia di vino', desc: 'Produzione + trasporto', valore: 1.5, unità: 'kg CO₂', fatto: 'Il vetro pesa e costa caro in CO₂ da trasportare: il bag-in-box è più ecologico.' },
  { id: 15, img: "https://errebi.it/cdn/shop/articles/tip_lana_1200x800.jpg?v=1586426236", cat: 'co2', ico: '🐑', nome: '1 kg di lana', desc: 'Emissioni per produrla', valore: 27, unità: 'kg CO₂', fatto: 'Lana e manzo hanno la stessa impronta carbonica: entrambi vengono da ruminanti.' },
  { id: 16, img: "https://www.saporedimare.it/wp-content/uploads/2024/02/nuova-interna.jpg", cat: 'co2', ico: '🐟', nome: '1 kg di salmone d\'allevamento', desc: 'Emissioni per produrlo', valore: 6, unità: 'kg CO₂', fatto: 'Il pesce d\'allevamento emette meno della carne rossa, ma più del pollame.' },
  { id: 17, img: "https://www.thetrainline.com/cms/media/13339/frecciarossa_hero2.jpg", cat: 'co2', ico: '🚂', nome: 'Treno Milano → Roma', desc: 'Emissioni per passeggero', valore: 3, unità: 'kg CO₂', fatto: 'Il treno emette ~25× meno di un volo sullo stesso tratto: è la scelta più verde.' },
  { id: 18, img: "https://www.mangiarebuono.it/wp-content/uploads/Riso-italiano-1-scaled.jpg", cat: 'co2', ico: '🌾', nome: '1 kg di riso', desc: 'Emissioni produzione risaia', valore: 2.7, unità: 'kg CO₂', fatto: 'Le risaie producono metano per fermentazione: il riso ha un\'impronta più alta del grano.' },
  { id: 19, img: "https://restorecms.blob.core.windows.net/pio/products/images/0/500x500x75/2265330.jpg", cat: 'co2', ico: '🍗', nome: '1 kg di pollo', desc: 'Emissioni totali per produrlo', valore: 6.9, unità: 'kg CO₂', fatto: 'Il pollo emette circa 6,9 kg CO₂ per kg: molto meno del manzo ma più delle verdure.' },
  { id: 20, img: "https://raggiodisole.biz/retail/wp-content/uploads/sites/2/2023/05/uova-colorate-1024x640.jpg", cat: 'co2', ico: '🥚', nome: '1 dozzina di uova', desc: 'Emissioni totali per produrle', valore: 2.4, unità: 'kg CO₂', fatto: 'Le uova hanno un\'impronta carbonica moderata: circa 4,5 volte inferiore al manzo.' },
  { id: 21, img: "https://solorent.it/cdn/shop/files/Screenshot2024-09-24alle13.36.26_1600x.png?v=1727178053", cat: 'co2', ico: '🛻', nome: 'SUV diesel (1 anno)', desc: 'Media 15.000 km/anno', valore: 3600, unità: 'kg CO₂', fatto: 'I SUV consumano in media il 25% in più dei veicoli compatti sullo stesso percorso.' },
  { id: 22, img: "https://www.aptgorizia.it/wp-content/uploads/2025/02/Gorizia-urbano-via-Sauro.jpg", cat: 'co2', ico: '🚌', nome: 'Bus urbano (1 km per persona)', desc: 'Emissioni per passeggero-km', valore: 0.089, unità: 'kg CO₂', fatto: 'Un bus pieno emette ~12 volte meno di altrettante auto in circolazione.' },
  { id: 23, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgiYeCycemYTD1OjtKyoqp5vR65u8Vxr-FCQ&s", cat: 'co2', ico: '🍋', nome: '1 kg di agrumi (importati)', desc: 'Emissioni con trasporto incluso', valore: 0.9, unità: 'kg CO₂', fatto: 'Gli agrumi da fuori UE moltiplicano la loro impronta a causa del trasporto refrigerato.' },
  { id: 24, img: "https://fromaggio.com/cdn/shop/files/icon2_413x275.jpg?v=1741802210", cat: 'co2', ico: '🧀', nome: '1 kg di formaggio', desc: 'Emissioni totali per produrlo', valore: 13.5, unità: 'kg CO₂', fatto: 'Il formaggio emette ~13,5 kg CO₂/kg per via del latte necessario (circa 10 litri per kg).' },
  { id: 25, img: "https://pmecdn.protonweb.com/image-transformation/?s=c&image=images%2Ff_auto%2Cq_auto%2Fv1707732010%2Fwp-pme%2Fcheck-email-attachment-is-safe_3273569f02%2Fcheck-email-attachment-is-safe_3273569f02.%3F_i%3DAA", cat: 'co2', ico: '✉️', nome: '1 email con allegato (1 MB)', desc: 'Emissioni per l\'invio', valore: 0.019, unità: 'kg CO₂', fatto: 'Mandare 65 email equivale alle emissioni di 1 km in auto: la casella piena ha un costo.' },
  { id: 26, img: "https://pureseo.com/wp-content/uploads/2022/05/how-to-use-search-effectively.jpg", cat: 'co2', ico: '🌐', nome: 'Google search (1 ricerca)', desc: 'Emissioni per singola query', valore: 0.0002, unità: 'kg CO₂', fatto: 'Google gestisce ~8,5 miliardi di ricerche al giorno: l\'impatto cumulativo è enorme.' },
  { id: 27, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmSPwSSPXRCkW2_jaLlZubFIRv4Pxdl0unvA&s", cat: 'co2', ico: '🏋️', nome: 'Produrre 1 paio di scarpe running', desc: 'Emissioni produzione completa', valore: 14, unità: 'kg CO₂', fatto: 'La schiuma EVA delle suole richiede petrolio: ogni paio equivale a ~14 km in auto.' },
  { id: 28, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73VzEWclsrqcSzMxg-nkhrA2XEbHCu98UIA&s", cat: 'co2', ico: '🛏️', nome: '1 materasso (nuovo)', desc: 'Emissioni produzione completa', valore: 50, unità: 'kg CO₂', fatto: 'Un materasso in memory foam produce il doppio delle emissioni di uno in lattice naturale.' },
  { id: 29, img: "https://dimages2.gazzettaobjects.it/files/image_768_434/uploads/2024/08/02/66acec766b6e3.jpeg", cat: 'co2', ico: '🚿', nome: 'Doccia calda (10 min)', desc: 'Emissioni per riscaldamento acqua', valore: 0.5, unità: 'kg CO₂', fatto: 'Una doccia di 10 min con scaldabagno a gas emette ~0,5 kg CO₂: dimezzarla dimezza le emissioni.' },
  { id: 30, img: "https://fiscomania.com/wp-content/uploads/2023/03/exp-2023-03-30_07_59_40.png", cat: 'co2', ico: '🌍', nome: 'Media mondiale pro capite (anno)', desc: 'Emissioni medie per persona', valore: 4800, unità: 'kg CO₂', fatto: 'Per restare sotto +1,5°C servirebbero meno di 2.300 kg CO₂ pro capite all\'anno entro il 2050.' },

  { id: 40, img: "https://www.plastmagazine.it/media/Adobe-Stock-photos-plastic-today-2.jpg", cat: 'decomp', ico: '🧴', nome: 'Bottiglia di plastica PET', desc: 'Anni per decomporsi in natura', valore: 450, unità: 'anni', fatto: 'La plastica PET persiste 450 anni, frammentandosi in microplastiche invisibili.' },
  { id: 41, img: "https://www.anzhucraft.com/wp-content/uploads/2025/06/Four-plain-white-styrofoam-cups-on-dark-blue-background.webp", cat: 'decomp', ico: '🥤', nome: 'Bicchiere di polistirolo', desc: 'Anni per decomporsi', valore: 500, unità: 'anni', fatto: 'Il polistirolo non si biodegrada: si frammenta in particelle che inquinano suoli e oceani.' },
  { id: 42, img: "https://www.bananamusic.it/318319-large_default/varta-04903121414-batteria-alcalina.jpg", cat: 'decomp', ico: '🔋', nome: 'Batteria alcalina', desc: 'Anni per decomporsi', valore: 100, unità: 'anni', fatto: 'Le batterie rilasciano mercurio e cadmio nel suolo: vanno sempre ai punti di raccolta.' },
  { id: 43, img: "https://www.edizionianicia.it/wp-content/uploads/2022/04/info.jpg", cat: 'decomp', ico: '📰', nome: 'Giornale di carta', desc: 'Settimane (≈ 0,1 anni)', valore: 0.1, unità: 'anni', fatto: 'La carta si biodegrada in 4-6 settimane; in discarica anaerobica può durare decenni.' },
  { id: 44, img: "https://www.misya.info/wp-content/uploads/2022/04/bucce-di-mela-jpg.jpg", cat: 'decomp', ico: '🍎', nome: 'Buccia di mela', desc: 'Mesi (≈ 0,17 anni)', valore: 0.17, unità: 'anni', fatto: 'La buccia si decompone in 2 mesi, ma in discarica fermenta producendo metano.' },
  { id: 45, img: "https://www.rinnovabili.it/wp-content/uploads/2023/09/riciclo-delle-lattine.jpg", cat: 'decomp', ico: '🥫', nome: 'Lattina di alluminio', desc: 'Anni per decomporsi', valore: 80, unità: 'anni', fatto: 'Riciclare alluminio usa il 95% di energia in meno rispetto alla produzione primaria.' },
  { id: 46, img: "https://www.eticinforma.ch/wp-content/uploads/2023/08/PLASTICA-SACCHETTI-fonte-https-ilsalvagente.it-2023-08-23-plastica-1-sacchetto-della-spesa-su-4-e-illegale.jpeg", cat: 'decomp', ico: '🪣', nome: 'Sacchetto di plastica', desc: 'Anni per decomporsi', valore: 20, unità: 'anni', fatto: '8 milioni di tonnellate di plastica finiscono negli oceani ogni anno.' },
  { id: 47, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYgUVlbWPmTYHsSv7Jo-OdpIQHBf_56mlFTQ&s", cat: 'decomp', ico: '👟', nome: 'Scarpa da ginnastica', desc: 'Anni per decomporsi', valore: 50, unità: 'anni', fatto: 'Suola in gomma e materiali sintetici rendono le scarpe uno dei rifiuti più ostici.' },
  { id: 48, img: "https://www.elettronew.com/blog/wp-content/uploads/2024/10/fluorescenti-compatte.png", cat: 'decomp', ico: '💡', nome: 'Lampadina fluorescente', desc: 'Anni per decomporsi', valore: 1000, unità: 'anni', fatto: 'Contiene mercurio: non va mai in immondizia ordinaria, solo ai centri RAEE.' },
  { id: 49, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNIQ0P66TqFTY2VcHlgyK6D1e0coas3G3T-w&s", cat: 'decomp', ico: '🚬', nome: 'Mozzicone di sigaretta', desc: 'Anni per decomporsi', valore: 12, unità: 'anni', fatto: '4,5 trilioni di mozziconi vengono gettati per terra ogni anno: è il rifiuto più comune.' },
  { id: 50, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRIe7MQYjpTex381l8WZpcYjBrOOkaNGFV9g&s", cat: 'decomp', ico: '🪥', nome: 'Spazzolino da denti', desc: 'Anni per decomporsi', valore: 500, unità: 'anni', fatto: 'Ogni anno vengono buttati ~4,7 miliardi di spazzolini in plastica nel mondo.' },
  { id: 51, img: "https://m.media-amazon.com/images/I/514X9-0hf6L._AC_UF1000,1000_QL80_.jpg", cat: 'decomp', ico: '🪢', nome: 'Corda in nylon', desc: 'Anni per decomporsi', valore: 600, unità: 'anni', fatto: 'Le reti da pesca abbandonate continuano a intrappolare fauna marina per secoli.' },
  { id: 52, img: "https://treeffeservice.it/wp-content/uploads/2014/10/guanti_01.jpg", cat: 'decomp', ico: '🧤', nome: 'Guanti in lattice monouso', desc: 'Anni per decomporsi', valore: 5, unità: 'anni', fatto: 'Post-Covid, miliardi di guanti monouso sono finiti negli oceani di tutto il mondo.' },
  { id: 53, img: "https://hd2.tudocdn.net/1026718?w=824&h=494", cat: 'decomp', ico: '📀', nome: 'CD / DVD', desc: 'Anni per decomporsi', valore: 100, unità: 'anni', fatto: 'I CD contengono policarbonato e alluminio: vanno ai punti RAEE, non nel secco.' },
  { id: 54, img: "https://media.istockphoto.com/id/2162861764/it/foto/direttamente-sopra-un-cesto-di-vimini-contenente-rotoli-di-carta-igienica-in-un-bagno-domestico.jpg?s=612x612&w=0&k=20&c=ErpqR8KeHRqUy8dl88URWszDO7slsuYqrPrx3TVaOBg=", cat: 'decomp', ico: '🧻', nome: 'Rotolo di carta igienica', desc: 'Settimane (≈ 0,08 anni)', valore: 0.08, unità: 'anni', fatto: 'La carta igienica è tra i materiali cartacei più veloci a decomporsi in natura.' },
  { id: 55, img: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/A04773s.jpg?im=Resize,width=750", cat: 'decomp', ico: '🥾', nome: 'Stivale di gomma', desc: 'Anni per decomporsi', valore: 80, unità: 'anni', fatto: 'La gomma vulcanizzata è molto resistente alla degradazione: dura quanto una lattina.' },
  { id: 56, img: "https://i.makeup.it/6/6b/6bidlfmitqf8.jpg", cat: 'decomp', ico: '🪒', nome: 'Rasoio usa e getta', desc: 'Anni per decomporsi', valore: 450, unità: 'anni', fatto: 'Ogni anno si buttano ~2 miliardi di rasoi monouso; il rasoio di sicurezza dura decenni.' },
  { id: 57, img: "https://www.poliplast.it/images/prodotti/contenitori-termici-in-polistirolo-espanso.jpg", cat: 'decomp', ico: '🧊', nome: 'Contenitore in polistirolo', desc: 'Anni per decomporsi', valore: 500, unità: 'anni', fatto: 'Il polistirolo espanso occupa enormi volumi in discarica e galleggia negli oceani.' },
  { id: 58, img: "https://www.centodieci.it/wp-content/uploads/2022/11/bucce_banana_commestibili_cibogourmet-scaled.jpg", cat: 'decomp', ico: '🍌', nome: 'Buccia di banana', desc: 'Mesi (≈ 0,25 anni)', valore: 0.25, unità: 'anni', fatto: 'La buccia di banana si decompone in 3 mesi in condizioni ottimali di umidità e calore.' },
  { id: 59, img: "https://naturadiretta.com/cdn/shop/articles/1-5ba8b29dac6be_0637e6aa-edc5-4c3c-bdba-9386ef30d879.jpg?v=1682611200", cat: 'decomp', ico: '🧴', nome: 'Tappo di bottiglia in plastica', desc: 'Anni per decomporsi', valore: 400, unità: 'anni', fatto: 'I tappi sono uno degli oggetti più ritrovati sulle spiagge di tutto il mondo.' },
  { id: 60, img: "https://cdn.pixabay.com/photo/2016/11/29/13/20/balloons-1869790_1280.jpg", cat: 'decomp', ico: '🎈', nome: 'Palloncino in lattice', desc: 'Anni per decomporsi', valore: 4, unità: 'anni', fatto: 'Anche il lattice naturale impiega anni in acqua e spesso viene ingerito da tartarughe marine.' },
  { id: 61, img: "https://cdn.erre4m-shop.com/__sized__/images/BOX_1_copia-thumbnail-1000x1000-70.jpg", cat: 'decomp', ico: '🥡', nome: 'Contenitore in  plastica', desc: 'Anni per decomporsi', valore: 5, unità: 'anni', fatto: 'I contenitori misti (Tetra Pak) sono difficili da riciclare per la combinazione di materiali.' },
  { id: 62, img: "https://m.media-amazon.com/images/I/A1a7qU9AfAL._AC_UF894,1000_QL80_.jpg", cat: 'decomp', ico: '🪴', nome: 'Vaso in terracotta', desc: 'Secoli per decomporsi', valore: 1000, unità: 'anni', fatto: 'La ceramica non si biodegrada: i cocci trovati dagli archeologi hanno migliaia di anni.' },
  { id: 63, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThnv1dgQ2Qrq8B6xzUCUNO_WcS6508NLFL6g&s", cat: 'decomp', ico: '🧣', nome: 'Sciarpa in acrilico', desc: 'Anni per decomporsi', valore: 200, unità: 'anni', fatto: 'Le fibre sintetiche rilasciano microplastiche ad ogni lavaggio in lavatrice.' },

  { id: 75, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6ha3_KQg8uLOBIbtt88jaiS6NASUlaHD9tw&s", cat: 'riciclo', ico: '📦', nome: 'Carta e cartone (Italia)', desc: '% riciclata ogni anno', valore: 83, unità: '% riciclata', fatto: 'L\'Italia è leader europeo nel riciclo della carta: 83% del raccolto torna in produzione.' },
  { id: 76, img: "https://cdn.skuola.net/news_foto/2018/ricerca-vetro.jpg", cat: 'riciclo', ico: '🍾', nome: 'Vetro (Italia)', desc: '% riciclato ogni anno', valore: 76, unità: '% riciclata', fatto: 'Il vetro è riciclabile al 100% infinite volte senza perdere qualità.' },
  { id: 77, img: "https://mundolatas.com/wp-content/uploads/Aluminio.jpg", cat: 'riciclo', ico: '🥫', nome: 'Alluminio (Italia)', desc: '% riciclato ogni anno', valore: 67, unità: '% riciclata', fatto: 'Riciclare una lattina risparmia energia per 3 ore di TV.' },
  { id: 78, img: "https://casaoggidomani.it/wp-content/uploads/2022/10/Plastica-riciclata-una-seconda-vita-allinsegna-della-sostenibilita.jpg", cat: 'riciclo', ico: '🛢️', nome: 'Plastica (Europa)', desc: '% raccolta per riciclo', valore: 32, unità: '% riciclata', fatto: 'Solo il 32% della plastica europea viene riciclata; il resto va in discarica o incenerita.' },
  { id: 79, img: "https://www.focus.it/images/2021/10/09/ewaste_1020x680.jpg", cat: 'riciclo', ico: '📱', nome: 'Elettronici RAEE (UE)', desc: '% raccolti correttamente', valore: 35, unità: '% riciclata', fatto: 'Il 65% dei RAEE non viene raccolto: contiene oro, argento e terre rare preziosi.' },
  { id: 80, img: "https://unsic.it/wp-content/uploads/2019/04/image.jpg", cat: 'riciclo', ico: '👗', nome: 'Tessile (Europa)', desc: '% riusato o riciclato', valore: 12, unità: '% riciclata', fatto: 'La moda produce 92 Mt di rifiuti ogni anno; solo il 12% viene recuperato.' },
  { id: 81, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMwWP9XQR10RgdimR0vJrohp7QbQ50cqw79g&s", cat: 'riciclo', ico: '🔋', nome: 'Batterie auto (UE)', desc: '% riciclate correttamente', valore: 45, unità: '% riciclata', fatto: 'Le batterie al litio delle auto elettriche sono ancora una sfida per il riciclo.' },
  { id: 82, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdu8XyHB_nBllmt85DE6ha5oQFemJm0rtohA&s", cat: 'riciclo', ico: '🏗️', nome: 'Acciaio (Europa)', desc: '% contenuto riciclato', valore: 60, unità: '% riciclata', fatto: 'L\'acciaio è il materiale più riciclato al mondo: può essere rifuso infinite volte.' },
  { id: 83, img: "https://ilsalvagente.it/wp-content/uploads/2023/10/AdobeStock_536724310-696x464.jpeg", cat: 'riciclo', ico: '🧴', nome: 'PET bottiglie (Italia)', desc: '% riciclata', valore: 55, unità: '% riciclata', fatto: 'Il riciclo del PET italiano è tra i migliori d\'Europa grazie alla raccolta spinta.' },
  { id: 84, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT7r_XOYWY864PpBjuVxgZfIniQQ9bpjwGjQ&s", cat: 'riciclo', ico: '🏠', nome: 'Macerie edili (UE)', desc: '% recuperate', valore: 70, unità: '% riciclata', fatto: 'Le macerie sono il flusso più grande di rifiuti UE: il 70% viene usato come sottofondo.' },
  { id: 85, img: "https://raja.scene7.com/is/image/Raja/products/carta-per-ufficio-formato-a4-raja_PDT00747.jpg?image=M_RASD4_S_GR$default$&hei=300&wid=300", cat: 'riciclo', ico: '🖨️', nome: 'Carta ufficio (UE)', desc: '% riciclata ogni anno', valore: 72, unità: '% riciclata', fatto: 'Il digitale ha ridotto il consumo di carta da ufficio del 30% in 10 anni.' },
  { id: 86, img: "https://www.e-cova.it/wp-content/uploads/2017/04/tires-1846674_1920.jpg", cat: 'riciclo', ico: '🚗', nome: 'Pneumatici fuori uso (UE)', desc: '% recuperati o riciclati', valore: 95, unità: '% riciclata', fatto: 'I PFU vengono usati per campi sportivi, asfalto e combustibile industriale.' },
  { id: 87, img: "https://upload.wikimedia.org/wikipedia/commons/5/55/VariousPills.jpg", cat: 'riciclo', ico: '💊', nome: 'Farmaci scaduti (Italia)', desc: '% smaltiti correttamente', valore: 40, unità: '% riciclata', fatto: 'Il 60% degli italiani butta ancora i farmaci nel secco o nello scarico del bagno.' },
  { id: 88, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSDDDXHnIn2w__aC3ApXhDd6n_rygm5YwDcQ&s", cat: 'riciclo', ico: '🪵', nome: 'Legno e mobili (UE)', desc: '% riciclati o riutilizzati', valore: 38, unità: '% riciclata', fatto: 'Solo il 38% del legno da demolizione viene recuperato; il resto finisce in discarica.' },
  { id: 89, img: "https://www.capsulecialdecaffe.it/cdn/shop/files/capsule-compatibili-caffe.webp?v=1657359819&width=1000", cat: 'riciclo', ico: '☕', nome: 'Capsule caffè (Italia)', desc: '% riciclate correttamente', valore: 22, unità: '% riciclata', fatto: 'Le capsule miste plastica-alluminio sono difficili da riciclare senza raccolta dedicata.' },
  { id: 90, img: "https://www.yorglass.com/uploads/galleries/photos/29-duez-cam/5d763f290a534-metin-ici-2jpg_op.webp", cat: 'riciclo', ico: '🪟', nome: 'Vetro piano (finestre)', desc: '% riciclato in UE', valore: 25, unità: '% riciclata', fatto: 'Il vetro piano non può mescolarsi al vetro da imballaggio: serve filiera separata.' },
  { id: 91, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkpoVBbkAJEHPMJm0nm40QgHC1rFQgykmnvA&s", cat: 'riciclo', ico: '🔩', nome: 'Rame da cavi elettrici (UE)', desc: '% riciclato', valore: 65, unità: '% riciclata', fatto: 'Il rame riciclato usa il 85% di energia in meno rispetto al rame estratto.' },
  { id: 92, img: "https://induplast.it/wp-content/uploads/2022/09/Induplast_Azienda_Gruppo.jpg", cat: 'riciclo', ico: '🧴', nome: 'Cosmetici e imballaggi (UE)', desc: '% riciclati', valore: 30, unità: '% riciclata', fatto: 'Flaconi multimateriale e pompe dosatrici rendono il riciclo dei cosmetici difficile.' },

  { id: 105, img: "https://www.doppelganger.it/dw/image/v2/BGPK_PRD/on/demandware.static/-/Sites-doppelganger-master-eu/default/dwdae264e5/images/large/39TS3312MCU-140_01.jpg?sw=1380&sh=2070", cat: 'acqua', ico: '👕', nome: '1 t-shirt in cotone', desc: 'Acqua virtuale per produrla', valore: 2700, unità: 'litri', fatto: '2.700 litri per una maglietta: l\'equivalente di 2,5 anni di acqua potabile.' },
  { id: 106, img: "https://ceramichepigato.it/cdn/shop/products/MUGDALL_ALTO_f631072d-e33d-4ea2-a853-c8b30f51c7a4.jpg?v=1615189056&width=1445", cat: 'acqua', ico: '☕', nome: '1 tazza di caffè', desc: 'Acqua virtuale per produrla', valore: 140, unità: 'litri', fatto: 'L\'acqua virtuale include quella per coltivare, lavorare e trasportare il prodotto.' },
  { id: 107, img: "https://www.pantanocarni.it/wp-content/uploads/2018/04/carne-bovina.jpg", cat: 'acqua', ico: '🥩', nome: '1 kg di carne bovina', desc: 'Acqua virtuale per produrla', valore: 15400, unità: 'litri', fatto: '15.400 litri per kg di carne: la zootecnia usa il 70% dell\'acqua dolce mondiale.' },
  { id: 108, img: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg", cat: 'acqua', ico: '🍕', nome: '1 pizza margherita', desc: 'Acqua virtuale per produrla', valore: 1260, unità: 'litri', fatto: 'Farina, mozzarella e pomodoro richiedono grandi quantità d\'acqua per crescere.' },
  { id: 109, img: "https://www.professionearchitetto.it/up/press/2026/03/BF_2.jpeg", cat: 'acqua', ico: '🚿', nome: 'Doccia di 5 minuti', desc: 'Acqua consumata direttamente', valore: 65, unità: 'litri', fatto: 'La vasca da bagno consuma 150-200 litri; la doccia breve ne usa 65, il 60% in meno.' },
  { id: 110, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKFGEi54zTm3lmmWmD4MBIZMAtgTBxj7fnxQ&s", cat: 'acqua', ico: '🚽', nome: '1 scarico del WC', desc: 'Acqua per singolo scarico', valore: 9, unità: 'litri', fatto: 'I WC moderni a doppio scarico usano 3-4 litri; i vecchi fino a 13.' },
  { id: 111, img: "https://www.endrizzi.it/blog/wp-content/uploads/2024/03/Endrizzi_Gran-Masetto-grandezze-1024x872.jpg", cat: 'acqua', ico: '🍷', nome: '1 bottiglia di vino (75cl)', desc: 'Acqua virtuale per produrla', valore: 960, unità: 'litri', fatto: 'La vite ha un\'alta domanda idrica: 960 litri d\'acqua per ogni bottiglia.' },
  { id: 112, img: "https://hd2.tudocdn.net/1177769?w=824&h=494", cat: 'acqua', ico: '📱', nome: 'Smartphone nuovo', desc: 'Acqua virtuale per produrlo', valore: 13000, unità: 'litri', fatto: 'Produrre un telefono richiede acqua per estrarre minerali rari e assemblare i componenti.' },
  { id: 113, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQRBwaHpeIjG3WFpYgwYjzFlvfXvcsh5dLYQ&s", cat: 'acqua', ico: '🍫', nome: '1 tavoletta di cioccolato', desc: 'Acqua virtuale (100 g)', valore: 1700, unità: 'litri', fatto: '100 g di cioccolato richiedono 1.700 litri, soprattutto per la coltivazione del cacao.' },
  { id: 114, img: "https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2022/04/pexels-antonio-filigno-8538296-1024x657.jpg", cat: 'acqua', ico: '🥑', nome: '1 avocado', desc: 'Acqua virtuale per produrlo', valore: 320, unità: 'litri', fatto: 'L\'avocado causa siccità locali nelle zone di coltivazione: 320 litri a frutto.' },
  { id: 115, img: "https://m.media-amazon.com/images/I/81-RsbSPhUL._AC_UY1000_.jpg", cat: 'acqua', ico: '👖', nome: '1 paio di jeans', desc: 'Acqua virtuale per produrli', valore: 7500, unità: 'litri', fatto: '7.500 litri per un jeans: più di 6 anni di acqua potabile per una persona.' },
  { id: 116, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH8xG1ZjpYa4qVNg7UpN4MLdghfMWvSy7iHQ&s", cat: 'acqua', ico: '🍅', nome: '1 kg di pomodori', desc: 'Acqua virtuale per produrli', valore: 214, unità: 'litri', fatto: 'I pomodori hanno un\'impronta idrica bassa rispetto alla maggior parte degli alimenti.' },
  { id: 117, img: "https://aicdn.speedsize.com/910565e2-7bde-4aef-b143-60a77dc084e5/https://regalooriginalfiles.blob.core.windows.net/frontend/urls/grande/Jarra-de-cerveza-de-1-litro-g1.jpg", cat: 'acqua', ico: '🍺', nome: '1 litro di birra', desc: 'Acqua virtuale per produrlo', valore: 298, unità: 'litri', fatto: 'La birra richiede acqua per coltivare l\'orzo e per i processi di raffreddamento.' },
  { id: 118, img: "https://www.germinalbio.it/storage/media/131/tipi-di-mele---img_1---.jpg", cat: 'acqua', ico: '🍎', nome: '1 kg di mele', desc: 'Acqua virtuale per produrle', valore: 822, unità: 'litri', fatto: 'Le mele richiedono irrigazione abbondante, specie nelle regioni a clima secco.' },
  { id: 119, img: "Phttps://www.fruttaebacche.it/modules/prestablog/views/img/grid-for-1-7/up-img/363.jpgH", cat: 'acqua', ico: '🥜', nome: '1 kg di mandorle', desc: 'Acqua virtuale per produrle', valore: 6000, unità: 'litri', fatto: 'La California produce l\'80% delle mandorle mondiali e usa il 10% dell\'acqua dello stato.' },
  { id: 120, img: "https://www.matemundo.it/hpeciai/ca37ef1aa8c41da68cc3445d0614c4f4/ita_pm_Te-verde-Gunpowder-1-kg-5270_2.jpg", cat: 'acqua', ico: '🌿', nome: '1 kg di tè', desc: 'Acqua virtuale per produrlo', valore: 9200, unità: 'litri', fatto: 'Il tè ha un\'impronta idrica enorme: richiede enormi piantagioni con irrigazione costante.' },
  { id: 121, img: "https://www.macchisergio.it/wp-content/uploads/2024/03/zucchero-di-canna.jpg", cat: 'acqua', ico: '🧁', nome: '1 kg di zucchero di canna', desc: 'Acqua virtuale per produrlo', valore: 1780, unità: 'litri', fatto: 'La canna da zucchero è una delle colture più idrovore al mondo.' },
  { id: 122, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR86h_9X_Lt-VJ21SeuzPxTlYfjXw7h7M0t_A&s", cat: 'acqua', ico: '🚗', nome: 'Autolavaggio (1 lavaggio)', desc: 'Acqua consumata', valore: 150, unità: 'litri', fatto: 'Lavare l\'auto a mano con il tubo aperto consuma fino a 500 litri; l\'autolavaggio 50.' },
  { id: 123, img: "https://www.sapere.it/.imaging/mte/sapere/624x410/dam/icone-sapere/domande-risposte/storia-civilta/scarpe-blu/jcr:content/scarpe-blu.jpg", cat: 'acqua', ico: '👟', nome: '1 paio di scarpe in pelle', desc: 'Acqua virtuale per produrle', valore: 8000, unità: 'litri', fatto: 'La pelle bovina richiede enormi quantità d\'acqua sia per l\'allevamento che per la concia.' },
  { id: 124, img: "https://static.wixstatic.com/media/385a59_08fb766e43294a2683f857d9135b53de~mv2.jpg/v1/fill/w_480,h_270,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/385a59_08fb766e43294a2683f857d9135b53de~mv2.jpg", cat: 'acqua', ico: '🌽', nome: '1 kg di mais', desc: 'Acqua virtuale per produrlo', valore: 900, unità: 'litri', fatto: 'Il mais è usato prevalentemente come mangime: la sua acqua virtual si trasferisce alla carne.' },
  { id: 125, img: "https://www.fattoincasadabenedetta.it/wp-content/uploads/2024/10/insalata-mista-sito-5.jpg", cat: 'acqua', ico: '🥗', nome: 'Insalata mista (1 porzione)', desc: 'Acqua virtuale per produrla', valore: 50, unità: 'litri', fatto: 'Le insalate verdi hanno tra le impronte idriche più basse di tutti gli alimenti.' },
  { id: 126, img: "https://www.ukpackchina.com/wp-content/uploads/2024/06/500ml-hdpe-soft-touch-elegant-shampoo-bottle-1.webp", cat: 'acqua', ico: '🧴', nome: '1 flacone di shampoo (250ml)', desc: 'Acqua per produrlo', valore: 45, unità: 'litri', fatto: 'La maggior parte dei cosmetici è composta per oltre il 70% di acqua demineralizzata.' },

  { id: 140, img: "https://www.informaticait.it/2803-large_default/Chip-power-led-10w-watt-12V-luce-bianco-freddo-per-ricambio-fari-alta-luminosit--.jpg", cat: 'energia', ico: '💡', nome: 'LED 10W (1 anno, 8h/giorno)', desc: 'Consumo energetico annuo', valore: 29, unità: 'kWh/anno', fatto: 'Una LED consuma fino all\'85% meno di una incandescente equivalente da 60W.' },
  { id: 141, img: "https://wips.plug.it/cips/paginegiallecasa/cms/2018/10/impianto-di-riscaldamento.jpg?w=832&h=468&a=c", cat: 'energia', ico: '🌡️', nome: 'Riscaldamento casa (anno)', desc: 'Appartamento medio 80 m²', valore: 8000, unità: 'kWh/anno', fatto: 'Il riscaldamento è il 65% dei consumi domestici: isolare bene riduce del 40%.' },
  { id: 142, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2g8cGFLwZ3xsv70OVGMjp0OY60LIqXw32Fw&s", cat: 'energia', ico: '☀️', nome: 'Pannello solare 1 m² (anno)', desc: 'Energia prodotta in Italia', valore: 170, unità: 'kWh/anno', fatto: 'Il sole che colpisce la Terra in 90 minuti coprirebbe il fabbisogno mondiale annuo.' },
  { id: 143, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLGcD0CyKlYnSz73Mc-_ZfAMpY8j3n49QsrA&s", cat: 'energia', ico: '🌬️', nome: 'Turbina eolica (anno)', desc: 'Produzione media onshore', valore: 6000000, unità: 'kWh/anno', fatto: 'Una turbina eolica alimenta ~1.500 famiglie per un anno intero.' },
  { id: 144, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXjgagGEk-Bx1c1E6pWPt7i1r7NvF__Row7g&s", cat: 'energia', ico: '🚗', nome: 'Auto elettrica (100 km)', desc: 'Consumo energetico', valore: 15, unità: 'kWh', fatto: 'Un\'auto elettrica consuma ~15 kWh/100km; in benzina sarebbero ~1,4 litri.' },
  { id: 145, img: "https://it.pcspecialist.ch/images/landing/pcs/gaming-pc/bundle.jpg", cat: 'energia', ico: '🖥️', nome: 'PC desktop (1 giornata)', desc: '8 ore di utilizzo medio', valore: 0.48, unità: 'kWh', fatto: 'Laptop e tablet consumano 3-5× meno del PC desktop per lo stesso lavoro.' },
  { id: 146, img: "https://ardes.it/wp-content/uploads/2023/10/ARDES-AR6245PB-MAGNUS-38L-FORNO-ELETTRICO-VENTILATO-04.jpg", cat: 'energia', ico: '🍕', nome: 'Forno elettrico (1 ora)', desc: 'Consumo energetico', valore: 2, unità: 'kWh', fatto: 'Il microonde cuoce più velocemente consumando il 75% in meno del forno tradizionale.' },
  { id: 147, img: "https://mobilmarket.it/cdn/shop/products/frigorifero-liebherr-sbses-8496-mobilmarket-3_1024x.jpg?v=1645557944", cat: 'energia', ico: '❄️', nome: 'Frigorifero A+++ (anno)', desc: 'Consumo energetico', valore: 100, unità: 'kWh/anno', fatto: 'Un frigo vecchio di 15 anni consuma 3-4× di più di un modello A+++.' },
  { id: 148, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz0AcjApnrMYqcQDKnkvwxL4zjCMx-ONSUPw&s", cat: 'energia', ico: '🧺', nome: 'Lavatrice a 60°C (1 ciclo)', desc: 'Consumo energetico', valore: 1.1, unità: 'kWh', fatto: 'Lavare a 30°C invece di 60°C riduce il consumo del 40% per ciclo.' },
  { id: 149, img: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Taipei_IT_Month_LG_55EA980T_20131202.jpg", cat: 'energia', ico: '📺', nome: 'TV OLED 55" (anno, 5h/giorno)', desc: 'Consumo energetico', valore: 100, unità: 'kWh/anno', fatto: 'La tecnologia OLED consuma fino al 40% meno dei vecchi plasma.' },
  { id: 150, img: "https://www.rossitre.com/wp-content/uploads/2024/04/acciaio-composizione.png", cat: 'energia', ico: '🏭', nome: 'Produrre 1 kg di acciaio', desc: 'Energia per la produzione primaria', valore: 20, unità: 'kWh', fatto: 'L\'acciaio riciclato richiede solo 6 kWh/kg: il 70% in meno.' },
  { id: 151, img: "https://mundolatas.com/wp-content/uploads/Aluminio.jpg", cat: 'energia', ico: '🧊', nome: 'Produrre 1 kg di alluminio', desc: 'Energia per la produzione primaria', valore: 45, unità: 'kWh', fatto: 'Riciclare alluminio usa solo il 5% dell\'energia della produzione da bauxite.' },
  { id: 152, img: "https://www.gm-termoidraulica.it/modules/ph_simpleblog/covers/54.jpg", cat: 'energia', ico: '🚿', nome: 'Scalda acqua (doccia 5min)', desc: 'Consumo energetico', valore: 1.5, unità: 'kWh', fatto: 'Il riscaldamento dell\'acqua sanitaria vale il 15% dei consumi domestici.' },
  { id: 153, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-LL7-tCmWjbQlqD_zBl9Dud8r-fcFJZIcfQ&s", cat: 'energia', ico: '🚗', nome: 'Ricaricare un\'auto elettrica', desc: 'Energia per ricarica completa (60 kWh)', valore: 60, unità: 'kWh', fatto: 'Una ricarica completa equivale al consumo di ~6 giorni di un frigorifero A+++.' },
  { id: 154, img: "https://media-assets.wired.it/photos/684fd162a9be484e23bd548e/1:1/w_1200,h_1200,c_limit/Migliori%20smartwatch%20nfc%20pagamenti%20giugno%202025.jpg", cat: 'energia', ico: '⌚', nome: 'Smartwatch (1 anno)', desc: 'Consumo energetico annuo', valore: 1.3, unità: 'kWh/anno', fatto: 'Gli smartwatch sono tra i dispositivi più efficienti dal punto di vista energetico.' },
  { id: 155, img: "https://media-assets.wired.it/photos/68931f7e47c979e96cb60e05/4:3/w_1600,h_1200,c_limit/Migliori%20router%20wi-fi%20agosto%202025.jpg", cat: 'energia', ico: '📡', nome: 'Router Wi-Fi (anno)', desc: 'Consumo energetico annuo', valore: 87, unità: 'kWh/anno', fatto: 'Il router è sempre acceso: spegnerlo di notte farebbe risparmiare il 30% di energia.' },
  { id: 156, img: "https://www.studioarch.com/modules/ph_simpleblog/covers/92-thumb.jpg", cat: 'energia', ico: '🧳', nome: 'Produrre 1 valigia in policarbonato', desc: 'Energia per la produzione', valore: 80, unità: 'kWh', fatto: 'La plastica ad alta resistenza richiede processi chimici molto energivori.' },
  { id: 157, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjjxoLcA5PDKYMMtbdVMlho__A26i030f3Vg&s", cat: 'energia', ico: '🏊', nome: 'Piscina comunale (1 ora aperta)', desc: 'Consumo energetico', valore: 120, unità: 'kWh', fatto: 'Il riscaldamento dell\'acqua e la filtrazione sono le voci principali del consumo piscine.' },
  { id: 158, img: "https://helicopters.leonardo.com/o/adaptive-media/image/26408743/h_560/AW149_header_new.jpg", cat: 'energia', ico: '🚁', nome: 'Elicottero (1 ora di volo)', desc: 'Consumo energetico equivalente', valore: 250, unità: 'kWh', fatto: 'Un elicottero consuma ~250 kWh di energia equivalente per ora, 20× più di un\'auto elettrica.' },
  { id: 159, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKvH48HYPDDp7Cmh6W4IMm8BCwWKP-G9h1KQ&s", cat: 'energia', ico: '🌊', nome: 'Impianto idroelettrico (anno)', desc: 'Produzione media per MW installato', valore: 4380000, unità: 'kWh/anno', fatto: 'L\'idroelettrico produce ~4.380 MWh per MW installato: è la rinnovabile più efficiente.' },
  { id: 160, img: "https://chemgenius.pythonanywhere.com/media/articles/covers/2025/12/fissione-nucleare-lenergia-nascosta-nel-cuore-dell-71d6b065.jpeg", cat: 'energia', ico: '☢️', nome: 'Centrale nucleare (1 kg uranio)', desc: 'Energia prodotta per fissione', valore: 45000000, unità: 'kWh', fatto: '1 kg di uranio produce 45 milioni di kWh: equivalente a ~3.000 tonnellate di carbone.' },
  { id: 161, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtyythOPBz5dVBlRjaDnnVucC28cGUgHIPvw&s", cat: 'energia', ico: '🍳', nome: 'Bollitore elettrico (1 litro)', desc: 'Consumo energetico', valore: 0.1, unità: 'kWh', fatto: 'Bollire solo l\'acqua necessaria risparmia fino al 50% di energia rispetto al riempire il bollitore.' },
  { id: 162, img: "https://regalgrid.com/wp-content/uploads/2020/05/come-funzionano-i-pannelli-solari.jpg", cat: 'energia', ico: '🌅', nome: 'Pannello solare termico (anno)', desc: 'Energia termica prodotta', valore: 1500, unità: 'kWh/anno', fatto: 'Un pannello solare termico copre il 60-70% del fabbisogno di acqua calda di una famiglia.' },
  { id: 163, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2glSztb7ZSAfajhwKu5euSEdB9BEF3bLGAA&s", cat: 'energia', ico: '🚲', nome: 'E-bike (100 km)', desc: 'Consumo energetico', valore: 1, unità: 'kWh', fatto: 'La bicicletta elettrica è il mezzo motorizzato più efficiente: solo 1 kWh per 100 km.' },
  { id: 164, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVOLzmqiHZxuboaajG2vya0ksXA6q4-YwTmQ&s", cat: 'energia', ico: '🏋️', nome: 'Palestra (1 ora, struttura)', desc: 'Consumo energetico pro capite', valore: 0.8, unità: 'kWh', fatto: 'Luci, macchine cardio, aria condizionata: le palestre sono tra i luoghi più energivori.' },
];


let hlScore = 0, hlStreak = 0, hlBest = parseInt(localStorage.getItem('hl_best') || '0');
let hlUsed = new Set(), hlLeft = null, hlRight = null;
let hlWaiting = false, hlActiveCat = 'all', hlQnum = 0;
let hlLife = 3, hlMaxLife = 3;

document.getElementById('hl-best').textContent = hlBest;

document.querySelectorAll('.hl-cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.hl-cat-btn').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    hlActiveCat = btn.dataset.cat;
    hlRestart();
  });
});

function hlFiltered() {
  return hlActiveCat === 'all' ? HL_DATA : HL_DATA.filter(d => d.cat === hlActiveCat);
}

function hlRestart() {
  hlScore = 0; hlStreak = 0; hlUsed = new Set(); hlWaiting = false; hlQnum = 0; hlLife = hlMaxLife;
  document.getElementById('hl-score').textContent = '0';
  document.getElementById('hl-streak').textContent = '0';
  document.getElementById('hl-qnum').textContent = '1';
  document.getElementById('hl-go').classList.remove('show');
  document.getElementById('hl-fb').classList.remove('show', 'ok', 'no');
  document.getElementById('hl-arena').style.display = 'flex';
  document.getElementById('hl-btns').style.display = 'flex';
  hlNextRound(true);
}

function hlPick(excludeId) {
  const all = hlFiltered();
  let pool = all.filter(d => d.id !== excludeId && !hlUsed.has(d.id));
  if (pool.length === 0) {
    hlUsed.clear();
    pool = all.filter(d => d.id !== excludeId);
  }
  const pick = pool[Math.floor(Math.random() * pool.length)];
  hlUsed.add(pick.id);
  return pick;
}

function fmt(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
  if (n >= 1000) return n.toLocaleString('it-IT');
  if (n < 1) return n.toString();
  return n.toLocaleString('it-IT');
}

function setCardMedia(imgId, icoId, data) {
  const imgEl = document.getElementById(imgId);
  const icoEl = document.getElementById(icoId);
  icoEl.style.display = 'none';
  icoEl.textContent = data.ico;
  imgEl.style.opacity = '1';
  imgEl.onerror = () => {
    imgEl.style.opacity = '0';
    icoEl.style.display = 'block';
  };
  imgEl.src = data.img || '';
}

function hlNextRound(isFirst = false) {
  hlQnum++;
  document.getElementById('hl-qnum').textContent = hlQnum;
  if (isFirst) {
    hlLeft = hlPick(-1);
  } else {
    hlLeft = hlRight;
  }
  hlRight = hlPick(hlLeft.id);

  document.getElementById('hl-l-cat').textContent = catLabel(hlLeft.cat);
  setCardMedia('hl-l-img', 'hl-l-ico', hlLeft);
  document.getElementById('hl-l-name').textContent = hlLeft.nome;
  document.getElementById('hl-l-desc').textContent = hlLeft.desc;
  document.getElementById('hl-l-val').textContent = fmt(hlLeft.valore);
  document.getElementById('hl-l-unit').textContent = hlLeft.unità;

  document.getElementById('hl-r-cat').textContent = catLabel(hlRight.cat);
  setCardMedia('hl-r-img', 'hl-r-ico', hlRight);
  document.getElementById('hl-r-name').textContent = hlRight.nome;
  document.getElementById('hl-r-desc').textContent = hlRight.desc;
  document.getElementById('hl-r-val').textContent = '???';
  document.getElementById('hl-r-val').className = 'hl-hidden-val';
  document.getElementById('hl-r-unit').textContent = hlRight.unità;

  document.getElementById('hl-card-l').className = 'hl-card-wrap';
  document.getElementById('hl-card-r').className = 'hl-card-wrap';
  document.getElementById('hl-fb').className = 'hl-feedback';

  document.getElementById('hl-high').disabled = false;
  document.getElementById('hl-low').disabled = false;
  hlWaiting = false;
}

function catLabel(c) {
  return { co2: '💨 CO₂', decomp: '⏳ Decomposizione', riciclo: '♻️ Riciclo', acqua: '💧 Acqua', energia: '⚡ Energia' }[c] || c;
}

function guess(dir) {
  if (hlWaiting) return;
  hlWaiting = true;
  document.getElementById('hl-high').disabled = true;
  document.getElementById('hl-low').disabled = true;

  const rValEl = document.getElementById('hl-r-val');
  rValEl.textContent = fmt(hlRight.valore);
  rValEl.className = 'hl-value';

  const correct = dir === 'high' ? hlRight.valore >= hlLeft.valore
    : hlRight.valore <= hlLeft.valore;
  const equal = hlRight.valore === hlLeft.valore;

  if (correct) {
    hlStreak++;
    const pts = 10 + Math.min(hlStreak - 1, 5) * 5;
    hlScore += pts;
    document.getElementById('hl-score').textContent = hlScore;
    document.getElementById('hl-streak').textContent = hlStreak;
    if (hlScore > hlBest) { hlBest = hlScore; localStorage.setItem('hl_best', hlBest); document.getElementById('hl-best').textContent = hlBest; }

    document.getElementById('hl-card-r').classList.add('correct');
    const fb = document.getElementById('hl-fb');
    fb.className = 'hl-feedback show ok';
    document.getElementById('hl-fb-ico').textContent = equal ? '🟰' : '✅';
    document.getElementById('hl-fb-msg').textContent = equal
      ? `Pari! Entrambi ${fmt(hlLeft.valore)} ${hlLeft.unità} — +${pts} punti!`
      : `Corretto! +${pts} punti${hlStreak >= 3 ? ' 🔥 Serie ×' + hlStreak : ''}`;
    document.getElementById('hl-fb-fact').textContent = hlRight.fatto;

    if (hlStreak >= 3 && hlStreak % 3 === 0) showStreakPop(hlStreak);
    setTimeout(() => hlNextRound(), 2200);
  } else {
    hlStreak = 0;
    document.getElementById('hl-streak').textContent = '0';
    document.getElementById('hl-card-r').classList.add('wrong');
    const fb = document.getElementById('hl-fb');
    fb.className = 'hl-feedback show no';
    document.getElementById('hl-fb-ico').textContent = '❌';
    document.getElementById('hl-fb-msg').textContent = `Sbagliato! ${hlRight.nome} = ${fmt(hlRight.valore)} ${hlRight.unità}`;
    document.getElementById('hl-fb-fact').textContent = hlRight.fatto;
    setTimeout(() => hlGameOver(), 2400);
  }
}

function hlGameOver() {
  document.getElementById('hl-arena').style.display = 'none';
  document.getElementById('hl-btns').style.display = 'none';
  document.getElementById('hl-fb').className = 'hl-feedback';
  document.getElementById('hl-go-score').textContent = hlScore;

  const badges = [];
  if (hlScore >= 200) badges.push('🏆 Esperto Eco');
  if (hlScore >= 100) badges.push('🌿 Verde Avanzato');
  if (hlQnum >= 10) badges.push('🎯 Resistente');
  if (hlBest === hlScore && hlScore > 0) badges.push('🥇 Nuovo Record!');
  document.getElementById('hl-go-badges').innerHTML = badges.map(b => `<div class="hl-badge">${b}</div>`).join('');

  document.getElementById('hl-go').classList.add('show');
}

function showStreakPop(n) {
  const el = document.createElement('div');
  el.className = 'streak-pop';
  el.textContent = `🔥 SERIE ×${n} — OTTIMO!`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 950);
}

hlNextRound(true);
