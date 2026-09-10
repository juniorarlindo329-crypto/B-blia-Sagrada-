
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


const WORKING_VERSION_GROUPS = [
  {language:"Português", versions:[
    {name:"Almeida 1819 (Bíblia Livre)",code:"ALM",lang:"pt",slug:"almeida-livre"}
  ]},
  {language:"Inglês", versions:[
    {name:"King James Version",code:"KJV",lang:"en",slug:"kjv"},
    {name:"American Standard Version",code:"ASV",lang:"en",slug:"asv"},
    {name:"World English Bible",code:"WEB",lang:"en",slug:"web"},
    {name:"Geneva Bible 1599",code:"GEN1599",lang:"en",slug:"geneva1599"},
    {name:"Douay-Rheims",code:"DRA",lang:"en",slug:"dra"}
  ]},
  {language:"Alemão", versions:[
    {name:"Lutherbibel 1912",code:"LUT1912",lang:"de",slug:"luth1912"},
    {name:"Elberfelder 1905",code:"ELB1905",lang:"de",slug:"elb1905"}
  ]},
  {language:"Francês", versions:[
    {name:"Louis Segond",code:"LSG",lang:"fr",slug:"lsg"},
    {name:"Darby Français",code:"DARBYFR",lang:"fr",slug:"darby-fr"},
    {name:"Martin 1744",code:"MAR1744",lang:"fr",slug:"martin1744"}
  ]},
  {language:"Italiano", versions:[
    {name:"Diodati 1649",code:"DIO",lang:"it",slug:"diodati"},
    {name:"Riveduta 1927",code:"RIV",lang:"it",slug:"riveduta"}
  ]},
  {language:"Holandês", versions:[{name:"De Heilige Schrift 1917",code:"DUTCH1917",lang:"nl",slug:"dutch1917"}]},
  {language:"Russo", versions:[{name:"Synodal 1876",code:"SYN",lang:"ru",slug:"synodal"}]},
  {language:"Ucraniano", versions:[{name:"Kulish-Puluj 1905",code:"KP",lang:"uk",slug:"kp"}]},
  {language:"Polonês", versions:[{name:"Biblia Gdańska",code:"BG",lang:"pl",slug:"bg"}]},
  {language:"Tcheco", versions:[{name:"Bible kralická",code:"BKR",lang:"cs",slug:"bkr"}]},
  {language:"Húngaro", versions:[{name:"Károli Biblia",code:"KAR",lang:"hu",slug:"kar"}]},
  {language:"Romeno", versions:[{name:"Cornilescu",code:"VDC",lang:"ro",slug:"vdc"}]},
  {language:"Dinamarquês", versions:[{name:"Dansk Bibel 1931",code:"DAN1931",lang:"da",slug:"dansk1931"}]},
  {language:"Sueco", versions:[{name:"Bibeln 1917",code:"SV1917",lang:"sv",slug:"sv1917"}]},
  {language:"Norueguês", versions:[{name:"Norsk Bibel 1930",code:"NB1930",lang:"nb",slug:"nb1930"}]},
  {language:"Esperanto", versions:[{name:"La Sankta Biblio",code:"LSB",lang:"eo",slug:"lsb"}]},
  {language:"Chinês", versions:[
    {name:"Chinese Union Version",code:"CUV",lang:"zh",slug:"cuv"},
    {name:"Chinese Union Version Simplified",code:"CUVS",lang:"zh",slug:"cuvs"}
  ]},
  {language:"Árabe", versions:[{name:"Smith-Van Dyck",code:"SVD",lang:"ar",slug:"svd"}]},
  {language:"Vietnamita", versions:[{name:"Kinh Thánh 1934",code:"VI1934",lang:"vi",slug:"vi1934"}]},
  {language:"Hebraico", versions:[
    {name:"Westminster Leningrad Codex",code:"WLC",lang:"he",slug:"wlc"},
    {name:"Aleppo Codex",code:"ALEPPO",lang:"he",slug:"aleppo"}
  ]},
  {language:"Grego", versions:[{name:"Textus Receptus",code:"TR",lang:"gr",slug:"tr"}]},
  {language:"Latim", versions:[
    {name:"Vulgata",code:"VULG",lang:"la",slug:"vulg"},
    {name:"Vulgata Clementina",code:"CLEM",lang:"la",slug:"clem"}
  ]}
];
const WORKING_VERSION_CODES = new Set(WORKING_VERSION_GROUPS.flatMap(g=>g.versions.map(v=>v.code)));
const DATA_ROOT = "https://raw.githubusercontent.com/midvash/bible-data/main/versions";

const PLAN_DETAILS = [
  {id:"sete-dias",title:"7 Dias com Deus",desc:"Uma semana de fé, descanso e direção.",days:[
    ["Prov",3,5,"Confiança"],["Ps",23,1,"Cuidado"],["Isa",41,10,"Coragem"],["Phil",4,6,"Paz"],["Matt",11,28,"Descanso"],["Rom",8,28,"Esperança"],["John",3,16,"Amor"]
  ]},
  {id:"salmos-fe",title:"Salmos para fortalecer a fé",desc:"Sete leituras para oração e encorajamento.",days:[
    ["Ps",1,1,"Caminho"],["Ps",27,1,"Coragem"],["Ps",34,8,"Bondade"],["Ps",46,1,"Refúgio"],["Ps",91,1,"Proteção"],["Ps",119,105,"Direção"],["Ps",121,1,"Socorro"]
  ]},
  {id:"joao",title:"Conhecendo Jesus em João",desc:"Sete passagens centrais do Evangelho de João.",days:[
    ["John",1,1,"A Palavra"],["John",3,16,"Amor"],["John",4,14,"Água viva"],["John",8,12,"Luz"],["John",10,11,"Bom Pastor"],["John",14,6,"Caminho"],["John",15,5,"Permanecer"]
  ]}
];

const DAILY_DEVOTIONALS_FULL = [
  {title:"Confiança para hoje",ref:["Prov",3,5],reflection:"Nem sempre teremos todas as respostas. A confiança em Deus cresce quando fazemos nossa parte e entregamos a Ele aquilo que não conseguimos controlar.",question:"O que você precisa entregar a Deus hoje?",prayer:"Senhor, ensina-me a confiar em ti com todo o coração e guia minhas decisões. Amém."},
  {title:"Deus cuida de você",ref:["Ps",23,1],reflection:"A imagem do pastor lembra cuidado, presença e direção. Mesmo em dias corridos, podemos descansar sabendo que não caminhamos sozinhos.",question:"Onde você mais precisa perceber o cuidado de Deus?",prayer:"Deus, conduz meus passos e dá descanso ao meu coração. Amém."},
  {title:"Coragem no medo",ref:["Isa",41,10],reflection:"Coragem não é ausência de medo. É continuar caminhando lembrando que Deus permanece conosco e pode nos fortalecer no próximo passo.",question:"Qual próximo passo você precisa dar com coragem?",prayer:"Senhor, fortalece-me e ajuda-me a não ser dominado pelo medo. Amém."},
  {title:"Transforme preocupação em oração",ref:["Phil",4,6],reflection:"Quando a mente fica cheia de preocupações, a oração cria um espaço de entrega. Falar com Deus não elimina responsabilidades, mas muda como carregamos o peso.",question:"Qual preocupação pode virar oração agora?",prayer:"Pai, recebe minhas preocupações e dá-me serenidade para agir com sabedoria. Amém."},
  {title:"Descanso para a alma",ref:["Matt",11,28],reflection:"Jesus acolhe quem chega cansado. Não precisamos fingir força o tempo todo; podemos reconhecer nossos limites e buscar nele renovação.",question:"Que peso você está carregando sozinho?",prayer:"Jesus, renova minhas forças e dá descanso à minha alma. Amém."},
  {title:"Esperança no processo",ref:["Rom",8,28],reflection:"Nem toda situação é boa, mas Deus pode produzir amadurecimento e novos caminhos até em tempos difíceis. A esperança nos ajuda a não definir o futuro pelo momento atual.",question:"O que esta fase pode estar ensinando a você?",prayer:"Deus, ajuda-me a confiar em tua ação mesmo quando eu ainda não entendo o processo. Amém."},
  {title:"Amor que transforma",ref:["John",3,16],reflection:"O amor de Deus é a base da mensagem cristã. Receber esse amor também nos chama a demonstrá-lo em atitudes concretas com outras pessoas.",question:"Como você pode demonstrar amor hoje?",prayer:"Deus, obrigado pelo teu amor. Ensina-me a amar com atitudes. Amém."}
];

const STORY_DETAILS = [
  {id:"criacao",title:"Criação",ref:"Gênesis 1",open:["Gen",1,1],summary:"Gênesis apresenta Deus como Criador e mostra uma criação organizada, boa e cheia de propósito.",lesson:"A vida tem valor e propósito; cuidar da criação também faz parte da responsabilidade humana."},
  {id:"noe",title:"Noé",ref:"Gênesis 6–9",open:["Gen",6,9],summary:"Noé responde com obediência em uma geração marcada pela violência e atravessa o dilúvio com sua família.",lesson:"Fidelidade e obediência podem exigir perseverança mesmo quando o caminho parece incomum."},
  {id:"abraao",title:"Abraão",ref:"Gênesis 12–22",open:["Gen",12,1],summary:"Abraão é chamado a sair de sua terra e aprende a caminhar por fé, entre promessas, espera e decisões difíceis.",lesson:"A fé amadurece quando confiamos em Deus ao longo do processo, não apenas no resultado."},
  {id:"jose",title:"José",ref:"Gênesis 37–50",open:["Gen",37,1],summary:"José passa por rejeição, injustiça e prisão antes de ocupar uma posição de grande responsabilidade no Egito.",lesson:"Circunstâncias difíceis não precisam determinar nosso caráter nem encerrar nossa história."},
  {id:"moises",title:"Moisés",ref:"Êxodo 2–20",open:["Exod",3,1],summary:"Moisés é chamado para conduzir Israel para fora do Egito e aprende a depender de Deus diante de grandes desafios.",lesson:"Chamado e responsabilidade crescem junto com dependência, coragem e perseverança."},
  {id:"davi",title:"Davi",ref:"1 Samuel 16–17",open:["1Sam",17,1],summary:"Davi passa do cuidado de ovelhas ao confronto com Golias e depois enfrenta uma longa caminhada até o reino.",lesson:"Preparação silenciosa e confiança podem nos preparar para desafios maiores."},
  {id:"ester",title:"Ester",ref:"Ester 2–8",open:["Esth",4,14],summary:"Ester usa sua posição e coragem para interceder por seu povo em um momento de grande ameaça.",lesson:"Influência e oportunidade podem ser usadas com coragem para proteger e servir outras pessoas."},
  {id:"jesus",title:"Jesus",ref:"Mateus 1–28",open:["Matt",5,1],summary:"Os Evangelhos apresentam a vida, os ensinos, a morte e a ressurreição de Jesus, centro da fé cristã.",lesson:"Seguir Jesus envolve fé, amor, verdade, serviço e transformação de vida."},
  {id:"paulo",title:"Paulo",ref:"Atos 9–28",open:["Acts",9,1],summary:"Paulo passa de perseguidor da igreja a missionário, levando o evangelho a diferentes cidades e culturas.",lesson:"Uma vida pode mudar profundamente e encontrar um novo propósito."}
];

