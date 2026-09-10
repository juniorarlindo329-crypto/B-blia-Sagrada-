
const DEFAULT_SOURCE_PATH = "almeida-livre";
const BIBLE_BASE = `https://raw.githubusercontent.com/midvash/bible-data/main/versions/pt/${DEFAULT_SOURCE_PATH}/books/`;

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

const SPECIAL_MEDITATIONS = {
  "Phil-4-13":{meditation:"Este versículo aponta para uma força que não depende apenas das nossas próprias capacidades. Em momentos de dificuldade, a fé nos ajuda a continuar com coragem, reconhecendo que Deus pode nos sustentar no caminho.",reflect:"Em qual área da sua vida você precisa de força para continuar hoje?",prayer:"Senhor, fortalece meu coração e ajuda-me a caminhar com fé, sabedoria e perseverança. Amém."},
  "Ps-23-1":{meditation:"A figura do pastor transmite cuidado, direção e presença. Este versículo convida a confiar que Deus conhece nossas necessidades e pode nos guiar mesmo quando não conseguimos enxergar todo o caminho.",reflect:"Que preocupação você pode entregar aos cuidados de Deus hoje?",prayer:"Senhor, guia os meus passos e ensina-me a descansar no teu cuidado. Amém."},
  "Matt-11-28":{meditation:"Jesus acolhe quem chega cansado. A fé não exige que escondamos nossos limites; ela nos convida a levar a Deus aquilo que pesa no coração e encontrar nele descanso para recomeçar.",reflect:"Qual peso você precisa colocar diante de Deus neste momento?",prayer:"Jesus, recebe minhas preocupações, renova minhas forças e dá descanso ao meu coração. Amém."},
  "Jer-29-11":{meditation:"Nem sempre entendemos a fase que estamos vivendo. Este texto nos chama a lembrar que o futuro não está limitado ao que vemos hoje e que a esperança pode permanecer mesmo em tempos de incerteza.",reflect:"Você consegue manter a esperança mesmo sem saber exatamente como tudo vai acontecer?",prayer:"Deus, ajuda-me a confiar em ti quando o futuro parecer incerto e dá-me paz para viver um dia de cada vez. Amém."},
  "Prov-3-5":{meditation:"Confiar em Deus não significa deixar de pensar ou planejar, mas reconhecer que nossa visão é limitada. Há momentos em que precisamos fazer nossa parte e, ao mesmo tempo, entregar a Deus aquilo que não conseguimos controlar.",reflect:"Existe alguma situação em que você está tentando controlar tudo sozinho?",prayer:"Senhor, dá-me sabedoria para agir e humildade para confiar em ti naquilo que não posso controlar. Amém."},
  "Isa-41-10":{meditation:"O medo pode fazer parecer que estamos sozinhos diante dos problemas. Este versículo nos convida a recordar a presença de Deus e a buscar coragem para dar o próximo passo, mesmo que seja pequeno.",reflect:"Qual medo está impedindo você de avançar?",prayer:"Deus, fica comigo nos meus medos e dá-me coragem para seguir com confiança. Amém."},
  "Ps-46-1":{meditation:"Em tempos de pressão, precisamos de um lugar seguro. O salmista descreve Deus como refúgio e força, lembrando-nos de que podemos buscar nele estabilidade quando as circunstâncias parecem agitadas.",reflect:"Onde você costuma procurar segurança quando tudo parece difícil?",prayer:"Senhor, sê meu refúgio nos dias difíceis e firma meu coração em tua presença. Amém."},
  "Rom-8-28":{meditation:"Nem tudo o que acontece é bom, mas este versículo aponta para a esperança de que Deus pode trabalhar até mesmo em circunstâncias difíceis, produzindo aprendizado, amadurecimento e novos caminhos.",reflect:"Existe alguma experiência difícil da qual você já conseguiu tirar um aprendizado?",prayer:"Deus, ajuda-me a confiar que tu podes produzir algo bom mesmo em meio às situações que eu não entendo. Amém."},
  "John-3-16":{meditation:"Este texto resume de forma marcante a mensagem do amor de Deus. Ele nos lembra de um amor que se oferece, acolhe e chama para uma vida de fé.",reflect:"Como você pode demonstrar amor de forma prática a alguém hoje?",prayer:"Deus, obrigado pelo teu amor. Ensina-me a receber esse amor e também a compartilhá-lo. Amém."},
  "Ps-119-105":{meditation:"Uma lâmpada não mostra toda a estrada de uma vez; ela ilumina o próximo trecho. Assim também a Palavra pode nos orientar passo a passo nas decisões e atitudes do dia a dia.",reflect:"Qual é o próximo passo que você precisa tomar com sabedoria?",prayer:"Senhor, ilumina minhas decisões e ajuda-me a caminhar de acordo com aquilo que é bom e verdadeiro. Amém."},
  "2Cor-5-7":{meditation:"A fé nos ensina a não limitar nossas escolhas somente ao que está visível no momento. Há períodos em que avançar significa confiar, perseverar e manter os valores mesmo sem garantias imediatas.",reflect:"Em qual área você precisa continuar caminhando mesmo sem enxergar o resultado final?",prayer:"Deus, dá-me fé para continuar e sabedoria para não desistir diante das incertezas. Amém."},
  "Phil-4-6":{meditation:"A inquietação pode ocupar nossa mente com possibilidades e preocupações. Este texto nos convida a transformar preocupação em oração, levando a Deus aquilo que está além das nossas forças.",reflect:"Qual preocupação você pode transformar em oração agora?",prayer:"Senhor, recebe minhas preocupações e dá-me serenidade para lidar com aquilo que está diante de mim. Amém."}
};

const DAILY_REFS = [
  ["Phil",4,13],["Ps",23,1],["Matt",11,28],["Jer",29,11],["Prov",3,5],["Isa",41,10],
  ["Ps",46,1],["Rom",8,28],["John",3,16],["Ps",119,105],["2Cor",5,7],["Phil",4,6]
];

