export interface Challenge {
  card: string;
  icon: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}
export interface Lesson {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  question: string;
  theory: string;
  analogy: string;
  terms: [string, string][];
  challenges: Challenge[];
  code: string;
  takeaway: string;
}
export const lessons: Lesson[] = [
  {
    title: 'Classes & objects', subtitle: 'Meet the blueprint and the things it makes.', icon: '▧', color: 'mint',
    question: 'A blueprint. A whole world of possibilities.',
    theory: 'A class is a blueprint that defines the properties and behaviors its objects can have. An object is a specific instance of a class, with its own values.',
    analogy: 'Think of a cookie cutter and cookies. One cutter gives you the shape; each cookie is a separate thing made from it.',
    terms: [['Class', 'The blueprint: Dog'], ['Object', 'An instance: a dog named Max']],
    challenges: [
      {card:'Dog',icon:'🐕',prompt:'Blueprint or instance? Classify this card.',options:['Class','Object'],answer:0,explanation:'Dog describes a type of thing. It is the blueprint, so it represents a class.'},
      {card:'A dog named Max',icon:'🐶',prompt:'Blueprint or instance? Classify this card.',options:['Class','Object'],answer:1,explanation:'Max is one particular dog, with his own name and state. He represents an object.'},
      {card:'Car',icon:'🚙',prompt:'Blueprint or instance? Classify this card.',options:['Class','Object'],answer:0,explanation:'Car is a blueprint for creating individual cars. A specific car would be an object.'},
      {card:'Anna’s red car',icon:'🚗',prompt:'Blueprint or instance? Classify this card.',options:['Class','Object'],answer:1,explanation:'Anna’s red car is a particular instance of Car, so it is an object.'},
      {card:'new Dog("Max")\nnew Dog("Luna")',icon:'✦',prompt:'Each “new” creates an instance. How many objects are created?',options:['1 object','2 objects','3 objects'],answer:1,explanation:'Each call to new Dog creates a separate object. One class can create many objects.'},
    ],
    code:'class Dog {\n  constructor(public name: string) {}\n}\n\nconst max = new Dog("Max");\nconst luna = new Dog("Luna");\n\nconsole.log(max.name);  // "Max"\nconsole.log(luna.name); // "Luna"',
    takeaway:'Dog is the class. max and luna refer to two different objects. The constructor runs when each object is created; public name declares and initializes its name property.',
  },
  {
    title:'Properties & methods',subtitle:'What an object has. What an object does.',icon:'⚡',color:'peach',
    question:'Every object has a little personality.',
    theory:'Properties store an object’s state, such as its name or energy. Methods are functions on an object that describe behavior, such as sleeping or playing.',
    analogy:'Your dog has a name and an energy level. Your dog can also bark and sleep. “Has” helps you spot properties; “does” helps you spot methods.',
    terms:[['Property','Stores state: energy = 10'],['Method','Performs behavior: sleep()']],
    challenges:[
      {card:'name = "Max"',icon:'🏷️',prompt:'Does this card store state or perform behavior?',options:['Property','Method'],answer:0,explanation:'name holds a value. A value stored on an object is a property.'},
      {card:'bark()',icon:'💬',prompt:'Does this card store state or perform behavior?',options:['Property','Method'],answer:1,explanation:'bark() is an action called on the dog. It is a method.'},
      {card:'energy = 10',icon:'🔋',prompt:'Does this card store state or perform behavior?',options:['Property','Method'],answer:0,explanation:'energy records the dog’s current state, so it is a property.'},
      {card:'sleep()',icon:'🌙',prompt:'Does this card store state or perform behavior?',options:['Property','Method'],answer:1,explanation:'sleep() performs behavior. A method can also update properties.'},
      {card:'sleep() {\n  this.energy = 100;\n}',icon:'☀️',prompt:'Energy starts at 10. What is it after calling sleep()?',options:['10','100','110'],answer:1,explanation:'The assignment sets this object’s energy to 100. It does not add 100 to the previous value.'},
    ],
    code:'class Dog {\n  name = "Max";\n  energy = 10;\n\n  sleep(): void {\n    this.energy = 100;\n  }\n}\n\nconst max = new Dog();\nmax.sleep();\nconsole.log(max.energy); // 100',takeaway:'name and energy are properties. sleep is a method. this refers to the object whose method is running; void means the method does not return a value.',
  },
  {
    title:'Encapsulation',subtitle:'Keep state safe with a few good boundaries.',icon:'⛨',color:'lavender',
    question:'A little boundary goes a long way.',
    theory:'Encapsulation brings state and behavior together and controls access to internal state. Private properties and public methods help an object enforce its rules.',
    analogy:'A dog’s energy should never be negative. Instead of letting other code set any value, a play method checks there is enough energy first.',
    terms:[['private','Access inside the class'],['Public method','A controlled way to interact']],
    challenges:[
      {card:'Keep energy ≥ 0',icon:'🔋',prompt:'Which design helps the dog protect this rule?',options:['Set energy to anything','Use play() with a check'],answer:1,explanation:'A checked method gives the object a chance to enforce its rule before changing state.'},
      {card:'private energy = 10',icon:'🔒',prompt:'Where can TypeScript code directly access this private property?',options:['Inside the Dog class','Anywhere in the program'],answer:0,explanation:'TypeScript restricts direct access to private energy to the class that declares it.'},
      {card:'energy: 2\nplay costs: 3',icon:'🐕',prompt:'play() only spends energy if at least 3 remains. What happens?',options:['Energy becomes −1','Energy stays 2','Energy becomes 3'],answer:1,explanation:'There is not enough energy. The check skips the change, so energy stays at 2.'},
      {card:'getEnergy()',icon:'👀',prompt:'A method returns the current energy as a number. What does this allow?',options:['Read energy without directly setting it','Change private energy to any value'],answer:0,explanation:'A getter method exposes information while leaving changes under the class’s control.'},
      {card:'private energy;\npublic play();',icon:'🛡️',prompt:'What is the main benefit of this design?',options:['Hide all information forever','Keep state valid through controlled actions'],answer:1,explanation:'Encapsulation is about controlling interactions and preserving rules, not hiding everything.'},
    ],
    code:'class Dog {\n  private energy = 10;\n\n  play(): void {\n    if (this.energy >= 3) {\n      this.energy -= 3;\n    }\n  }\n\n  getEnergy(): number {\n    return this.energy;\n  }\n}\n\nconst max = new Dog();\nmax.play();\nconsole.log(max.getEnergy()); // 7',takeaway:'Other code asks Max to play instead of changing his energy directly. TypeScript private is a type-checking boundary, not a security mechanism for secret data.',
  },
  {
    title:'Inheritance',subtitle:'Build on what another class already knows.',icon:'⑂',color:'blue',
    question:'Some things run in the family.',
    theory:'Inheritance lets a specialized class reuse and extend another class. The subclass inherits accessible behavior from its parent class. Use it for an “is a” relationship.',
    analogy:'A dog is an animal. Both dogs and cats can inherit eat() from Animal, while a dog adds bark() and a cat adds meow().',
    terms:[['Parent class','The general type: Animal'],['Subclass','The specialized type: Dog']],
    challenges:[
      {card:'Dog → Animal',icon:'🐕',prompt:'Which relationship makes sense for inheritance?',options:['A dog is an animal','A dog has an animal'],answer:0,explanation:'Dog is a specialized kind of Animal. This is an “is a” relationship.'},
      {card:'Dog extends Animal',icon:'🌳',prompt:'Which is the parent class?',options:['Dog','Animal'],answer:1,explanation:'The class after extends is the parent. Dog is the subclass.'},
      {card:'Animal: eat()\nDog: bark()',icon:'🦴',prompt:'Dog extends Animal. Which methods can a Dog object call?',options:['Only bark()','Only eat()','Both eat() and bark()'],answer:2,explanation:'Dog inherits the public eat() method and defines its own bark() method.'},
      {card:'Car → Engine',icon:'🚘',prompt:'A car has an engine. Should Car extend Engine?',options:['Yes, a car is an engine','No, store an engine on the car'],answer:1,explanation:'A car has an engine; it is not an engine. Storing another object is composition, a better fit here.'},
      {card:'new Animal()',icon:'🐾',prompt:'Only Dog defines bark(). Can a plain Animal call bark()?',options:['Yes','No'],answer:1,explanation:'Inheritance passes behavior from parent to subclass. The parent does not acquire methods defined only by a subclass.'},
    ],
    code:'class Animal {\n  eat(): string {\n    return "Eating";\n  }\n}\n\nclass Dog extends Animal {\n  bark(): string {\n    return "Woof!";\n  }\n}\n\nconst max = new Dog();\nconsole.log(max.eat());  // "Eating"\nconsole.log(max.bark()); // "Woof!"',takeaway:'extends establishes inheritance. Dog reuses eat() and adds bark(). Choose inheritance for “is a”; storing a separate object works well for “has a”.',
  },
  {
    title:'Polymorphism',subtitle:'One shared action. Different personalities.',icon:'✳',color:'yellow',
    question:'Same invitation. Different responses.',
    theory:'Polymorphism lets different types of objects respond to a shared operation in their own way. Code can work with the general type while each object supplies its own behavior.',
    analogy:'Ask a group of animals to make a sound. You ask the same thing of each animal, but the dog woofs and the cat meows.',
    terms:[['Shared operation','Every animal has makeSound()'],['Override','A subclass supplies its own version']],
    challenges:[
      {card:'Dog.makeSound()',icon:'🐶',prompt:'Dog overrides makeSound() to return “Woof!”. What is returned?',options:['Woof!','Meow!','Some sound'],answer:0,explanation:'The Dog implementation runs for a Dog object, producing “Woof!”.'},
      {card:'Cat.makeSound()',icon:'🐱',prompt:'Cat overrides makeSound() to return “Meow!”. What is returned?',options:['Woof!','Meow!','Some sound'],answer:1,explanation:'The same method name can produce different behavior for a Cat object.'},
      {card:'animals: Animal[]',icon:'🐾',prompt:'Dog and Cat extend Animal. What can this array hold?',options:['Only plain Animal objects','Both Dog and Cat objects'],answer:1,explanation:'Dog and Cat are also Animals, so both can be used where an Animal is expected.'},
      {card:'animal.makeSound()',icon:'💬',prompt:'animal refers to a Dog, but is typed as Animal. Which version runs?',options:['Dog’s version','Always Animal’s version'],answer:0,explanation:'The actual object determines which overridden method runs. The general type does not turn a Dog into a plain Animal.'},
      {card:'A new Cow joins',icon:'🐮',prompt:'Cow extends Animal and overrides makeSound(). Must the sound loop change?',options:['Yes, add a special Cow branch','No, call the shared method'],answer:1,explanation:'The loop already calls makeSound() on every Animal. Cow supplies its own behavior through that same operation.'},
    ],
    code:'class Animal {\n  makeSound(): string { return "Some sound"; }\n}\n\nclass Dog extends Animal {\n  override makeSound(): string { return "Woof!"; }\n}\n\nclass Cat extends Animal {\n  override makeSound(): string { return "Meow!"; }\n}\n\nconst animals: Animal[] = [new Dog(), new Cat()];\nfor (const animal of animals) {\n  console.log(animal.makeSound());\n}\n// "Woof!", then "Meow!"',takeaway:'The loop treats every item as an Animal. Each object’s overridden makeSound() decides the result. That is polymorphism in action.',
  },
];