const DEVOTIONAL_LIBRARY = [
  {id:"paz",title:"Paz em dias agitados",ref:["Phil",4,6],text:"A paz não depende de controlar tudo. Ela cresce quando a preocupação é levada a Deus e quando escolhemos agir com sabedoria no que está ao nosso alcance."},
  {id:"sabedoria",title:"Sabedoria para decidir",ref:["Prov",3,5],text:"Decisões melhores nascem quando unimos reflexão, conselho, responsabilidade e confiança em Deus."},
  {id:"espera",title:"Aprendendo a esperar",ref:["Ps",27,14],text:"Esperar não é ficar parado. É continuar fiel enquanto o resultado ainda não chegou."},
  {id:"perdao",title:"O caminho do perdão",ref:["Matt",6,14],text:"Perdoar não apaga o que aconteceu, mas pode impedir que a dor continue governando o presente."},
  {id:"coragem",title:"Coragem para continuar",ref:["Josh",1,9],text:"Alguns passos precisam ser dados com medo mesmo. A coragem cresce quando lembramos de quem caminha conosco."},
  {id:"gratidao",title:"Praticando gratidão",ref:["1Thess",5,18],text:"Gratidão não ignora problemas; ela nos ajuda a perceber também aquilo que continua sendo motivo de cuidado, aprendizado e esperança."},
  {id:"servir",title:"Servir com propósito",ref:["Mark",10,45],text:"Serviço transforma relacionamentos quando nasce do amor, não da busca por reconhecimento."},
  {id:"recomeco",title:"Recomeçar",ref:["Lam",3,22],text:"Há dias em que recomeçar é a maior demonstração de fé. Misericórdia e esperança nos lembram que uma nova etapa pode começar."}
];

const BIBLE_DICTIONARY_FULL = [
  ["Aliança","Compromisso estabelecido entre Deus e seu povo, com promessas e responsabilidades."],
  ["Amém","Expressão de confirmação: assim seja, verdadeiramente."],
  ["Apóstolo","Enviado ou mensageiro; no Novo Testamento, termo ligado especialmente aos enviados de Jesus."],
  ["Arrependimento","Mudança de mente e direção que envolve reconhecer o erro e buscar um novo caminho."],
  ["Discípulo","Pessoa que aprende e segue os ensinamentos de um mestre."],
  ["Evangelho","Boa notícia; no cristianismo, a mensagem sobre Jesus Cristo."],
  ["Fé","Confiança em Deus e resposta de vida baseada nessa confiança."],
  ["Graça","Favor e bondade de Deus oferecidos sem serem conquistados por mérito humano."],
  ["Messias","Ungido; título associado ao esperado rei e libertador prometido nas Escrituras."],
  ["Misericórdia","Compaixão que se manifesta em cuidado, perdão e ajuda."],
  ["Páscoa","Celebração ligada à libertação de Israel do Egito e, no cristianismo, associada à morte e ressurreição de Jesus."],
  ["Profeta","Pessoa chamada para transmitir uma mensagem de Deus ao povo."],
  ["Redenção","Ideia de libertação ou resgate mediante pagamento ou ação salvadora."],
  ["Salvação","Libertação do pecado e reconciliação com Deus."],
  ["Santidade","Separação para Deus e vida orientada por seus valores."],
  ["Testamento","Aliança; também nome das duas grandes divisões da Bíblia cristã."]
].map(([term,meaning])=>({term,meaning}));

const THEME_DETAILS = [
  {id:"fe",title:"Fé",refs:[["Heb",11,1],["2Cor",5,7],["Mark",11,24]]},
  {id:"perdao",title:"Perdão",refs:[["Matt",6,14],["Eph",4,32],["Col",3,13]]},
  {id:"esperanca",title:"Esperança",refs:[["Rom",15,13],["Jer",29,11],["Ps",42,11]]},
  {id:"familia",title:"Família",refs:[["Josh",24,15],["Prov",22,6],["Eph",6,1]]},
  {id:"sabedoria",title:"Sabedoria",refs:[["Prov",3,5],["Jas",1,5],["Prov",4,7]]},
  {id:"oracao",title:"Oração",refs:[["Phil",4,6],["Matt",6,6],["1Thess",5,17]]},
  {id:"salvacao",title:"Salvação",refs:[["John",3,16],["Rom",10,9],["Eph",2,8]]},
  {id:"coragem",title:"Coragem",refs:[["Josh",1,9],["Isa",41,10],["Ps",27,1]]}
];

const BIBLE_MAP_STUDIES = [
  {id:"exodo",title:"Rota do Êxodo",desc:"Estudo dos principais momentos da saída do Egito e da caminhada pelo deserto.",refs:[["Exod",12,31],["Exod",14,21],["Exod",19,1]]},
  {id:"paulo",title:"Viagens missionárias de Paulo",desc:"Passagens centrais das viagens e missões de Paulo em Atos.",refs:[["Acts",13,1],["Acts",16,6],["Acts",18,1]]},
  {id:"jerusalem",title:"Jerusalém Bíblica",desc:"Textos importantes ligados a Jerusalém no Antigo e Novo Testamento.",refs:[["2Sam",5,6],["Ps",122,1],["Luke",19,28]]},
  {id:"galileia",title:"Galileia no ministério de Jesus",desc:"Passagens ligadas ao ministério de Jesus na região da Galileia.",refs:[["Matt",4,12],["Mark",1,14],["John",2,1]]}
];