const VERSION_GROUPS = [
  {language:"Português", versions:[
    {name:"Almeida Corrigida Fiel", code:"ACF", downloaded:true},
    {name:"Nova Bíblia Viva", code:"NBV", premium:true},
    {name:"Nova Versão Internacional 2023", code:"NVI-PT", premium:true},
    {name:"Nova Versão Internacional 2011", code:"NVI-PT11", premium:true},
    {name:"Bíblia Apostólica", code:"AP-ARA"},
    {name:"Almeida Revista e Atualizada (1993)", code:"ARA", premium:true},
    {name:"Almeida Revista e Corrigida (1969)", code:"RC69", premium:true},
    {name:"Almeida Revista e Corrigida (2009)", code:"ARC", premium:true},
    {name:"Nova Almeida Atualizada (2017)", code:"NAA", premium:true},
    {name:"Almeida Edição Contemporânea", code:"AEC", premium:true},
    {name:"Almeida Século 21", code:"A21", premium:true},
    {name:"Nova Tradução na Linguagem de Hoje (2000)", code:"NTLH", premium:true},
    {name:"Nova Versão Transformadora", code:"NVT", premium:true},
    {name:"King James Atualizada", code:"KJA", downloaded:true},
    {name:"Almeida Antiga 1848", code:"PORAT"},
    {name:"Almeida Recebida", code:"PORAR"},
    {name:"A Mensagem", code:"MSGPT", premium:true},
    {name:"Bíblia Livre Para Todos", code:"BLT"}
  ]},
  {language:"Inglês", versions:[
    {name:"American Standard Version", code:"ASV"},
    {name:"Basic English Bible", code:"BEB"},
    {name:"Berean Standard Bible", code:"BSB"},
    {name:"Christian Standard Bible", code:"CSB"},
    {name:"Darby Version", code:"DARBY"},
    {name:"Douay-Rheims", code:"DRC"},
    {name:"King James Version", code:"KJV"},
    {name:"New International Version (2011)", code:"NIV"},
    {name:"Webster's Bible", code:"WBT"},
    {name:"Weymouth NT", code:"WEY"},
    {name:"World English Bible", code:"WEB"},
    {name:"Young's Literal Translation", code:"YLT"}
  ]},
  {language:"Espanhol", versions:[
    {name:"Nueva Versión Internacional 2022", code:"NVI", premium:true},
    {name:"Reina Valera Contemporánea", code:"RVC", premium:true},
    {name:"Reina Valera 1995 Edición Estándar", code:"RVR95", premium:true},
    {name:"Reina Valera (1909)", code:"RVES"},
    {name:"Reina Valera NT (1858)", code:"RVESNT"},
    {name:"Sagradas Escrituras (1569)", code:"EVESA"},
    {name:"Versión Biblia Libre (NT)", code:"VBL"}
  ]},
  {language:"Árabe", versions:[{name:"Smith and Van Dyke", code:"SVD"}]},
  {language:"Aramaico", versions:[{name:"NT: Peshitta", code:"PES"}]},
  {language:"Armênio", versions:[{name:"Eastern: (Genesis, Exodus, Gospels)", code:"ARE"},{name:"Western: NT", code:"ARW"}]},
  {language:"Basco", versions:[{name:"Navarro-Labourdin: NT", code:"BAS"}]},
  {language:"Chamorro", versions:[{name:"Chamorro (Psalms, Gospels, Acts)", code:"CHA"}]},
  {language:"Chinês", versions:[{name:"NCV (Traditional)", code:"NCV"},{name:"Union (Simplified)", code:"UNIS"},{name:"NCV (Simplified)", code:"NCVS"},{name:"Union (Traditional)", code:"UNI"}]},
  {language:"Copta", versions:[{name:"Coptic NT", code:"COP"}]},
  {language:"Croata", versions:[{name:"Croatian", code:"CRO"}]},
  {language:"Tcheco", versions:[{name:"Czech BKR", code:"BKR"}]},
  {language:"Dinamarquês", versions:[{name:"Danish", code:"DAN"}]},
  {language:"Holandês", versions:[{name:"Staten Vertaling", code:"SVV"}]},
  {language:"Estoniano", versions:[{name:"Estonian", code:"EST"}]},
  {language:"Finlandês", versions:[{name:"Finnish 1776", code:"FIN"}]},
  {language:"Francês", versions:[{name:"Louis Segond (1910)", code:"LSG"},{name:"Martin (1744)", code:"MAR"},{name:"Ostervald (1996 revision)", code:"OST"}]},
  {language:"Georgiano", versions:[{name:"Georgian (Gospels, Acts, James)", code:"GEO2"}]},
  {language:"Alemão", versions:[{name:"Hoffnung für alle (Hope for all)", code:"HFA", premium:true},{name:"Elberfelder (1871)", code:"ELB"},{name:"Elberfelder (1905)", code:"ELBN"},{name:"Luther (1545)", code:"LUT"},{name:"Luther (1912)", code:"LUTN"}]},
  {language:"Grego", versions:[{name:"NT: Byzantine/Majority Text (2000)", code:"BYZ"},{name:"NT: Textus Receptus (1550/1894)", code:"REC"},{name:"NT: Tischendorf 8th Ed.", code:"TIS"},{name:"NT: Westcott/Hort, UBS4 variants", code:"UBS4"},{name:"Modern", code:"GRM"}]},
  {language:"Hebraico", versions:[{name:"OT: Aleppo Codex", code:"ALE"},{name:"Modern", code:"HEB"}]},
  {language:"Húngaro", versions:[{name:"Karoli", code:"HUN"}]},
  {language:"Italiano", versions:[{name:"Italian: Giovanni Diodati Bible (1649)", code:"DIO"},{name:"Italian: Riveduta Bible (1927)", code:"RIV"}]},
  {language:"Cabila", versions:[{name:"NT", code:"KAB"}]},
  {language:"Latim", versions:[{name:"Latin: Nova Vulgata", code:"LAVV"},{name:"Latin: Vulgata Clementina", code:"LAVC"}]},
  {language:"Letão", versions:[{name:"Latvian New Testament", code:"LAT"}]},
  {language:"Mongol", versions:[{name:"Mongolian Bible", code:"BSM"}]},
  {language:"Potawatomi", versions:[{name:"Matthew, Acts) (Lykins, 1844)", code:"POT"}]},
  {language:"Russo", versions:[{name:"Synodal Translation (1876)", code:"SYN"},{name:"Makarij Translation (Pentateuch) (1825)", code:"MAK"}]},
  {language:"Suaíli", versions:[{name:"Swahili NT", code:"SWA"}]},
  {language:"Sueco", versions:[{name:"Swedish (1917)", code:"SWE"}]},
  {language:"Tagalo", versions:[{name:"Ang Biblia (1905)", code:"TAG"}]},
  {language:"Tamajaq", versions:[{name:"Tamajaq Portions", code:"TAM"}]},
  {language:"Turco", versions:[{name:"Turkish", code:"TUR"}]},
  {language:"Ucraniano", versions:[{name:"Ukrainian: NT (P.Kulish, 1871)", code:"UKR"}]},
  {language:"Vietnamita", versions:[{name:"Vietnamese (1934)", code:"VIE"}]}
];

const DRAWER_SECTIONS = [
  [
    {key:"bible", title:"Bíblia", icon:"📖", meta:"Leitura principal"},
    {key:"notes", title:"Anotações", icon:"📝", meta:"Seus registros"},
    {key:"favorites", title:"Favoritos", icon:"🔖", meta:"Versículos salvos"},
    {key:"plans", title:"Planos", icon:"📚", meta:"Leituras guiadas"},
    {key:"progress", title:"Progresso de Leitura", icon:"✅", meta:"Seu avanço"},
    {key:"devotional", title:"Devocional Diário", icon:"🌅", meta:"Reflexão diária"},
    {key:"stories", title:"Histórias Bíblicas", icon:"📡", meta:"Conteúdos especiais"}
  ],
  [
    {key:"study", title:"Pesquisa Avançada & Estudo Bíblico", icon:"🔎", meta:"Ferramentas de estudo"},
    {key:"search", title:"Pesquisa", icon:"⌕", meta:"Buscar referência"},
    {key:"devotionals", title:"Devocionais", icon:"🙏", meta:"Momentos de reflexão"},
    {key:"hymns", title:"Hinários", icon:"🎵", meta:"Louvor"}
  ],
  [
    {key:"donation", title:"Doação de Bíblias", icon:"♡", meta:"Ações solidárias"},
    {key:"ads", title:"Remover Ads", icon:"⊘", meta:"Modo limpo"},
    {key:"apostolic", title:"Bíblia Apostólica", icon:"📘", meta:"Versão adicional"},
    {key:"message", title:"Bíblia A Mensagem", icon:"📕", meta:"Versão adicional"},
    {key:"audio", title:"NIV Live Bible Audio", icon:"🔊", meta:"Áudio bíblico"},
    {key:"store", title:"Loja da Bíblia", icon:"🛍", meta:"Produtos"}
  ],
  [
    {key:"versions", title:"Versões", icon:"🅰", meta:"Escolher tradução"},
    {key:"way", title:"Caminho Perfeito", icon:"∞", meta:"Conteúdo extra"},
    {key:"salt", title:"Evangelize com o SAL", icon:"🧂", meta:"Ferramenta evangelística"},
    {key:"questions", title:"Perguntas Bíblicas", icon:"🎮", meta:"Perguntas e respostas"},
    {key:"dictionary", title:"Dicionário", icon:"🔤", meta:"Termos bíblicos"},
    {key:"themes", title:"Temas", icon:"📄", meta:"Assuntos bíblicos"},
    {key:"maps", title:"Mapas", icon:"🗺", meta:"Mapas da Bíblia"},
    {key:"blog", title:"Blog", icon:"📰", meta:"Novidades"},
    {key:"instagram", title:"Instagram", icon:"📷", meta:"Rede social"},
    {key:"youtube", title:"Youtube", icon:"▶", meta:"Vídeos"},
    {key:"share-app", title:"Compartilhe o App da Bíblia", icon:"🔗", meta:"Enviar o app"}
  ],
  [
    {key:"history", title:"Histórico", icon:"🕘", meta:"Leituras recentes"},
    {key:"backup", title:"Backup", icon:"☁", meta:"Salvar dados"},
    {key:"more", title:"Mais informações", icon:"⚙", meta:"Sobre o aplicativo"}
  ]
];

const PLANS = [
  {title:"Plano 7 Dias com Deus", desc:"Leituras curtas para começar sua semana na presença de Deus."},
  {title:"Salmos para fortalecer a fé", desc:"Uma sequência para oração, descanso e encorajamento."},
  {title:"Evangelho de João", desc:"Plano simples para conhecer mais sobre Jesus."}
];

const DEVOTIONALS = [
  {title:"Confiança", text:"Quando tudo parecer incerto, lembre-se de que Deus continua sustentando a sua caminhada."},
  {title:"Esperança", text:"A Palavra reacende a esperança mesmo em dias difíceis."},
  {title:"Obediência", text:"Pequenos passos de obediência produzem grandes mudanças na vida espiritual."}
];

const DICTIONARY = [
  {term:"Graça", meaning:"Favor imerecido de Deus, oferecido com amor e misericórdia."},
  {term:"Fé", meaning:"Confiança em Deus e na sua Palavra, mesmo sem ver tudo claramente."},
  {term:"Aliança", meaning:"Compromisso estabelecido por Deus com o seu povo."}
];

const THEMES = ["Fé","Perdão","Esperança","Família","Sabedoria","Oração","Salvação","Vitória"];
const STORIES = ["Criação","Noé","Abraão","José","Moisés","Davi","Ester","Jesus","Paulo"];
const MAPS = ["Êxodo","Viagens Missionárias de Paulo","Israel Antigo","Jerusalém Bíblica"];

