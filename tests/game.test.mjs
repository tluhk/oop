import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { JSDOM } from 'jsdom';

function loadModule(file, window, dependencies = {}) {
  const source = ts.transpileModule(readFileSync(new URL(file, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports = {};
  window.Function('exports', 'require', source)(exports, name => {
    if (name.endsWith('.css')) return {};
    if (name in dependencies) return dependencies[name];
    throw new Error(`Unexpected dependency: ${name}`);
  });
  return exports;
}
function setup(saved, language, browserLanguage = 'en-US', savedV2, mutateLessons) {
  const dom = new JSDOM('<div id="app"></div>', { url: 'https://example.com/oop/', runScripts: 'outside-only' });
  const w = dom.window;
  w.scrollTo = () => {};
  Object.defineProperty(w.navigator, 'language', { value: browserLanguage });
  w.HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
  w.HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
  if (language !== undefined) w.localStorage.setItem('oop-cards-language', language);
  if (saved !== undefined) w.localStorage.setItem('oop-cards-progress-v1', saved);
  const { lessons } = loadModule('../src/lessons.ts', w);
  if (savedV2 !== undefined) w.localStorage.setItem('oop-cards-progress-v2', savedV2);
  const { estonianLessons } = loadModule('../src/lessons.et.ts', w, { './lessons': { lessons } });
  if (mutateLessons) mutateLessons(lessons, estonianLessons);
  const curriculum = loadModule('../src/curriculum.ts', w, { './lessons': { lessons } });
  const progress = loadModule('../src/progress.ts', w);
  const i18n = loadModule('../src/i18n.ts', w);
  loadModule('../src/main.ts', w, { './lessons': { lessons }, './lessons.et': { estonianLessons }, './i18n': i18n, './curriculum': curriculum, './progress': progress });
  const click = action => {
    if (/^lesson:\d+$/.test(action)) action = `lesson:${lessons[Number(action.slice(7))].id}`;
    const el = w.document.querySelector(`[data-action="${action}"]`);
    assert.ok(el, `Action ${action} exists`);
    assert.equal(el.disabled, false, `Action ${action} is enabled`);
    el.click();
  };
  return { w, lessons, estonianLessons, click, text: () => w.document.body.textContent };
}

test('all lessons: retry, answer, explanation, code, completion and persistence', () => {
  const { w, lessons, click, text } = setup();
  for (const [index, lesson] of lessons.entries()) {
    click(`lesson:${index}`);
    assert.ok(text().includes(lesson.theory));
    click('play');
    for (const [round, challenge] of lesson.challenges.entries()) {
      assert.equal(w.document.querySelector('[data-action="check"]').disabled, true);
      click(`answer:${(challenge.answer + 1) % challenge.options.length}`);
      click('check');
      assert.ok(text().includes('Let’s think about it.'));
      assert.ok(text().includes(challenge.explanation));
      assert.equal(w.document.querySelector('[data-action="next"]'), null);
      click('retry');
      click(`answer:${challenge.answer}`);
      click('check');
      assert.ok(text().includes('Exactly right.'));
      if (round === 1) {
        click('revisit');
        click('play');
        assert.ok(text().includes('Exactly right.'), 'Theory revisit preserves the card');
      }
      click('next');
    }
    assert.equal(w.document.querySelector('pre code').textContent, lesson.code);
    click('complete');
    assert.ok(text().includes('completed'));
    click('home');
  }
  assert.deepEqual(JSON.parse(w.localStorage.getItem('oop-cards-progress-v2')).lessons, Array.from(lessons, l => l.id));
  const restored = setup(undefined, undefined, 'en-US', w.localStorage.getItem('oop-cards-progress-v2'));
  assert.ok(restored.text().includes('11 / 11 concepts'));
  click('lesson:0'); click('play');
  for (const challenge of lessons[0].challenges) { click(`answer:${challenge.answer}`); click('check'); click('next'); }
  click('complete');
  assert.equal(JSON.parse(w.localStorage.getItem('oop-cards-progress-v2')).lessons.length, lessons.length, 'Replays do not duplicate progress');
});

test('invalid saved progress is ignored; reference library links to lessons', () => {
  for (const value of ['invalid JSON', '{}', 'null']) assert.ok(setup(value).text().includes('0 / 11 concepts'));
  const { click, text } = setup('[0,0,99,-1,"2",null]');
  assert.ok(text().includes('1 / 11 concepts'));
  click('glossary');
  assert.ok(text().includes('YOUR POCKET REFERENCE'));
  click('lesson:3');
  assert.ok(text().includes('Some things run in the family.'));
});

test('all teaching examples type-check independently', () => {
  const { lessons } = setup();
  for (const lesson of lessons) {
    const filename = '/virtual-example.ts';
    const options = { strict: true, noEmit: true, target: ts.ScriptTarget.ES2022 };
    const host = ts.createCompilerHost(options);
    const original = host.getSourceFile.bind(host);
    host.getSourceFile = (name, version, onError) => name === filename
      ? ts.createSourceFile(name, lesson.code, version, true)
      : original(name, version, onError);
    const program = ts.createProgram([filename], options, host);
    const diagnostics = ts.getPreEmitDiagnostics(program);
    assert.equal(diagnostics.length, 0, `${lesson.title}: ${diagnostics.map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n')).join('\n')}`);
  }
});

test('Estonian covers every lesson, card, feedback, code takeaway and completion', () => {
  const { w, lessons, estonianLessons, click, text } = setup(undefined, 'et');
  assert.equal(w.document.documentElement.lang, 'et');
  assert.ok(text().includes('Üks kaart korraga.'));
  assert.ok(w.document.title.includes('Väikesed kaardid'));
  assert.equal(estonianLessons.length, lessons.length);
  for (const [index, lesson] of estonianLessons.entries()) {
    assert.notEqual(lesson.theory, lessons[index].theory);
    assert.equal(lesson.challenges.length, lessons[index].challenges.length);
    click(`lesson:${index}`);
    assert.ok(text().includes(lesson.theory));
    assert.ok(text().includes('KAKS ASJA, MIDA MEELES PIDADA'));
    click('play');
    for (const [round, challenge] of lesson.challenges.entries()) {
      assert.ok(text().includes(challenge.prompt));
      assert.ok(text().includes(`KAART ${round + 1} / 5`));
      click(`answer:${(challenge.answer + 1) % challenge.options.length}`);
      click('check');
      assert.ok(text().includes('Mõtleme korraks.'));
      assert.ok(text().includes(challenge.explanation));
      click('retry');
      click(`answer:${challenge.answer}`);
      click('check');
      assert.ok(text().includes('Täpselt õige.'));
      click('next');
    }
    assert.equal(w.document.querySelector('pre code').textContent, lessons[index].code);
    assert.ok(text().includes(lesson.takeaway));
    click('complete');
    assert.ok(text().includes(`Läbitud mõisteid: ${index + 1} / ${lessons.length}`));
    click('home');
  }
  click('glossary');
  for (const lesson of estonianLessons) assert.ok(text().includes(lesson.theory));
  click('reset');
  assert.ok(text().includes('Alustad uuesti?'));
  click('cancel-reset');
  assert.equal(JSON.parse(w.localStorage.getItem('oop-cards-progress-v2')).lessons.length, lessons.length);
  click('reset');
  click('confirm-reset');
  assert.deepEqual(JSON.parse(w.localStorage.getItem('oop-cards-progress-v2')), { version: 2, lessons: [], activities: [] });
  assert.equal(w.localStorage.getItem('oop-cards-language'), 'et');
});

test('language switching preserves the current card, answer, feedback and completed concepts', () => {
  const { w, click, text } = setup('[2]');
  click('lesson:0'); click('play');
  click('answer:0'); click('check'); click('next');
  click('answer:1');
  click('language:et');
  assert.ok(text().includes('KAART 2 / 5'));
  assert.equal(w.document.querySelector('[data-action="answer:1"]').getAttribute('aria-pressed'), 'true');
  assert.equal(w.document.activeElement.dataset.action, 'language:et');
  click('check');
  assert.ok(text().includes('Täpselt õige.'));
  click('language:en');
  assert.ok(text().includes('CARD 2 OF 5'));
  assert.ok(text().includes('Exactly right.'));
  assert.equal(w.document.documentElement.lang, 'en');
  assert.equal(w.localStorage.getItem('oop-cards-progress-v1'), '[2]');
  click('language:et');
  const restored = setup(w.localStorage.getItem('oop-cards-progress-v1'), w.localStorage.getItem('oop-cards-language'));
  assert.equal(restored.w.document.documentElement.lang, 'et');
  assert.ok(restored.text().includes('1 / 11 mõistet'));
});

test('language defaults to Estonian for an Estonian browser; saved choices take precedence', () => {
  assert.equal(setup(undefined, undefined, 'et-EE').w.document.documentElement.lang, 'et');
  assert.equal(setup(undefined, 'en', 'et-EE').w.document.documentElement.lang, 'en');
  assert.equal(setup(undefined, 'unsupported', 'fr-FR').w.document.documentElement.lang, 'en');
});

test('course path starts with TypeScript and preserves original saved lesson identities', () => {
  const { w, click, text } = setup('[0,1,2,3,4]');
  const cards = [...w.document.querySelectorAll('.lesson-card')];
  assert.deepEqual(cards.map(card => card.dataset.action), ['typescript-basics','interfaces-unions','classes-objects','properties-methods','encapsulation','inheritance','polymorphism','composition-contracts','api-layers','async-errors','testable-services'].map(id => `lesson:${id}`));
  assert.equal(w.document.querySelectorAll('.course-track').length, 3);
  assert.ok(text().includes('11 concepts · 55 challenges'));
  assert.equal(cards.filter(card => card.textContent.includes('COMPLETED')).length, 5);
  click('lesson:5');
  assert.ok(text().includes('Give your values clear types.'));
  click('language:et');
  assert.ok(text().includes('Anna väärtustele selged tüübid.'));
  assert.equal(w.localStorage.getItem('oop-cards-progress-v1'), '[0,1,2,3,4]');
});

test('module filters and independent practice preserve language and lesson progress', () => {
  const { w, click, text } = setup('[0]');
  click('module:api');
  assert.equal(w.document.querySelectorAll('.lesson-card').length, 3);
  click('activity:trace-category-request');
  let saved = JSON.parse(w.localStorage.getItem('oop-cards-progress-v2'));
  assert.deepEqual(saved.lessons, ['classes-objects']);
  assert.deepEqual(saved.activities, ['trace-category-request']);
  click('language:et');
  assert.ok(text().includes('Harjutus tehtud'));
  assert.equal(w.document.querySelectorAll('.lesson-card').length, 3);
  click('activity:trace-category-request');
  saved = JSON.parse(w.localStorage.getItem('oop-cards-progress-v2'));
  assert.deepEqual(saved.activities, []);
  click('module:all');
  assert.equal(w.document.querySelectorAll('.lesson-card').length, 11);
  click('lesson:async-errors');
  assert.ok(text().includes('Soovitatud eelteadmised'));
  assert.ok(w.document.querySelector('.lesson-resources a').href.includes('Tagarakendused'));
});

test('stable IDs survive content reordering and reset never resurrects legacy progress', () => {
  const saved = JSON.stringify({ version: 2, lessons: ['async-errors'], activities: ['describe-category'] });
  const { w, click, text } = setup('[0,1,2]', 'en', 'en-US', saved, (en, et) => { en.reverse(); et.reverse(); });
  assert.ok(text().includes('1 / 11 concepts'));
  click('lesson:async-errors');
  assert.ok(text().includes('Completed · reviewing'));
  click('reset'); click('confirm-reset');
  const restored = setup('[0,1,2]', 'en', 'en-US', w.localStorage.getItem('oop-cards-progress-v2'));
  assert.ok(restored.text().includes('0 / 11 concepts'));
  assert.deepEqual(JSON.parse(restored.w.localStorage.getItem('oop-cards-progress-v2')).activities, []);
});

test('variable challenge counts and repair rendering finish at the actual last card', () => {
  const { w, click, text } = setup(undefined, 'en', 'en-US', undefined, (en, et) => {
    for (const list of [en, et]) {
      list[0].challenges = list[0].challenges.slice(0, 2);
      list[0].challenges[0].kind = 'repair';
    }
  });
  click('lesson:classes-objects'); click('play');
  assert.ok(text().includes('CARD 1 OF 2'));
  assert.ok(w.document.querySelector('.challenge-code code'));
  click('answer:0'); click('check'); click('language:et');
  assert.ok(text().includes('Paranda kood'));
  assert.ok(text().includes('Täpselt õige.'));
  click('next'); click('answer:1'); click('check'); click('next');
  assert.ok(w.document.querySelector('.code-window'));
});

test('progress loader sanitizes records and preserves migrated data when storage writes fail', () => {
  const dom = new JSDOM('', { runScripts: 'outside-only' });
  const { loadProgress, legacyLessonIds } = loadModule('../src/progress.ts', dom.window);
  const data = new Map([['oop-cards-progress-v1', '[0,0,10,11,-1,"2",null]']]);
  const storage = { getItem: key => data.get(key) ?? null, setItem: () => { throw new Error('quota'); } };
  const result = loadProgress(storage, legacyLessonIds, ['describe-category']);
  assert.equal(result.storageAvailable, false);
  assert.deepEqual(Array.from(result.progress.lessons), ['classes-objects', 'testable-services']);
  data.set('oop-cards-progress-v2', JSON.stringify({version: 2, lessons: ['async-errors','async-errors','missing', 0], activities: ['describe-category', 'unknown']}));
  const sanitized = loadProgress(storage, legacyLessonIds, ['describe-category']);
  assert.deepEqual(Array.from(sanitized.progress.lessons), ['async-errors']);
  assert.deepEqual(Array.from(sanitized.progress.activities), ['describe-category']);
  for (const raw of ['null', '{}', 'invalid', '{"version":3}']) {
    data.set('oop-cards-progress-v2', raw);
    assert.equal(loadProgress(storage, legacyLessonIds, []).progress.lessons.length, 0);
  }
  const blocked = loadProgress({ getItem: () => { throw new Error('blocked'); }, setItem() {} }, legacyLessonIds, []);
  assert.equal(blocked.storageAvailable, false);
  assert.equal(blocked.progress.lessons.length, 0);
});
