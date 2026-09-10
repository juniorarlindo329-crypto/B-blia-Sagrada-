
const BIBLE_BASE = "https://raw.githubusercontent.com/midvash/bible-data/main/versions/pt/almeida-livre/books/";

const BOOKS = {
  old:[
    ["Gênesis","Gen"],["Êxodo","Exod"],["Levítico","Lev"],["Números","Num"],["Deuteronômio","Deut"],
    ["Josué","Josh"],["Juízes","Judg"],["Rute","Ruth"],["1 Samuel","1Sam"],["2 Samuel","2Sam"],
    ["1 Reis","1Kgs"],["2 Reis","2Kgs"],["1 Crônicas","1Chr"],["2 Crônicas","2Chr"],["Esdras","Ezra"],
    ["Neemias","Neh"],["Ester","Esth"],["Jó","Job"],["Salmos","Ps"],["Provérbios","Prov"],
    ["Eclesiastes","Eccl"],["Cânticos","Song"],["Isaías","Isa"],["Jeremias","Jer"],["Lamentações","Lam"],
    ["Ezequiel","Ezek"],["Daniel","Dan"],["Oséias","Hos"],["Joel","Joel"],["Amós","Amos"],
    ["Obadias","Obad"],["Jonas","Jonah"],["Miquéias","Mic"],["Naum","Nah"],["Habacuque","Hab"],
    ["Sofonias","Zeph"],["Ageu","Hag"],["Zacarias","Zech"],["Malaquias","Mal"]
  ],
  new:[
    ["Mateus","Matt"],["Marcos","Mark"],["Lucas","Luke"],["João","John"],["Atos","Acts"],
    ["Romanos","Rom"],["1 Coríntios","1Cor"],["2 Coríntios","2Cor"],["Gálatas","Gal"],["Efésios","Eph"],
    ["Filipenses","Phil"],["Colossenses","Col"],["1 Tessalonicenses","1Thess"],["2 Tessalonicenses","2Thess"],
    ["1 Timóteo","1Tim"],["2 Timóteo","2Tim"],["Tito","Titus"],["Filemom","Phlm"],["Hebreus","Heb"],
    ["Tiago","Jas"],["1 Pedro","1Pet"],["2 Pedro","2Pet"],["1 João","1John"],["2 João","2John"],
    ["3 João","3John"],["Judas","Jude"],["Apocalipse","Rev"]
  ]
};

const NAME_BY_CODE = Object.fromEntries([...BOOKS.old,...BOOKS.new].map(([name,code])=>[code,name]));

/* Meditações especiais já escritas para algumas passagens.
   Nos demais versículos o app mostra uma meditação guiada, sem alterar o texto bíblico. */