const content = document.getElementById("content");
const pageTitle = document.getElementById("pageTitle");
const themeBtn = document.getElementById("themeBtn");
const installBtn = document.getElementById("installBtn");
const toastEl = document.getElementById("toast");
const drawerEl = document.getElementById("drawer");
const drawerContent = document.getElementById("drawerContent");
let deferredPrompt = null;

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
  selectedMeditationOption:0,
  selectedPassageMeditationOption:0,
  activeReadingVerse:null,
  bookCache:new Map(),
  fullFavorites:JSON.parse(localStorage.getItem("bs-full-favorites")||"[]"),
  dark:localStorage.getItem("bs-dark")==="1",
  readToday:localStorage.getItem("bs-read-date")==new Date().toDateString(),
  currentVersionCode:localStorage.getItem("bs-version")||"ACF",
  downloadedVersions:JSON.parse(localStorage.getItem("bs-downloaded-versions")||"[\"ACF\",\"KJA\"]"),
  versionsTab:localStorage.getItem("bs-versions-tab")||"all",
  dualVersion:false,
  fontScale:Number(localStorage.getItem("bs-font-scale")||1),
  notes:JSON.parse(localStorage.getItem("bs-notes")||"{}"),
  highlights:JSON.parse(localStorage.getItem("bs-highlights")||"{}"),
  history:JSON.parse(localStorage.getItem("bs-history")||"[]"),
  drawerOpen:false
};

const HIGHLIGHT_COLORS = [
  {id:"purple", bg:"#aa38f0", fg:"#fff"},
  {id:"lime", bg:"#d5ff25", fg:"#171717"},
  {id:"yellow", bg:"#efe88d", fg:"#161616"},
  {id:"pink", bg:"#eba5aa", fg:"#1a1a1a"},
  {id:"mint", bg:"#b8ddb3", fg:"#1a1a1a"},
  {id:"blue", bg:"#9ec9ef", fg:"#1a1a1a"},
  {id:"orange", bg:"#f6cf87", fg:"#1a1a1a"},
  {id:"rose", bg:"#efa0c3", fg:"#1a1a1a"},
  {id:"gray", bg:"#d3d2d6", fg:"#1a1a1a"}
];

if(state.dark) document.body.classList.add("dark");
themeBtn.textContent = state.dark ? "☀" : "☾";
setTimeout(()=>document.getElementById("splash")?.classList.add("hide"),850);

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
document.querySelectorAll(".nav-item").forEach(btn=>btn.addEventListener("click",()=>navigate(btn.dataset.page)));

function toast(msg){
  toastEl.textContent=msg;
  toastEl.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer=setTimeout(()=>toastEl.classList.remove("show"),1900);
}

function saveJSON(key,value){ localStorage.setItem(key, JSON.stringify(value)); }
function openDrawer(){ state.drawerOpen=true; drawerEl.classList.add("open"); renderDrawer(); }
function closeDrawer(){ state.drawerOpen=false; drawerEl.classList.remove("open"); }
function quickOpenVersions(){ navigate("versions"); }

function resetReadingState(){
  state.selectedBookCode=null;
  state.selectedChapter=null;
  state.selectedVerse=null;
  state.selectedPassage=null;
  state.selectedVerseNumbers=[];
  state.chapterMode="select";
  state.currentChapterVerses=[];
  state.selectedMeditationOption=0;
  state.selectedPassageMeditationOption=0;
  state.activeReadingVerse=null;
}

function navigate(page){
  state.page=page;
  if(["home","versions","favorites","search","more","notes","plans","progress","devotional","stories","study","devotionals","hymns","donation","ads","apostolic","message","audio","store","way","salt","questions","dictionary","themes","maps","blog","instagram","youtube","history","backup"].includes(page)){
    if(page !== "favorites" && page !== "notes" && page !== "history") resetReadingState();
  }
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
  closeDrawer();
  render();
}

function toggleTheme(){
  state.dark=!state.dark;
  document.body.classList.toggle("dark",state.dark);
  localStorage.setItem("bs-dark",state.dark?"1":"0");
  themeBtn.textContent=state.dark?"☀":"☾";
}

function refId(code,chapter,verse){ return `${code}-${chapter}-${verse}`; }
function getVersionMeta(code){
  for(const group of VERSION_GROUPS){
    const found = group.versions.find(v=>v.code===code);
    if(found) return {...found, language:group.language};
  }
  return {name:code, code, language:"Português"};
}
function getVersionLabel(){
  const v = getVersionMeta(state.currentVersionCode);
  return `${v.code}`;
}
function addHistory(item){
  state.history = [item, ...state.history.filter(x=>x.id!==item.id)].slice(0,60);
  saveJSON("bs-history", state.history);
}
function getFavorite(id){ return state.fullFavorites.find(x=>x.id===id); }
function getVerseNote(id){ return state.notes[id] || ""; }
function getVerseHighlight(id){ return state.highlights[id] || null; }

function toggleFullFavorite(code,bookName,chapter,verse,text){
  const id=refId(code,chapter,verse);
  if(getFavorite(id)){
    state.fullFavorites=state.fullFavorites.filter(x=>x.id!==id);
    toast("Removido dos favoritos");
  }else{
    state.fullFavorites.unshift({id,code,bookName,chapter,verse,text,versionCode:state.currentVersionCode});
    toast("Versículo salvo");
  }
  saveJSON("bs-full-favorites",state.fullFavorites.slice(0,300));
  render();
}

function setVerseHighlight(id,colorId){
  if(!colorId){ delete state.highlights[id]; toast("Destaque removido"); }
  else { state.highlights[id]=colorId; toast("Cor aplicada"); }
  saveJSON("bs-highlights", state.highlights);
  renderReadingActionSheet();
  render();
}

function saveVerseNote(){
  const verse = state.activeReadingVerse || state.selectedVerse;
  if(!verse) return;
  const id = refId(verse.code, verse.chapter, verse.verse);
  const text = document.getElementById("verseNoteField")?.value?.trim() || "";
  if(text) state.notes[id]=text;
  else delete state.notes[id];
  saveJSON("bs-notes", state.notes);
  toast(text ? "Anotação salva" : "Anotação removida");
  renderReadingActionSheet();
}

async function fetchBook(code){
  const cacheKey = `${state.currentVersionCode}:${code}`;
  if(state.bookCache.has(cacheKey)) return state.bookCache.get(cacheKey);
  const urls = [BIBLE_BASE];
  for(const base of urls){
    try{
      const response = await fetch(`${base}${code}.json`, {cache:"force-cache"});
      if(response.ok){
        const data = await response.json();
        state.bookCache.set(cacheKey,data);
        return data;
      }
    }catch(e){}
  }
  throw new Error("Falha ao carregar livro");
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
  state.selectedMeditationOption=0;
  state.activeReadingVerse={...verse};
  state.page="verse";
  localStorage.setItem("bs-read-date",new Date().toDateString());
  state.readToday=true;
  addHistory({id:`single-${refId(verse.code,verse.chapter,verse.verse)}`,label:`${verse.bookName} ${verse.chapter}:${verse.verse}`,when:new Date().toLocaleString("pt-BR")});
  render();
}

function openVerseFromBible(code,chapter,verse,text){
  openVerseObject({code,bookName:NAME_BY_CODE[code]||code,chapter:Number(chapter),verse:Number(verse),text});
}

function normalizeTextSnippet(text){
  const clean = String(text || "").replace(/\s+/g," ").trim();
  return clean.length > 130 ? clean.slice(0,130).trim() + "..." : clean;
}
function verseReference(verse){ return `${verse.bookName || NAME_BY_CODE[verse.code] || verse.code} ${verse.chapter}:${verse.verse}`; }

function buildGenericMeditationOptions(verse){
  const ref = verseReference(verse);
  const snippet = normalizeTextSnippet(verse.text);
  return [
    {title:"Reflexão",icon:"📖",meditation:`Leia ${ref} com calma. Observe a frase que mais chamou sua atenção: “${snippet}”. Pense no que Deus pode estar falando ao seu coração por meio dessa palavra e como ela conversa com o momento que você está vivendo hoje.`,reflect:`Qual parte desse versículo mais tocou você e por quê?`,prayer:"Senhor, abre meu entendimento para a tua Palavra e fala ao meu coração com clareza. Amém."},
    {title:"Aplicação",icon:"✨",meditation:`Esse versículo não foi dado apenas para ser lido, mas também vivido. Depois de meditar em ${ref}, pense em uma atitude prática para hoje: uma decisão, um cuidado, uma mudança de postura ou uma palavra que você precisa guardar.`,reflect:`Que atitude concreta você pode tomar hoje a partir desse versículo?`,prayer:"Deus, ajuda-me a colocar tua Palavra em prática no meu dia a dia. Amém."},
    {title:"Oração",icon:"🙏",meditation:`Transforme o conteúdo de ${ref} em conversa com Deus. O que esse versículo desperta em você? Gratidão, pedido de ajuda, arrependimento, confiança ou esperança? Use a própria Palavra como base para sua oração.`,reflect:`Se você fosse orar agora com base nesse versículo, o que diria a Deus?`,prayer:"Senhor, recebe minha oração e molda meu coração segundo a tua vontade. Amém."},
    {title:"Encorajamento",icon:"💛",meditation:`A Palavra também serve para fortalecer e renovar. Ao ler ${ref}, lembre-se de que Deus continua presente, agindo e sustentando sua caminhada. Mesmo em dias difíceis, um único versículo pode reacender fé, paz e coragem.`,reflect:`De que forma esse versículo pode fortalecer você hoje?`,prayer:"Pai, renova minha fé e enche meu coração de esperança por meio da tua Palavra. Amém."}
  ];
}
function guidedMeditationOptions(verse){
  const key = verse.id || refId(verse.code,verse.chapter,verse.verse);
  const special=SPECIAL_MEDITATIONS[key];
  const generic=buildGenericMeditationOptions(verse);
  if(!special) return generic;
  return [{title:"Meditação principal",icon:"☀",meditation:special.meditation,reflect:special.reflect,prayer:special.prayer},...generic];
}

