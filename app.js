
const books = {
  old:["Gênesis","Êxodo","Levítico","Números","Deuteronômio","Josué","Juízes","Rute","1 Samuel","2 Samuel","1 Reis","2 Reis","1 Crônicas","2 Crônicas","Esdras","Neemias","Ester","Jó","Salmos","Provérbios","Eclesiastes","Cânticos","Isaías","Jeremias","Lamentações","Ezequiel","Daniel","Oséias","Joel","Amós","Obadias","Jonas","Miquéias","Naum","Habacuque","Sofonias","Ageu","Zacarias","Malaquias"],
  new:["Mateus","Marcos","Lucas","João","Atos","Romanos","1 Coríntios","2 Coríntios","Gálatas","Efésios","Filipenses","Colossenses","1 Tessalonicenses","2 Tessalonicenses","1 Timóteo","2 Timóteo","Tito","Filemom","Hebreus","Tiago","1 Pedro","2 Pedro","1 João","2 João","3 João","Judas","Apocalipse"]
};

const demoVerses = [
  {
    id:"fp4-13", book:"Filipenses", chapter:4, verse:13,
    text:"Tudo posso naquele que me fortalece.",
    meditation:"Este versículo nos lembra que a nossa força não precisa vir somente de nós mesmos. Em dias difíceis, podemos seguir em frente confiando que Deus nos sustenta e nos dá coragem para continuar.",
    reflect:"Em qual situação da sua vida você precisa confiar mais em Deus hoje?",
    prayer:"Senhor, fortalece meu coração e ajuda-me a caminhar com fé mesmo quando eu estiver cansado. Amém."
  },
  {
    id:"sl23-1", book:"Salmos", chapter:23, verse:1,
    text:"O Senhor é o meu pastor; nada me faltará.",
    meditation:"A imagem do pastor fala de cuidado, direção e presença. Mesmo quando não temos todas as respostas, podemos lembrar que Deus conhece o caminho e não abandona aqueles que confiam nele.",
    reflect:"O que você precisa entregar aos cuidados de Deus hoje?",
    prayer:"Senhor, guia meus passos e ensina-me a descansar no teu cuidado. Amém."
  },
  {
    id:"jr29-11", book:"Jeremias", chapter:29, verse:11,
    text:"Porque eu bem sei os pensamentos que tenho a vosso respeito, pensamentos de paz e não de mal.",
    meditation:"Nem sempre entendemos o momento que estamos vivendo. Este texto convida a confiar que Deus continua trabalhando mesmo quando o futuro parece incerto.",
    reflect:"Você consegue confiar em Deus mesmo sem entender tudo agora?",
    prayer:"Deus, dá-me paz para confiar em teus caminhos e sabedoria para viver um dia de cada vez. Amém."
  },
  {
    id:"mt11-28", book:"Mateus", chapter:11, verse:28,
    text:"Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.",
    meditation:"Jesus acolhe quem está cansado. A fé também é um lugar de descanso: podemos levar a Deus nossas preocupações, limites e medos sem precisar fingir que estamos fortes o tempo todo.",
    reflect:"Que peso você precisa colocar diante de Deus hoje?",
    prayer:"Jesus, recebe minhas preocupações e renova minhas forças. Amém."
  }
];

const state = {
  page:"home",
  testament:"old",
  selectedBook:null,
  selectedVerse:null,
  favorites: JSON.parse(localStorage.getItem("pv-favorites") || "[]"),
  dark: localStorage.getItem("pv-dark")==="1"
};

if(state.dark) document.body.classList.add("dark");

const content = document.getElementById("content");
const pageTitle = document.getElementById("pageTitle");

function setPage(page){
  state.page = page;
  state.selectedBook = null;
  state.selectedVerse = null;
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
  render();
}

document.querySelectorAll(".nav-item").forEach(btn=>btn.addEventListener("click",()=>setPage(btn.dataset.page)));
document.getElementById("themeBtn").addEventListener("click",toggleTheme);

function toggleTheme(){
  state.dark=!state.dark;
  document.body.classList.toggle("dark",state.dark);
  localStorage.setItem("pv-dark",state.dark?"1":"0");
}

function favorite(id){
  state.favorites = state.favorites.includes(id) ? state.favorites.filter(x=>x!==id) : [...state.favorites,id];
  localStorage.setItem("pv-favorites",JSON.stringify(state.favorites));
  render();
}

function verseCard(v, compact=false){
  const liked = state.favorites.includes(v.id);
  return `<div class="verse-card">
    <div class="verse-row">
      <span class="verse-number">${v.verse}</span>
      <div class="verse-content">${v.text}</div>
    </div>
    <div class="actions">
      <button class="primary-btn" onclick="openVerse('${v.id}')">Meditar</button>
      <button class="ghost-btn" onclick="favorite('${v.id}')">${liked?'♥ Salvo':'♡ Favoritar'}</button>
    </div>
    ${compact?'':`<div class="small" style="margin-top:10px">${v.book} ${v.chapter}:${v.verse}</div>`}
  </div>`;
}

function openVerse(id){
  state.selectedVerse = demoVerses.find(v=>v.id===id);
  state.page = "verse";
  render();
}