const QUIZ_QUESTIONS = [
  {id:"q01",type:"Conhecimento",q:"Quem construiu a arca?",answers:["Abraão","Noé","Moisés","Davi"],correct:"Noé"},
  {id:"q02",type:"Conhecimento",q:"Qual livro começa com a criação do mundo?",answers:["Êxodo","Salmos","Gênesis","Mateus"],correct:"Gênesis"},
  {id:"q03",type:"Conhecimento",q:"Quem enfrentou Golias?",answers:["Davi","Salomão","Josué","Samuel"],correct:"Davi"},
  {id:"q04",type:"Conhecimento",q:"Quem recebeu os Dez Mandamentos?",answers:["Pedro","Moisés","Paulo","José"],correct:"Moisés"},
  {id:"q05",type:"Conhecimento",q:"Em qual cidade Jesus nasceu?",answers:["Jerusalém","Nazaré","Belém","Roma"],correct:"Belém"},
  {id:"q06",type:"Conhecimento",q:"Qual discípulo negou Jesus três vezes?",answers:["João","Tiago","Pedro","André"],correct:"Pedro"},
  {id:"q07",type:"Conhecimento",q:"Quem foi lançado na cova dos leões?",answers:["Daniel","Elias","Jonas","Neemias"],correct:"Daniel"},
  {id:"q08",type:"Conhecimento",q:"Quem foi engolido por um grande peixe?",answers:["Jonas","Amós","Joel","Oséias"],correct:"Jonas"},
  {id:"q09",type:"Conhecimento",q:"Qual é o último livro do Novo Testamento?",answers:["Judas","Hebreus","Atos","Apocalipse"],correct:"Apocalipse"},
  {id:"q10",type:"Conhecimento",q:"Quem escreveu muitas cartas do Novo Testamento?",answers:["Paulo","Pilatos","Herodes","Zaqueu"],correct:"Paulo"},
  {id:"q11",type:"Quem sou eu?",q:"Fui vendido pelos meus irmãos e depois me tornei governador no Egito. Quem sou eu?",answers:["José","Benjamim","Isaque","Josué"],correct:"José"},
  {id:"q12",type:"Quem sou eu?",q:"Deus me chamou para sair da minha terra e prometeu fazer de mim uma grande nação. Quem sou eu?",answers:["Abraão","Jacó","Samuel","Calebe"],correct:"Abraão"},
  {id:"q13",type:"Quem sou eu?",q:"Fui conhecido por minha grande força e meu cabelo tinha relação com meu voto. Quem sou eu?",answers:["Sansão","Gideão","Saul","Davi"],correct:"Sansão"},
  {id:"q14",type:"Quem sou eu?",q:"Pedi sabedoria a Deus e fui rei de Israel. Quem sou eu?",answers:["Salomão","Saul","Ezequias","Josias"],correct:"Salomão"},
  {id:"q15",type:"Quem sou eu?",q:"Ouvi Deus me chamar quando ainda era menino e respondi: 'Fala'. Quem sou eu?",answers:["Samuel","Davi","Timóteo","João"],correct:"Samuel"},
  {id:"q16",type:"Quem sou eu?",q:"Subi numa árvore para conseguir ver Jesus. Quem sou eu?",answers:["Zaqueu","Nicodemos","Bartimeu","Lázaro"],correct:"Zaqueu"},
  {id:"q17",type:"Quem sou eu?",q:"Preparei o caminho do Senhor e batizei Jesus. Quem sou eu?",answers:["João Batista","Pedro","Filipe","Tiago"],correct:"João Batista"},
  {id:"q18",type:"Quem sou eu?",q:"Fui rainha e arrisquei minha vida para ajudar meu povo. Quem sou eu?",answers:["Ester","Rute","Débora","Miriã"],correct:"Ester"},
  {id:"q19",type:"Quem sou eu?",q:"Fui chamado por Jesus quando trabalhava como cobrador de impostos. Quem sou eu?",answers:["Mateus","André","Tomé","Bartolomeu"],correct:"Mateus"},
  {id:"q20",type:"Quem sou eu?",q:"Disse: 'Eis-me aqui, envia-me a mim'. Quem sou eu?",answers:["Isaías","Jeremias","Ezequiel","Daniel"],correct:"Isaías"},
  {id:"q21",type:"Verdadeiro ou falso",q:"Moisés entrou na arca com Noé.",answers:["Verdadeiro","Falso"],correct:"Falso"},
  {id:"q22",type:"Verdadeiro ou falso",q:"Davi foi pastor de ovelhas antes de ser rei.",answers:["Verdadeiro","Falso"],correct:"Verdadeiro"},
  {id:"q23",type:"Verdadeiro ou falso",q:"Jesus teve doze apóstolos.",answers:["Verdadeiro","Falso"],correct:"Verdadeiro"},
  {id:"q24",type:"Verdadeiro ou falso",q:"Jonas foi enviado para pregar em Nínive.",answers:["Verdadeiro","Falso"],correct:"Verdadeiro"},
  {id:"q25",type:"Verdadeiro ou falso",q:"Salomão derrotou Golias.",answers:["Verdadeiro","Falso"],correct:"Falso"},
  {id:"q26",type:"Verdadeiro ou falso",q:"Paulo se chamava Saulo antes de sua conversão.",answers:["Verdadeiro","Falso"],correct:"Verdadeiro"},
  {id:"q27",type:"Verdadeiro ou falso",q:"Rute era sogra de Noemi.",answers:["Verdadeiro","Falso"],correct:"Falso"},
  {id:"q28",type:"Verdadeiro ou falso",q:"Daniel interpretou sonhos.",answers:["Verdadeiro","Falso"],correct:"Verdadeiro"},
  {id:"q29",type:"Verdadeiro ou falso",q:"Pedro caminhou sobre as águas em direção a Jesus.",answers:["Verdadeiro","Falso"],correct:"Verdadeiro"},
  {id:"q30",type:"Verdadeiro ou falso",q:"O livro de Salmos está no Novo Testamento.",answers:["Verdadeiro","Falso"],correct:"Falso"},
  {id:"q31",type:"Complete",q:"Complete: 'O Senhor é o meu ___; nada me faltará.'",answers:["pastor","rei","juiz","profeta"],correct:"pastor"},
  {id:"q32",type:"Complete",q:"Complete: 'No princípio criou Deus os céus e a ___.'",answers:["terra","cidade","luz","água"],correct:"terra"},
  {id:"q33",type:"Complete",q:"Complete: 'Tudo posso naquele que me ___.'",answers:["fortalece","ensina","ouve","acompanha"],correct:"fortalece"},
  {id:"q34",type:"Complete",q:"Complete: 'Bem-aventurados os pacificadores, porque serão chamados filhos de ___.'",answers:["Deus","Abraão","Israel","Davi"],correct:"Deus"},
  {id:"q35",type:"Complete",q:"Complete: 'Eu sou o caminho, e a verdade, e a ___.'",answers:["vida","força","luz","paz"],correct:"vida"},
  {id:"q36",type:"Livros da Bíblia",q:"Qual destes é um Evangelho?",answers:["Mateus","Romanos","Hebreus","Atos"],correct:"Mateus"},
  {id:"q37",type:"Livros da Bíblia",q:"Qual destes livros pertence ao Antigo Testamento?",answers:["Isaías","Efésios","Tiago","Filipenses"],correct:"Isaías"},
  {id:"q38",type:"Livros da Bíblia",q:"Qual livro vem depois de Gênesis?",answers:["Êxodo","Levítico","Números","Josué"],correct:"Êxodo"},
  {id:"q39",type:"Livros da Bíblia",q:"Qual livro narra o início da igreja cristã e as viagens dos apóstolos?",answers:["Atos","Romanos","Lucas","Apocalipse"],correct:"Atos"},
  {id:"q40",type:"Livros da Bíblia",q:"Qual destes é um livro de sabedoria/poesia do Antigo Testamento?",answers:["Provérbios","Marcos","Atos","Gálatas"],correct:"Provérbios"},
  {id:"q41",type:"Jesus",q:"Qual foi o primeiro milagre de Jesus registrado no Evangelho de João?",answers:["Transformar água em vinho","Multiplicar pães","Acalmar a tempestade","Curar Bartimeu"],correct:"Transformar água em vinho"},
  {id:"q42",type:"Jesus",q:"Quem batizou Jesus?",answers:["João Batista","Pedro","Tiago","André"],correct:"João Batista"},
  {id:"q43",type:"Jesus",q:"Quantos dias Jesus jejuou no deserto?",answers:["40","7","12","30"],correct:"40"},
  {id:"q44",type:"Jesus",q:"Quem traiu Jesus?",answers:["Judas Iscariotes","Pedro","João","Tomé"],correct:"Judas Iscariotes"},
  {id:"q45",type:"Jesus",q:"Quem ajudou a carregar a cruz de Jesus?",answers:["Simão de Cirene","José de Arimateia","Nicodemos","Bartimeu"],correct:"Simão de Cirene"},
  {id:"q46",type:"Antigo Testamento",q:"Quem liderou o povo de Israel após a morte de Moisés?",answers:["Josué","Arão","Calebe","Samuel"],correct:"Josué"},
  {id:"q47",type:"Antigo Testamento",q:"Qual profeta desafiou os profetas de Baal no monte Carmelo?",answers:["Elias","Eliseu","Isaías","Jeremias"],correct:"Elias"},
  {id:"q48",type:"Antigo Testamento",q:"Quem sonhou com uma escada que chegava ao céu?",answers:["Jacó","José","Isaque","Abraão"],correct:"Jacó"},
  {id:"q49",type:"Antigo Testamento",q:"Quem foi mãe de Samuel?",answers:["Ana","Sara","Raquel","Rebeca"],correct:"Ana"},
  {id:"q50",type:"Antigo Testamento",q:"Quem sucedeu Elias como profeta?",answers:["Eliseu","Isaías","Amós","Oséias"],correct:"Eliseu"},
  {id:"q51",type:"Novo Testamento",q:"Quem foi o primeiro mártir cristão citado em Atos?",answers:["Estêvão","Paulo","Pedro","Barnabé"],correct:"Estêvão"},
  {id:"q52",type:"Novo Testamento",q:"Quem acompanhou Paulo em várias viagens missionárias e escreveu um Evangelho e Atos?",answers:["Lucas","Marcos","Timóteo","Silas"],correct:"Lucas"},
  {id:"q53",type:"Novo Testamento",q:"Quem teve uma visão de um lençol com animais antes de visitar Cornélio?",answers:["Pedro","Paulo","João","Filipe"],correct:"Pedro"},
  {id:"q54",type:"Novo Testamento",q:"Em qual cidade os discípulos foram chamados cristãos pela primeira vez?",answers:["Antioquia","Jerusalém","Roma","Éfeso"],correct:"Antioquia"},
  {id:"q55",type:"Novo Testamento",q:"Quem foi companheiro de Paulo e Silas na prisão em Filipos?",answers:["Paulo e Silas estavam juntos","Barnabé","Timóteo","Tito"],correct:"Paulo e Silas estavam juntos"},
  {id:"q56",type:"Números bíblicos",q:"Quantos dias e noites choveu durante o dilúvio, segundo Gênesis?",answers:["40","7","12","70"],correct:"40"},
  {id:"q57",type:"Números bíblicos",q:"Quantos irmãos José tinha, filhos de Jacó além dele?",answers:["11","10","12","7"],correct:"11"},
  {id:"q58",type:"Números bíblicos",q:"Quantas pedras Davi escolheu antes de enfrentar Golias?",answers:["5","3","7","12"],correct:"5"},
  {id:"q59",type:"Números bíblicos",q:"Quantos pães foram usados na alimentação dos cinco mil, além dos peixes?",answers:["5","7","12","2"],correct:"5"},
  {id:"q60",type:"Números bíblicos",q:"Quantos dias Jesus permaneceu aparecendo aos discípulos antes da ascensão, segundo Atos?",answers:["40","50","30","12"],correct:"40"}
];

const BLOG_ARTICLES = [
  {id:"como-meditar",title:"Como meditar em um versículo",date:"Estudo",body:"Leia o texto mais de uma vez. Observe palavras que se repetem, o contexto, o que o versículo revela sobre Deus e qual atitude prática pode nascer dessa leitura. Termine transformando a reflexão em oração."},
  {id:"habito",title:"Criando um hábito de leitura bíblica",date:"Dica",body:"Comece pequeno e constante. Escolha um horário possível, leia uma porção curta, faça uma anotação e volte no dia seguinte. Consistência é mais útil do que metas enormes que não cabem na rotina."},
  {id:"anotacoes",title:"Por que fazer anotações?",date:"Ferramenta",body:"Anotar ajuda a registrar perguntas, aprendizados e aplicações. Ao reler depois, você consegue perceber temas recorrentes e acompanhar seu crescimento no estudo."}
];

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
  currentVersionCode:localStorage.getItem("bs-version")||"ALM",
  downloadedVersions:JSON.parse(localStorage.getItem("bs-downloaded-versions")||"[\"ALM\"]"),
  versionsTab:localStorage.getItem("bs-versions-tab")||"all",
  dualVersion:false,
  fontScale:Number(localStorage.getItem("bs-font-scale")||1),
  notes:JSON.parse(localStorage.getItem("bs-notes")||"{}"),
  highlights:JSON.parse(localStorage.getItem("bs-highlights")||"{}"),
  readMarks:JSON.parse(localStorage.getItem("bs-read-marks")||"{}"),
  readMarkColor:localStorage.getItem("bs-read-mark-color")||"mint",
  history:JSON.parse(localStorage.getItem("bs-history")||"[]"),
  quizRound:null,
  quizIndex:0,
  quizScore:0,
  quizAnswered:null,
  bibleQuickPicker:null,
  drawerOpen:false
};

if(!WORKING_VERSION_CODES.has(state.currentVersionCode)){
  state.currentVersionCode="ALM";
  localStorage.setItem("bs-version","ALM");
}
state.downloadedVersions = state.downloadedVersions.filter(c=>WORKING_VERSION_CODES.has(c));
if(!state.downloadedVersions.includes("ALM")) state.downloadedVersions.unshift("ALM");
localStorage.setItem("bs-downloaded-versions",JSON.stringify(state.downloadedVersions));

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

const READ_MARK_COLORS = [
  {id:"mint", bg:"#b8ddb3", fg:"#18311b", label:"Verde"},
  {id:"lime", bg:"#d5ff25", fg:"#171717", label:"Limão"},
  {id:"yellow", bg:"#efe88d", fg:"#332d08", label:"Amarelo"},
  {id:"blue", bg:"#9ec9ef", fg:"#172b3a", label:"Azul"},
  {id:"orange", bg:"#f6cf87", fg:"#39250c", label:"Laranja"},
  {id:"rose", bg:"#efa0c3", fg:"#42162b", label:"Rosa"},
  {id:"purple", bg:"#aa38f0", fg:"#ffffff", label:"Roxo"}
];

if(!READ_MARK_COLORS.some(c=>c.id===state.readMarkColor)){
  state.readMarkColor="mint";
  localStorage.setItem("bs-read-mark-color","mint");
}

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
  for(const group of WORKING_VERSION_GROUPS){
    const found = group.versions.find(v=>v.code===code);
    if(found) return {...found, language:group.language};
  }
  return {...WORKING_VERSION_GROUPS[0].versions[0], language:"Português"};
}
function getVersionLabel(){
  const v = getVersionMeta(state.currentVersionCode);
  return `${v.code}`;
}
function localDateKey(date=new Date()){
  const y=date.getFullYear();
  const m=String(date.getMonth()+1).padStart(2,"0");
  const d=String(date.getDate()).padStart(2,"0");
  return `${y}-${m}-${d}`;
}
function addHistory(item){
  state.history = [item, ...state.history.filter(x=>x.id!==item.id)].slice(0,60);
  saveJSON("bs-history", state.history);
  const days=JSON.parse(localStorage.getItem("bs-reading-days")||"[]");
  const today=localDateKey();
  if(!days.includes(today)){ days.push(today); saveJSON("bs-reading-days",days.slice(-400)); }
}
function getFavorite(id){ return state.fullFavorites.find(x=>x.id===id); }
function getVerseNote(id){ return state.notes[id] || ""; }
function getVerseHighlight(id){ return state.highlights[id] || null; }
function getVerseReadMark(id){ return state.readMarks[id] || null; }
function getReadMarkColor(id){ return READ_MARK_COLORS.find(c=>c.id===id) || READ_MARK_COLORS[0]; }

function setReadMarkColor(colorId){
  if(!READ_MARK_COLORS.some(c=>c.id===colorId)) return;
  state.readMarkColor=colorId;
  localStorage.setItem("bs-read-mark-color",colorId);
  if(state.page==="bible") renderBible();
}