async function openBook(code){ state.selectedBookCode=code; state.selectedChapter=null; await renderBible(); }
async function openChapter(chapter){
  state.selectedChapter=Number(chapter);
  state.selectedVerseNumbers=[];
  state.chapterMode="read";
  state.currentChapterVerses=[];
  state.activeReadingVerse=null;
  await renderBible();
}
function showLoading(text="Carregando..."){ content.innerHTML=`<div class="empty-state"><span class="spinner"></span><br><br>${text}</div>`; }
function getCurrentVerse(number){ return state.currentChapterVerses.find(v=>Number(v.number)===Number(number)); }
function toggleVerseSelection(number){
  number=Number(number);
  if(state.selectedVerseNumbers.includes(number)) state.selectedVerseNumbers=state.selectedVerseNumbers.filter(n=>n!==number);
  else state.selectedVerseNumbers=[...state.selectedVerseNumbers,number].sort((a,b)=>a-b);
  renderVersePicker();
}
function selectAllVerses(){ state.selectedVerseNumbers=state.currentChapterVerses.map(v=>Number(v.number)); renderVersePicker(); }
function clearVerseSelection(){ state.selectedVerseNumbers=[]; renderVersePicker(); }
function selectionLabel(){ const n=state.selectedVerseNumbers.length; return n===0 ? "Nenhum selecionado" : `${n} versículo${n===1?"":"s"} selecionado${n===1?"":"s"}`; }
function verseSelectionChip(v){
  const selected=state.selectedVerseNumbers.includes(Number(v.number));
  return `<button class="verse-pick ${selected?"selected":""}" onclick="toggleVerseSelection(${v.number})"><span>${v.number}</span>${selected?'<small>✓</small>':''}</button>`;
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
    <div class="verse-picker-grid">${state.currentChapterVerses.map(verseSelectionChip).join("")}</div>
    <div class="selection-actions">
      <button class="mini-btn" onclick="selectAllVerses()">Selecionar todos</button>
      <button class="mini-btn" onclick="clearVerseSelection()">Limpar</button>
    </div>
    <div class="selected-summary ${count?"has-selection":""}"><div><strong>${selectionLabel()}</strong><div class="small">${count ? "Agora escolha o que deseja fazer." : "Marque os números acima."}</div></div></div>
    <div class="selection-main-actions">
      <button class="btn-primary" ${!count?"disabled":""} onclick="readSelectedVerses()">📖 Ler selecionados</button>
      <button class="btn-primary" ${!count?"disabled":""} onclick="meditateSelectedVerses()">☀ Meditar selecionados</button>
      <button class="btn-ghost full-chapter-action" onclick="readWholeChapter()">Ler capítulo inteiro</button>
    </div>
    <div class="bible-credit">Texto bíblico base carregado pela internet. Versões adicionais já estão preparadas na interface.</div>`;
}
function readSelectedVerses(){ if(!state.selectedVerseNumbers.length){toast("Escolha pelo menos um versículo");return;} state.chapterMode="read"; renderBible(); }
function readWholeChapter(){ state.selectedVerseNumbers=state.currentChapterVerses.map(v=>Number(v.number)); state.chapterMode="read"; renderBible(); }
function buildSelectedPassage(){
  const code=state.selectedBookCode;
  const bookName=NAME_BY_CODE[code]||code;
  return state.currentChapterVerses.filter(v=>state.selectedVerseNumbers.includes(Number(v.number))).map(v=>({id:refId(code,state.selectedChapter,v.number),code,bookName,chapter:Number(state.selectedChapter),verse:Number(v.number),text:v.text}));
}
function meditateSelectedVerses(){
  if(!state.selectedVerseNumbers.length){toast("Escolha pelo menos um versículo");return;}
  state.selectedPassage=buildSelectedPassage();
  state.selectedPassageMeditationOption=0;
  state.page="passage";
  localStorage.setItem("bs-read-date",new Date().toDateString());
  state.readToday=true;
  render();
}
function openVerseByNumber(number){
  const v=getCurrentVerse(number);
  if(!v) return;
  state.activeReadingVerse={code:state.selectedBookCode,bookName:NAME_BY_CODE[state.selectedBookCode]||state.selectedBookCode,chapter:Number(state.selectedChapter),verse:Number(v.number),text:v.text};
  renderBible();
}
function toggleFavoriteByNumber(number){ const v=getCurrentVerse(number); if(!v) return; toggleFullFavorite(state.selectedBookCode,NAME_BY_CODE[state.selectedBookCode]||state.selectedBookCode,Number(state.selectedChapter),Number(v.number),v.text); }
function copyReadingVerse(number){ const v=getCurrentVerse(number); if(!v) return; const txt=`${NAME_BY_CODE[state.selectedBookCode]} ${state.selectedChapter}:${v.number}\n${v.text}`; navigator.clipboard?.writeText(txt); toast("Versículo copiado"); }
function shareReadingVerse(number){ const v=getCurrentVerse(number); if(!v) return; const txt=`${NAME_BY_CODE[state.selectedBookCode]} ${state.selectedChapter}:${v.number}\n${v.text}\n\nBíblia Sagrada • Palavra Viva`; if(navigator.share) navigator.share({title:"Bíblia Sagrada", text:txt}).catch(()=>{}); else {navigator.clipboard?.writeText(txt); toast("Texto copiado");} }
function setReadingActionVerse(number){ openVerseByNumber(number); }
function fontUp(){ state.fontScale=Math.min(1.5, +(state.fontScale+0.1).toFixed(2)); localStorage.setItem("bs-font-scale", String(state.fontScale)); render(); }
function fontDown(){ state.fontScale=Math.max(0.85, +(state.fontScale-0.1).toFixed(2)); localStorage.setItem("bs-font-scale", String(state.fontScale)); render(); }

function renderReadingActionSheet(){
  const verse = state.activeReadingVerse;
  const mount = document.getElementById("readingActionMount");
  if(!mount) return;
  if(!verse){ mount.innerHTML=""; return; }
  const id = refId(verse.code,verse.chapter,verse.verse);
  const liked = !!getFavorite(id);
  const note = getVerseNote(id);
  const currentHighlight = getVerseHighlight(id);
  mount.innerHTML = `
    <div class="action-sheet">
      <h3>${verse.bookName} ${verse.chapter}:${verse.verse}</h3>
      <div class="action-grid">
        <button class="action-btn" onclick="openActiveReadingVerseStudy()"><strong>✦</strong><span>Estudo Bíblico</span></button>
        <button class="action-btn" onclick="shareReadingVerse(${verse.verse})"><strong>↗</strong><span>Compartilhar</span></button>
        <button class="action-btn" onclick="copyReadingVerse(${verse.verse})"><strong>⧉</strong><span>Copiar</span></button>
        <button class="action-btn" onclick="toggleFavoriteByNumber(${verse.verse})"><strong>${liked?"♥":"♡"}</strong><span>${liked?"Favoritado":"Favoritar"}</span></button>
        <button class="action-btn" onclick="document.getElementById('verseNoteField')?.focus()"><strong>✎</strong><span>Anotar</span></button>
      </div>
      <div class="highlight-bar">
        <strong>Cores de destaque</strong>
        <div class="color-row">
          <button class="color-dot" style="background:#fff" onclick="setVerseHighlight('${id}','')" title="Remover cor">✕</button>
          ${HIGHLIGHT_COLORS.map(c=>`<button class="color-dot" style="background:${c.bg};color:${c.fg};outline:${currentHighlight===c.id?'3px solid var(--gold)':'none'}" onclick="setVerseHighlight('${id}','${c.id}')"></button>`).join('')}
        </div>
      </div>
      <div class="highlight-bar">
        <strong>Anotação</strong>
        <textarea id="verseNoteField" class="note-field" placeholder="Escreva sua anotação sobre este versículo...">${escapeHtml(note)}</textarea>
        <div class="row-actions"><button class="btn-primary" onclick="saveVerseNote()">Salvar anotação</button></div>
      </div>
    </div>`;
}

function fullVerseRow(code,bookName,chapter,v){
  const id=refId(code,chapter,v.number);
  const liked=!!getFavorite(id);
  const highlightId = getVerseHighlight(id);
  const color = HIGHLIGHT_COLORS.find(c=>c.id===highlightId);
  const isActive = state.activeReadingVerse && Number(state.activeReadingVerse.verse)===Number(v.number);
  const rowStyle = color ? `background:${color.bg};color:${color.fg}` : `background:var(--surface)`;
  return `<article class="reading-verse ${isActive?'selected':''}" style="${rowStyle}">
    <div class="reading-verse-line" onclick="setReadingActionVerse(${v.number})">
      <button class="verse-number-btn" onclick="event.stopPropagation();openVerseByNumber(${v.number})">${v.number}</button>
      <div class="reading-verse-text" style="font-size:${(20*state.fontScale).toFixed(1)}px">${escapeHtml(v.text)}</div>
    </div>
    <div class="verse-inline-tools">
      <button class="verse-tool" onclick="openVerseByNumber(${v.number})">✦ Estudo Bíblico</button>
      <button class="verse-tool" onclick="shareReadingVerse(${v.number})">↗ Compartilhar</button>
      <button class="verse-tool" onclick="copyReadingVerse(${v.number})">⧉ Copiar</button>
      <button class="verse-tool" onclick="toggleFavoriteByNumber(${v.number})">${liked?"♥ Salvo":"♡ Salvar"}</button>
      <button class="verse-tool" onclick="setReadingActionVerse(${v.number})">✎ Anotar</button>
    </div>
  </article>`;
}

async function renderHome(){
  pageTitle.textContent="Início";
  const currentVersion = getVersionMeta(state.currentVersionCode);
  content.innerHTML=`
    <section class="hero cover-hero">
      <img src="./cover-biblia.png" alt="Capa da Bíblia" class="hero-cover-image" />
      <div class="hero-cover-overlay"></div>
      <div class="hero-content">
        <div class="hero-kicker">✦ Bíblia + Meditação</div>
        <h2>BÍBLIA SAGRADA</h2>
        <p>Capa oficial da sua Bíblia com leitura, meditação, versões, destaques e anotações no aplicativo.</p>
        <div class="hero-buttons">
          <button class="btn-primary" onclick="openDailyVerse()">Versículo do dia</button>
          <button class="btn-secondary" onclick="navigate('bible')">Abrir Bíblia</button>
        </div>
      </div>
    </section>
    <div class="section-head"><h2>Leitura rápida</h2><span>Versão atual: ${currentVersion.name}</span></div>
    <section class="quick-grid">
      <div class="quick-card" onclick="navigate('bible')"><div class="icon">📖</div><h3>Ler a Bíblia</h3><p>Escolha livro, capítulo e versículo.</p></div>
      <div class="quick-card" onclick="navigate('versions')"><div class="icon">🅰</div><h3>Versões da Bíblia</h3><p>Escolha a tradução desejada.</p></div>
      <div class="quick-card" onclick="navigate('favorites')"><div class="icon">❤️</div><h3>Favoritos</h3><p>Guarde passagens importantes.</p></div>
      <div class="quick-card" onclick="navigate('notes')"><div class="icon">📝</div><h3>Anotações</h3><p>Salve estudos e observações.</p></div>
    </section>
    <div class="section-head"><h2>Capa da Bíblia</h2><span>Igreja Batista Rhema</span></div>
    <article class="cover-card"><img src="./cover-biblia.png" alt="Capa Bíblia Sagrada Igreja Batista Rhema" class="cover-image" /></article>
    <div class="section-head"><h2>Seu momento com Deus</h2><span>${state.readToday?"Leitura feita hoje ✓":"Comece hoje"}</span></div>
    <div class="progress-card">
      <div class="progress-ring"><span>${state.readToday?"100%":"72%"}</span></div>
      <div><strong>${state.readToday?"Leitura de hoje concluída":"Reserve alguns minutos"}</strong><div class="small" style="margin-top:5px">${state.readToday?"Volte amanhã para uma nova leitura.":"Escolha um capítulo e leia com calma."}</div></div>
    </div>`;
}

async function renderBible(){
  pageTitle.textContent="Bíblia";
  if(!state.selectedBookCode){
    const list=BOOKS[state.testament];
    const version = getVersionMeta(state.currentVersionCode);
    content.innerHTML=`
      <section class="hero cover-hero" style="min-height:220px">
        <img src="./cover-biblia.png" alt="Capa da Bíblia" class="hero-cover-image" />
        <div class="hero-cover-overlay"></div>
        <div class="hero-content">
          <div class="badge-chip">${version.code} • ${version.name}</div>
          <h2>Bíblia com capa personalizada</h2>
          <p>A capa agora aparece também aqui na Bíblia. Escolha o livro e o capítulo. Ao tocar no capítulo, a Palavra abre na hora.</p>
          <div class="hero-buttons"><button class="btn-primary" onclick="navigate('versions')">Trocar versão</button></div>
        </div>
      </section>
      <div class="tabs">
        <button class="tab ${state.testament==='old'?'active':''}" onclick="state.testament='old';renderBible()">Antigo Testamento</button>
        <button class="tab ${state.testament==='new'?'active':''}" onclick="state.testament='new';renderBible()">Novo Testamento</button>
      </div>
      <div class="book-list">
        ${list.map(([name,code])=>`<button class="book-btn" onclick="openBook('${code}')"><span class="book-meta"><span class="book-letter">${name.replace(/[0-9 ]/g,'').charAt(0)}</span><strong>${name}</strong></span><span class="muted">›</span></button>`).join('')}
      </div>
      <div class="bible-credit">Versões da Bíblia, menus e recursos já estão no aplicativo. Se a internet falhar, a leitura pode não carregar.</div>`;
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
          <div><span class="eyebrow">ESCOLHA O CAPÍTULO</span><h2>${bookName}</h2><div class="small">${book.chapters.length} capítulo${book.chapters.length===1?'':'s'}</div></div>
          <button class="btn-ghost" onclick="state.selectedBookCode=null;state.selectedChapter=null;renderBible()">Livros</button>
        </div>
        <div class="chapter-grid">${book.chapters.map(ch=>`<button class="chapter-btn" onclick="openChapter(${ch.chapter})">${ch.chapter}</button>`).join('')}</div>
        <div class="bible-credit">Toque em um capítulo e a Palavra abre imediatamente com todos os versículos.</div>`;
      return;
    }
    const ch=book.chapters.find(c=>Number(c.chapter)===Number(state.selectedChapter));
    if(!ch) throw new Error("Capítulo não encontrado");
    state.currentChapterVerses=ch.verses;
    if(state.chapterMode==="select"){ renderVersePicker(); return; }
    const prev=state.selectedChapter>1?state.selectedChapter-1:null;
    const next=state.selectedChapter<book.chapters.length?state.selectedChapter+1:null;
    const chosen = state.selectedVerseNumbers.length ? ch.verses.filter(v=>state.selectedVerseNumbers.includes(Number(v.number))) : ch.verses;
    if(!state.activeReadingVerse && chosen.length){ const f=chosen[0]; state.activeReadingVerse={code,bookName,chapter:Number(state.selectedChapter),verse:Number(f.number),text:f.text}; }
    addHistory({id:`${code}-${state.selectedChapter}-${state.currentVersionCode}`,label:`${bookName} ${state.selectedChapter}`,when:new Date().toLocaleString("pt-BR")});
    content.innerHTML=`
      <div class="reading-shell">
        <div class="reading-toolbar-top">
          <button class="top-icon-btn" onclick="openDrawer()">☰</button>
          <button class="top-chip" onclick="state.selectedChapter=null;state.chapterMode='select';renderBible()">${bookName}</button>
          <button class="top-chip" onclick="state.selectedChapter=null;state.selectedVerseNumbers=[];state.chapterMode='read';renderBible()">${state.selectedChapter}</button>
          <button class="top-chip" onclick="navigate('versions')">${getVersionLabel()}</button>
          <button class="top-icon-btn" onclick="toast('Áudio em desenvolvimento')">🔊</button>
          <button class="top-icon-btn" onclick="fontUp()">T+</button>
          <button class="top-icon-btn" onclick="fontDown()">T-</button>
        </div>
        <section class="bible-reading">${chosen.map(v=>fullVerseRow(code,bookName,state.selectedChapter,v)).join('')}</section>
      </div>
      <div id="readingActionMount"></div>
      <div class="reading-bottom-actions">
        <button class="btn-primary" onclick="meditateCurrentReading()">☀ Meditar nesses versículos</button>
        <button class="btn-ghost" onclick="state.selectedChapter=null;state.selectedVerseNumbers=[];state.chapterMode='read';renderBible()">Escolher outro capítulo</button>
      </div>
      <div class="card-actions">
        <button class="mini-btn" ${!prev?"disabled":""} onclick="${prev?`openChapter(${prev})`:''}">‹ Capítulo anterior</button>
        <button class="mini-btn" ${!next?"disabled":""} onclick="${next?`openChapter(${next})`:''}">Próximo capítulo ›</button>
      </div>
      <div class="bible-credit">Versão visível: ${getVersionMeta(state.currentVersionCode).name}. O texto bíblico base pode variar conforme a disponibilidade online.</div>`;
    renderReadingActionSheet();
  }catch(e){
    content.innerHTML=`<div class="empty-state"><span class="big">📡</span><strong>Não foi possível carregar ${bookName}</strong><br><br><span class="small">Confira sua conexão com a internet e tente novamente.</span><br><br><button class="btn-primary" onclick="renderBible()">Tentar novamente</button></div>`;
  }
}