function renderHome(){
  pageTitle.textContent="Palavra Viva";
  const v = demoVerses[0];
  content.innerHTML = `
    <section class="hero">
      <span class="badge">☀ Palavra para hoje</span>
      <h2>Comece o dia com fé.</h2>
      <p>Leia a Bíblia, medite e leve a Palavra para sua rotina.</p>
    </section>
    <section class="quote-card">
      <div class="quote-ref">${v.book} ${v.chapter}:${v.verse}</div>
      <div class="quote-text">“${v.text}”</div>
      <div class="actions">
        <button class="primary-btn" onclick="openVerse('${v.id}')">Ler e meditar</button>
        <button class="ghost-btn" onclick="favorite('${v.id}')">${state.favorites.includes(v.id)?'♥':'♡'} Salvar</button>
      </div>
    </section>
    <h2 class="section-title">Explore</h2>
    <section class="grid">
      <div class="card" onclick="setPage('bible')"><div class="emoji">📖</div><h3>Bíblia</h3><p>Livros e capítulos</p></div>
      <div class="card" onclick="setPage('search')"><div class="emoji">🔎</div><h3>Buscar</h3><p>Encontre passagens</p></div>
      <div class="card" onclick="setPage('favorites')"><div class="emoji">❤️</div><h3>Favoritos</h3><p>Versículos salvos</p></div>
      <div class="card"><div class="emoji">🙏</div><h3>Orações</h3><p>Em breve</p></div>
    </section>`;
}

function renderBible(){
  pageTitle.textContent="Bíblia";
  if(state.selectedBook){
    const verses = demoVerses.filter(v=>v.book===state.selectedBook);
    content.innerHTML = `<div class="chapter-title"><div><span class="badge">${state.selectedBook}</span><h2>${verses.length?'Capítulos disponíveis':'Conteúdo em preparação'}</h2></div><button class="ghost-btn" onclick="state.selectedBook=null;render()">Voltar</button></div>
    ${verses.length ? verses.map(v=>verseCard(v)).join("") : `<div class="empty">📖<br><br>A estrutura deste livro já está pronta. Os versículos e meditações serão adicionados ao banco de conteúdo.</div>`}`;
    return;
  }
  const list = books[state.testament];
  content.innerHTML = `<div class="tabs">
    <button class="tab ${state.testament==='old'?'active':''}" onclick="state.testament='old';render()">Antigo Testamento</button>
    <button class="tab ${state.testament==='new'?'active':''}" onclick="state.testament='new';render()">Novo Testamento</button>
  </div>
  <div class="book-list">${list.map(b=>`<button class="book-btn" onclick="state.selectedBook='${b.replaceAll("'","\\'")}';render()"><strong>${b}</strong><span>›</span></button>`).join("")}</div>`;
}

function renderVerse(){
  const v=state.selectedVerse;
  pageTitle.textContent=`${v.book} ${v.chapter}`;
  const liked=state.favorites.includes(v.id);
  content.innerHTML = `
    <div class="verse-card">
      <div class="verse-row"><span class="verse-number">${v.verse}</span><div class="verse-content">${v.text}</div></div>
      <div class="actions"><button class="ghost-btn" onclick="favorite('${v.id}')">${liked?'♥ Salvo':'♡ Favoritar'}</button><button class="ghost-btn" onclick="shareVerse('${v.id}')">↗ Compartilhar</button></div>
    </div>
    <div class="meditation-card">
      <h3>📖 Meditação</h3>
      <p>${v.meditation}</p>
      <div class="reflect"><strong>💡 Para refletir</strong><p>${v.reflect}</p></div>
    </div>
    <div class="meditation-card">
      <h3>🙏 Oração</h3>
      <p>${v.prayer}</p>
    </div>`;
}

function shareVerse(id){
  const v=demoVerses.find(x=>x.id===id);
  const text=`${v.book} ${v.chapter}:${v.verse} — ${v.text}\n\nMeditação: ${v.meditation}`;
  if(navigator.share){ navigator.share({title:"Palavra Viva",text}).catch(()=>{}); }
  else { navigator.clipboard.writeText(text); alert("Versículo copiado!"); }
}

function renderSearch(){
  pageTitle.textContent="Buscar";
  content.innerHTML = `<div class="search-box"><span>⌕</span><input id="searchInput" placeholder="Ex.: Salmos, força, descanso..." oninput="doSearch(this.value)"></div><div id="results" class="result">${demoVerses.map(v=>verseCard(v)).join("")}</div>`;
}

function doSearch(q){
  q=(q||"").toLowerCase().trim();
  const r=demoVerses.filter(v=>`${v.book} ${v.chapter}:${v.verse} ${v.text} ${v.meditation}`.toLowerCase().includes(q));
  document.getElementById("results").innerHTML = r.length?r.map(v=>verseCard(v)).join(""):`<div class="empty">Nenhum resultado encontrado.</div>`;
}

function renderFavorites(){
  pageTitle.textContent="Favoritos";
  const favs=demoVerses.filter(v=>state.favorites.includes(v.id));
  content.innerHTML = favs.length?favs.map(v=>verseCard(v)).join(""):`<div class="empty">♡<br><br>Você ainda não salvou nenhum versículo.</div>`;
}

function renderMore(){
  pageTitle.textContent="Mais";
  content.innerHTML = `
    <div class="setting-row"><div><strong>Modo escuro</strong><div class="small">Leitura confortável à noite</div></div><button class="ghost-btn" onclick="toggleTheme()">${state.dark?'Ativado':'Desativado'}</button></div>
    <div class="setting-row"><div><strong>Notificações diárias</strong><div class="small">Versículo do dia — próxima versão</div></div><span>›</span></div>
    <div class="setting-row"><div><strong>Sobre o app</strong><div class="small">Palavra Viva v0.1 • Desenvolvido por JNR</div></div></div>
    <div class="setting-row"><div><strong>Importante</strong><div class="small">Esta versão usa poucos textos bíblicos demonstrativos. Antes de publicar a Bíblia completa, será necessário definir uma tradução com licença adequada para uso no aplicativo.</div></div></div>`;
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

if("serviceWorker" in navigator){ navigator.serviceWorker.register("sw.js").catch(()=>{}); }
render();
