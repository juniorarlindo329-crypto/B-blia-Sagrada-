
const BOOKS = {
  old:["Gênesis","Êxodo","Levítico","Números","Deuteronômio","Josué","Juízes","Rute","1 Samuel","2 Samuel","1 Reis","2 Reis","1 Crônicas","2 Crônicas","Esdras","Neemias","Ester","Jó","Salmos","Provérbios","Eclesiastes","Cânticos","Isaías","Jeremias","Lamentações","Ezequiel","Daniel","Oséias","Joel","Amós","Obadias","Jonas","Miquéias","Naum","Habacuque","Sofonias","Ageu","Zacarias","Malaquias"],
  new:["Mateus","Marcos","Lucas","João","Atos","Romanos","1 Coríntios","2 Coríntios","Gálatas","Efésios","Filipenses","Colossenses","1 Tessalonicenses","2 Tessalonicenses","1 Timóteo","2 Timóteo","Tito","Filemom","Hebreus","Tiago","1 Pedro","2 Pedro","1 João","2 João","3 João","Judas","Apocalipse"]
};

const VERSES = [
  {
    id:"fp4-13",book:"Filipenses",chapter:4,verse:13,
    text:"Tudo posso naquele que me fortalece.",
    meditation:"Este versículo aponta para uma força que não depende apenas das nossas próprias capacidades. Em momentos de dificuldade, a fé nos ajuda a continuar com coragem, reconhecendo que Deus pode nos sustentar no caminho.",
    reflect:"Em qual área da sua vida você precisa de força para continuar hoje?",
    prayer:"Senhor, fortalece meu coração e ajuda-me a caminhar com fé, sabedoria e perseverança. Amém."
  },
  {
    id:"sl23-1",book:"Salmos",chapter:23,verse:1,
    text:"O Senhor é o meu pastor; nada me faltará.",
    meditation:"A figura do pastor transmite cuidado, direção e presença. Este versículo convida a confiar que Deus conhece nossas necessidades e pode nos guiar mesmo quando não conseguimos enxergar todo o caminho.",
    reflect:"Que preocupação você pode entregar aos cuidados de Deus hoje?",
    prayer:"Senhor, guia os meus passos e ensina-me a descansar no teu cuidado. Amém."
  },
  {
    id:"mt11-28",book:"Mateus",chapter:11,verse:28,
    text:"Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.",
    meditation:"Jesus acolhe quem chega cansado. A fé não exige que escondamos nossos limites; ela nos convida a levar a Deus aquilo que pesa no coração e encontrar nele descanso para recomeçar.",
    reflect:"Qual peso você precisa colocar diante de Deus neste momento?",
    prayer:"Jesus, recebe minhas preocupações, renova minhas forças e dá descanso ao meu coração. Amém."
  },
  {
    id:"jr29-11",book:"Jeremias",chapter:29,verse:11,
    text:"Porque eu bem sei os pensamentos que tenho a vosso respeito, pensamentos de paz e não de mal.",
    meditation:"Nem sempre entendemos a fase que estamos vivendo. Este texto nos chama a lembrar que o futuro não está limitado ao que vemos hoje e que a esperança pode permanecer mesmo em tempos de incerteza.",
    reflect:"Você consegue manter a esperança mesmo sem saber exatamente como tudo vai acontecer?",
    prayer:"Deus, ajuda-me a confiar em ti quando o futuro parecer incerto e dá-me paz para viver um dia de cada vez. Amém."
  },
  {
    id:"pv3-5",book:"Provérbios",chapter:3,verse:5,
    text:"Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.",
    meditation:"Confiar em Deus não significa deixar de pensar ou planejar, mas reconhecer que nossa visão é limitada. Há momentos em que precisamos fazer nossa parte e, ao mesmo tempo, entregar a Deus aquilo que não conseguimos controlar.",
    reflect:"Existe alguma situação em que você está tentando controlar tudo sozinho?",
    prayer:"Senhor, dá-me sabedoria para agir e humildade para confiar em ti naquilo que não posso controlar. Amém."
  },
  {
    id:"is41-10",book:"Isaías",chapter:41,verse:10,
    text:"Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus.",
    meditation:"O medo pode fazer parecer que estamos sozinhos diante dos problemas. Este versículo nos convida a recordar a presença de Deus e a buscar coragem para dar o próximo passo, mesmo que seja pequeno.",
    reflect:"Qual medo está impedindo você de avançar?",
    prayer:"Deus, fica comigo nos meus medos e dá-me coragem para seguir com confiança. Amém."
  },
  {
    id:"sl46-1",book:"Salmos",chapter:46,verse:1,
    text:"Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.",
    meditation:"Em tempos de pressão, precisamos de um lugar seguro. O salmista descreve Deus como refúgio e força, lembrando-nos de que podemos buscar nele estabilidade quando as circunstâncias parecem agitadas.",
    reflect:"Onde você costuma procurar segurança quando tudo parece difícil?",
    prayer:"Senhor, sê meu refúgio nos dias difíceis e firma meu coração em tua presença. Amém."
  },
  {
    id:"rm8-28",book:"Romanos",chapter:8,verse:28,
    text:"Todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.",
    meditation:"Nem tudo o que acontece é bom, mas este versículo aponta para a esperança de que Deus pode trabalhar até mesmo em circunstâncias difíceis, produzindo aprendizado, amadurecimento e novos caminhos.",
    reflect:"Existe alguma experiência difícil da qual você já conseguiu tirar um aprendizado?",
    prayer:"Deus, ajuda-me a confiar que tu podes produzir algo bom mesmo em meio às situações que eu não entendo. Amém."
  },
  {
    id:"jo3-16",book:"João",chapter:3,verse:16,
    text:"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.",
    meditation:"Este é um dos textos mais conhecidos da fé cristã porque resume a mensagem do amor de Deus. Ele nos lembra que a fé nasce de um amor que se oferece, acolhe e convida a uma nova vida.",
    reflect:"Como você pode demonstrar amor de forma prática a alguém hoje?",
    prayer:"Deus, obrigado pelo teu amor. Ensina-me a receber esse amor e também a compartilhá-lo com outras pessoas. Amém."
  },
  {
    id:"sl119-105",book:"Salmos",chapter:119,verse:105,
    text:"Lâmpada para os meus pés é tua palavra e luz para o meu caminho.",
    meditation:"Uma lâmpada não mostra toda a estrada de uma vez; ela ilumina o próximo trecho. Assim também a Palavra pode nos orientar passo a passo, trazendo direção para decisões e atitudes do dia a dia.",
    reflect:"Qual é o próximo passo que você precisa tomar com sabedoria?",
    prayer:"Senhor, ilumina minhas decisões e ajuda-me a caminhar de acordo com aquilo que é bom e verdadeiro. Amém."
  },
  {
    id:"2co5-7",book:"2 Coríntios",chapter:5,verse:7,
    text:"Porque andamos por fé, e não por vista.",
    meditation:"A fé nos ensina a não limitar nossas escolhas somente ao que está visível no momento. Há períodos em que avançar significa confiar, perseverar e manter os valores mesmo sem garantias imediatas.",
    reflect:"Em qual área você precisa continuar caminhando mesmo sem enxergar o resultado final?",
    prayer:"Deus, dá-me fé para continuar e sabedoria para não desistir diante das incertezas. Amém."
  },
  {
    id:"fp4-6",book:"Filipenses",chapter:4,verse:6,
    text:"Não estejais inquietos por coisa alguma; antes, as vossas petições sejam em tudo conhecidas diante de Deus.",
    meditation:"A ansiedade pode ocupar nossa mente com possibilidades e preocupações. Este texto nos convida a transformar inquietação em oração, levando a Deus aquilo que está além das nossas forças.",
    reflect:"Qual preocupação você pode transformar em oração agora?",
    prayer:"Senhor, recebe minhas preocupações e dá-me serenidade para lidar com aquilo que está diante de mim. Amém."
  }
];