const SPECIAL_MEDITATIONS = {
  "Phil-4-13":{
    meditation:"Este versículo aponta para uma força que não depende apenas das nossas próprias capacidades. Em momentos de dificuldade, a fé nos ajuda a continuar com coragem, reconhecendo que Deus pode nos sustentar no caminho.",
    reflect:"Em qual área da sua vida você precisa de força para continuar hoje?",
    prayer:"Senhor, fortalece meu coração e ajuda-me a caminhar com fé, sabedoria e perseverança. Amém."
  },
  "Ps-23-1":{
    meditation:"A figura do pastor transmite cuidado, direção e presença. Este versículo convida a confiar que Deus conhece nossas necessidades e pode nos guiar mesmo quando não conseguimos enxergar todo o caminho.",
    reflect:"Que preocupação você pode entregar aos cuidados de Deus hoje?",
    prayer:"Senhor, guia os meus passos e ensina-me a descansar no teu cuidado. Amém."
  },
  "Matt-11-28":{
    meditation:"Jesus acolhe quem chega cansado. A fé não exige que escondamos nossos limites; ela nos convida a levar a Deus aquilo que pesa no coração e encontrar nele descanso para recomeçar.",
    reflect:"Qual peso você precisa colocar diante de Deus neste momento?",
    prayer:"Jesus, recebe minhas preocupações, renova minhas forças e dá descanso ao meu coração. Amém."
  },
  "Jer-29-11":{
    meditation:"Nem sempre entendemos a fase que estamos vivendo. Este texto nos chama a lembrar que o futuro não está limitado ao que vemos hoje e que a esperança pode permanecer mesmo em tempos de incerteza.",
    reflect:"Você consegue manter a esperança mesmo sem saber exatamente como tudo vai acontecer?",
    prayer:"Deus, ajuda-me a confiar em ti quando o futuro parecer incerto e dá-me paz para viver um dia de cada vez. Amém."
  },
  "Prov-3-5":{
    meditation:"Confiar em Deus não significa deixar de pensar ou planejar, mas reconhecer que nossa visão é limitada. Há momentos em que precisamos fazer nossa parte e, ao mesmo tempo, entregar a Deus aquilo que não conseguimos controlar.",
    reflect:"Existe alguma situação em que você está tentando controlar tudo sozinho?",
    prayer:"Senhor, dá-me sabedoria para agir e humildade para confiar em ti naquilo que não posso controlar. Amém."
  },
  "Isa-41-10":{
    meditation:"O medo pode fazer parecer que estamos sozinhos diante dos problemas. Este versículo nos convida a recordar a presença de Deus e a buscar coragem para dar o próximo passo, mesmo que seja pequeno.",
    reflect:"Qual medo está impedindo você de avançar?",
    prayer:"Deus, fica comigo nos meus medos e dá-me coragem para seguir com confiança. Amém."
  },
  "Ps-46-1":{
    meditation:"Em tempos de pressão, precisamos de um lugar seguro. O salmista descreve Deus como refúgio e força, lembrando-nos de que podemos buscar nele estabilidade quando as circunstâncias parecem agitadas.",
    reflect:"Onde você costuma procurar segurança quando tudo parece difícil?",
    prayer:"Senhor, sê meu refúgio nos dias difíceis e firma meu coração em tua presença. Amém."
  },
  "Rom-8-28":{
    meditation:"Nem tudo o que acontece é bom, mas este versículo aponta para a esperança de que Deus pode trabalhar até mesmo em circunstâncias difíceis, produzindo aprendizado, amadurecimento e novos caminhos.",
    reflect:"Existe alguma experiência difícil da qual você já conseguiu tirar um aprendizado?",
    prayer:"Deus, ajuda-me a confiar que tu podes produzir algo bom mesmo em meio às situações que eu não entendo. Amém."
  },
  "John-3-16":{
    meditation:"Este texto resume de forma marcante a mensagem do amor de Deus. Ele nos lembra de um amor que se oferece, acolhe e chama para uma vida de fé.",
    reflect:"Como você pode demonstrar amor de forma prática a alguém hoje?",
    prayer:"Deus, obrigado pelo teu amor. Ensina-me a receber esse amor e também a compartilhá-lo. Amém."
  },
  "Ps-119-105":{
    meditation:"Uma lâmpada não mostra toda a estrada de uma vez; ela ilumina o próximo trecho. Assim também a Palavra pode nos orientar passo a passo nas decisões e atitudes do dia a dia.",
    reflect:"Qual é o próximo passo que você precisa tomar com sabedoria?",
    prayer:"Senhor, ilumina minhas decisões e ajuda-me a caminhar de acordo com aquilo que é bom e verdadeiro. Amém."
  },
  "2Cor-5-7":{
    meditation:"A fé nos ensina a não limitar nossas escolhas somente ao que está visível no momento. Há períodos em que avançar significa confiar, perseverar e manter os valores mesmo sem garantias imediatas.",
    reflect:"Em qual área você precisa continuar caminhando mesmo sem enxergar o resultado final?",
    prayer:"Deus, dá-me fé para continuar e sabedoria para não desistir diante das incertezas. Amém."
  },
  "Phil-4-6":{
    meditation:"A inquietação pode ocupar nossa mente com possibilidades e preocupações. Este texto nos convida a transformar preocupação em oração, levando a Deus aquilo que está além das nossas forças.",
    reflect:"Qual preocupação você pode transformar em oração agora?",
    prayer:"Senhor, recebe minhas preocupações e dá-me serenidade para lidar com aquilo que está diante de mim. Amém."
  }
};

const DAILY_REFS = [
  ["Phil",4,13],["Ps",23,1],["Matt",11,28],["Jer",29,11],["Prov",3,5],["Isa",41,10],
  ["Ps",46,1],["Rom",8,28],["John",3,16],["Ps",119,105],["2Cor",5,7],["Phil",4,6]
];

const state = {
  page:"home",
  testament:"old",
  selectedBookCode:null,
  selectedChapter:null,
  selectedVerse:null,
  selectedPassage:null,
  selectedVerseNumbers:[],
  chapterMode:"select",
  currentChapterVerses:[],
  bookCache:new Map(),
  fullFavorites:JSON.parse(localStorage.getItem("bs-full-favorites")||"[]"),
  dark:localStorage.getItem("bs-dark")==="1",
  readToday:localStorage.getItem("bs-read-date")==new Date().toDateString()
};

const content = document.getElementById("content");
const pageTitle = document.getElementById("pageTitle");
const themeBtn = document.getElementById("themeBtn");
const installBtn = document.getElementById("installBtn");
const toastEl = document.getElementById("toast");
let deferredPrompt = null;

if(state.dark) document.body.classList.add("dark");
themeBtn.textContent = state.dark ? "☀" : "☾";
setTimeout(()=>document.getElementById("splash")?.classList.add("hide"),750);