function toggleVerseReadByNumber(number){
  const v=getCurrentVerse(number);
  if(!v) return;
  const id=refId(state.selectedBookCode,state.selectedChapter,v.number);
  if(state.readMarks[id]){
    delete state.readMarks[id];
    toast(`Versículo ${v.number} desmarcado`);
  }else{
    state.readMarks[id]=state.readMarkColor;
    toast(`Versículo ${v.number} marcado como lido`);
  }
  saveJSON("bs-read-marks",state.readMarks);
  renderBible();
}

function markAllChapterRead(){
  if(!state.currentChapterVerses.length) return;
  for(const v of state.currentChapterVerses){
    state.readMarks[refId(state.selectedBookCode,state.selectedChapter,v.number)]=state.readMarkColor;
  }
  saveJSON("bs-read-marks",state.readMarks);
  toast("Capítulo marcado como lido");
  renderBible();
}

function clearChapterReadMarks(){
  for(const v of state.currentChapterVerses){
    delete state.readMarks[refId(state.selectedBookCode,state.selectedChapter,v.number)];
  }
  saveJSON("bs-read-marks",state.readMarks);
  toast("Marcações de leitura removidas");
  renderBible();
}

function chapterReadCount(){
  return state.currentChapterVerses.filter(v=>getVerseReadMark(refId(state.selectedBookCode,state.selectedChapter,v.number))).length;
}

function renderReadMarkerToolbar(){
  const readCount=chapterReadCount();
  const total=state.currentChapterVerses.length;
  const pct=total ? Math.round(readCount/total*100) : 0;
  return `<div class="read-marker-toolbar">
    <div class="read-marker-head">
      <div>
        <strong>✓ Marcar o que já leu</strong>
        <div class="small">${readCount} de ${total} versículos lidos • ${pct}%</div>
      </div>
      <button class="mini-btn" onclick="markAllChapterRead()">Marcar todos</button>
    </div>
    <div class="read-progress-track"><span style="width:${pct}%"></span></div>
    <div class="read-color-picker">
      <span class="small">Cor:</span>
      ${READ_MARK_COLORS.map(c=>`<button class="read-color-dot ${state.readMarkColor===c.id?'active':''}" style="--read-color:${c.bg};--read-fg:${c.fg}" title="${c.label}" onclick="setReadMarkColor('${c.id}')">${state.readMarkColor===c.id?'✓':''}</button>`).join('')}
      ${readCount?`<button class="read-clear-btn" onclick="clearChapterReadMarks()">Limpar capítulo</button>`:''}
    </div>
    <div class="small read-marker-help">Escolha uma cor e toque em <strong>Marcar lido</strong> em cada versículo conforme for lendo.</div>
  </div>`;
}

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
  const meta=getVersionMeta(state.currentVersionCode);
  const cacheKey=`${meta.code}:${code}`;
  if(state.bookCache.has(cacheKey)) return state.bookCache.get(cacheKey);
  const url=`${DATA_ROOT}/${meta.lang}/${meta.slug}/books/${code}.json`;
  try{
    const response=await fetch(url,{cache:"force-cache"});
    if(!response.ok) throw new Error("HTTP "+response.status);
    const data=await response.json();
    state.bookCache.set(cacheKey,data);
    return data;
  }catch(e){
    throw new Error("Falha ao carregar livro");
  }
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
  window.scrollTo({top:0,behavior:"auto"});
  state.selectedChapter=Number(chapter);
  state.selectedVerseNumbers=[];
  state.chapterMode="read";
  state.currentChapterVerses=[];
  state.activeReadingVerse=null;
  await renderBible();
  requestAnimationFrame(()=>window.scrollTo({top:0,behavior:"auto"}));
}
async function jumpToBook(code){
  closeBibleQuickPicker();
  state.selectedBookCode=code;
  state.selectedChapter=null;
  state.selectedVerseNumbers=[];
  state.chapterMode="read";
  state.activeReadingVerse=null;
  await renderBible();
}

async function jumpToChapter(chapter){
  closeBibleQuickPicker();
  await openChapter(Number(chapter));
}

function jumpToVerse(number){
  closeBibleQuickPicker();
  const el=document.getElementById(`verse-${Number(number)}`);
  if(el){
    const v=getCurrentVerse(number);
    if(v){
      state.activeReadingVerse={
        code:state.selectedBookCode,
        bookName:NAME_BY_CODE[state.selectedBookCode]||state.selectedBookCode,
        chapter:Number(state.selectedChapter),
        verse:Number(v.number),
        text:v.text
      };
    }
    el.scrollIntoView({behavior:"smooth",block:"start"});
    setTimeout(()=>renderReadingActionSheet(),250);
  }
}

function ensureBibleQuickPicker(){
  let picker=document.getElementById("bibleQuickPicker");
  if(!picker){
    picker=document.createElement("div");
    picker.id="bibleQuickPicker";
    picker.className="bible-quick-picker";
    picker.innerHTML=`<button class="bible-picker-backdrop" onclick="closeBibleQuickPicker()" aria-label="Fechar"></button><div class="bible-picker-sheet"><div id="biblePickerContent"></div></div>`;
    document.body.appendChild(picker);
  }
  return picker;
}

function closeBibleQuickPicker(){
  state.bibleQuickPicker=null;
  document.getElementById("bibleQuickPicker")?.classList.remove("open");
}

function showBookQuickPicker(){
  state.bibleQuickPicker="book";
  const picker=ensureBibleQuickPicker();
  const mount=picker.querySelector("#biblePickerContent");
  mount.innerHTML=`
    <div class="picker-head">
      <div><span class="eyebrow">BÍBLIA</span><h2>Escolha o livro</h2></div>
      <button class="circle-btn" onclick="closeBibleQuickPicker()">✕</button>
    </div>
    <div class="picker-testament-tabs">
      <button class="tab ${state.testament==="old"?"active":""}" onclick="state.testament='old';showBookQuickPicker()">Antigo Testamento</button>
      <button class="tab ${state.testament==="new"?"active":""}" onclick="state.testament='new';showBookQuickPicker()">Novo Testamento</button>
    </div>
    <div class="picker-book-list">
      ${BOOKS[state.testament].map(([name,code])=>`
        <button class="picker-book-btn ${state.selectedBookCode===code?"active":""}" onclick="jumpToBook('${code}')">
          <span class="book-letter">${name.replace(/[0-9 ]/g,"").charAt(0)}</span>
          <span><strong>${name}</strong><small>${state.selectedBookCode===code?"Livro atual":"Abrir capítulos"}</small></span>
          <b>›</b>
        </button>`).join("")}
    </div>`;
  picker.classList.add("open");
}

async function showChapterQuickPicker(){
  if(!state.selectedBookCode){showBookQuickPicker();return;}
  state.bibleQuickPicker="chapter";
  const picker=ensureBibleQuickPicker();
  const mount=picker.querySelector("#biblePickerContent");
  const bookName=NAME_BY_CODE[state.selectedBookCode]||state.selectedBookCode;
  mount.innerHTML=`<div class="picker-loading"><span class="spinner"></span><strong>Carregando capítulos...</strong></div>`;
  picker.classList.add("open");
  try{
    const book=await fetchBook(state.selectedBookCode);
    mount.innerHTML=`
      <div class="picker-head">
        <div><span class="eyebrow">ESCOLHA O CAPÍTULO</span><h2>${bookName}</h2></div>
        <button class="circle-btn" onclick="closeBibleQuickPicker()">✕</button>
      </div>
      <button class="picker-change-book" onclick="showBookQuickPicker()">📖 Trocar livro</button>
      <div class="picker-chapter-grid">
        ${book.chapters.map(ch=>`<button class="picker-number-btn ${Number(state.selectedChapter)===Number(ch.chapter)?"active":""}" onclick="jumpToChapter(${ch.chapter})">${ch.chapter}</button>`).join("")}
      </div>`;
  }catch(e){
    mount.innerHTML=`<div class="picker-head"><div><h2>${bookName}</h2></div><button class="circle-btn" onclick="closeBibleQuickPicker()">✕</button></div><div class="empty-state">Não foi possível carregar os capítulos.</div>`;
  }
}

