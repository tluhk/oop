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

export const estonianLessons: Lesson[] = englishLessons.map((lesson, index) => ({
  ...lesson,
  ...content[index],
  challenges: lesson.challenges.map((challenge, round) => ({ ...challenge, ...content[index].challenges[round] })),
}));