window.addEventListener("beforeinstallprompt",(e)=>{
  e.preventDefault();
  deferredPrompt=e;
  installBtn.classList.remove("hidden");
});
installBtn.addEventListener("click",async()=>{
  if(!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt=null;
  installBtn.classList.add("hidden");
});
themeBtn.addEventListener("click",toggleTheme);
document.querySelectorAll(".nav-item").forEach(btn=>btn.addEventListener("click",()=>setPage(btn.dataset.page)));

function toast(msg){
  toastEl.textContent=msg;
  toastEl.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer=setTimeout(()=>toastEl.classList.remove("show"),1900);
}

function setPage(page){
  state.page=page;
  state.selectedBookCode=null;
  state.selectedChapter=null;
  state.selectedVerse=null;
  state.selectedPassage=null;
  state.selectedVerseNumbers=[];
  state.chapterMode="select";
  state.currentChapterVerses=[];
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
  render();
}

function toggleTheme(){
  state.dark=!state.dark;
  document.body.classList.toggle("dark",state.dark);
  localStorage.setItem("bs-dark",state.dark?"1":"0");
  themeBtn.textContent=state.dark?"☀":"☾";
}

function refId(code,chapter,verse){ return `${code}-${chapter}-${verse}`; }

async function fetchBook(code){
  if(state.bookCache.has(code)) return state.bookCache.get(code);
  const response = await fetch(`${BIBLE_BASE}${code}.json`, {cache:"force-cache"});
  if(!response.ok) throw new Error("Falha ao carregar livro");
  const data = await response.json();
  state.bookCache.set(code,data);
  return data;
}

function getFavorite(id){ return state.fullFavorites.find(x=>x.id===id); }

function toggleFullFavorite(code,bookName,chapter,verse,text){
  const id=refId(code,chapter,verse);
  if(getFavorite(id)){
    state.fullFavorites=state.fullFavorites.filter(x=>x.id!==id);
    toast("Removido dos favoritos");
  }else{
    state.fullFavorites.unshift({id,code,bookName,chapter,verse,text});
    toast("Versículo salvo");
  }
  localStorage.setItem("bs-full-favorites",JSON.stringify(state.fullFavorites.slice(0,300)));
  if(state.page==="bible") renderBible();
  else if(state.page==="verse") renderVerse();
  else if(state.page==="favorites") renderFavorites();
}

async function getVerse(code,chapter,verse){
  const book = await fetchBook(code);
  const ch = book.chapters.find(c=>Number(c.chapter)===Number(chapter));
  const v = ch?.verses.find(v=>Number(v.number)===Number(verse));
  if(!v) throw new Error("Versículo não encontrado");
  return {code,bookName:NAME_BY_CODE[code]||code,chapter:Number(chapter),verse:Number(verse),text:v.text};
}

async function openDailyVerse(){
  const d=new Date();
  const seed=d.getFullYear()*372+(d.getMonth()+1)*31+d.getDate();
  const [code,ch,v]=DAILY_REFS[seed%DAILY_REFS.length];
  showLoading("Carregando o versículo do dia...");
  try{
    const verse=await getVerse(code,ch,v);
    openVerseObject(verse);
  }catch(e){
    toast("Não foi possível carregar. Confira sua internet.");
    renderHome();
  }
}

function openVerseObject(verse){
  state.selectedVerse=verse;
  state.page="verse";
  localStorage.setItem("bs-read-date",new Date().toDateString());
  state.readToday=true;
  render();
}

function openVerseFromBible(code,chapter,verse,text){
  openVerseObject({code,bookName:NAME_BY_CODE[code]||code,chapter:Number(chapter),verse:Number(verse),text});
}

function guidedMeditation(verse){
  const special=SPECIAL_MEDITATIONS[verse.id || refId(verse.code,verse.chapter,verse.verse)];
  if(special) return {...special,special:true};
  return {
    meditation:"Leia este versículo novamente, com calma. Observe a palavra ou frase que mais chama sua atenção. Pense no que o texto revela, no que ele desperta em você e em qual atitude concreta pode nascer dessa leitura hoje.",
    reflect:"O que este versículo convida você a lembrar, praticar ou entregar a Deus hoje?",
    prayer:"Senhor, ajuda-me a compreender tua Palavra com sabedoria e a colocá-la em prática na minha vida. Amém.",
    special:false
  };
}

async function openBook(code){
  state.selectedBookCode=code;
  state.selectedChapter=null;
  await renderBible();
}

async function openChapter(chapter){
  state.selectedChapter=Number(chapter);
  state.selectedVerseNumbers=[];
  state.chapterMode="select";
  state.currentChapterVerses=[];
  await renderBible();
}

function showLoading(text="Carregando..."){
  content.innerHTML=`<div class="empty"><span class="spinner"></span><br><br>${text}</div>`;
}

function getCurrentVerse(number){
  return state.currentChapterVerses.find(v=>Number(v.number)===Number(number));
}

function toggleVerseSelection(number){
  number=Number(number);
  if(state.selectedVerseNumbers.includes(number)){
    state.selectedVerseNumbers=state.selectedVerseNumbers.filter(n=>n!==number);
  }else{
    state.selectedVerseNumbers=[...state.selectedVerseNumbers,number].sort((a,b)=>a-b);
  }
  renderVersePicker();
}

function selectAllVerses(){
  state.selectedVerseNumbers=state.currentChapterVerses.map(v=>Number(v.number));
  renderVersePicker();
}

function clearVerseSelection(){
  state.selectedVerseNumbers=[];
  renderVersePicker();
}

function selectionLabel(){
  const n=state.selectedVerseNumbers.length;
  return n===0 ? "Nenhum selecionado" : `${n} versículo${n===1?"":"s"} selecionado${n===1?"":"s"}`;
}

function verseSelectionChip(v){
  const selected=state.selectedVerseNumbers.includes(Number(v.number));
  return `<button class="verse-pick ${selected?"selected":""}" onclick="toggleVerseSelection(${v.number})">
    <span>${v.number}</span>
    ${selected?'<small>✓</small>':""}
  </button>`;
}

function renderVersePicker(){
  const code=state.selectedBookCode;
  const bookName=NAME_BY_CODE[code]||code;
  const count=state.selectedVerseNumbers.length;
  pageTitle.textContent=`${bookName} ${state.selectedChapter}`;
  content.innerHTML=`
    <div class="chapter-header">
      <div>
        <span class="eyebrow">ESCOLHA OS VERSÍCULOS</span>
        <h2>${bookName} ${state.selectedChapter}</h2>
        <div class="small">${selectionLabel()}</div>
      </div>
      <button class="btn-ghost" onclick="state.selectedChapter=null;state.selectedVerseNumbers=[];renderBible()">Capítulos</button>
    </div>

    <div class="selection-help">
      <strong>Toque nos números que você quer ler ou meditar.</strong>
      <span>Você pode escolher um versículo, vários versículos ou o capítulo inteiro.</span>
    </div>

    <div class="verse-picker-grid">
      ${state.currentChapterVerses.map(verseSelectionChip).join("")}
    </div>

    <div class="selection-actions">
      <button class="mini-btn" onclick="selectAllVerses()">Selecionar todos</button>
      <button class="mini-btn" onclick="clearVerseSelection()">Limpar</button>
    </div>

    <div class="selected-summary ${count?"has-selection":""}">
      <div>
        <strong>${selectionLabel()}</strong>
        <div class="small">${count ? "Agora escolha o que deseja fazer." : "Marque os números acima."}</div>
      </div>
    </div>

    <div class="selection-main-actions">
      <button class="btn-primary" ${!count?"disabled":""} onclick="readSelectedVerses()">📖 Ler selecionados</button>
      <button class="btn-primary meditation-action" ${!count?"disabled":""} onclick="meditateSelectedVerses()">☀ Meditar selecionados</button>
      <button class="btn-ghost full-chapter-action" onclick="readWholeChapter()">Ler capítulo inteiro</button>
    </div>

    <div class="bible-credit">Texto bíblico: Bíblia Livre (BLIVRE). A meditação é conteúdo separado do aplicativo.</div>`;
}

function readSelectedVerses(){
  if(!state.selectedVerseNumbers.length){toast("Escolha pelo menos um versículo");return;}
  state.chapterMode="read";
  renderBible();
}

function readWholeChapter(){
  state.selectedVerseNumbers=state.currentChapterVerses.map(v=>Number(v.number));
  state.chapterMode="read";
  renderBible();
}

function buildSelectedPassage(){
  const code=state.selectedBookCode;
  const bookName=NAME_BY_CODE[code]||code;
  return state.currentChapterVerses
    .filter(v=>state.selectedVerseNumbers.includes(Number(v.number)))
    .map(v=>({
      id:refId(code,state.selectedChapter,v.number),
      code,
      bookName,
      chapter:Number(state.selectedChapter),
      verse:Number(v.number),
      text:v.text
    }));
}

function meditateSelectedVerses(){
  if(!state.selectedVerseNumbers.length){toast("Escolha pelo menos um versículo");return;}
  state.selectedPassage=buildSelectedPassage();
  state.page="passage";
  localStorage.setItem("bs-read-date",new Date().toDateString());
  state.readToday=true;
  render();
}

function openVerseByNumber(number){
  const v=getCurrentVerse(number);
  if(!v) return;
  openVerseObject({
    code:state.selectedBookCode,
    bookName:NAME_BY_CODE[state.selectedBookCode]||state.selectedBookCode,
    chapter:Number(state.selectedChapter),
    verse:Number(v.number),
    text:v.text
  });
}

function toggleFavoriteByNumber(number){
  const v=getCurrentVerse(number);
  if(!v) return;
  toggleFullFavorite(
    state.selectedBookCode,
    NAME_BY_CODE[state.selectedBookCode]||state.selectedBookCode,
    Number(state.selectedChapter),
    Number(v.number),
    v.text
  );
}

function fullVerseRow(code,bookName,chapter,v){
  const id=refId(code,chapter,v.number);
  const liked=!!getFavorite(id);
  return `<article class="bible-verse">
    <div class="bible-verse-line">
      <button class="verse-number-btn" onclick="openVerseByNumber(${v.number})">${v.number}</button>
      <div class="bible-verse-text">${escapeHtml(v.text)}</div>
    </div>
    <div class="verse-tools">
      <button class="verse-tool" onclick="openVerseByNumber(${v.number})">☀ Meditar este</button>
      <button class="verse-tool" onclick="toggleFavoriteByNumber(${v.number})">${liked?"♥ Salvo":"♡ Salvar"}</button>
    </div>
  </article>`;
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}

async function renderHome(){
  pageTitle.textContent="Início";
  content.innerHTML=`
    <section class="hero">
      <div class="hero-kicker">✦ Bíblia + Meditação</div>
      <h2>Uma palavra para fortalecer o seu dia.</h2>
      <p>Agora você pode abrir os 66 livros, escolher o capítulo e ler os versículos dentro da Bíblia.</p>
      <div class="hero-buttons">
        <button class="btn-primary" onclick="openDailyVerse()">Versículo do dia</button>
        <button class="btn-secondary" onclick="setPage('bible')">Abrir Bíblia</button>
      </div>
    </section>

    <div class="section-head"><h2>Bíblia completa</h2><span>66 livros • 1.189 capítulos</span></div>
    <section class="quick-grid">
      <div class="quick-card" onclick="setPage('bible')"><div class="icon">📖</div><h3>Ler a Bíblia</h3><p>Escolha livro, capítulo e versículo.</p></div>
      <div class="quick-card" onclick="setPage('favorites')"><div class="icon">❤️</div><h3>Favoritos</h3><p>Guarde passagens importantes.</p></div>
      <div class="quick-card" onclick="setPage('search')"><div class="icon">🔎</div><h3>Buscar referência</h3><p>Abra rapidamente uma passagem.</p></div>
      <div class="quick-card" onclick="showPrayerInfo()"><div class="icon">🙏</div><h3>Meditar</h3><p>Reflexão e oração em cada versículo.</p></div>
    </section>

    <div class="section-head"><h2>Seu momento com Deus</h2><span>${state.readToday?"Leitura feita hoje ✓":"Comece hoje"}</span></div>
    <div class="progress-card">
      <div class="progress-ring"><span>${state.readToday?"100%":"72%"}</span></div>
      <div>
        <strong>${state.readToday?"Leitura de hoje concluída":"Reserve alguns minutos"}</strong>
        <div class="small" style="margin-top:5px">${state.readToday?"Volte amanhã para uma nova leitura.":"Escolha um capítulo e leia com calma."}</div>
      </div>
    </div>
  `;
}

async function renderBible(){
  pageTitle.textContent="Bíblia";

  if(!state.selectedBookCode){
    const list=BOOKS[state.testament];
    content.innerHTML=`
      <div class="tabs">
        <button class="tab ${state.testament==="old"?"active":""}" onclick="state.testament='old';renderBible()">Antigo Testamento</button>
        <button class="tab ${state.testament==="new"?"active":""}" onclick="state.testament='new';renderBible()">Novo Testamento</button>
      </div>
      <div class="book-list">
        ${list.map(([name,code])=>`
          <button class="book-btn" onclick="openBook('${code}')">
            <span class="book-meta"><span class="book-letter">${name.replace(/[0-9 ]/g,"").charAt(0)}</span><strong>${name}</strong></span>
            <span class="muted">›</span>
          </button>`).join("")}
      </div>
      <div class="bible-credit">Escolha um livro, depois um capítulo e os versículos que deseja ler ou meditar.</div>`;
    return;
  }

  const code=state.selectedBookCode;
  const bookName=NAME_BY_CODE[code]||code;
  showLoading(`Abrindo ${bookName}...`);

  try{
    const book=await fetchBook(code);

    if(!state.selectedChapter){
      content.innerHTML=`
        <div class="chapter-header">
          <div><span class="eyebrow">ESCOLHA O CAPÍTULO</span><h2>${bookName}</h2><div class="small">${book.chapters.length} capítulo${book.chapters.length===1?"":"s"}</div></div>
          <button class="btn-ghost" onclick="state.selectedBookCode=null;state.selectedChapter=null;renderBible()">Livros</button>
        </div>
        <div class="chapter-grid">
          ${book.chapters.map(ch=>`<button class="chapter-btn" onclick="openChapter(${ch.chapter})">${ch.chapter}</button>`).join("")}
        </div>
        <div class="bible-credit">Depois de escolher o capítulo, você poderá marcar exatamente quais versículos quer ler ou meditar.</div>`;
      return;
    }

    const ch=book.chapters.find(c=>Number(c.chapter)===Number(state.selectedChapter));
    if(!ch) throw new Error("Capítulo não encontrado");

    state.currentChapterVerses=ch.verses;

    if(state.chapterMode==="select"){
      renderVersePicker();
      return;
    }

    const prev=state.selectedChapter>1?state.selectedChapter-1:null;
    const next=state.selectedChapter<book.chapters.length?state.selectedChapter+1:null;
    const chosen = state.selectedVerseNumbers.length
      ? ch.verses.filter(v=>state.selectedVerseNumbers.includes(Number(v.number)))
      : ch.verses;

    content.innerHTML=`
      <div class="reading-toolbar">
        <button class="btn-ghost" onclick="state.chapterMode='select';renderBible()">‹ Escolher</button>
        <div class="reading-title">
          <strong>${bookName} ${state.selectedChapter}</strong>
          <span>${chosen.length} de ${ch.verses.length} versículos</span>
        </div>
        <button class="btn-ghost" onclick="state.selectedChapter=null;state.selectedVerseNumbers=[];state.chapterMode='select';renderBible()">Capítulos</button>
      </div>

      <div class="chosen-passage-banner">
        <div>
          <strong>Passagem escolhida</strong>
          <span>${chosen.length===ch.verses.length ? "Capítulo inteiro" : chosen.map(v=>v.number).join(", ")}</span>
        </div>
        <button class="mini-btn" onclick="meditateCurrentReading()">☀ Meditar</button>
      </div>

      <section class="bible-reading">
        ${chosen.map(v=>fullVerseRow(code,bookName,state.selectedChapter,v)).join("")}
      </section>

      <div class="reading-bottom-actions">
        <button class="btn-primary" onclick="meditateCurrentReading()">☀ Meditar nesses versículos</button>
        <button class="btn-ghost" onclick="state.chapterMode='select';renderBible()">Alterar versículos</button>
      </div>

      <div class="chapter-nav bottom-chapter-nav">
        <button class="mini-btn" ${!prev?"disabled":""} onclick="${prev?`openChapter(${prev})`:""}">‹ Capítulo anterior</button>
        <button class="mini-btn" ${!next?"disabled":""} onclick="${next?`openChapter(${next})`:""}">Próximo capítulo ›</button>
      </div>
      <div class="bible-credit">Texto bíblico: Bíblia Livre (BLIVRE).</div>`;
  }catch(e){
    content.innerHTML=`<div class="empty"><span class="big">📡</span><strong>Não foi possível carregar ${bookName}</strong><br><br><span class="small">Confira sua conexão com a internet e tente novamente.</span><br><br><button class="btn-primary" onclick="renderBible()">Tentar novamente</button></div>`;
  }
}

function meditateCurrentReading(){
  if(!state.selectedVerseNumbers.length){
    state.selectedVerseNumbers=state.currentChapterVerses.map(v=>Number(v.number));
  }
  meditateSelectedVerses();
}

function renderVerse(){
  const v=state.selectedVerse;
  if(!v){setPage("home");return;}
  pageTitle.textContent=`${v.bookName} ${v.chapter}`;
  const id=refId(v.code,v.chapter,v.verse);
  const med=guidedMeditation({...v,id});
  const liked=!!getFavorite(id);
  content.innerHTML=`
    <article class="verse-card">
      <div class="reference"><span class="reference-badge">${v.verse}</span>${v.bookName} ${v.chapter}:${v.verse}</div>
      <div class="verse-text">“${escapeHtml(v.text)}”</div>
      <div class="small">Bíblia Livre (BLIVRE)</div>
      <div class="card-actions">
        <button class="btn-ghost" onclick="toggleFullFavorite('${v.code}',${JSON.stringify(v.bookName)},${v.chapter},${v.verse},${JSON.stringify(v.text).replace(/"/g,'&quot;')})">${liked?"♥ Salvo":"♡ Favoritar"}</button>
        <button class="btn-ghost" onclick="shareCurrentVerse()">↗ Compartilhar</button>
      </div>
    </article>

    <section class="meditation-card">
      <h3>📖 ${med.special?"Meditação":"Meditação guiada"}</h3>
      <p>${med.meditation}</p>
      <div class="reflect-box">
        <strong>💡 Para refletir</strong>
        <p style="margin-top:7px">${med.reflect}</p>
      </div>
    </section>

    <section class="meditation-card">
      <h3>🙏 Oração</h3>
      <div class="prayer-box">${med.prayer}</div>
    </section>

    <div class="card-actions">
      <button class="btn-primary" onclick="backToChapter()">Voltar ao capítulo</button>
      <button class="btn-ghost" onclick="setPage('bible')">Escolher outro livro</button>
    </div>`;
}

async function backToChapter(){
  const v=state.selectedVerse;
  state.page="bible";
  state.selectedBookCode=v.code;
  state.selectedChapter=v.chapter;
  state.selectedVerse=null;
  await renderBible();
}

function shareCurrentVerse(){
  const v=state.selectedVerse;
  if(!v) return;
  const text=`${v.bookName} ${v.chapter}:${v.verse}\n“${v.text}”\n\nBíblia Sagrada • Palavra Viva`;
  if(navigator.share) navigator.share({title:"Bíblia Sagrada",text}).catch(()=>{});
  else if(navigator.clipboard){navigator.clipboard.writeText(text);toast("Texto copiado");}
}


function renderPassageMeditation(){
  const passage=state.selectedPassage||[];
  if(!passage.length){setPage("bible");return;}

  const first=passage[0];
  const last=passage[passage.length-1];
  const isSingle=passage.length===1;
  const reference=isSingle
    ? `${first.bookName} ${first.chapter}:${first.verse}`
    : `${first.bookName} ${first.chapter}:${first.verse}-${last.verse}`;

  let meditation, reflect, prayer, heading;
  if(isSingle){
    const med=guidedMeditation(first);
    meditation=med.meditation;
    reflect=med.reflect;
    prayer=med.prayer;
    heading=med.special?"Meditação":"Meditação guiada";
  }else{
    heading="Meditação da passagem";
    meditation=`Você escolheu ${passage.length} versículos para meditar juntos. Leia a passagem mais uma vez devagar e observe a ideia que se repete, a promessa, o ensinamento ou o chamado que mais toca você. Não tente absorver tudo de uma vez: escolha uma verdade desta passagem para levar para o seu dia.`;
    reflect="O que esses versículos, lidos juntos, mostram a você e qual atitude prática você pode tomar a partir deles?";
    prayer="Senhor, ajuda-me a compreender esta passagem com sabedoria. Mostra-me o que preciso guardar no coração e dá-me força para viver a tua Palavra. Amém.";
  }

  pageTitle.textContent="Meditação";
  content.innerHTML=`
    <div class="passage-reference-card">
      <span class="eyebrow">PASSAGEM ESCOLHIDA</span>
      <h2>${reference}</h2>
      <div class="selected-passage-verses">
        ${passage.map(v=>`
          <div class="selected-passage-verse">
            <span>${v.verse}</span>
            <p>${escapeHtml(v.text)}</p>
          </div>`).join("")}
      </div>
    </div>

    <section class="meditation-card">
      <h3>☀ ${heading}</h3>
      <p>${meditation}</p>
      <div class="reflect-box">
        <strong>💡 Para refletir</strong>
        <p style="margin-top:7px">${reflect}</p>
      </div>
    </section>

    <section class="meditation-card">
      <h3>🙏 Oração</h3>
      <div class="prayer-box">${prayer}</div>
    </section>

    <div class="reading-bottom-actions">
      <button class="btn-primary" onclick="shareSelectedPassage()">↗ Compartilhar passagem</button>
      <button class="btn-ghost" onclick="backToSelectedChapter()">Voltar aos versículos</button>
      <button class="btn-ghost" onclick="chooseVersesAgain()">Escolher outros versículos</button>
    </div>`;
}

function shareSelectedPassage(){
  const passage=state.selectedPassage||[];
  if(!passage.length) return;
  const first=passage[0], last=passage[passage.length-1];
  const ref=passage.length===1
    ? `${first.bookName} ${first.chapter}:${first.verse}`
    : `${first.bookName} ${first.chapter}:${first.verse}-${last.verse}`;
  const verses=passage.map(v=>`${v.verse}. ${v.text}`).join("\n");
  const text=`${ref}\n\n${verses}\n\nBíblia Sagrada • Palavra Viva`;
  if(navigator.share) navigator.share({title:"Bíblia Sagrada",text}).catch(()=>{});
  else if(navigator.clipboard){navigator.clipboard.writeText(text);toast("Passagem copiada");}
}

function backToSelectedChapter(){
  const passage=state.selectedPassage||[];
  if(!passage.length){setPage("bible");return;}
  state.page="bible";
  state.selectedBookCode=passage[0].code;
  state.selectedChapter=passage[0].chapter;
  state.selectedVerse=null;
  state.chapterMode="read";
  renderBible();
}

function chooseVersesAgain(){
  const passage=state.selectedPassage||[];
  if(!passage.length){setPage("bible");return;}
  state.page="bible";
  state.selectedBookCode=passage[0].code;
  state.selectedChapter=passage[0].chapter;
  state.selectedVerse=null;
  state.chapterMode="select";
  renderBible();
}

function renderSearch(){
  pageTitle.textContent="Buscar";
  content.innerHTML=`
    <div class="panel reference-search">
      <h3>Buscar por referência</h3>
      <p class="small">Escolha o livro e digite capítulo e versículo.</p>
      <select id="refBook" class="field">
        ${[...BOOKS.old,...BOOKS.new].map(([n,c])=>`<option value="${c}">${n}</option>`).join("")}
      </select>
      <div class="field-row">
        <input id="refChapter" class="field" inputmode="numeric" placeholder="Capítulo">
        <input id="refVerse" class="field" inputmode="numeric" placeholder="Versículo">
      </div>
      <button class="btn-primary full-btn" onclick="searchReference()">Abrir passagem</button>
    </div>
    <div class="empty search-hint"><span class="big">⌕</span>Exemplo: João 3:16</div>`;
}

async function searchReference(){
  const code=document.getElementById("refBook").value;
  const chapter=Number(document.getElementById("refChapter").value);
  const verse=Number(document.getElementById("refVerse").value);
  if(!chapter||!verse){toast("Digite capítulo e versículo");return;}
  showLoading("Buscando passagem...");
  try{
    const v=await getVerse(code,chapter,verse);
    openVerseObject(v);
  }catch(e){
    toast("Referência não encontrada");
    renderSearch();
  }
}

function renderFavorites(){
  pageTitle.textContent="Salvos";
  content.innerHTML=state.fullFavorites.length
    ? state.fullFavorites.map(v=>`
      <article class="verse-card">
        <div class="reference">${v.bookName} ${v.chapter}:${v.verse}</div>
        <div class="verse-body" style="margin-top:10px">${escapeHtml(v.text)}</div>
        <div class="card-actions">
          <button class="btn-primary" onclick="openVerseObject(${escapeAttrObject(v)})">Meditar</button>
          <button class="btn-ghost" onclick="toggleFullFavorite('${v.code}',${JSON.stringify(v.bookName)},${v.chapter},${v.verse},${JSON.stringify(v.text).replace(/"/g,'&quot;')})">♥ Remover</button>
        </div>
      </article>`).join("")
    : `<div class="empty"><span class="big">♡</span><strong>Nenhum versículo salvo</strong><br><br><span class="small">Na leitura da Bíblia, toque em “Salvar” para guardar uma passagem.</span></div>`;
}

function escapeAttrObject(obj){
  return JSON.stringify(obj).replace(/"/g,"&quot;");
}

function renderMore(){
  pageTitle.textContent="Mais";
  content.innerHTML=`
    <div class="setting-row" onclick="toggleTheme()">
      <div class="setting-left"><div class="setting-icon">${state.dark?"☀":"☾"}</div><div><h3>Modo ${state.dark?"claro":"escuro"}</h3><div class="small">Mude a aparência do aplicativo</div></div></div><span>›</span>
    </div>
    <div class="setting-row" onclick="installAppFromMenu()">
      <div class="setting-left"><div class="setting-icon">⇩</div><div><h3>Instalar aplicativo</h3><div class="small">Adicionar à tela inicial do celular</div></div></div><span>›</span>
    </div>
    <div class="setting-row" onclick="shareApp()">
      <div class="setting-left"><div class="setting-icon">↗</div><div><h3>Compartilhar app</h3><div class="small">Envie o Palavra Viva para alguém</div></div></div><span>›</span>
    </div>

    <div class="version-card">
      <div class="cross">✝</div>
      <h3>Bíblia Sagrada</h3>
      <p>Palavra Viva • versão 0.4</p>
      <p style="margin-top:8px">Desenvolvido por JNR</p>
    </div>

    <div class="panel license-panel">
      <strong>📖 Texto bíblico</strong>
      <p class="small">Bíblia Livre (BLIVRE), atualizada a partir da tradução de 1819 de João Ferreira de Almeida.</p>
      <p class="small">Copyright © 2018 Diego Santos, Mario Sérgio e Marco Teles. Licença Creative Commons Atribuição 4.0 Brasil. Reprodução permitida com atribuição.</p>
      <p class="small">As meditações são conteúdo do aplicativo e não fazem parte do texto da Bíblia Livre.</p>
    </div>`;
}

function installAppFromMenu(){
  if(deferredPrompt) installBtn.click();
  else toast("No Chrome: menu ⋮ → Adicionar à tela inicial");
}
function shareApp(){
  const data={title:"Bíblia Sagrada • Palavra Viva",text:"Conheça o aplicativo Bíblia Sagrada • Palavra Viva",url:location.href};
  if(navigator.share) navigator.share(data).catch(()=>{});
  else if(navigator.clipboard){navigator.clipboard.writeText(location.href);toast("Link copiado");}
}
function showPrayerInfo(){ toast("Abra um versículo e toque em “Meditar”"); }

function render(){
  window.scrollTo({top:0,behavior:"smooth"});
  if(state.page==="home") renderHome();
  else if(state.page==="bible") renderBible();
  else if(state.page==="verse") renderVerse();
  else if(state.page==="passage") renderPassageMeditation();
  else if(state.page==="search") renderSearch();
  else if(state.page==="favorites") renderFavorites();
  else if(state.page==="more") renderMore();
}

Object.assign(window,{
  state,setPage,toggleTheme,renderBible,openBook,openChapter,openVerseFromBible,openVerseObject,
  toggleFullFavorite,openDailyVerse,backToChapter,shareCurrentVerse,searchReference,
  installAppFromMenu,shareApp,showPrayerInfo,
  toggleVerseSelection,selectAllVerses,clearVerseSelection,readSelectedVerses,readWholeChapter,
  meditateSelectedVerses,meditateCurrentReading,openVerseByNumber,toggleFavoriteByNumber,
  renderVersePicker,renderPassageMeditation,shareSelectedPassage,backToSelectedChapter,chooseVersesAgain
});

if("serviceWorker" in navigator){
  navigator.serviceWorker.register("./sw.js").catch(()=>{});
}
render();