function showVerseQuickPicker(){
  if(!state.selectedChapter || !state.currentChapterVerses.length){return;}
  state.bibleQuickPicker="verse";
  const picker=ensureBibleQuickPicker();
  const mount=picker.querySelector("#biblePickerContent");
  const bookName=NAME_BY_CODE[state.selectedBookCode]||state.selectedBookCode;
  const current=state.activeReadingVerse?.verse;
  mount.innerHTML=`
    <div class="picker-head">
      <div><span class="eyebrow">IR PARA VERSÍCULO</span><h2>${bookName} ${state.selectedChapter}</h2></div>
      <button class="circle-btn" onclick="closeBibleQuickPicker()">✕</button>
    </div>
    <div class="picker-location-actions">
      <button class="picker-change-book" onclick="showBookQuickPicker()">Livro</button>
      <button class="picker-change-book" onclick="showChapterQuickPicker()">Capítulo</button>
    </div>
    <div class="picker-chapter-grid verse-jump-grid">
      ${state.currentChapterVerses.map(v=>`<button class="picker-number-btn ${Number(current)===Number(v.number)?"active":""}" onclick="jumpToVerse(${v.number})">${v.number}</button>`).join("")}
    </div>`;
  picker.classList.add("open");
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
function setReadingActionVerse(number){
  openVerseByNumber(number);
  const verseChip=document.querySelector(".location-chip:nth-of-type(4) strong");
  if(verseChip) verseChip.textContent=Number(number);
}
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
  const highlightId=getVerseHighlight(id);
  const readMarkId=getVerseReadMark(id);
  const highlightColor=HIGHLIGHT_COLORS.find(c=>c.id===highlightId);
  const readColor=getReadMarkColor(readMarkId);
  const displayColor=highlightColor || (readMarkId ? readColor : null);
  const isActive=state.activeReadingVerse && Number(state.activeReadingVerse.verse)===Number(v.number);
  const rowStyle=displayColor ? `background:${displayColor.bg};color:${displayColor.fg}` : `background:var(--surface)`;
  return `<article id="verse-${v.number}" class="reading-verse ${isActive?'selected':''} ${readMarkId?'read-done':''}" style="${rowStyle}">
    <div class="reading-verse-line" onclick="setReadingActionVerse(${v.number})">
      <button class="verse-number-btn" onclick="event.stopPropagation();setReadingActionVerse(${v.number})">${v.number}</button>
      <div class="reading-verse-text" style="font-size:${(20*state.fontScale).toFixed(1)}px">${escapeHtml(v.text)}</div>
    </div>
    <div class="verse-inline-tools">
      <button class="verse-tool read-tool ${readMarkId?'is-read':''}" onclick="toggleVerseReadByNumber(${v.number})">${readMarkId?"✓ Lido":"○ Marcar lido"}</button>
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
          <p>Escolha o livro, depois o capítulo. A Palavra abre imediatamente, igual a uma Bíblia digital.</p>
          <div class="hero-buttons"><button class="btn-primary" onclick="navigate('versions')">Trocar versão</button></div>
        </div>
      </section>
      <button class="digital-bible-picker-card" onclick="showBookQuickPicker()">
        <span>📖</span>
        <div><strong>Escolher livro da Bíblia</strong><small>Toque aqui para encontrar qualquer livro rapidamente</small></div>
        <b>›</b>
      </button>
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
          <div><span class="eyebrow">ESCOLHA O CAPÍTULO</span><h2>${bookName}</h2><div class="small">${book.chapters.length} capítulo${book.chapters.length===1?'':'s'} • toque no número para abrir</div></div>
          <button class="btn-ghost" onclick="showBookQuickPicker()">Trocar livro</button>
        </div>
        <div class="chapter-grid">${book.chapters.map(ch=>`<button class="chapter-btn" onclick="openChapter(${ch.chapter})">${ch.chapter}</button>`).join('')}</div>
        <div class="bible-credit">Toque em um capítulo e a Palavra abre imediatamente com todos os versículos.</div>`;
      return;
    }
    const ch=book.chapters.find(c=>Number(c.chapter)===Number(state.selectedChapter));
    if(!ch) throw new Error("Capítulo não encontrado");
    const allVerses=[...(ch.verses||[])].sort((a,b)=>Number(a.number)-Number(b.number));
    state.currentChapterVerses=allVerses;
    if(state.chapterMode==="select"){ renderVersePicker(); return; }
    const prev=state.selectedChapter>1?state.selectedChapter-1:null;
    const next=state.selectedChapter<book.chapters.length?state.selectedChapter+1:null;
    const chosen = state.selectedVerseNumbers.length ? allVerses.filter(v=>state.selectedVerseNumbers.includes(Number(v.number))) : allVerses;
    if(!state.activeReadingVerse && chosen.length){ const f=chosen[0]; state.activeReadingVerse={code,bookName,chapter:Number(state.selectedChapter),verse:Number(f.number),text:f.text}; }
    addHistory({id:`${code}-${state.selectedChapter}-${state.currentVersionCode}`,label:`${bookName} ${state.selectedChapter}`,when:new Date().toLocaleString("pt-BR")});
    content.innerHTML=`
      <div class="reading-shell">
        <div class="reading-toolbar-top digital-reading-toolbar">
          <button class="top-icon-btn" onclick="openDrawer()">☰</button>
          <button class="top-chip book-selector-chip" onclick="showBookQuickPicker()"><small>Livro</small><strong>${bookName}</strong></button>
          <button class="top-chip location-chip" onclick="showChapterQuickPicker()"><small>Cap.</small><strong>${state.selectedChapter}</strong></button>
          <button class="top-chip location-chip" onclick="showVerseQuickPicker()"><small>Vers.</small><strong>${state.activeReadingVerse?.verse||1}</strong></button>
          <button class="top-chip version-selector-chip" onclick="navigate('versions')"><small>Versão</small><strong>${getVersionLabel()}</strong></button>
          <button class="top-icon-btn" onclick="toast('Áudio em desenvolvimento')">🔊</button>
          <button class="top-icon-btn" onclick="fontUp()">T+</button>
          <button class="top-icon-btn" onclick="fontDown()">T-</button>
        </div>
        ${renderReadMarkerToolbar()}
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
  localStorage.setItem("bs-versions-tab",state.versionsTab);
  const groups=WORKING_VERSION_GROUPS.map(group=>({
    ...group,
    versions:group.versions.filter(v=>state.versionsTab==="all" ? true : state.versionsTab==="downloaded" ? state.downloadedVersions.includes(v.code) : true)
  })).filter(g=>g.versions.length);
  content.innerHTML=`
    <div class="version-tabs">
      <button class="version-tab ${state.versionsTab==='all'?'active':''}" onclick="setVersionsTab('all')">Todas</button>
      <button class="version-tab ${state.versionsTab==='downloaded'?'active':''}" onclick="setVersionsTab('downloaded')">Baixado</button>
      <button class="version-tab ${state.versionsTab==='audio'?'active':''}" onclick="setVersionsTab('audio')">Áudio</button>
    </div>
    <div class="toggle-row"><div><strong>Duas traduções na mesma tela</strong><div class="small">Ative para deixar a segunda tradução preparada.</div></div><button class="switch ${state.dualVersion?'on':''}" onclick="toggleDualVersion()"></button></div>
    <div class="panel" style="margin-bottom:12px"><strong>Versões que realmente funcionam</strong><p class="small">As versões abaixo usam textos abertos disponíveis para leitura. Ao selecionar uma, o texto da Bíblia muda de verdade.</p></div>
    ${groups.map(group=>`<section class="language-block"><div class="language-title">${group.language}</div><div class="version-list">${group.versions.map(v=>renderVersionRow(v)).join('')}</div></section>`).join('')}`;
}
function renderVersionRow(v){
  const downloaded=state.downloadedVersions.includes(v.code);
  const selected=state.currentVersionCode===v.code;
  return `<div class="version-row ${selected?'selected':''}">
    <button class="version-main-btn" onclick="selectVersion('${v.code}')"><div><div class="version-name">${escapeHtml(v.name)}</div><div class="version-code">${v.code}</div></div><span class="version-action">${selected?'✓':'›'}</span></button>
    <button class="version-download-btn" onclick="downloadVersion('${v.code}')" title="Baixar para uso offline">${downloaded?'✔':'⬇'}</button>
  </div>`;
}
function setVersionsTab(tab){ state.versionsTab=tab; renderVersions(); }
function toggleDualVersion(){ state.dualVersion=!state.dualVersion; renderVersions(); }
function selectVersion(code){
  if(!WORKING_VERSION_CODES.has(code)){toast("Versão indisponível");return;}
  state.currentVersionCode=code;
  localStorage.setItem("bs-version",code);
  state.bookCache.clear();
  toast(`Versão selecionada: ${getVersionMeta(code).name}`);
  renderVersions();
}
async function downloadVersion(code){
  const meta=getVersionMeta(code);
  const allBooks=[...BOOKS.old,...BOOKS.new].map(x=>x[1]);
  const cache=await caches.open("biblia-textos-offline-v1");
  toast("Baixando a Bíblia para uso offline...");
  let ok=0;
  for(const bookCode of allBooks){
    const url=`${DATA_ROOT}/${meta.lang}/${meta.slug}/books/${bookCode}.json`;
    try{
      const res=await fetch(url,{cache:"no-store"});
      if(res.ok){ await cache.put(url,res.clone()); ok++; }
    }catch(e){}
  }
  if(ok>50){
    if(!state.downloadedVersions.includes(code)) state.downloadedVersions.push(code);
    saveJSON("bs-downloaded-versions",state.downloadedVersions);
    toast("Versão baixada para uso offline");
  }else toast("Download incompleto. Tente novamente com internet estável.");
  renderVersions();
}


function openReference(code,chapter,verse){
  showLoading("Abrindo passagem...");
  getVerse(code,chapter,verse).then(openVerseObject).catch(()=>{toast("Não foi possível abrir a passagem");render();});
}
function refLabel(ref){ return `${NAME_BY_CODE[ref[0]]||ref[0]} ${ref[1]}:${ref[2]}`; }
function readingStreak(){
  const set=new Set(JSON.parse(localStorage.getItem("bs-reading-days")||"[]"));
  let streak=0,d=new Date();
  while(set.has(localDateKey(d))){ streak++; d.setDate(d.getDate()-1); }
  return streak;
}

function renderPlans(){
  pageTitle.textContent="Planos";
  const active=state.activePlanId ? PLAN_DETAILS.find(p=>p.id===state.activePlanId) : null;
  const progress=JSON.parse(localStorage.getItem("bs-plan-progress")||"{}");
  if(active){
    const done=progress[active.id]||[];
    content.innerHTML=`<div class="panel"><div class="section-head" style="margin:0"><div><span class="eyebrow">PLANO DE LEITURA</span><h2>${active.title}</h2></div><button class="btn-ghost" onclick="state.activePlanId=null;renderPlans()">Voltar</button></div><p class="small">${active.desc}</p></div>
      <div class="plan-days">${active.days.map((r,i)=>`<article class="plan-day ${done.includes(i)?'done':''}"><button class="plan-day-main" onclick="openReference('${r[0]}',${r[1]},${r[2]})"><span class="plan-day-number">${i+1}</span><div><strong>Dia ${i+1} • ${r[3]}</strong><div class="small">${refLabel(r)}</div></div></button><button class="plan-check" onclick="togglePlanDay('${active.id}',${i})">${done.includes(i)?'✓':'○'}</button></article>`).join('')}</div>`;
    return;
  }
  content.innerHTML=`<div class="panel"><h3>📚 Planos de leitura</h3><p class="small">Escolha um plano, leia cada passagem e marque os dias concluídos.</p></div>${PLAN_DETAILS.map(p=>{const done=(progress[p.id]||[]).length;return `<article class="feature-card"><div><strong>${p.title}</strong><p>${p.desc}</p><div class="progress-line"><span style="width:${done/p.days.length*100}%"></span></div><div class="small">${done}/${p.days.length} dias concluídos</div></div><button class="btn-primary" onclick="state.activePlanId='${p.id}';renderPlans()">${done?'Continuar':'Começar'}</button></article>`}).join('')}`;
}
function togglePlanDay(planId,index){
  const data=JSON.parse(localStorage.getItem("bs-plan-progress")||"{}");
  const arr=data[planId]||[];
  data[planId]=arr.includes(index)?arr.filter(x=>x!==index):[...arr,index].sort((a,b)=>a-b);
  saveJSON("bs-plan-progress",data);renderPlans();toast("Progresso atualizado");
}

function renderProgress(){
  pageTitle.textContent="Progresso de Leitura";
  const plans=JSON.parse(localStorage.getItem("bs-plan-progress")||"{}");
  const totalPlanDays=PLAN_DETAILS.reduce((n,p)=>n+p.days.length,0);
  const donePlanDays=PLAN_DETAILS.reduce((n,p)=>n+(plans[p.id]||[]).length,0);
  const days=JSON.parse(localStorage.getItem("bs-reading-days")||"[]");
  const devotionDays=JSON.parse(localStorage.getItem("bs-devotional-days")||"[]");
  content.innerHTML=`<div class="stats-grid">
    <div class="stat-card"><strong>${readingStreak()}</strong><span>dias seguidos</span></div>
    <div class="stat-card"><strong>${days.length}</strong><span>dias de leitura</span></div>
    <div class="stat-card"><strong>${state.fullFavorites.length}</strong><span>favoritos</span></div>
    <div class="stat-card"><strong>${Object.keys(state.notes).length}</strong><span>anotações</span></div>
  </div>
  <div class="panel"><h3>Planos</h3><div class="progress-line big"><span style="width:${totalPlanDays?donePlanDays/totalPlanDays*100:0}%"></span></div><p class="small">${donePlanDays} de ${totalPlanDays} leituras dos planos concluídas.</p></div>
  <div class="panel" style="margin-top:12px"><h3>Devocionais</h3><p>${devotionDays.length} devocionais diários marcados como concluídos.</p><button class="btn-primary" onclick="navigate('devotional')">Abrir devocional de hoje</button></div>`;
}

function renderDevotionalDaily(){
  pageTitle.textContent="Devocional Diário";
  const idx=(new Date().getFullYear()*372+(new Date().getMonth()+1)*31+new Date().getDate())%DAILY_DEVOTIONALS_FULL.length;
  const d=DAILY_DEVOTIONALS_FULL[idx];
  const key=localDateKey();
  const done=JSON.parse(localStorage.getItem("bs-devotional-days")||"[]").includes(key);
  content.innerHTML=`<article class="devotional-hero"><span class="eyebrow">DEVOCIONAL DE HOJE</span><h2>${d.title}</h2><button class="reference-pill" onclick="openReference('${d.ref[0]}',${d.ref[1]},${d.ref[2]})">📖 ${refLabel(d.ref)}</button></article>
    <section class="meditation-card"><h3>🌅 Reflexão</h3><p>${d.reflection}</p><div class="reflect-box"><strong>Para pensar</strong><p>${d.question}</p></div></section>
    <section class="meditation-card"><h3>🙏 Oração</h3><div class="prayer-box">${d.prayer}</div></section>
    <button class="btn-primary full-width" onclick="toggleTodayDevotional()">${done?'✓ Devocional concluído':'Marcar como concluído'}</button>`;
}
function toggleTodayDevotional(){
  const arr=JSON.parse(localStorage.getItem("bs-devotional-days")||"[]"), key=localDateKey();
  const next=arr.includes(key)?arr.filter(x=>x!==key):[...arr,key];saveJSON("bs-devotional-days",next);renderDevotionalDaily();
}

function renderStories(){
  pageTitle.textContent="Histórias Bíblicas";
  const active=state.activeStoryId?STORY_DETAILS.find(s=>s.id===state.activeStoryId):null;
  if(active){content.innerHTML=`<article class="story-detail"><button class="btn-ghost" onclick="state.activeStoryId=null;renderStories()">‹ Todas as histórias</button><span class="eyebrow">HISTÓRIA BÍBLICA</span><h2>${active.title}</h2><div class="reference-pill">${active.ref}</div><p>${active.summary}</p><div class="reflect-box"><strong>Lição para a vida</strong><p>${active.lesson}</p></div><button class="btn-primary" onclick="openReference('${active.open[0]}',${active.open[1]},${active.open[2]})">Abrir na Bíblia</button></article>`;return;}
  content.innerHTML=`<div class="panel"><h3>📡 Histórias Bíblicas</h3><p class="small">Toque em uma história para abrir o resumo, a lição e a passagem bíblica.</p></div><div class="story-grid">${STORY_DETAILS.map(s=>`<button class="story-card" onclick="state.activeStoryId='${s.id}';renderStories()"><span>📖</span><strong>${s.title}</strong><small>${s.ref}</small></button>`).join('')}</div>`;
}

function renderStudy(){
  pageTitle.textContent="Pesquisa Avançada & Estudo Bíblico";
  if(state.studyResults===undefined) state.studyResults=[];
  if(state.studyBook===undefined) state.studyBook="John";
  if(state.studyQuery===undefined) state.studyQuery="";
  content.innerHTML=`<div class="search-card"><h3>🔎 Pesquisa dentro de um livro</h3><p class="small">Escolha o livro e procure uma palavra ou frase. O app busca em todos os capítulos daquele livro.</p><select id="studyBook" class="field">${[...BOOKS.old,...BOOKS.new].map(([n,c])=>`<option value="${c}" ${state.studyBook===c?'selected':''}>${n}</option>`).join('')}</select><input id="studyQuery" class="field" value="${escapeHtml(state.studyQuery)}" placeholder="Ex.: amor, fé, esperança"><button class="btn-primary full-width" onclick="runAdvancedSearch()">Pesquisar</button></div>
  <div class="search-card"><h3>📖 Abrir referência</h3><div class="field-row"><input id="studyChapter" class="field" inputmode="numeric" placeholder="Capítulo"><input id="studyVerse" class="field" inputmode="numeric" placeholder="Versículo"></div><button class="btn-ghost full-width" onclick="openStudyReference()">Abrir no estudo</button></div>
  ${state.studyResults.length?`<div class="panel"><h3>${state.studyResults.length} resultado(s)</h3></div>${state.studyResults.map(r=>`<article class="search-result"><button onclick="openVerseObject(${JSON.stringify(r).replace(/"/g,'&quot;')})"><strong>${r.bookName} ${r.chapter}:${r.verse}</strong><p>${escapeHtml(r.text)}</p></button></article>`).join('')}`:`<div class="empty-state"><span class="big">⌕</span>Faça uma pesquisa para ver resultados.</div>`}`;
}
async function runAdvancedSearch(){
  state.studyBook=document.getElementById("studyBook").value;
  state.studyQuery=document.getElementById("studyQuery").value.trim();
  if(state.studyQuery.length<2){toast("Digite pelo menos 2 letras");return;}
  showLoading("Pesquisando na Bíblia...");
  try{const book=await fetchBook(state.studyBook);const q=state.studyQuery.toLocaleLowerCase("pt-BR");const results=[];for(const ch of book.chapters){for(const v of ch.verses){if(String(v.text).toLocaleLowerCase("pt-BR").includes(q)){results.push({code:state.studyBook,bookName:NAME_BY_CODE[state.studyBook]||state.studyBook,chapter:Number(ch.chapter),verse:Number(v.number),text:v.text});if(results.length>=60)break;}}if(results.length>=60)break;}state.studyResults=results;renderStudy();}catch(e){toast("Não foi possível pesquisar");renderStudy();}
}
function openStudyReference(){const ch=Number(document.getElementById("studyChapter").value),v=Number(document.getElementById("studyVerse").value);if(!ch||!v){toast("Digite capítulo e versículo");return;}state.studyBook=document.getElementById("studyBook").value;openReference(state.studyBook,ch,v);}

