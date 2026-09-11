import { lessons as englishLessons, type Lesson } from './lessons';

// Keep TypeScript identifiers unchanged so learners can connect both languages
// to the same code. Game mechanics are shared with the English lessons.
const content: Array<Pick<Lesson, 'title' | 'subtitle' | 'question' | 'theory' | 'analogy' | 'terms' | 'takeaway'> & {
  challenges: Array<Pick<Lesson['challenges'][number], 'card' | 'prompt' | 'options' | 'explanation'>>;
}> = [
  {
    title: 'Klassid ja objektid', subtitle: 'Tutvu kavandi ja selle põhjal loodud asjadega.',
    question: 'Üks kavand. Terve maailm võimalusi.',
    theory: 'Klass on kavand, mis määrab, millised omadused ja käitumine selle objektidel võivad olla. Objekt on klassi konkreetne isend ehk eksemplar, millel on oma väärtused.',
    analogy: 'Mõtle piparkoogivormile ja piparkookidele. Üks vorm annab kuju, aga iga selle abil tehtud piparkook on eraldi asi.',
    terms: [['Klass', 'Kavand: Dog ehk koer'], ['Objekt', 'Üks isend: koer nimega Max']],
    challenges: [
      {card:'Koer',prompt:'Kavand või konkreetne isend? Liigita kaart.',options:['Klass','Objekt'],explanation:'Koer tähistab siin asjade liiki. See on kavand ehk klass.'},
      {card:'Koer nimega Max',prompt:'Kavand või konkreetne isend? Liigita kaart.',options:['Klass','Objekt'],explanation:'Max on üks kindel koer, kellel on oma nimi ja olek. Ta on objekt.'},
      {card:'Auto',prompt:'Kavand või konkreetne isend? Liigita kaart.',options:['Klass','Objekt'],explanation:'Auto on kavand, mille põhjal saab luua üksikuid autosid. Üks kindel auto oleks objekt.'},
      {card:'Anna punane auto',prompt:'Kavand või konkreetne isend? Liigita kaart.',options:['Klass','Objekt'],explanation:'Anna punane auto on klassi Auto konkreetne isend ehk objekt.'},
      {card:'new Dog("Max")\nnew Dog("Luna")',prompt:'Iga „new“ loob uue isendi. Mitu objekti luuakse?',options:['1 objekt','2 objekti','3 objekti'],explanation:'Iga new Dog kutse loob eraldi objekti. Ühe klassi põhjal saab luua palju objekte.'},
    ],
    takeaway:'Dog on klass. max ja luna viitavad kahele eri objektile. Konstruktor käivitatakse iga objekti loomisel; public name deklareerib ja algväärtustab objekti name-omaduse.',
  },
  {
    title:'Omadused ja meetodid',subtitle:'Mis objektil on ja mida ta teeb.',
    question:'Igal objektil on oma iseloom.',
    theory:'Omadused salvestavad objekti olekut, näiteks nime või energiataset. Meetodid on objektile kuuluvad funktsioonid, mis kirjeldavad käitumist, näiteks magamist või mängimist.',
    analogy:'Koeral on nimi ja energiatase. Koer saab ka haukuda ja magada. „Mis tal on?“ aitab leida omadusi; „mida ta teeb?“ aitab leida meetodeid.',
    terms:[['Omadus','Salvestab olekut: energy = 10'],['Meetod','Kirjeldab tegevust: sleep()']],
    challenges:[
      {card:'name = "Max"',prompt:'Kas see kaart salvestab olekut või kirjeldab tegevust?',options:['Omadus','Meetod'],explanation:'name hoiab väärtust. Objektile salvestatud väärtus on omadus.'},
      {card:'bark()',prompt:'Kas see kaart salvestab olekut või kirjeldab tegevust?',options:['Omadus','Meetod'],explanation:'bark() käivitab koera tegevuse. See on meetod.'},
      {card:'energy = 10',prompt:'Kas see kaart salvestab olekut või kirjeldab tegevust?',options:['Omadus','Meetod'],explanation:'energy salvestab koera praegust olekut, seega on see omadus.'},
      {card:'sleep()',prompt:'Kas see kaart salvestab olekut või kirjeldab tegevust?',options:['Omadus','Meetod'],explanation:'sleep() teeb midagi ehk on meetod. Meetod saab ka omaduste väärtusi muuta.'},
      {card:'sleep() {\n  this.energy = 100;\n}',prompt:'Alguses on energiat 10. Kui palju on seda pärast sleep() kutset?',options:['10','100','110'],explanation:'Omistamine määrab selle objekti energiaks 100. See ei liida varasemale väärtusele 100.'},
    ],
    takeaway:'name ja energy on omadused. sleep on meetod. this viitab objektile, mille meetod parasjagu töötab; void tähendab, et meetod ei tagasta väärtust.',
  },
  {
    title:'Kapseldamine',subtitle:'Hoia objekti olek kindlate piiridega korras.',
    question:'Väike piir aitab palju.',
    theory:'Kapseldamine koondab oleku ja käitumise ning kontrollib ligipääsu objekti sisemisele olekule. Privaatsed omadused ja avalikud meetodid aitavad objektil oma reegleid järgida.',
    analogy:'Koera energia ei tohiks kunagi olla negatiivne. Selle asemel, et muu kood saaks määrata suvalise väärtuse, kontrollib mängimise meetod kõigepealt, kas energiat on piisavalt.',
    terms:[['private','Ligipääs ainult klassi seest'],['Avalik meetod','Kontrollitud viis objektiga suhtlemiseks']],
    challenges:[
      {card:'Hoia energia ≥ 0',prompt:'Milline lahendus aitab koeral seda reeglit järgida?',options:['Määra energiaks ükskõik mis','Kasuta kontrolliga play() meetodit'],explanation:'Kontrolliga meetod annab objektile võimaluse enne oleku muutmist reeglit kontrollida.'},
      {card:'private energy = 10',prompt:'Kust saab TypeScripti kood seda privaatset omadust otse kasutada?',options:['Klassi Dog seest','Kõikjalt programmist'],explanation:'TypeScript lubab privaatset energy-omadust otse kasutada ainult klassis, kus see on deklareeritud.'},
      {card:'Energiat: 2\nMängimine kulutab: 3',prompt:'play() kulutab energiat ainult siis, kui seda on vähemalt 3. Mis juhtub?',options:['Energiaks saab −1','Energiat jääb 2','Energiaks saab 3'],explanation:'Energiat pole piisavalt. Kontrolli tõttu jäetakse muudatus tegemata ja energiat jääb 2.'},
      {card:'getEnergy()',prompt:'Meetod tagastab praeguse energia arvuna. Mida see võimaldab?',options:['Lugeda energiat seda otse muutmata','Määrata privaatsele energiale suvaline väärtus'],explanation:'Lugemismeetod annab infot, kuid jätab muudatuste kontrolli klassi kätte.'},
      {card:'private energy;\npublic play();',prompt:'Mis on selle lahenduse peamine eelis?',options:['Peita kogu info igaveseks','Hoida olek kontrollitud tegevuste abil korrektne'],explanation:'Kapseldamine tähendab suhtluse kontrollimist ja reeglite hoidmist, mitte kõige peitmist.'},
    ],
    takeaway:'Muu kood palub Maxil mängida, selle asemel et tema energiat otse muuta. TypeScripti private piirab ligipääsu tüübikontrolli ajal; see ei ole salajaste andmete turvamehhanism.',
  },
  {
    title:'Pärimine',subtitle:'Kasuta seda, mida teine klass juba oskab.',
    question:'Mõni oskus tuleb perekonnast.',
    theory:'Pärimine võimaldab täpsemal alamklassil teise klassi omadusi ja käitumist taaskasutada ning täiendada. Alamklass pärib ülemklassilt ligipääsetava käitumise. Kasuta pärimist seose „on üks liik“ korral.',
    analogy:'Koer on loom. Nii koer kui ka kass saavad pärida klassilt Animal meetodi eat(). Koer lisab bark() ja kass meow() meetodi.',
    terms:[['Ülemklass','Üldisem tüüp: Animal ehk loom'],['Alamklass','Täpsem tüüp: Dog ehk koer']],
    challenges:[
      {card:'Koer → Loom',prompt:'Milline seos sobib pärimise jaoks?',options:['Koer on loom','Koeral on loom'],explanation:'Koer on üks loomaliik. See on seos „on üks liik“.'},
      {card:'Dog extends Animal',prompt:'Kumb on ülemklass?',options:['Dog','Animal'],explanation:'Pärast extends märksõna tuleb ülemklass. Dog on alamklass.'},
      {card:'Animal: eat()\nDog: bark()',prompt:'Dog pärib klassilt Animal. Milliseid meetodeid saab Dog-objekt kutsuda?',options:['Ainult bark()','Ainult eat()','Nii eat() kui ka bark()'],explanation:'Dog pärib avaliku eat() meetodi ja määrab lisaks oma bark() meetodi.'},
      {card:'Auto → Mootor',prompt:'Autol on mootor. Kas Car peaks pärima klassilt Engine?',options:['Jah, auto on mootor','Ei, hoia mootorit auto omadusena'],explanation:'Autol on mootor, kuid auto ei ole mootor. Teise objekti hoidmist omadusena nimetatakse kompositsiooniks ja see sobib siia paremini.'},
      {card:'new Animal()',prompt:'Ainult Dog määrab bark() meetodi. Kas tavaline Animal saab bark() kutsuda?',options:['Jah','Ei'],explanation:'Pärimine annab käitumise ülemklassilt alamklassile. Ülemklass ei saa juurde ainult alamklassis määratud meetodeid.'},
    ],
    takeaway:'extends määrab pärimise seose. Dog kasutab päritud eat() meetodit ja lisab bark() meetodi. Vali pärimine seose „on üks liik“ jaoks; seose „sisaldab“ puhul sobib eraldi objekti hoidmine omadusena.',
  },
  {
    title:'Polümorfism',subtitle:'Üks ühine tegevus. Erinevad tulemused.',
    question:'Sama palve. Erinevad vastused.',
    theory:'Polümorfism võimaldab eri tüüpi objektidel vastata samale tegevusele omal moel. Kood saab kasutada üldist tüüpi, samal ajal kui iga objekt määrab oma käitumise.',
    analogy:'Palu loomadel häält teha. Palve on kõigile sama, aga koer haugub ja kass näub.',
    terms:[['Ühine tegevus','Igal loomal on makeSound()'],['Ülekirjutamine','Alamklass määrab meetodi oma versiooni']],
    challenges:[
      {card:'Dog.makeSound()',prompt:'Dog kirjutab makeSound() üle nii, et see tagastab „Woof!“. Mis tagastatakse?',options:['Woof!','Meow!','Some sound'],explanation:'Dog-objekti puhul käivitub klassi Dog teostus, mis tagastab „Woof!“ ehk „Auh!“. '},
      {card:'Cat.makeSound()',prompt:'Cat kirjutab makeSound() üle nii, et see tagastab „Meow!“. Mis tagastatakse?',options:['Woof!','Meow!','Some sound'],explanation:'Sama nimega meetod võib Cat-objekti puhul käituda teisiti ja tagastada „Meow!“ ehk „Näu!“. '},
      {card:'animals: Animal[]',prompt:'Dog ja Cat pärivad klassilt Animal. Mida saab selles massiivis hoida?',options:['Ainult tavalisi Animal-objekte','Nii Dog- kui ka Cat-objekte'],explanation:'Dog ja Cat on samuti Animal-tüüpi, seega sobivad mõlemad sinna, kus oodatakse Animal-objekti.'},
      {card:'animal.makeSound()',prompt:'animal viitab Dog-objektile, kuid selle tüübiks on Animal. Milline versioon käivitub?',options:['Klassi Dog versioon','Alati klassi Animal versioon'],explanation:'Tegelik objekt määrab, milline ülekirjutatud meetod käivitub. Üldisem tüüp ei muuda Dog-objekti tavaliseks Animal-objektiks.'},
      {card:'Lisandub lehm ehk Cow',prompt:'Cow pärib klassilt Animal ja kirjutab makeSound() üle. Kas häälte tsüklit peab muutma?',options:['Jah, lisa Cow jaoks eraldi haru','Ei, kutsu ühist meetodit'],explanation:'Tsükkel kutsub juba iga Animal-objekti makeSound() meetodit. Cow määrab sama tegevuse jaoks oma käitumise.'},
    ],
    takeaway:'Tsükkel käsitleb iga elementi Animal-tüüpi objektina. Tulemuse määrab iga objekti ülekirjutatud makeSound() meetod. See ongi polümorfism.',
  },
];

