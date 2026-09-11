export interface Challenge {
  kind?: 'choice' | 'predict' | 'repair';
  card: string;
  icon: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}
export interface Lesson {
  id: string;
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
    id: 'classes-objects',
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
      {kind:'predict',card:'new Dog("Max")\nnew Dog("Luna")',icon:'✦',prompt:'Each “new” creates an instance. How many objects are created?',options:['1 object','2 objects','3 objects'],answer:1,explanation:'Each call to new Dog creates a separate object. One class can create many objects.'},
    ],
    code:'class Dog {\n  constructor(public name: string) {}\n}\n\nconst max = new Dog("Max");\nconst luna = new Dog("Luna");\n\nconsole.log(max.name);  // "Max"\nconsole.log(luna.name); // "Luna"',
    takeaway:'Dog is the class. max and luna refer to two different objects. The constructor runs when each object is created; public name declares and initializes its name property.',
  },
  {
    id: 'properties-methods',
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
      {kind:'predict',card:'sleep() {\n  this.energy = 100;\n}',icon:'☀️',prompt:'Energy starts at 10. What is it after calling sleep()?',options:['10','100','110'],answer:1,explanation:'The assignment sets this object’s energy to 100. It does not add 100 to the previous value.'},
    ],
    code:'class Dog {\n  name = "Max";\n  energy = 10;\n\n  sleep(): void {\n    this.energy = 100;\n  }\n}\n\nconst max = new Dog();\nmax.sleep();\nconsole.log(max.energy); // 100',takeaway:'name and energy are properties. sleep is a method. this refers to the object whose method is running; void means the method does not return a value.',
  },
  {
    id: 'encapsulation',
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
    id: 'inheritance',
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
    id: 'polymorphism',
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

// Append to preserve the original saved lesson indices.
const courseLessons: Lesson[] = [
  {
    id: 'typescript-basics',
    "title": "TypeScript basics",
    "subtitle": "Give your values clear types.",
    "question": "Give your values clear types.",
    "theory": "TypeScript checks types before code runs. Use string for text, number for numbers and boolean for true or false. Initial values can let TypeScript infer a type. Types are removed from the JavaScript output; they do not validate incoming requests.",
    "analogy": "A label on a box tells developers what belongs inside. It cannot inspect a parcel arriving from the internet.",
    "terms": [
      [
        "Annotation",
        "Explicit type: age: number"
      ],
      [
        "Inference",
        "let age = 20 infers number"
      ]
    ],
    "code": "let age: number = 20;\nconst username: string = \"Mari\";\nconst active: boolean = true;\nconst scores: number[] = [10, 20];\n\nfunction add(a: number, b: number): number {\n  return a + b;\n}\nconsole.log(username, active, add(age, scores[0]));",
    "takeaway": "Annotate function inputs and outputs. number[] holds numbers. Run tsc --noEmit to check types without generating JavaScript.",
    "icon": "⌘",
    "color": "blue",
    "challenges": [
      {
        "card": "\"42\"",
        "icon": "✦",
        "prompt": "Which type describes this value?",
        "options": [
          "number",
          "string",
          "boolean"
        ],
        "answer": 1,
        "explanation": "Quotes make this text, even when it contains digits."
      },
      {
        "card": "let score = 10",
        "icon": "✦",
        "prompt": "Can score later receive \"ten\" without a type error?",
        "options": [
          "Yes",
          "No"
        ],
        "answer": 1,
        "explanation": "The initial value infers number. A string does not match."
      },
      {
        "card": "const scores: number[] = [1, 2]",
        "icon": "✦",
        "prompt": "Which value can be pushed?",
        "options": [
          "\"3\"",
          "3",
          "false"
        ],
        "answer": 1,
        "explanation": "Every element must be a number."
      },
      {
        "card": "add(a: number, b: number): number",
        "icon": "✦",
        "prompt": "What does the final number describe?",
        "options": [
          "The return type",
          "The number of arguments"
        ],
        "answer": 0,
        "explanation": "The type after the parameter list describes the result."
      },
      {
        "card": "request body → TypeScript",
        "icon": "✦",
        "prompt": "Do types automatically validate incoming JSON?",
        "options": [
          "Yes",
          "No, check it at runtime"
        ],
        "answer": 1,
        "explanation": "Type annotations are erased. External data still needs runtime validation."
      }
    ]
  },
  {
    id: 'interfaces-unions',
    "title": "Interfaces & unions",
    "subtitle": "Describe the data your API accepts.",
    "question": "Describe the data your API accepts.",
    "theory": "An interface describes an object’s shape. A type alias can name a union of allowed values. Optional properties may be undefined, and a nullable result must be checked before use. unknown requires narrowing; any skips useful checks.",
    "analogy": "A form specifies required fields and allowed choices, while validation checks the filled-in form.",
    "terms": [
      [
        "interface",
        "An object or service contract"
      ],
      [
        "Union",
        "One of several types or literal values"
      ]
    ],
    "code": "type Visibility = \"public\" | \"private\";\ninterface CreatePostDto {\n  title: string;\n  visibility: Visibility;\n  description?: string;\n}\nfunction label(post: CreatePostDto): string {\n  return post.description ?? post.title;\n}\nconst post: CreatePostDto = { title: \"Hello\", visibility: \"public\" };\nconsole.log(label(post)); // \"Hello\"",
    "takeaway": "DTOs describe data passed between layers. Interfaces do not create instances or replace validation.",
    "icon": "⌘",
    "color": "mint",
    "challenges": [
      {
        "card": "description?: string",
        "icon": "✦",
        "prompt": "Can this field be omitted?",
        "options": [
          "Yes",
          "No"
        ],
        "answer": 0,
        "explanation": "The question mark makes the property optional."
      },
      {
        "card": "type Visibility = \"public\" | \"private\"",
        "icon": "✦",
        "prompt": "Which value is allowed?",
        "options": [
          "\"friends\"",
          "\"private\""
        ],
        "answer": 1,
        "explanation": "A literal union accepts only its listed values."
      },
      {
        "card": "interface Post { title: string }",
        "icon": "✦",
        "prompt": "Does this create a Post instance?",
        "options": [
          "Yes",
          "No"
        ],
        "answer": 1,
        "explanation": "An interface describes a shape and has no runtime constructor."
      },
      {
        "card": "post: Post | null",
        "icon": "✦",
        "prompt": "What should happen before reading post.title?",
        "options": [
          "Check post is not null",
          "Use it immediately"
        ],
        "answer": 0,
        "explanation": "A null check narrows the result to Post."
      },
      {
        "card": "input: unknown",
        "icon": "✦",
        "prompt": "How can you safely call input.trim()?",
        "options": [
          "Change it to any",
          "Check typeof input === \"string\""
        ],
        "answer": 1,
        "explanation": "The check narrows unknown to string. any would remove protection."
      }
    ]
  },
  {
    id: 'composition-contracts',
    "title": "Composition & contracts",
    "subtitle": "Give a service its dependencies.",
    "question": "Give a service its dependencies.",
    "theory": "Composition means an object uses another object. Constructor injection supplies that dependency from outside. Depend on an interface so an in-memory repository and a database repository can fulfil the same contract. public is accessible everywhere, private within its class, and protected within the class and subclasses.",
    "analogy": "A service has a repository, just as a car has an engine. It is not a kind of repository.",
    "terms": [
      [
        "Composition",
        "A has-a relationship"
      ],
      [
        "Injection",
        "Pass dependencies into the constructor"
      ]
    ],
    "code": "interface NamesRepository {\n  findName(id: number): string;\n}\nclass NamesService {\n  constructor(private readonly repo: NamesRepository) {}\n  greet(id: number): string {\n    return \"Hello, \" + this.repo.findName(id);\n  }\n}\nconst fake: NamesRepository = { findName: () => \"Mari\" };\nconsole.log(new NamesService(fake).greet(1));",
    "takeaway": "The service only needs the contract. readonly prevents reassigning repo after construction; it does not freeze the repository object.",
    "icon": "⌘",
    "color": "peach",
    "challenges": [
      {
        "card": "UsersService → UsersRepository",
        "icon": "✦",
        "prompt": "Which relationship fits?",
        "options": [
          "Service extends Repository",
          "Service uses Repository"
        ],
        "answer": 1,
        "explanation": "Using another object is composition."
      },
      {
        "card": "constructor(private repo: Repository)",
        "icon": "✦",
        "prompt": "Who supplies the repository?",
        "options": [
          "The code creating the service",
          "The service must create it"
        ],
        "answer": 0,
        "explanation": "The caller passes the dependency to the constructor."
      },
      {
        "card": "protected name: string",
        "icon": "✦",
        "prompt": "Where is direct access allowed?",
        "options": [
          "Anywhere",
          "In the class and subclasses"
        ],
        "answer": 1,
        "explanation": "protected allows subclass access, unlike private."
      },
      {
        "card": "private readonly repo: Repository",
        "icon": "✦",
        "prompt": "Does readonly freeze all repository data?",
        "options": [
          "Yes",
          "No"
        ],
        "answer": 1,
        "explanation": "It prevents reassigning this property, not changes inside the object."
      },
      {
        "card": "MySQL repository → fake repository",
        "icon": "✦",
        "prompt": "What lets the same service use either?",
        "options": [
          "A shared interface",
          "A shared database connection"
        ],
        "answer": 0,
        "explanation": "Both implementations satisfy the operations the service expects."
      }
    ]
  },
  {
    id: 'api-layers',
    "title": "API layers",
    "subtitle": "Follow a request through the application.",
    "question": "Follow a request through the application.",
    "theory": "A router connects an HTTP method and path to a controller. The controller reads and validates request input and formats the response. The service enforces business rules. The repository handles persistence. Keep HTTP details out of the service and SQL out of the controller.",
    "analogy": "A restaurant has a waiter, a kitchen and a pantry. Each has a different responsibility.",
    "terms": [
      [
        "Controller",
        "HTTP input and output"
      ],
      [
        "Service / repository",
        "Business rules / data access"
      ]
    ],
    "code": "interface Post { id: number; title: string }\ninterface PostsRepository { findById(id: number): Post | null }\nclass PostsService {\n  constructor(private repo: PostsRepository) {}\n  get(id: number): Post | null { return this.repo.findById(id); }\n}\n// Framework-independent controller model.\nfunction getPost(rawId: string, service: PostsService) {\n  const id = Number(rawId);\n  if (!Number.isInteger(id) || id <= 0) return { status: 400 };\n  const post = service.get(id);\n  return post ? { status: 200, body: post } : { status: 404 };\n}",
    "takeaway": "This standalone model shows the boundary without Express dependencies. In Express, the router invokes a controller that sends the response.",
    "icon": "⌘",
    "color": "lavender",
    "challenges": [
      {
        "card": "GET /posts/:id → handler",
        "icon": "✦",
        "prompt": "Which layer connects the path to the handler?",
        "options": [
          "Router",
          "Repository"
        ],
        "answer": 0,
        "explanation": "Routing maps methods and paths to handlers."
      },
      {
        "card": "req.params.id",
        "icon": "✦",
        "prompt": "Which layer reads this HTTP detail?",
        "options": [
          "Service",
          "Controller"
        ],
        "answer": 1,
        "explanation": "The controller translates HTTP input into service arguments."
      },
      {
        "card": "Only the author may edit a post",
        "icon": "✦",
        "prompt": "Where does this business rule belong?",
        "options": [
          "Service",
          "SQL connection setup"
        ],
        "answer": 0,
        "explanation": "The service enforces application rules."
      },
      {
        "card": "SELECT ... WHERE id = ?",
        "icon": "✦",
        "prompt": "Which layer owns this query?",
        "options": [
          "Controller",
          "Repository"
        ],
        "answer": 1,
        "explanation": "The repository hides database details and uses bound parameters."
      },
      {
        "card": "\"abc\" → Number → NaN",
        "icon": "✦",
        "prompt": "What should the controller do with this ID?",
        "options": [
          "Reject invalid input",
          "Send NaN to the repository"
        ],
        "answer": 0,
        "explanation": "Validate the converted value before calling the service."
      }
    ]
  },
  {
    id: 'async-errors',
    "title": "Async & errors",
    "subtitle": "Wait for data and handle missing results.",
    "question": "Wait for data and handle missing results.",
    "theory": "An async function returns a Promise. await obtains its fulfilled value or throws its rejection inside an async function. A missing resource is different from a failed database operation. Handle expected absence explicitly and pass unexpected errors to the error-handling boundary.",
    "analogy": "A numbered pickup ticket is a promise of a meal, not the meal itself.",
    "terms": [
      [
        "Promise<T>",
        "A future result of type T"
      ],
      [
        "await",
        "Wait for fulfillment or rejection"
      ]
    ],
    "code": "interface Post { id: number; title: string }\ninterface Repository { findById(id: number): Promise<Post | null> }\nclass NotFoundError extends Error {}\nclass PostsService {\n  constructor(private repo: Repository) {}\n  async get(id: number): Promise<Post> {\n    const post = await this.repo.findById(id);\n    if (post === null) throw new NotFoundError(\"Post not found\");\n    return post;\n  }\n}",
    "takeaway": "A missing post becomes a specific error. The HTTP boundary can map it to 404; unexpected failures should not be disguised as missing data.",
    "icon": "⌘",
    "color": "yellow",
    "challenges": [
      {
        "card": "async get(): Promise<Post>",
        "icon": "✦",
        "prompt": "What does get() immediately return?",
        "options": [
          "A Promise",
          "A Post directly"
        ],
        "answer": 0,
        "explanation": "async functions always return a Promise."
      },
      {
        "card": "await repo.findById(1)",
        "icon": "✦",
        "prompt": "What if the Promise rejects?",
        "options": [
          "await throws the rejection",
          "It always returns null"
        ],
        "answer": 0,
        "explanation": "Handle the thrown error with a surrounding catch or let it propagate."
      },
      {
        "card": "Post | null",
        "icon": "✦",
        "prompt": "The lookup succeeds but the post is absent. Which result fits?",
        "options": [
          "null",
          "A fabricated post"
        ],
        "answer": 0,
        "explanation": "null explicitly models an absent resource."
      },
      {
        "card": "NotFoundError",
        "icon": "✦",
        "prompt": "Which HTTP status fits a missing post?",
        "options": [
          "200",
          "404"
        ],
        "answer": 1,
        "explanation": "404 indicates that the requested resource was not found."
      },
      {
        "card": "Database connection fails",
        "icon": "✦",
        "prompt": "Should every failure become 404?",
        "options": [
          "Yes",
          "No, propagate unexpected failures"
        ],
        "answer": 1,
        "explanation": "A database outage does not prove the post is absent."
      }
    ]
  },
  {
    id: 'testable-services',
    "title": "Testable services",
    "subtitle": "Prove behavior with controlled dependencies.",
    "question": "Prove behavior with controlled dependencies.",
    "theory": "A unit test checks a small piece of behavior with controlled inputs. Inject a fake repository to test a service without a database. Endpoint tests check HTTP status and response bodies. Cover both success and failure, and verify the actual result rather than merely calling the method.",
    "analogy": "A rehearsal uses a stand-in so you can check one actor’s lines without assembling the whole theatre.",
    "terms": [
      [
        "Fake",
        "A controlled implementation of a dependency"
      ],
      [
        "Assertion",
        "Checks the expected result"
      ]
    ],
    "code": "interface Repository { findName(id: number): string | null }\nclass NamesService {\n  constructor(private repo: Repository) {}\n  getName(id: number): string {\n    const name = this.repo.findName(id);\n    if (name === null) throw new Error(\"Not found\");\n    return name;\n  }\n}\nconst fake: Repository = { findName: id => id === 1 ? \"Mari\" : null };\nconst service = new NamesService(fake);\nif (service.getName(1) !== \"Mari\") throw new Error(\"Wrong name\");\nlet missing = false;\ntry { service.getName(99); } catch (error) {\n  missing = error instanceof Error && error.message === \"Not found\";\n}\nif (!missing) throw new Error(\"Expected missing-name error\");",
    "takeaway": "These standalone checks fail if behavior is wrong. In the course, use Mocha/Chai for service assertions and Supertest for HTTP behavior.",
    "icon": "⌘",
    "color": "blue",
    "challenges": [
      {
        "card": "Unit test: PostsService",
        "icon": "✦",
        "prompt": "Which dependency makes the test independent of MySQL?",
        "options": [
          "A fake repository",
          "The production database"
        ],
        "answer": 0,
        "explanation": "A fake provides predictable results without a database connection."
      },
      {
        "card": "service.getName(1)",
        "icon": "✦",
        "prompt": "Is calling the method enough to verify its result?",
        "options": [
          "Yes",
          "No, assert the expected value"
        ],
        "answer": 1,
        "explanation": "A call alone can miss an incorrect return value."
      },
      {
        "card": "GET /posts/999",
        "icon": "✦",
        "prompt": "What should an endpoint test check?",
        "options": [
          "Only the method name",
          "HTTP status and response body"
        ],
        "answer": 1,
        "explanation": "These are observable parts of the API contract."
      },
      {
        "card": "Expected rejection from async get()",
        "icon": "✦",
        "prompt": "How should a test observe it?",
        "options": [
          "Await and assert the rejection",
          "Ignore the Promise"
        ],
        "answer": 0,
        "explanation": "Ignoring the Promise can let the test finish before the failure."
      },
      {
        "card": "Refactor functions into classes",
        "icon": "✦",
        "prompt": "What should existing endpoint tests confirm?",
        "options": [
          "The public API behavior stays the same",
          "Every function became a class"
        ],
        "answer": 0,
        "explanation": "Refactoring changes structure while preserving observable behavior."
      }
    ]
  }
];
lessons.push(...courseLessons);