function renderDevotionals(){
  pageTitle.textContent="Devocionais";
  const active=state.activeDevotionalId?DEVOTIONAL_LIBRARY.find(d=>d.id===state.activeDevotionalId):null;
  if(active){content.innerHTML=`<article class="story-detail"><button class="btn-ghost" onclick="state.activeDevotionalId=null;renderDevotionals()">‹ Devocionais</button><span class="eyebrow">DEVOCIONAL</span><h2>${active.title}</h2><p>${active.text}</p><button class="reference-pill" onclick="openReference('${active.ref[0]}',${active.ref[1]},${active.ref[2]})">📖 ${refLabel(active.ref)}</button></article>`;return;}
  content.innerHTML=`<div class="panel"><h3>🙏 Devocionais</h3><p class="small">Reflexões curtas com uma passagem para continuar o estudo.</p></div>${DEVOTIONAL_LIBRARY.map(d=>`<button class="list-card" onclick="state.activeDevotionalId='${d.id}';renderDevotionals()"><div><strong>${d.title}</strong><small>${refLabel(d.ref)}</small></div><span>›</span></button>`).join('')}`;
}

function getHymns(){return JSON.parse(localStorage.getItem("bs-hymns")||"[]");}
function renderHymns(){
  pageTitle.textContent="Hinários";
  const hymns=getHymns();const q=(state.hymnSearch||"").toLowerCase();const filtered=hymns.filter(h=>!q||`${h.number} ${h.title} ${h.category}`.toLowerCase().includes(q));
  content.innerHTML=`<div class="panel"><h3>🎵 Hinários</h3><p class="small">Organize Harpa Cristã, corinhos e louvores. Você pode cadastrar número, título e suas próprias anotações.</p></div>
  <div class="category-chips"><button onclick="state.hymnCategory='Harpa Cristã';renderHymns()">Harpa Cristã</button><button onclick="state.hymnCategory='Corinhos';renderHymns()">Corinhos</button><button onclick="state.hymnCategory='Louvores';renderHymns()">Louvores</button></div>
  <div class="search-card"><h3>Adicionar cântico</h3><select id="hymnCategory" class="field"><option>Harpa Cristã</option><option>Corinhos</option><option>Louvores</option></select><div class="field-row"><input id="hymnNumber" class="field" placeholder="Número"><input id="hymnTitle" class="field" placeholder="Título"></div><textarea id="hymnNotes" class="note-field" placeholder="Suas anotações, tom, observações..."></textarea><button class="btn-primary full-width" onclick="saveHymn()">Salvar</button></div>
  <input class="field" placeholder="Buscar no hinário" value="${escapeHtml(state.hymnSearch||'')}" oninput="state.hymnSearch=this.value;renderHymns()">
  ${filtered.length?filtered.map(h=>`<article class="hymn-card"><div><small>${h.category}</small><h3>${h.number?`${escapeHtml(h.number)} • `:''}${escapeHtml(h.title)}</h3><p>${escapeHtml(h.notes||'')}</p></div><button class="btn-ghost" onclick="deleteHymn('${h.id}')">Excluir</button></article>`).join(''):`<div class="empty-state"><span class="big">🎵</span>Nenhum cântico cadastrado ainda.</div>`}`;
}
function saveHymn(){const title=document.getElementById("hymnTitle").value.trim();if(!title){toast("Digite o título");return;}const items=getHymns();items.unshift({id:String(Date.now()),category:document.getElementById("hymnCategory").value,number:document.getElementById("hymnNumber").value.trim(),title,notes:document.getElementById("hymnNotes").value.trim()});saveJSON("bs-hymns",items);renderHymns();toast("Cântico salvo");}
function deleteHymn(id){saveJSON("bs-hymns",getHymns().filter(h=>h.id!==id));renderHymns();}

function renderDonation(){
  pageTitle.textContent="Doação de Bíblias";const entries=JSON.parse(localStorage.getItem("bs-bible-donations")||"[]");
  content.innerHTML=`<div class="panel"><h3>♡ Doação de Bíblias</h3><p class="small">Registre pedidos ou pessoas dispostas a doar. Os dados ficam salvos neste aparelho.</p></div><div class="search-card"><select id="donationType" class="field"><option value="doar">Quero doar Bíblias</option><option value="receber">Preciso receber Bíblias</option></select><input id="donationName" class="field" placeholder="Nome"><div class="field-row"><input id="donationCity" class="field" placeholder="Cidade"><input id="donationQty" class="field" inputmode="numeric" placeholder="Quantidade"></div><button class="btn-primary full-width" onclick="saveDonation()">Registrar</button></div>${entries.length?entries.map(e=>`<article class="list-card"><div><strong>${e.type==='doar'?'Doação':'Pedido'} • ${escapeHtml(e.name)}</strong><small>${escapeHtml(e.city)} • ${e.qty} Bíblia(s)</small></div></article>`).join(''):''}`;
}
function saveDonation(){const name=document.getElementById("donationName").value.trim(),city=document.getElementById("donationCity").value.trim(),qty=Math.max(1,Number(document.getElementById("donationQty").value)||1);if(!name||!city){toast("Preencha nome e cidade");return;}const arr=JSON.parse(localStorage.getItem("bs-bible-donations")||"[]");arr.unshift({id:Date.now(),type:document.getElementById("donationType").value,name,city,qty});saveJSON("bs-bible-donations",arr);renderDonation();toast("Registro salvo");}

