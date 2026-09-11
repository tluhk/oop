import { lessons } from './lessons';
import type { Language } from './i18n';

type Localized = Record<Language, string>;
export const courseResource = (concept: string) =>
  `https://github.com/tluhk/Tagarakendused/blob/master/concepts/${concept}/README.md`;

export const resourceTitles: Record<string, Localized> = {
  typescript: { en: 'Introduction to TypeScript', et: 'Sissejuhatus TypeScripti' },
  tyybid: { en: 'TypeScript types', et: 'TypeScripti tüübid' },
  typescriptigaAlustamine: { en: 'Set up a TypeScript project', et: 'TypeScripti projektiga alustamine' },
  oop: { en: 'OOP in backend applications', et: 'OOP tagarakendustes' },
  struktureerimine: { en: 'API structure', et: 'API struktuur' },
  router: { en: 'Express routers', et: 'Expressi ruuterid' },
  errors: { en: 'Error handling', et: 'Vigade haldus' },
  testimine: { en: 'Automated testing', et: 'Automaattestimine' },
  APITestimine: { en: 'Add tests to an API', et: 'API-le testide lisamine' },
};

export const modules = [
  { id: 'typescript', title: 'TypeScript foundations', lessonIds: ['typescript-basics', 'interfaces-unions'] },
  { id: 'oop', title: 'Object-oriented programming', lessonIds: ['classes-objects', 'properties-methods', 'encapsulation', 'inheritance', 'polymorphism', 'composition-contracts'] },
  { id: 'api', title: 'Build a testable API', lessonIds: ['api-layers', 'async-errors', 'testable-services'] },
] as const;

export interface LessonGuide { prerequisites: string[]; resources: string[] }
export const lessonGuides: Record<string, LessonGuide> = {
  'typescript-basics': { prerequisites: [], resources: ['typescript', 'tyybid', 'typescriptigaAlustamine'] },
  'interfaces-unions': { prerequisites: ['typescript-basics'], resources: ['tyybid', 'oop'] },
  'classes-objects': { prerequisites: ['typescript-basics'], resources: ['oop'] },
  'properties-methods': { prerequisites: ['classes-objects'], resources: ['oop'] },
  'encapsulation': { prerequisites: ['properties-methods'], resources: ['oop'] },
  'inheritance': { prerequisites: ['encapsulation'], resources: ['oop'] },
  'polymorphism': { prerequisites: ['inheritance'], resources: ['oop'] },
  'composition-contracts': { prerequisites: ['interfaces-unions', 'encapsulation'], resources: ['oop'] },
  'api-layers': { prerequisites: ['composition-contracts'], resources: ['struktureerimine', 'oop', 'router'] },
  'async-errors': { prerequisites: ['api-layers', 'interfaces-unions'], resources: ['tyybid', 'oop', 'errors'] },
  'testable-services': { prerequisites: ['async-errors'], resources: ['oop', 'testimine', 'APITestimine'] },
};

export interface PracticalActivity {
  id: string;
  moduleId: string;
  title: Localized;
  instructions: Localized;
  resource: string;
}
// Self-reported practice is deliberately separate from checked lesson completion.
export const activities: PracticalActivity[] = [
  { id: 'describe-category', moduleId: 'typescript',
    title: { en: 'Describe a category', et: 'Kirjelda kategooriat' },
    instructions: {
      en: 'In your notes, describe a Category with a numeric id, a name, and an optional description. Write one valid object and explain why a string id would not match. Compare your answer with the course examples.',
      et: 'Kirjelda märkmetes Category arvulise ID, nime ja valikulise kirjeldusega. Kirjuta üks sobiv objekt ning selgita, miks sõnena ID ei sobi. Võrdle vastust kursuse näidetega.',
    }, resource: 'tyybid' },
  { id: 'design-category-service', moduleId: 'oop',
    title: { en: 'Plan a service contract', et: 'Kavanda teenuse leping' },
    instructions: {
      en: 'Sketch a CategoriesService and the repository interface it receives through its constructor. List the operation needed to find a category and explain how a fake could replace the database in a test.',
      et: 'Visanda CategoriesService ja hoidla liides, mille teenus saab konstruktorisse. Nimeta kategooria leidmiseks vajalik tegevus ning selgita, kuidas võltsteostus saab testis andmebaasi asendada.',
    }, resource: 'oop' },
  { id: 'trace-category-request', moduleId: 'api',
    title: { en: 'Trace a category request', et: 'Jälgi kategooria päringut' },
    instructions: {
      en: 'In your notes, trace GET /categories/1 through router, controller, service, and repository. Describe the response when the category exists and when it is missing. Write what an endpoint test should assert.',
      et: 'Jälgi märkmetes GET /categories/1 päringut läbi ruuteri, kontrolleri, teenuse ja hoidla. Kirjelda vastust olemasoleva ja puuduva kategooria korral. Pane kirja, mida otspunkti test peab kontrollima.',
    }, resource: 'oop' },
];

export const learningOrder: string[] = modules.flatMap(module => [...module.lessonIds]);
export function nextLesson(completed: readonly string[]): string | undefined {
  return learningOrder.find(id => !completed.includes(id));
}

// Fail early on authoring mistakes instead of showing broken lesson links.
const ids = lessons.map(lesson => lesson.id);
if (new Set(ids).size !== ids.length || learningOrder.length !== ids.length ||
    new Set(learningOrder).size !== ids.length || learningOrder.some(id => !ids.includes(id))) {
  throw new Error('Curriculum must contain every lesson exactly once.');
}
for (const id of ids) {
  const guide = lessonGuides[id];
  if (!guide || guide.prerequisites.some(required => learningOrder.indexOf(required) < 0 ||
      learningOrder.indexOf(required) >= learningOrder.indexOf(id))) {
    throw new Error(`Invalid prerequisites for ${id}`);
  }
}