function meditateCurrentReading(){ if(!state.selectedVerseNumbers.length) state.selectedVerseNumbers=state.currentChapterVerses.map(v=>Number(v.number)); meditateSelectedVerses(); }

function renderVerse(){
  const v=state.selectedVerse; if(!v){ navigate('home'); return; }
  pageTitle.textContent=`${v.bookName} ${v.chapter}`;
  const id=refId(v.code,v.chapter,v.verse);
  const options=guidedMeditationOptions({...v,id});
  if(state.selectedMeditationOption >= options.length) state.selectedMeditationOption = 0;
  const current=options[state.selectedMeditationOption];
  const liked=!!getFavorite(id);
  content.innerHTML=`
    <article class="verse-card">
      <div class="reference"><span class="reference-badge">${v.verse}</span>${v.bookName} ${v.chapter}:${v.verse}</div>
      <div class="verse-text">“${escapeHtml(v.text)}”</div>
      <div class="small">Versão atual: ${getVersionMeta(state.currentVersionCode).name}</div>
      <div class="card-actions">
        <button class="btn-ghost" onclick="toggleCurrentVerseFavorite()">${liked?"♥ Salvo":"♡ Favoritar"}</button>
        <button class="btn-ghost" onclick="shareCurrentVerse()">↗ Compartilhar</button>
      </div>
    </article>
    <div class="meditation-options-bar">${options.map((opt,index)=>`<button class="meditation-option-chip ${state.selectedMeditationOption===index?'active':''}" onclick="setMeditationOption(${index})"><span>${opt.icon}</span>${opt.title}</button>`).join('')}</div>
    <section class="meditation-card"><h3>${current.icon} ${current.title}</h3><p>${current.meditation}</p><div class="reflect-box"><strong>💡 Para refletir</strong><p style="margin-top:7px">${current.reflect}</p></div></section>
    <section class="meditation-card"><h3>🙏 Oração</h3><div class="prayer-box">${current.prayer}</div></section>
    <div class="reading-bottom-actions">
      <button class="btn-primary" onclick="nextMeditationOption()">Ver outra meditação</button>
      <button class="btn-ghost" onclick="backToChapter()">Voltar ao capítulo</button>
      <button class="btn-ghost" onclick="navigate('bible')">Escolher outro livro</button>
    </div>`;
}
function setMeditationOption(index){ state.selectedMeditationOption = Number(index) || 0; renderVerse(); }
function nextMeditationOption(){ const v = state.selectedVerse; if(!v) return; const options = guidedMeditationOptions({...v, id:refId(v.code,v.chapter,v.verse)}); state.selectedMeditationOption = (state.selectedMeditationOption + 1) % options.length; renderVerse(); }
async function backToChapter(){ const v=state.selectedVerse; state.page="bible"; state.selectedBookCode=v.code; state.selectedChapter=v.chapter; state.selectedVerse=null; state.chapterMode='read'; await renderBible(); }
function shareCurrentVerse(){ const v=state.selectedVerse; if(!v) return; const text=`${v.bookName} ${v.chapter}:${v.verse}\n“${v.text}”\n\nBíblia Sagrada • Palavra Viva`; if(navigator.share) navigator.share({title:"Bíblia Sagrada",text}).catch(()=>{}); else if(navigator.clipboard){navigator.clipboard.writeText(text);toast("Texto copiado");} }