function renderAds(){pageTitle.textContent="Remover Ads";const clean=localStorage.getItem("bs-clean-mode")!=="0";content.innerHTML=`<div class="panel"><h3>⊘ Remover Ads</h3><p>Este aplicativo não insere anúncios próprios. O modo limpo mantém a interface sem espaços de propaganda.</p></div><div class="toggle-row"><div><strong>Modo limpo</strong><div class="small">${clean?'Ativado':'Desativado'}</div></div><button class="switch ${clean?'on':''}" onclick="toggleCleanMode()"></button></div>`;}
function toggleCleanMode(){const clean=localStorage.getItem("bs-clean-mode")!=="0";localStorage.setItem("bs-clean-mode",clean?'0':'1');renderAds();}

function renderVersionInfo(kind){
  const info={apostolic:["Bíblia Apostólica","Esta área fica organizada separadamente. Para manter o texto bíblico correto, use somente versões com fonte autorizada na tela Versões."],message:["Bíblia A Mensagem","Esta tradução precisa de uma fonte/licença própria antes de ser colocada dentro do aplicativo." ]}[kind];
  pageTitle.textContent=info[0];content.innerHTML=`<div class="panel"><h3>📘 ${info[0]}</h3><p>${info[1]}</p><button class="btn-primary" onclick="navigate('versions')">Abrir versões disponíveis</button></div>`;
}