const state = {
  page:"home",
  testament:"old",
  selectedBook:null,
  selectedVerse:null,
  favorites:JSON.parse(localStorage.getItem("bs-favorites")||"[]"),
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

document.querySelectorAll(".nav-item").forEach(btn=>{
  btn.addEventListener("click",()=>setPage(btn.dataset.page));
});

function toast(msg){
  toastEl.textContent=msg;
  toastEl.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer=setTimeout(()=>toastEl.classList.remove("show"),1900);
}

function setPage(page){
  state.page=page;
  state.selectedBook=null;
  state.selectedVerse=null;
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
  render();
}

function toggleTheme(){
  state.dark=!state.dark;
  document.body.classList.toggle("dark",state.dark);
  localStorage.setItem("bs-dark",state.dark?"1":"0");
  themeBtn.textContent=state.dark?"☀":"☾";
}

function todayVerse(){
  const d=new Date();
  const seed=d.getFullYear()*372+(d.getMonth()+1)*31+d.getDate();
  return VERSES[seed%VERSES.length];
}

function toggleFavorite(id){
  if(state.favorites.includes(id)){
    state.favorites=state.favorites.filter(x=>x!==id);
    toast("Removido dos favoritos");
  }else{
    state.favorites=[...state.favorites,id];
    toast("Versículo salvo");
  }
  localStorage.setItem("bs-favorites",JSON.stringify(state.favorites));
  render();
}

function markRead(){
  localStorage.setItem("bs-read-date",new Date().toDateString());
  state.readToday=true;
}

function openVerse(id){
  const v=VERSES.find(x=>x.id===id);
  if(!v) return;
  state.selectedVerse=v;
  state.page="verse";
  markRead();
  render();
}

function openBook(book){
  state.selectedBook=book;
  renderBible();
}

function shareVerse(id){
  const v=VERSES.find(x=>x.id===id);
  if(!v) return;
  const text=`${v.book} ${v.chapter}:${v.verse}\n“${v.text}”\n\nMeditação: ${v.meditation}\n\nBíblia Sagrada • Palavra Viva`;
  if(navigator.share){
    navigator.share({title:"Bíblia Sagrada",text}).catch(()=>{});
  }else if(navigator.clipboard){
    navigator.clipboard.writeText(text);
    toast("Texto copiado");
  }else{
    toast("Compartilhamento não disponível");
  }
}

function verseCard(v){
  const liked=state.favorites.includes(v.id);
  return `<article class="verse-card">
    <div class="verse-line">
      <span class="verse-number">${v.verse}</span>
      <div class="verse-body">${v.text}</div>
    </div>
    <div class="small" style="margin-top:10px">${v.book} ${v.chapter}:${v.verse}</div>
    <div class="card-actions">
      <button class="btn-primary" onclick="openVerse('${v.id}')">Meditar</button>
      <button class="btn-ghost" onclick="toggleFavorite('${v.id}')">${liked?"♥ Salvo":"♡ Favoritar"}</button>
    </div>
  </article>`;
}

function renderHome(){
  pageTitle.textContent="Início";
  const v=todayVerse();
  content.innerHTML=`
    <section class="hero">
      <div class="hero-kicker">✦ Bíblia + Meditação</div>
      <h2>Uma palavra para fortalecer o seu dia.</h2>
      <p>Leia, medite, reflita e leve a Palavra de Deus para a sua rotina.</p>
      <div class="hero-buttons">
        <button class="btn-primary" onclick="openVerse('${v.id}')">Começar agora</button>
        <button class="btn-secondary" onclick="setPage('bible')">Abrir Bíblia</button>
      </div>
    </section>

    <article class="daily-card">
      <div class="reference"><span class="reference-badge">☀</span> Versículo do dia</div>
      <div class="verse-text">“${v.text}”</div>
      <div class="muted">${v.book} ${v.chapter}:${v.verse}</div>
      <div class="card-actions">
        <button class="btn-primary" onclick="openVerse('${v.id}')">Ler meditação</button>
        <button class="btn-ghost" onclick="toggleFavorite('${v.id}')">${state.favorites.includes(v.id)?"♥ Salvo":"♡ Salvar"}</button>
      </div>
    </article>

    <div class="section-head"><h2>Seu momento com Deus</h2><span>${state.readToday?"Leitura feita hoje ✓":"Comece hoje"}</span></div>
    <div class="progress-card">
      <div class="progress-ring"><span>${state.readToday?"100%":"72%"}</span></div>
      <div>
        <strong>${state.readToday?"Leitura de hoje concluída":"Continue sua jornada"}</strong>
        <div class="small" style="margin-top:5px">${state.readToday?"Volte amanhã para uma nova meditação.":"Abra o versículo do dia e reserve alguns minutos para refletir."}</div>
      </div>
    </div>

    <div class="section-head"><h2>Explore</h2><span>Recursos do app</span></div>
    <section class="quick-grid">
      <div class="quick-card" onclick="setPage('bible')"><div class="icon">📖</div><h3>Bíblia</h3><p>Livros e passagens organizados.</p></div>
      <div class="quick-card" onclick="setPage('search')"><div class="icon">🔎</div><h3>Buscar</h3><p>Encontre palavras e temas.</p></div>
      <div class="quick-card" onclick="setPage('favorites')"><div class="icon">❤️</div><h3>Favoritos</h3><p>Guarde versículos especiais.</p></div>
      <div class="quick-card" onclick="showPrayerInfo()"><div class="icon">🙏</div><h3>Orações</h3><p>Orações ligadas às meditações.</p></div>
    </section>
  `;
}

function showPrayerInfo(){
  toast("As orações aparecem dentro de cada meditação");
}

function renderBible(){
  pageTitle.textContent="Bíblia";
  if(state.selectedBook){
    const verses=VERSES.filter(v=>v.book===state.selectedBook);
    content.innerHTML=`
      <div class="chapter-header">
        <div><span class="eyebrow">LIVRO</span><h2>${state.selectedBook}</h2></div>
        <button class="btn-ghost" onclick="state.selectedBook=null;renderBible()">Voltar</button>
      </div>
      ${verses.length
        ? verses.map(verseCard).join("")
        : `<div class="empty"><span class="big">📖</span><strong>${state.selectedBook}</strong><br><br><span class="small">A estrutura do livro está pronta. Os textos e meditações completos serão adicionados depois de definirmos uma tradução bíblica com licença adequada para uso no aplicativo.</span></div>`
      }`;
    return;
  }
  const list=BOOKS[state.testament];
  content.innerHTML=`
    <div class="tabs">
      <button class="tab ${state.testament==="old"?"active":""}" onclick="state.testament='old';renderBible()">Antigo Testamento</button>
      <button class="tab ${state.testament==="new"?"active":""}" onclick="state.testament='new';renderBible()">Novo Testamento</button>
    </div>
    <div class="book-list">
      ${list.map(book=>`
        <button class="book-btn" onclick='openBook(${JSON.stringify(book)})'>
          <span class="book-meta"><span class="book-letter">${book.replace(/[0-9 ]/g,"").charAt(0)}</span><strong>${book}</strong></span>
          <span class="muted">›</span>
        </button>`).join("")}
    </div>`;
}

function renderVerse(){
  const v=state.selectedVerse;
  if(!v){setPage("home");return;}
  pageTitle.textContent=`${v.book} ${v.chapter}`;
  const liked=state.favorites.includes(v.id);
  content.innerHTML=`
    <article class="verse-card">
      <div class="reference"><span class="reference-badge">${v.verse}</span>${v.book} ${v.chapter}:${v.verse}</div>
      <div class="verse-text">“${v.text}”</div>
      <div class="card-actions">
        <button class="btn-ghost" onclick="toggleFavorite('${v.id}')">${liked?"♥ Salvo":"♡ Favoritar"}</button>
        <button class="btn-ghost" onclick="shareVerse('${v.id}')">↗ Compartilhar</button>
      </div>
    </article>

    <section class="meditation-card">
      <h3>📖 Meditação</h3>
      <p>${v.meditation}</p>
      <div class="reflect-box">
        <strong>💡 Para refletir</strong>
        <p style="margin-top:7px">${v.reflect}</p>
      </div>
    </section>

    <section class="meditation-card">
      <h3>🙏 Oração</h3>
      <div class="prayer-box">${v.prayer}</div>
    </section>

    <div class="card-actions">
      <button class="btn-primary" onclick="setPage('home')">Voltar ao início</button>
      <button class="btn-ghost" onclick="setPage('bible')">Continuar lendo</button>
    </div>`;
}

function renderSearch(){
  pageTitle.textContent="Buscar";
  content.innerHTML=`
    <div class="search-box">
      <span>⌕</span>
      <input id="searchInput" placeholder="Ex.: força, medo, Salmos..." autocomplete="off" oninput="doSearch(this.value)">
    </div>
    <div id="searchResults" class="search-results">
      ${VERSES.slice(0,6).map(verseCard).join("")}
    </div>`;
}

function doSearch(q){
  q=(q||"").toLowerCase().trim();
  const results=!q?VERSES.slice(0,6):VERSES.filter(v=>{
    const hay=`${v.book} ${v.chapter}:${v.verse} ${v.text} ${v.meditation} ${v.reflect} ${v.prayer}`.toLowerCase();
    return hay.includes(q);
  });
  document.getElementById("searchResults").innerHTML=results.length
    ? results.map(verseCard).join("")
    : `<div class="empty"><span class="big">⌕</span>Nenhum resultado encontrado.</div>`;
}

function renderFavorites(){
  pageTitle.textContent="Salvos";
  const favs=VERSES.filter(v=>state.favorites.includes(v.id));
  content.innerHTML=favs.length
    ? favs.map(verseCard).join("")
    : `<div class="empty"><span class="big">♡</span><strong>Nenhum versículo salvo</strong><br><br><span class="small">Toque em “Favoritar” para guardar suas passagens preferidas.</span></div>`;
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
    <div class="setting-row">
      <div class="setting-left"><div class="setting-icon">🔔</div><div><h3>Notificação diária</h3><div class="small">Preparado para uma próxima atualização</div></div></div><span class="small">Em breve</span>
    </div>

    <div class="version-card">
      <div class="cross">✝</div>
      <h3>Bíblia Sagrada</h3>
      <p>Palavra Viva • versão 0.2</p>
      <p style="margin-top:8px">Desenvolvido por JNR</p>
    </div>

    <div class="panel" style="padding:17px;margin-top:12px">
      <strong>Sobre o conteúdo</strong>
      <p class="small" style="line-height:1.6;margin-bottom:0">Esta versão contém textos demonstrativos e uma estrutura pronta para receber a Bíblia completa. Antes da publicação completa, deve ser escolhida uma tradução cuja licença permita uso no aplicativo.</p>
    </div>`;
}

function installAppFromMenu(){
  if(deferredPrompt){
    installBtn.click();
  }else{
    toast("No Chrome: menu ⋮ → Adicionar à tela inicial");
  }
}

function shareApp(){
  const data={title:"Bíblia Sagrada • Palavra Viva",text:"Conheça o aplicativo Bíblia Sagrada • Palavra Viva",url:location.href};
  if(navigator.share) navigator.share(data).catch(()=>{});
  else if(navigator.clipboard){navigator.clipboard.writeText(location.href);toast("Link copiado");}
}

function render(){
  window.scrollTo({top:0,behavior:"smooth"});
  if(state.page==="home") renderHome();
  else if(state.page==="bible") renderBible();
  else if(state.page==="verse") renderVerse();
  else if(state.page==="search") renderSearch();
  else if(state.page==="favorites") renderFavorites();
  else if(state.page==="more") renderMore();
}

window.setPage=setPage;
window.openVerse=openVerse;
window.toggleFavorite=toggleFavorite;
window.openBook=openBook;
window.renderBible=renderBible;
window.shareVerse=shareVerse;
window.doSearch=doSearch;
window.showPrayerInfo=showPrayerInfo;
window.installAppFromMenu=installAppFromMenu;
window.shareApp=shareApp;
window.state=state;

if("serviceWorker" in navigator){
  navigator.serviceWorker.register("./sw.js").catch(()=>{});
}
render();