function buildPassageMeditationOptions(passage){
  const first=passage[0], last=passage[passage.length-1];
  const ref=passage.length===1 ? `${first.bookName} ${first.chapter}:${first.verse}` : `${first.bookName} ${first.chapter}:${first.verse}-${last.verse}`;
  if(passage.length===1) return guidedMeditationOptions(first);
  return [
    {title:"Reflexão da passagem",icon:"📖",meditation:`Você escolheu ${passage.length} versículos de ${ref}. Leia tudo novamente com calma e perceba a mensagem principal. Procure notar a verdade que se repete, o ensino central ou a direção que essa passagem oferece para sua vida hoje.`,reflect:"Qual foi a principal mensagem que você percebeu nessa passagem inteira?",prayer:"Senhor, ajuda-me a compreender a mensagem desta passagem e a guardá-la no coração. Amém."},
    {title:"Aplicação da passagem",icon:"✨",meditation:`Toda passagem bíblica pode gerar prática. Depois de ler ${ref}, pense no que ela pede de você: confiar mais, obedecer, mudar uma atitude, perseverar, perdoar, agradecer ou buscar mais a presença de Deus.`,reflect:"Qual atitude prática essa passagem inspira em você hoje?",prayer:"Deus, dá-me disposição para viver na prática aquilo que aprendi nessa leitura. Amém."},
    {title:"Oração da passagem",icon:"🙏",meditation:`Agora transforme essa leitura em oração. Use os versículos de ${ref} como base para falar com Deus. A Palavra pode virar clamor, gratidão, entrega e fortalecimento espiritual.`,reflect:"Que oração nasce no seu coração depois de ler essa passagem?",prayer:"Pai, recebe minha oração e faz tua Palavra produzir fruto na minha vida. Amém."},
    {title:"Encorajamento",icon:"💛",meditation:`Ao meditar em ${ref}, lembre-se de que Deus continua presente em sua caminhada. Esta passagem pode servir como direção, consolo e fortalecimento. Guarde ao menos uma frase no coração para carregar durante o dia.`,reflect:"Que parte dessa passagem mais fortalece você neste momento?",prayer:"Senhor, renova minha esperança e fortalece-me por meio da tua Palavra. Amém."}
  ];
}
function renderPassageMeditation(){
  const passage=state.selectedPassage||[]; if(!passage.length){ navigate('bible'); return; }
  const first=passage[0], last=passage[passage.length-1], isSingle=passage.length===1;
  const reference=isSingle ? `${first.bookName} ${first.chapter}:${first.verse}` : `${first.bookName} ${first.chapter}:${first.verse}-${last.verse}`;
  const options=buildPassageMeditationOptions(passage);
  if(state.selectedPassageMeditationOption >= options.length) state.selectedPassageMeditationOption = 0;
  const current=options[state.selectedPassageMeditationOption];
  pageTitle.textContent="Meditação";
  content.innerHTML=`
    <div class="passage-reference-card"><span class="eyebrow">PASSAGEM ESCOLHIDA</span><h2>${reference}</h2><div class="selected-passage-verses">${passage.map(v=>`<div class="selected-passage-verse"><span>${v.verse}</span><p>${escapeHtml(v.text)}</p></div>`).join('')}</div></div>
    <div class="meditation-options-bar">${options.map((opt,index)=>`<button class="meditation-option-chip ${state.selectedPassageMeditationOption===index?'active':''}" onclick="setPassageMeditationOption(${index})"><span>${opt.icon}</span>${opt.title}</button>`).join('')}</div>
    <section class="meditation-card"><h3>${current.icon} ${current.title}</h3><p>${current.meditation}</p><div class="reflect-box"><strong>💡 Para refletir</strong><p style="margin-top:7px">${current.reflect}</p></div></section>
    <section class="meditation-card"><h3>🙏 Oração</h3><div class="prayer-box">${current.prayer}</div></section>
    <div class="reading-bottom-actions">
      <button class="btn-primary" onclick="nextPassageMeditationOption()">Ver outra meditação</button>
      <button class="btn-ghost" onclick="shareSelectedPassage()">↗ Compartilhar passagem</button>
      <button class="btn-ghost" onclick="backToSelectedChapter()">Voltar aos versículos</button>
      <button class="btn-ghost" onclick="chooseVersesAgain()">Escolher outros versículos</button>
    </div>`;
}
function setPassageMeditationOption(index){ state.selectedPassageMeditationOption = Number(index) || 0; renderPassageMeditation(); }
function nextPassageMeditationOption(){ const passage = state.selectedPassage || []; if(!passage.length) return; const options = buildPassageMeditationOptions(passage); state.selectedPassageMeditationOption = (state.selectedPassageMeditationOption + 1) % options.length; renderPassageMeditation(); }
function shareSelectedPassage(){ const passage=state.selectedPassage||[]; if(!passage.length) return; const first=passage[0], last=passage[passage.length-1]; const ref=passage.length===1 ? `${first.bookName} ${first.chapter}:${first.verse}` : `${first.bookName} ${first.chapter}:${first.verse}-${last.verse}`; const verses=passage.map(v=>`${v.verse}. ${v.text}`).join("\n"); const text=`${ref}\n\n${verses}\n\nBíblia Sagrada • Palavra Viva`; if(navigator.share) navigator.share({title:"Bíblia Sagrada",text}).catch(()=>{}); else if(navigator.clipboard){navigator.clipboard.writeText(text);toast("Passagem copiada");} }
function backToSelectedChapter(){ const passage=state.selectedPassage||[]; if(!passage.length){ navigate('bible'); return; } state.page="bible"; state.selectedBookCode=passage[0].code; state.selectedChapter=passage[0].chapter; state.selectedVerse=null; state.chapterMode="read"; renderBible(); }
function chooseVersesAgain(){ const passage=state.selectedPassage||[]; if(!passage.length){ navigate('bible'); return; } state.page="bible"; state.selectedBookCode=passage[0].code; state.selectedChapter=passage[0].chapter; state.selectedVerse=null; state.chapterMode="select"; renderBible(); }