function renderAudio(){
  pageTitle.textContent="Áudio da Bíblia";
  const a=state.audioVerseData;
  content.innerHTML=`<div class="panel"><h3>🔊 Leitor em voz alta</h3><p class="small">Escolha uma referência. O celular usa a voz do próprio aparelho para ler o texto.</p><select id="audioBook" class="field">${[...BOOKS.old,...BOOKS.new].map(([n,c])=>`<option value="${c}">${n}</option>`).join('')}</select><div class="field-row"><input id="audioChapter" class="field" inputmode="numeric" placeholder="Capítulo"><input id="audioVerse" class="field" inputmode="numeric" placeholder="Versículo"></div><button class="btn-primary full-width" onclick="loadAudioVerse()">Carregar versículo</button></div>${a?`<article class="verse-card"><div class="reference">${a.bookName} ${a.chapter}:${a.verse}</div><div class="verse-text">${escapeHtml(a.text)}</div><div class="card-actions"><button class="btn-primary" onclick="speakAudio()">▶ Ouvir</button><button class="btn-ghost" onclick="stopAudio()">■ Parar</button></div></article>`:''}`;
}
async function loadAudioVerse(){const code=document.getElementById("audioBook").value,ch=Number(document.getElementById("audioChapter").value),v=Number(document.getElementById("audioVerse").value);if(!ch||!v){toast("Digite capítulo e versículo");return;}showLoading("Carregando áudio...");try{state.audioVerseData=await getVerse(code,ch,v);renderAudio();}catch(e){toast("Referência não encontrada");renderAudio();}}
function speakAudio(){if(!state.audioVerseData||!("speechSynthesis" in window)){toast("Leitura em voz alta indisponível");return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(`${state.audioVerseData.bookName} ${state.audioVerseData.chapter}, versículo ${state.audioVerseData.verse}. ${state.audioVerseData.text}`);u.lang="pt-BR";speechSynthesis.speak(u);}
function stopAudio(){if("speechSynthesis" in window)speechSynthesis.cancel();}

function getStoreItems(){return JSON.parse(localStorage.getItem("bs-store-items")||"[]");}
function renderStore(){const items=getStoreItems();pageTitle.textContent="Loja da Bíblia";content.innerHTML=`<div class="panel"><h3>🛍 Loja da Bíblia</h3><p class="small">Cadastre produtos e materiais. O catálogo fica salvo neste aparelho.</p></div><div class="search-card"><input id="storeName" class="field" placeholder="Produto"><div class="field-row"><input id="storePrice" class="field" placeholder="Preço"><input id="storeLink" class="field" placeholder="Link de contato (opcional)"></div><button class="btn-primary full-width" onclick="saveStoreItem()">Adicionar produto</button></div>${items.length?items.map(i=>`<article class="feature-card"><div><strong>${escapeHtml(i.name)}</strong><p>${escapeHtml(i.price)}</p></div><div class="card-actions">${i.link?`<button class="btn-primary" onclick="openSafeLink('${i.id}')">Abrir</button>`:''}<button class="btn-ghost" onclick="deleteStoreItem('${i.id}')">Excluir</button></div></article>`).join(''):`<div class="empty-state"><span class="big">🛍</span>Catálogo vazio.</div>`}`;}
function saveStoreItem(){const name=document.getElementById("storeName").value.trim();if(!name){toast("Digite o produto");return;}const items=getStoreItems();items.unshift({id:String(Date.now()),name,price:document.getElementById("storePrice").value.trim(),link:document.getElementById("storeLink").value.trim()});saveJSON("bs-store-items",items);renderStore();}
function deleteStoreItem(id){saveJSON("bs-store-items",getStoreItems().filter(x=>x.id!==id));renderStore();}
function openSafeLink(id){const item=getStoreItems().find(x=>x.id===id);if(!item?.link)return;let url=item.link;if(!/^https?:\/\//i.test(url))url="https://"+url;window.open(url,"_blank","noopener");}

function renderWay(){const steps=JSON.parse(localStorage.getItem("bs-way-steps")||"[]");const list=["Ler a Bíblia","Orar","Agradecer","Praticar uma atitude de amor","Revisar o aprendizado do dia"];pageTitle.textContent="Caminho Perfeito";content.innerHTML=`<div class="panel"><h3>∞ Caminho Perfeito</h3><p class="small">Uma rotina simples para organizar seu momento diário.</p></div>${list.map((x,i)=>`<button class="check-list-item ${steps.includes(i)?'done':''}" onclick="toggleWayStep(${i})"><span>${steps.includes(i)?'✓':'○'}</span><strong>${x}</strong></button>`).join('')}`;}
function toggleWayStep(i){const a=JSON.parse(localStorage.getItem("bs-way-steps")||"[]");saveJSON("bs-way-steps",a.includes(i)?a.filter(x=>x!==i):[...a,i]);renderWay();}

function renderSalt(){pageTitle.textContent="Evangelize com o SAL";content.innerHTML=`<div class="panel"><h3>🧂 Evangelize com o SAL</h3><p class="small">Crie uma mensagem respeitosa e compartilhe com alguém.</p></div><div class="search-card"><input id="saltName" class="field" placeholder="Nome da pessoa (opcional)"><select id="saltTemplate" class="field"><option value="esperanca">Esperança</option><option value="convite">Convite para ler a Bíblia</option><option value="encorajamento">Encorajamento</option></select><button class="btn-primary full-width" onclick="buildSaltMessage()">Criar mensagem</button></div><div id="saltResult"></div>`;}
function buildSaltMessage(){const name=document.getElementById("saltName").value.trim(),t=document.getElementById("saltTemplate").value;const hello=name?`Olá, ${name}! `:"Olá! ";const body={esperanca:"Quero compartilhar uma palavra de esperança com você. Mesmo em dias difíceis, vale a pena continuar buscando força, sabedoria e fé.",convite:"Quero te convidar para separar alguns minutos e ler uma passagem da Bíblia hoje. Uma leitura curta pode trazer uma reflexão importante para o seu dia.",encorajamento:"Passando para te desejar força e encorajamento. Que Deus renove sua esperança e te dê sabedoria para cada decisão."}[t];state.saltMessage=hello+body+" 🙏";document.getElementById("saltResult").innerHTML=`<div class="panel"><p>${escapeHtml(state.saltMessage)}</p><div class="card-actions"><button class="btn-primary" onclick="shareSaltMessage()">Compartilhar</button><button class="btn-ghost" onclick="copySaltMessage()">Copiar</button></div></div>`;}
function shareSaltMessage(){if(!state.saltMessage)return;if(navigator.share)navigator.share({text:state.saltMessage}).catch(()=>{});else copySaltMessage();}
function copySaltMessage(){navigator.clipboard?.writeText(state.saltMessage||"");toast("Mensagem copiada");}

function shuffleArray(items){
  const arr=[...items];
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

function buildQuizQuestion(q){
  const answers=shuffleArray(q.answers);
  return {...q,answers,correctIndex:answers.indexOf(q.correct)};
}

function startNewQuizRound(){
  const previousIds=JSON.parse(localStorage.getItem("bs-last-quiz-round")||"[]");
  let pool=QUIZ_QUESTIONS.filter(q=>!previousIds.includes(q.id));
  if(pool.length<10) pool=[...QUIZ_QUESTIONS];
  state.quizRound=shuffleArray(pool).slice(0,10).map(buildQuizQuestion);
  state.quizIndex=0;
  state.quizScore=0;
  state.quizAnswered=null;
  saveJSON("bs-last-quiz-round",state.quizRound.map(q=>q.id));
}

function renderQuestions(){
  pageTitle.textContent="Perguntas Bíblicas";
  if(!Array.isArray(state.quizRound) || !state.quizRound.length) startNewQuizRound();

  if(state.quizIndex>=state.quizRound.length){
    const pct=Math.round(state.quizScore/state.quizRound.length*100);
    content.innerHTML=`<div class="quiz-finish">
      <span>${pct>=80?"🏆":pct>=60?"👏":"📖"}</span>
      <h2>Rodada concluída!</h2>
      <p>Você acertou <strong>${state.quizScore}</strong> de ${state.quizRound.length} perguntas.</p>
      <p class="small">A próxima rodada será montada com perguntas diferentes das 10 que você acabou de responder.</p>
      <button class="btn-primary full-width" onclick="restartQuiz()">Jogar nova rodada</button>
    </div>`;
    return;
  }

  const q=state.quizRound[state.quizIndex];
  content.innerHTML=`<div class="panel quiz-question-card">
    <div class="quiz-topline">
      <span class="eyebrow">PERGUNTA ${state.quizIndex+1} DE ${state.quizRound.length}</span>
      <span class="quiz-type">${q.type}</span>
    </div>
    <div class="quiz-progress-track"><span style="width:${(state.quizIndex/state.quizRound.length)*100}%"></span></div>
    <h2>${escapeHtml(q.q)}</h2>
    <div class="small">Pontuação: ${state.quizScore}</div>
  </div>
  <div class="quiz-answers">
    ${q.answers.map((a,i)=>`<button class="quiz-answer ${state.quizAnswered===i?(i===q.correctIndex?'correct':'wrong'):''} ${state.quizAnswered!==null&&i===q.correctIndex?'correct':''}" ${state.quizAnswered!==null?'disabled':''} onclick="answerQuiz(${i})">${escapeHtml(a)}</button>`).join('')}
  </div>
  ${state.quizAnswered!==null?`<div class="quiz-feedback ${state.quizAnswered===q.correctIndex?'good':'bad'}">${state.quizAnswered===q.correctIndex?'✓ Acertou!':'✕ Resposta correta: '+escapeHtml(q.answers[q.correctIndex])}</div><button class="btn-primary full-width" onclick="nextQuiz()">${state.quizIndex===state.quizRound.length-1?'Ver resultado':'Próxima pergunta'}</button>`:''}`;
}

function answerQuiz(i){
  if(state.quizAnswered!==null) return;
  const q=state.quizRound[state.quizIndex];
  state.quizAnswered=i;
  if(i===q.correctIndex) state.quizScore++;
  renderQuestions();
}

function nextQuiz(){
  state.quizIndex++;
  state.quizAnswered=null;
  renderQuestions();
}

function restartQuiz(){
  startNewQuizRound();
  renderQuestions();
}

function renderDictionary(){pageTitle.textContent="Dicionário";const q=(state.dictionaryQuery||"").toLowerCase();const list=BIBLE_DICTIONARY_FULL.filter(x=>!q||x.term.toLowerCase().includes(q)||x.meaning.toLowerCase().includes(q));content.innerHTML=`<div class="panel"><h3>🔤 Dicionário Bíblico</h3><input class="field" placeholder="Buscar termo" value="${escapeHtml(state.dictionaryQuery||'')}" oninput="state.dictionaryQuery=this.value;renderDictionary()"></div>${list.map(x=>`<article class="dictionary-card"><strong>${x.term}</strong><p>${x.meaning}</p></article>`).join('')}`;}

function renderThemes(){pageTitle.textContent="Temas";const active=state.activeTheme?THEME_DETAILS.find(t=>t.id===state.activeTheme):null;if(active){content.innerHTML=`<div class="panel"><button class="btn-ghost" onclick="state.activeTheme=null;renderThemes()">‹ Temas</button><h2>${active.title}</h2><p class="small">Passagens para estudar este tema.</p></div>${active.refs.map(r=>`<button class="list-card" onclick="openReference('${r[0]}',${r[1]},${r[2]})"><div><strong>${refLabel(r)}</strong><small>Abrir na Bíblia</small></div><span>›</span></button>`).join('')}`;return;}content.innerHTML=`<div class="panel"><h3>📄 Temas Bíblicos</h3><p class="small">Escolha um assunto e abra as passagens relacionadas.</p></div><div class="theme-grid">${THEME_DETAILS.map(t=>`<button onclick="state.activeTheme='${t.id}';renderThemes()">${t.title}</button>`).join('')}</div>`;}

function renderMaps(){pageTitle.textContent="Mapas";const active=state.activeMap?BIBLE_MAP_STUDIES.find(m=>m.id===state.activeMap):null;if(active){content.innerHTML=`<article class="story-detail"><button class="btn-ghost" onclick="state.activeMap=null;renderMaps()">‹ Mapas</button><h2>🗺 ${active.title}</h2><p>${active.desc}</p>${active.refs.map((r,i)=>`<button class="list-card" onclick="openReference('${r[0]}',${r[1]},${r[2]})"><div><strong>Parada ${i+1}</strong><small>${refLabel(r)}</small></div><span>›</span></button>`).join('')}</article>`;return;}content.innerHTML=`<div class="panel"><h3>🗺 Estudos por localização</h3><p class="small">Rotas e lugares organizados com passagens bíblicas relacionadas.</p></div>${BIBLE_MAP_STUDIES.map(m=>`<button class="list-card" onclick="state.activeMap='${m.id}';renderMaps()"><div><strong>${m.title}</strong><small>${m.desc}</small></div><span>›</span></button>`).join('')}`;}

function renderBlog(){pageTitle.textContent="Blog";const active=state.activeArticle?BLOG_ARTICLES.find(a=>a.id===state.activeArticle):null;if(active){content.innerHTML=`<article class="story-detail"><button class="btn-ghost" onclick="state.activeArticle=null;renderBlog()">‹ Blog</button><span class="eyebrow">${active.date}</span><h2>${active.title}</h2><p>${active.body}</p></article>`;return;}content.innerHTML=`<div class="panel"><h3>📰 Blog</h3><p class="small">Artigos de estudo e uso do aplicativo.</p></div>${BLOG_ARTICLES.map(a=>`<button class="list-card" onclick="state.activeArticle='${a.id}';renderBlog()"><div><strong>${a.title}</strong><small>${a.date}</small></div><span>›</span></button>`).join('')}`;}

function renderSocial(kind){const label=kind==='instagram'?'Instagram':'YouTube';const icon=kind==='instagram'?'📷':'▶';const key=`bs-social-${kind}`;const saved=localStorage.getItem(key)||'';pageTitle.textContent=label;content.innerHTML=`<div class="panel"><h3>${icon} ${label}</h3><p class="small">Salve o link oficial da igreja ou do projeto. Depois o botão abre direto.</p><input id="socialUrl" class="field" value="${escapeHtml(saved)}" placeholder="https://..."><div class="card-actions"><button class="btn-primary" onclick="saveSocial('${kind}')">Salvar link</button>${saved?`<button class="btn-ghost" onclick="openSocial('${kind}')">Abrir ${label}</button>`:''}</div></div>`;}
function saveSocial(kind){let url=document.getElementById("socialUrl").value.trim();if(url&&!/^https?:\/\//i.test(url))url="https://"+url;localStorage.setItem(`bs-social-${kind}`,url);renderSocial(kind);toast("Link salvo");}
function openSocial(kind){const url=localStorage.getItem(`bs-social-${kind}`);if(url)window.open(url,"_blank","noopener");}

function renderHistory(){pageTitle.textContent="Histórico";content.innerHTML=state.history.length?`<div class="panel"><div class="section-head" style="margin:0 0 10px"><h2>Leituras recentes</h2><button class="btn-ghost" onclick="clearHistory()">Limpar</button></div>${state.history.map(item=>`<div class="history-item"><strong>${item.label}</strong><div class="small">${item.when}</div></div>`).join('')}</div>`:`<div class="empty-state"><span class="big">🕘</span><strong>Sem histórico ainda</strong><br><br><span class="small">Abra algumas leituras para ver o histórico aqui.</span></div>`;}
function clearHistory(){if(confirm("Limpar histórico de leitura?")){state.history=[];saveJSON("bs-history",[]);renderHistory();}}

function renderBackup(){pageTitle.textContent="Backup";content.innerHTML=`<div class="panel"><h3>☁ Backup dos seus dados</h3><p class="small">Exporte favoritos, anotações, progresso, hinários, histórico e configurações para um arquivo JSON.</p><div class="reading-bottom-actions"><button class="btn-primary" onclick="exportBackup()">Baixar backup</button><label class="btn-ghost file-label">Restaurar backup<input id="backupFile" type="file" accept="application/json" onchange="importBackupFile(event)"></label><button class="btn-danger" onclick="clearAppData()">Apagar dados deste aparelho</button></div></div>`;}
function exportBackup(){const data={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith("bs-"))data[k]=localStorage.getItem(k);}const blob=new Blob([JSON.stringify({app:"Biblia Sagrada Palavra Viva",version:"0.9",createdAt:new Date().toISOString(),data},null,2)],{type:"application/json"});const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=`biblia-backup-${localDateKey()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function importBackupFile(event){const file=event.target.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{const obj=JSON.parse(reader.result);if(!obj.data)throw new Error();for(const [k,v] of Object.entries(obj.data)){if(k.startsWith("bs-"))localStorage.setItem(k,v);}alert("Backup restaurado. O aplicativo será recarregado.");location.reload();}catch(e){toast("Arquivo de backup inválido");}};reader.readAsText(file);}
function clearAppData(){if(!confirm("Tem certeza? Isso apaga favoritos, notas e progresso deste aparelho."))return;const keys=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k?.startsWith("bs-"))keys.push(k);}keys.forEach(k=>localStorage.removeItem(k));location.reload();}

function renderMore(){pageTitle.textContent="Mais informações";content.innerHTML=`<div class="setting-row" onclick="toggleTheme()"><div class="setting-left"><div class="setting-icon">${state.dark?'☀':'☾'}</div><div><h3>Modo ${state.dark?'claro':'escuro'}</h3><div class="small">Mude a aparência do aplicativo</div></div></div><span>›</span></div><div class="setting-row" onclick="installAppFromMenu()"><div class="setting-left"><div class="setting-icon">⇩</div><div><h3>Instalar aplicativo</h3><div class="small">Adicionar à tela inicial do celular</div></div></div><span>›</span></div><div class="setting-row" onclick="shareApp()"><div class="setting-left"><div class="setting-icon">↗</div><div><h3>Compartilhar app</h3><div class="small">Envie o Palavra Viva para alguém</div></div></div><span>›</span></div><div class="version-card"><div class="cross">✝</div><h3>Bíblia Sagrada</h3><p>Palavra Viva • versão 1.1</p><p style="margin-top:8px">Desenvolvido por JNR</p></div><div class="panel" style="margin-top:12px"><strong>📖 Recursos desta versão</strong><p class="small">Menu reorganizado, planos, devocionais, histórias, pesquisa avançada, hinários pessoais, áudio por voz do aparelho, quiz, dicionário, temas, estudos por localização, backup e versões que realmente trocam o texto bíblico.</p></div>`;}

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
  window.scrollTo({top:0,behavior:"smooth"});
  if(state.page==="home") renderHome();
  else if(state.page==="bible") renderBible();
  else if(state.page==="verse") renderVerse();
  else if(state.page==="passage") renderPassageMeditation();
  else if(state.page==="search") renderSearch();
  else if(state.page==="favorites") renderFavorites();
  else if(state.page==="versions") renderVersions();
  else if(state.page==="notes") renderNotes();
  else if(state.page==="plans") renderPlans();
  else if(state.page==="progress") renderProgress();
  else if(state.page==="devotional") renderDevotionalDaily();
  else if(state.page==="stories") renderStories();
  else if(state.page==="study") renderStudy();
  else if(state.page==="devotionals") renderDevotionals();
  else if(state.page==="hymns") renderHymns();
  else if(state.page==="donation") renderDonation();
  else if(state.page==="ads") renderAds();
  else if(state.page==="apostolic") renderVersionInfo("apostolic");
  else if(state.page==="message") renderVersionInfo("message");
  else if(state.page==="audio") renderAudio();
  else if(state.page==="store") renderStore();
  else if(state.page==="way") renderWay();
  else if(state.page==="salt") renderSalt();
  else if(state.page==="questions") renderQuestions();
  else if(state.page==="dictionary") renderDictionary();
  else if(state.page==="themes") renderThemes();
  else if(state.page==="maps") renderMaps();
  else if(state.page==="blog") renderBlog();
  else if(state.page==="instagram") renderSocial("instagram");
  else if(state.page==="youtube") renderSocial("youtube");
  else if(state.page==="history") renderHistory();
  else if(state.page==="backup") renderBackup();
  else if(state.page==="more") renderMore();
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
  openActiveReadingVerseStudy,toggleCurrentVerseFavorite,openFavoriteById,removeFavoriteById,
  setReadMarkColor,toggleVerseReadByNumber,markAllChapterRead,clearChapterReadMarks,
  startNewQuizRound,restartQuiz,answerQuiz,nextQuiz,
  showBookQuickPicker,showChapterQuickPicker,showVerseQuickPicker,closeBibleQuickPicker,
  jumpToBook,jumpToChapter,jumpToVerse
});

if('serviceWorker' in navigator){ navigator.serviceWorker.register('./sw.js').catch(()=>{}); }
render();