const courseContent: typeof content = [
  {
    "title": "TypeScripti alused",
    "subtitle": "Anna väärtustele selged tüübid.",
    "question": "Anna väärtustele selged tüübid.",
    "theory": "TypeScript kontrollib tüüpe enne koodi käivitamist. string tähistab teksti, number arve ja boolean tõeväärtusi. Algväärtuse põhjal saab tüübi tuletada. JavaScripti väljundist tüübid eemaldatakse; need ei valideeri saabuvaid päringuid.",
    "analogy": "Silt kastil ütleb arendajale, mis sinna kuulub. See ei kontrolli internetist saabunud paki sisu.",
    "terms": [
      [
        "Tüübimäärang",
        "Selgelt määratud tüüp: age: number"
      ],
      [
        "Tüübi tuletamine",
        "let age = 20 tuletab tüübi number"
      ]
    ],
    "takeaway": "Määra funktsiooni sisendite ja väljundi tüübid. number[] sisaldab arve. tsc --noEmit kontrollib tüüpe JavaScripti faile loomata.",
    "challenges": [
      {
        "card": "\"42\"",
        "prompt": "Milline tüüp kirjeldab seda väärtust?",
        "options": [
          "number",
          "string",
          "boolean"
        ],
        "explanation": "Jutumärgid teevad sellest teksti, isegi kui sisu on numbrid."
      },
      {
        "card": "let score = 10",
        "prompt": "Kas score saab hiljem väärtuse \"ten\" ilma tüübiveata?",
        "options": [
          "Jah",
          "Ei"
        ],
        "explanation": "Algväärtusest tuletatakse number. Sõne ei sobi."
      },
      {
        "card": "const scores: number[] = [1, 2]",
        "prompt": "Millise väärtuse saab lisada?",
        "options": [
          "\"3\"",
          "3",
          "false"
        ],
        "explanation": "Iga element peab olema arv."
      },
      {
        "card": "add(a: number, b: number): number",
        "prompt": "Mida kirjeldab viimane number?",
        "options": [
          "Tagastusväärtuse tüüpi",
          "Argumentide arvu"
        ],
        "explanation": "Parameetrite loendi järel olev tüüp kirjeldab tulemust."
      },
      {
        "card": "request body → TypeScript",
        "prompt": "Kas tüübid valideerivad saabuvat JSON-i automaatselt?",
        "options": [
          "Jah",
          "Ei, kontrolli seda käitusajal"
        ],
        "explanation": "Tüübimäärangud eemaldatakse. Väliseid andmeid tuleb kontrollida käitusajal."
      }
    ]
  },
  {
    "title": "Liidesed ja ühendtüübid",
    "subtitle": "Kirjelda API vastuvõetavaid andmeid.",
    "question": "Kirjelda API vastuvõetavaid andmeid.",
    "theory": "Liides kirjeldab objekti kuju. Tüübi alias saab nimetada lubatud väärtuste ühendi. Valikuline omadus võib olla undefined ning null-väärtust tuleb enne kasutamist kontrollida. unknown nõuab tüübi kitsendamist; any jätab kasulikud kontrollid vahele.",
    "analogy": "Vorm määrab kohustuslikud väljad ja lubatud valikud, valideerimine kontrollib täidetud vormi.",
    "terms": [
      [
        "interface",
        "Objekti või teenuse leping"
      ],
      [
        "Ühendtüüp",
        "Üks mitmest tüübist või literaalväärtusest"
      ]
    ],
    "takeaway": "DTO-d kirjeldavad kihtide vahel liikuvaid andmeid. Liidesed ei loo isendeid ega asenda valideerimist.",
    "challenges": [
      {
        "card": "description?: string",
        "prompt": "Kas selle välja võib ära jätta?",
        "options": [
          "Jah",
          "Ei"
        ],
        "explanation": "Küsimärk muudab omaduse valikuliseks."
      },
      {
        "card": "type Visibility = \"public\" | \"private\"",
        "prompt": "Milline väärtus on lubatud?",
        "options": [
          "\"friends\"",
          "\"private\""
        ],
        "explanation": "Literaalide ühend lubab ainult loetletud väärtusi."
      },
      {
        "card": "interface Post { title: string }",
        "prompt": "Kas see loob Post-isendi?",
        "options": [
          "Jah",
          "Ei"
        ],
        "explanation": "Liides kirjeldab kuju ning sellel pole käitusajal konstruktorit."
      },
      {
        "card": "post: Post | null",
        "prompt": "Mida teha enne post.title lugemist?",
        "options": [
          "Kontrolli, et post pole null",
          "Kasuta seda kohe"
        ],
        "explanation": "Null-kontroll kitsendab tulemuse tüübiks Post."
      },
      {
        "card": "input: unknown",
        "prompt": "Kuidas saab ohutult kutsuda input.trim()?",
        "options": [
          "Muuda tüübiks any",
          "Kontrolli typeof input === \"string\""
        ],
        "explanation": "Kontroll kitsendab unknown-tüübi sõneks. any eemaldaks kaitse."
      }
    ]
  },
  {
    "title": "Kompositsioon ja lepingud",
    "subtitle": "Anna teenusele vajalikud sõltuvused.",
    "question": "Anna teenusele vajalikud sõltuvused.",
    "theory": "Kompositsioon tähendab, et objekt kasutab teist objekti. Konstruktori kaudu süstimine annab sõltuvuse väljastpoolt. Sõltu liidesest, et mäluhoidla ja andmebaasihoidla saaksid täita sama lepingut. public on ligipääsetav kõikjalt, private oma klassist ja protected oma klassist ning alamklassidest.",
    "analogy": "Teenusel on hoidla, nagu autol on mootor. Teenus ei ole hoidla liik.",
    "terms": [
      [
        "Kompositsioon",
        "Seos „omab või kasutab“"
      ],
      [
        "Süstimine",
        "Anna sõltuvused konstruktorisse"
      ]
    ],
    "takeaway": "Teenus vajab ainult lepingut. readonly takistab repo ümbermääramist pärast konstrueerimist; see ei külmuta hoidla objekti.",
    "challenges": [
      {
        "card": "UsersService → UsersRepository",
        "prompt": "Milline seos sobib?",
        "options": [
          "Teenus pärib hoidlast",
          "Teenus kasutab hoidlat"
        ],
        "explanation": "Teise objekti kasutamine on kompositsioon."
      },
      {
        "card": "constructor(private repo: Repository)",
        "prompt": "Kes annab hoidla?",
        "options": [
          "Teenust loov kood",
          "Teenus peab selle ise looma"
        ],
        "explanation": "Kutsuja annab sõltuvuse konstruktorisse."
      },
      {
        "card": "protected name: string",
        "prompt": "Kus on otsene ligipääs lubatud?",
        "options": [
          "Kõikjal",
          "Klassis ja alamklassides"
        ],
        "explanation": "protected lubab alamklassi ligipääsu, erinevalt private-ist."
      },
      {
        "card": "private readonly repo: Repository",
        "prompt": "Kas readonly külmutab kõik hoidla andmed?",
        "options": [
          "Jah",
          "Ei"
        ],
        "explanation": "See takistab omaduse ümbermääramist, mitte objekti sisemisi muudatusi."
      },
      {
        "card": "MySQL repository → fake repository",
        "prompt": "Mis lubab samal teenusel kasutada mõlemat?",
        "options": [
          "Ühine liides",
          "Ühine andmebaasiühendus"
        ],
        "explanation": "Mõlemad teostused pakuvad teenuse oodatud tegevusi."
      }
    ]
  },
  {
    "title": "API kihid",
    "subtitle": "Jälgi päringut läbi rakenduse.",
    "question": "Jälgi päringut läbi rakenduse.",
    "theory": "Ruuter seob HTTP meetodi ja tee kontrolleriga. Kontroller loeb ja valideerib sisendi ning vormistab vastuse. Teenus kontrollib ärireegleid. Hoidla tegeleb andmete salvestamisega. Hoia HTTP detailid teenusest ja SQL kontrollerist väljas.",
    "analogy": "Restoranis on teenindaja, köök ja ladu. Igaühel on erinev vastutus.",
    "terms": [
      [
        "Kontroller",
        "HTTP sisend ja väljund"
      ],
      [
        "Teenus / hoidla",
        "Ärireeglid / andmetele ligipääs"
      ]
    ],
    "takeaway": "See iseseisev mudel näitab kihtide piiri ilma Expressi sõltuvusteta. Expressis kutsub ruuter kontrollerit, mis saadab vastuse.",
    "challenges": [
      {
        "card": "GET /posts/:id → handler",
        "prompt": "Milline kiht seob tee töötlejaga?",
        "options": [
          "Ruuter",
          "Hoidla"
        ],
        "explanation": "Ruutimine seob meetodid ja teed töötlejatega."
      },
      {
        "card": "req.params.id",
        "prompt": "Milline kiht loeb seda HTTP detaili?",
        "options": [
          "Teenus",
          "Kontroller"
        ],
        "explanation": "Kontroller teisendab HTTP sisendi teenuse argumentideks."
      },
      {
        "card": "Only the author may edit a post",
        "prompt": "Kuhu kuulub see ärireegel?",
        "options": [
          "Teenusesse",
          "SQL ühenduse seadistusse"
        ],
        "explanation": "Teenus kontrollib rakenduse reegleid."
      },
      {
        "card": "SELECT ... WHERE id = ?",
        "prompt": "Millisele kihile kuulub see päring?",
        "options": [
          "Kontrollerile",
          "Hoidlale"
        ],
        "explanation": "Hoidla peidab andmebaasi detailid ning kasutab seotud parameetreid."
      },
      {
        "card": "\"abc\" → Number → NaN",
        "prompt": "Mida peaks kontroller selle ID-ga tegema?",
        "options": [
          "Lükka vigane sisend tagasi",
          "Saada NaN hoidlasse"
        ],
        "explanation": "Kontrolli teisendatud väärtust enne teenuse kutsumist."
      }
    ]
  },
  {
    "title": "Asünkroonsus ja vead",
    "subtitle": "Oota andmeid ja käsitle puuduvaid tulemusi.",
    "question": "Oota andmeid ja käsitle puuduvaid tulemusi.",
    "theory": "async-funktsioon tagastab Promise-i. await annab asünkroonses funktsioonis täidetud lubaduse väärtuse või viskab tagasilükkamise põhjuse. Puuduv ressurss erineb nurjunud andmebaasitoimingust. Käsitle oodatud puudumist selgelt ning edasta ootamatud vead veahalduse piirile.",
    "analogy": "Numbriga tellimuspilet on lubadus toidust, mitte toit ise.",
    "terms": [
      [
        "Promise<T>",
        "Tulevane T-tüüpi tulemus"
      ],
      [
        "await",
        "Oota täitumist või tagasilükkamist"
      ]
    ],
    "takeaway": "Puuduv postitus muutub konkreetseks veaks. HTTP kiht saab selle teisendada 404-ks; ootamatuid tõrkeid ei tohiks esitada puuduvate andmetena.",
    "challenges": [
      {
        "card": "async get(): Promise<Post>",
        "prompt": "Mille tagastab get() kohe?",
        "options": [
          "Promise-i",
          "Otse Post-objekti"
        ],
        "explanation": "async-funktsioonid tagastavad alati Promise-i."
      },
      {
        "card": "await repo.findById(1)",
        "prompt": "Mis juhtub, kui Promise lükatakse tagasi?",
        "options": [
          "await viskab tagasilükkamise põhjuse",
          "Tagastatakse alati null"
        ],
        "explanation": "Käsitle viga ümbritseva catch-iga või lase sel edasi liikuda."
      },
      {
        "card": "Post | null",
        "prompt": "Otsing õnnestub, kuid postitust pole. Milline tulemus sobib?",
        "options": [
          "null",
          "Väljamõeldud postitus"
        ],
        "explanation": "null tähistab selgelt puuduvat ressurssi."
      },
      {
        "card": "NotFoundError",
        "prompt": "Milline HTTP olekukood sobib puuduvale postitusele?",
        "options": [
          "200",
          "404"
        ],
        "explanation": "404 tähendab, et soovitud ressurssi ei leitud."
      },
      {
        "card": "Database connection fails",
        "prompt": "Kas iga tõrge peaks muutuma 404-ks?",
        "options": [
          "Jah",
          "Ei, edasta ootamatud tõrked"
        ],
        "explanation": "Andmebaasi katkestus ei tõesta postituse puudumist."
      }
    ]
  },
  {
    "title": "Testitavad teenused",
    "subtitle": "Kontrolli käitumist juhitavate sõltuvustega.",
    "question": "Kontrolli käitumist juhitavate sõltuvustega.",
    "theory": "Ühiktest kontrollib väikest käitumisosa juhitud sisenditega. Süsti võltshoidla, et testida teenust ilma andmebaasita. Otspunkti testid kontrollivad HTTP olekukoodi ja vastuse keha. Kata nii õnnestumine kui ka ebaõnnestumine ning kontrolli tegelikku tulemust, mitte ainult meetodi väljakutsumist.",
    "analogy": "Proovis saab kasutada asendajat, et kontrollida ühe näitleja teksti kogu teatrit kokku kutsumata.",
    "terms": [
      [
        "Võltsteostus",
        "Sõltuvuse juhitav teostus"
      ],
      [
        "Väide",
        "Kontrollib oodatud tulemust"
      ]
    ],
    "takeaway": "Need iseseisvad kontrollid nurjuvad vale käitumise korral. Kursusel kasuta teenuse väidete jaoks Mocha/Chai tööriistu ja HTTP käitumise jaoks Supertesti.",
    "challenges": [
      {
        "card": "Unit test: PostsService",
        "prompt": "Milline sõltuvus teeb testi MySQL-ist sõltumatuks?",
        "options": [
          "Võltshoidla",
          "Tootmisandmebaas"
        ],
        "explanation": "Võltsteostus annab ennustatavaid tulemusi ilma andmebaasiühenduseta."
      },
      {
        "card": "service.getName(1)",
        "prompt": "Kas meetodi kutsumisest piisab tulemuse kontrollimiseks?",
        "options": [
          "Jah",
          "Ei, kontrolli oodatud väärtust"
        ],
        "explanation": "Ainult väljakutse võib vale tagastusväärtuse märkamata jätta."
      },
      {
        "card": "GET /posts/999",
        "prompt": "Mida peaks otspunkti test kontrollima?",
        "options": [
          "Ainult meetodi nime",
          "HTTP olekukoodi ja vastuse keha"
        ],
        "explanation": "Need on API lepingu vaadeldavad osad."
      },
      {
        "card": "Expected rejection from async get()",
        "prompt": "Kuidas peaks test seda jälgima?",
        "options": [
          "Oota ja kontrolli tagasilükkamist",
          "Ignoreeri Promise-i"
        ],
        "explanation": "Promise-i ignoreerides võib test lõppeda enne tõrget."
      },
      {
        "card": "Refactor functions into classes",
        "prompt": "Mida peaksid olemasolevad otspunkti testid kinnitama?",
        "options": [
          "API avalik käitumine jääb samaks",
          "Iga funktsioon muutus klassiks"
        ],
        "explanation": "Refaktoreerimine muudab struktuuri, säilitades vaadeldava käitumise."
      }
    ]
  }
];
content.push(...courseContent);

export const estonianLessons: Lesson[] = englishLessons.map((lesson, index) => ({
  ...lesson,
  ...content[index],
  challenges: lesson.challenges.map((challenge, round) => ({ ...challenge, ...content[index].challenges[round] })),
}));