function renderSearch(){
  pageTitle.textContent="Buscar";
  content.innerHTML=`
    <div class="search-card">
      <h3>Buscar por referência</h3>
      <p class="small">Escolha o livro e digite capítulo e versículo.</p>
      <select id="refBook" class="field">${[...BOOKS.old,...BOOKS.new].map(([n,c])=>`<option value="${c}">${n}</option>`).join('')}</select>
      <div class="field-row"><input id="refChapter" class="field" inputmode="numeric" placeholder="Capítulo"><input id="refVerse" class="field" inputmode="numeric" placeholder="Versículo"></div>
      <button class="btn-primary" style="width:100%;margin-top:11px" onclick="searchReference()">Abrir passagem</button>
    </div>
    <div class="search-card">
      <h3>Busca rápida</h3>
      <div class="info-grid">
        <button class="setting-row" onclick="openDailyVerse()"><div class="setting-left"><div class="setting-icon">☀</div><div><h3>Versículo do dia</h3><div class="small">Abra uma leitura pronta</div></div></div><span>›</span></button>
        <button class="setting-row" onclick="navigate('versions')"><div class="setting-left"><div class="setting-icon">🅰</div><div><h3>Versões da Bíblia</h3><div class="small">Escolha a tradução</div></div></div><span>›</span></button>
      </div>
    </div>`;
}
async function searchReference(){
  const code=document.getElementById("refBook").value;
  const chapter=Number(document.getElementById("refChapter").value);
  const verse=Number(document.getElementById("refVerse").value);
  if(!chapter||!verse){toast("Digite capítulo e versículo");return;}
  showLoading("Buscando passagem...");
  try{ const v=await getVerse(code,chapter,verse); openVerseObject(v); }
  catch(e){ toast("Referência não encontrada"); renderSearch(); }
}

function renderFavorites(){
  pageTitle.textContent="Salvos";
  content.innerHTML=state.fullFavorites.length ? state.fullFavorites.map(v=>`<article class="note-card"><h3>${v.bookName} ${v.chapter}:${v.verse}</h3><p>${escapeHtml(v.text)}</p><div class="card-actions"><button class="btn-primary" onclick="openFavoriteById('${v.id}')">Meditar</button><button class="btn-ghost" onclick="removeFavoriteById('${v.id}')">♥ Remover</button></div></article>`).join('') : `<div class="empty-state"><span class="big">♡</span><strong>Nenhum versículo salvo</strong><br><br><span class="small">Na leitura da Bíblia, toque em “Salvar” para guardar uma passagem.</span></div>`;
}
function renderNotes(){
  pageTitle.textContent="Anotações";
  const entries = Object.entries(state.notes);
  content.innerHTML = entries.length ? entries.map(([id,text])=>`<article class="note-card"><h3>${humanizeNoteId(id)}</h3><p>${escapeHtml(text)}</p><div class="card-actions"><button class="btn-ghost" onclick="removeNote('${id}')">Excluir</button></div></article>`).join('') : `<div class="empty-state"><span class="big">📝</span><strong>Nenhuma anotação ainda</strong><br><br><span class="small">Abra um versículo na leitura e use o botão “Anotar”.</span></div>`;
}
function removeNote(id){ delete state.notes[id]; saveJSON('bs-notes', state.notes); renderNotes(); toast('Anotação removida'); }
function humanizeNoteId(id){ const [code,chapter,verse]=id.split('-'); return `${NAME_BY_CODE[code]||code} ${chapter}:${verse}`; }

function renderVersions(){
  pageTitle.textContent="Versões";
  localStorage.setItem('bs-versions-tab', state.versionsTab);
  const groups = VERSION_GROUPS.map(group=>({
    ...group,
    versions: group.versions.filter(v=>state.versionsTab==='all' ? true : state.versionsTab==='downloaded' ? state.downloadedVersions.includes(v.code) : !!v.audio)
  })).filter(g=>g.versions.length);
  content.innerHTML=`
    <div class="version-tabs">
      <button class="version-tab ${state.versionsTab==='all'?'active':''}" onclick="setVersionsTab('all')">Todas</button>
      <button class="version-tab ${state.versionsTab==='downloaded'?'active':''}" onclick="setVersionsTab('downloaded')">Baixado</button>
      <button class="version-tab ${state.versionsTab==='audio'?'active':''}" onclick="setVersionsTab('audio')">Áudio</button>
    </div>
    <div class="toggle-row"><div><strong>Duas traduções na mesma tela</strong><div class="small">Recurso visual preparado para futura expansão</div></div><button class="switch ${state.dualVersion?'on':''}" onclick="toggleDualVersion()"></button></div>
    ${groups.map(group=>`<section class="language-block"><div class="language-title">${group.language}</div><div class="version-list">${group.versions.map(v=>renderVersionRow(v)).join('')}</div></section>`).join('')}`;
}
function renderVersionRow(v){
  const downloaded = state.downloadedVersions.includes(v.code);
  const selected = state.currentVersionCode===v.code;
  return `<button class="version-row ${selected?'selected':''}" onclick="selectVersion('${v.code}')"><div><div class="version-name">${escapeHtml(v.name)} ${v.premium?'<span class="icon-mini">👤</span>':''}</div><div class="version-code">${v.code}</div></div><div class="version-meta"><span class="version-action">${selected?'✓':downloaded?'✔':'⬇'}</span></div></button>`;
}
function setVersionsTab(tab){ state.versionsTab=tab; renderVersions(); }
function toggleDualVersion(){ state.dualVersion=!state.dualVersion; renderVersions(); }
function selectVersion(code){
  state.currentVersionCode=code;
  localStorage.setItem('bs-version', code);
  if(!state.downloadedVersions.includes(code)){ state.downloadedVersions.unshift(code); saveJSON('bs-downloaded-versions', state.downloadedVersions); toast('Versão baixada e selecionada'); }
  else toast('Versão selecionada');
  state.bookCache.clear();
  renderVersions();
}

function simpleListPage(title, items, icon='✦', subtitle='Conteúdo pronto para usar no aplicativo.'){
  pageTitle.textContent=title;
  content.innerHTML = `<div class="panel"><h3>${icon} ${title}</h3><p class="small">${subtitle}</p></div>` + items.map(item=>`<article class="info-card"><strong>${typeof item==='string'?item:item.title}</strong><div class="small" style="margin-top:6px">${typeof item==='string'?'':item.desc||item.text||item.meaning||''}</div></article>`).join('');
}
function renderProgress(){ pageTitle.textContent='Progresso de Leitura'; content.innerHTML=`<div class="progress-card"><div class="progress-ring"><span>${state.readToday?'100%':'72%'}</span></div><div><strong>Seu progresso</strong><div class="small" style="margin-top:5px">Continue lendo diariamente para fortalecer seu hábito espiritual.</div></div></div><div class="panel" style="margin-top:12px"><h3>Resumo</h3><div class="history-item">Versículos salvos: ${state.fullFavorites.length}</div><div class="history-item">Anotações: ${Object.keys(state.notes).length}</div><div class="history-item">Versões baixadas: ${state.downloadedVersions.length}</div></div>`; }
function renderHistory(){ pageTitle.textContent='Histórico'; content.innerHTML = state.history.length ? `<div class="panel">${state.history.map(item=>`<div class="history-item"><strong>${item.label}</strong><div class="small">${item.when}</div></div>`).join('')}</div>` : `<div class="empty-state"><span class="big">🕘</span><strong>Sem histórico ainda</strong><br><br><span class="small">Abra algumas leituras para ver o histórico aqui.</span></div>`; }
function renderMore(){
  pageTitle.textContent='Mais informações';
  content.innerHTML=`
    <div class="setting-row" onclick="toggleTheme()"><div class="setting-left"><div class="setting-icon">${state.dark?'☀':'☾'}</div><div><h3>Modo ${state.dark?'claro':'escuro'}</h3><div class="small">Mude a aparência do aplicativo</div></div></div><span>›</span></div>
    <div class="setting-row" onclick="installAppFromMenu()"><div class="setting-left"><div class="setting-icon">⇩</div><div><h3>Instalar aplicativo</h3><div class="small">Adicionar à tela inicial do celular</div></div></div><span>›</span></div>
    <div class="setting-row" onclick="shareApp()"><div class="setting-left"><div class="setting-icon">↗</div><div><h3>Compartilhar app</h3><div class="small">Envie o Palavra Viva para alguém</div></div></div><span>›</span></div>
    <div class="version-card"><div class="cross">✝</div><h3>Bíblia Sagrada</h3><p>Palavra Viva • versão 0.8</p><p style="margin-top:8px">Desenvolvido por JNR</p></div>
    <div class="panel" style="margin-top:12px"><strong>📖 Texto bíblico</strong><p class="small">O aplicativo carrega o texto bíblico base pela internet e agora possui tela de versões, menu lateral, destaques, anotações e capa personalizada.</p><p class="small">As meditações são conteúdo separado do aplicativo e não alteram o texto da Bíblia.</p></div>`;
}

function installAppFromMenu(){ if(deferredPrompt) installBtn.click(); else toast("No Chrome: menu ⋮ → Adicionar à tela inicial"); }
function shareApp(){ const data={title:"Bíblia Sagrada • Palavra Viva",text:"Conheça o aplicativo Bíblia Sagrada • Palavra Viva",url:location.href}; if(navigator.share) navigator.share(data).catch(()=>{}); else if(navigator.clipboard){navigator.clipboard.writeText(location.href);toast("Link copiado");} }
function showPrayerInfo(){ toast("Abra um versículo e toque em “Meditar”"); }
function fakeToast(text){ toast(text); }

function renderDrawer(){
  drawerContent.innerHTML = DRAWER_SECTIONS.map((section,idx)=>`<div class="drawer-section ${idx===0?'first':''}">${section.map(item=>`<button class="drawer-item ${state.page===item.key?'active':''}" onclick="handleDrawerItem('${item.key}')"><div class="drawer-item-left"><div class="drawer-icon">${item.icon}</div><div><div class="drawer-item-title">${item.title}</div><div class="drawer-item-meta">${item.meta||''}</div></div></div><span>›</span></button>`).join('')}</div>`).join('');
}
function handleDrawerItem(key){
  const directPages = new Set(['bible','notes','favorites','plans','progress','devotional','stories','study','search','devotionals','hymns','donation','ads','apostolic','message','audio','store','versions','way','salt','questions','dictionary','themes','maps','blog','instagram','youtube','history','backup','more']);
  if(directPages.has(key)) navigate(key);
  else if(key==='share-app'){ shareApp(); closeDrawer(); }
}

function render(){
  window.scrollTo({top:0,behavior:'smooth'});
  if(state.page==='home') renderHome();
  else if(state.page==='bible') renderBible();
  else if(state.page==='verse') renderVerse();
  else if(state.page==='passage') renderPassageMeditation();
  else if(state.page==='search') renderSearch();
  else if(state.page==='favorites') renderFavorites();
  else if(state.page==='versions') renderVersions();
  else if(state.page==='notes') renderNotes();
  else if(state.page==='plans') simpleListPage('Planos', PLANS, '📚', 'Planos de leitura prontos.');
  else if(state.page==='progress') renderProgress();
  else if(state.page==='devotional') simpleListPage('Devocional Diário', DEVOTIONALS, '🌅', 'Reflexões para hoje.');
  else if(state.page==='stories') simpleListPage('Histórias Bíblicas', STORIES, '📡', 'Seleção de histórias importantes da Bíblia.');
  else if(state.page==='study') simpleListPage('Pesquisa Avançada & Estudo Bíblico', [{title:'Estudo por versículo',desc:'Abra o capítulo e toque em Estudo Bíblico.'},{title:'Notas e destaques',desc:'Registre observações e marque os textos.'}], '🔎', 'Ferramentas de estudo já integradas.');
  else if(state.page==='devotionals') simpleListPage('Devocionais', DEVOTIONALS, '🙏', 'Coleção de meditações e reflexões.');
  else if(state.page==='hymns') simpleListPage('Hinários', ['Harpa Cristã','Corinhos','Louvores'], '🎵', 'Área preparada para louvores e letras.');
  else if(state.page==='donation') simpleListPage('Doação de Bíblias', [{title:'Projeto Missionário',desc:'Página preparada para doações e apoio a projetos.'}], '♡', 'Apoie a divulgação da Palavra.');
  else if(state.page==='ads') simpleListPage('Remover Ads', [{title:'Experiência limpa',desc:'Área preparada para futura remoção de anúncios.'}], '⊘', 'Recurso visual preparado.');
  else if(state.page==='apostolic') simpleListPage('Bíblia Apostólica', [{title:'Conteúdo adicional',desc:'Página preparada para exibir a versão apostólica.'}], '📘');
  else if(state.page==='message') simpleListPage('Bíblia A Mensagem', [{title:'Conteúdo adicional',desc:'Página preparada para exibir a versão A Mensagem.'}], '📕');
  else if(state.page==='audio') simpleListPage('NIV Live Bible Audio', [{title:'Áudio da Bíblia',desc:'Área preparada para audição de versículos e capítulos.'}], '🔊');
  else if(state.page==='store') simpleListPage('Loja da Bíblia', [{title:'Livros e materiais',desc:'Página preparada para catálogo.'}], '🛍');
  else if(state.page==='way') simpleListPage('Caminho Perfeito', [{title:'Reflexões especiais',desc:'Página preparada com conteúdos de caminhada cristã.'}], '∞');
  else if(state.page==='salt') simpleListPage('Evangelize com o SAL', [{title:'Ferramenta evangelística',desc:'Página preparada para ações de evangelismo.'}], '🧂');
  else if(state.page==='questions') simpleListPage('Perguntas Bíblicas', [{title:'Quiz bíblico',desc:'Perguntas e respostas para estudo.'}], '🎮');
  else if(state.page==='dictionary') simpleListPage('Dicionário', DICTIONARY, '🔤', 'Termos bíblicos importantes.');
  else if(state.page==='themes') simpleListPage('Temas', THEMES, '📄', 'Temas bíblicos por assunto.');
  else if(state.page==='maps') simpleListPage('Mapas', MAPS, '🗺', 'Mapas e rotas bíblicas.');
  else if(state.page==='blog') simpleListPage('Blog', [{title:'Novidades do app',desc:'Espaço preparado para artigos e notícias.'}], '📰');
  else if(state.page==='instagram') simpleListPage('Instagram', [{title:'Perfil oficial',desc:'Conecte-se também nas redes sociais.'}], '📷');
  else if(state.page==='youtube') simpleListPage('Youtube', [{title:'Canal oficial',desc:'Área preparada para vídeos e estudos.'}], '▶');
  else if(state.page==='history') renderHistory();
  else if(state.page==='backup') simpleListPage('Backup', [{title:'Salvar dados',desc:'Seus favoritos, notas e histórico ficam salvos no navegador deste aparelho.'}], '☁');
  else if(state.page==='more') renderMore();
  renderDrawer();
}

function escapeHtml(str){ return String(str).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m])); }
function openActiveReadingVerseStudy(){ if(state.activeReadingVerse) openVerseObject({...state.activeReadingVerse}); }
function toggleCurrentVerseFavorite(){ const v=state.selectedVerse; if(!v) return; toggleFullFavorite(v.code,v.bookName,v.chapter,v.verse,v.text); }
function openFavoriteById(id){ const item = state.fullFavorites.find(v=>v.id===id); if(item) openVerseObject({...item}); }
function removeFavoriteById(id){ const item = state.fullFavorites.find(v=>v.id===id); if(item) toggleFullFavorite(item.code,item.bookName,item.chapter,item.verse,item.text); }

Object.assign(window,{ state,openDrawer,closeDrawer,quickOpenVersions,navigate,toggleTheme,renderBible,openBook,openChapter,openVerseFromBible,openVerseObject,
  toggleFullFavorite,openDailyVerse,backToChapter,shareCurrentVerse,searchReference,installAppFromMenu,shareApp,showPrayerInfo,
  toggleVerseSelection,selectAllVerses,clearVerseSelection,readSelectedVerses,readWholeChapter,meditateSelectedVerses,meditateCurrentReading,openVerseByNumber,toggleFavoriteByNumber,
  renderVersePicker,renderPassageMeditation,shareSelectedPassage,backToSelectedChapter,chooseVersesAgain,setMeditationOption,nextMeditationOption,setPassageMeditationOption,nextPassageMeditationOption,
  setReadingActionVerse,shareReadingVerse,copyReadingVerse,fontUp,fontDown,saveVerseNote,setVerseHighlight,renderVersions,setVersionsTab,toggleDualVersion,selectVersion,removeNote,handleDrawerItem,
  openActiveReadingVerseStudy,toggleCurrentVerseFavorite,openFavoriteById,removeFavoriteById
});

if('serviceWorker' in navigator){ navigator.serviceWorker.register('./sw.js').catch(()=>{}); }
render();
