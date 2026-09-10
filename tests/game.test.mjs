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
function setup(saved) {
  const dom = new JSDOM('<div id="app"></div>', { url: 'https://example.com/oop/', runScripts: 'outside-only' });
  const w = dom.window;
  w.scrollTo = () => {};
  if (saved !== undefined) w.localStorage.setItem('oop-cards-progress-v1', saved);
  const { lessons } = loadModule('../src/lessons.ts', w);
  loadModule('../src/main.ts', w, { './lessons': { lessons } });
  const click = action => {
    const el = w.document.querySelector(`[data-action="${action}"]`);
    assert.ok(el, `Action ${action} exists`);
    assert.equal(el.disabled, false, `Action ${action} is enabled`);
    el.click();
  };
  return { w, lessons, click, text: () => w.document.body.textContent };
}

test('all five lessons: retry, answer, explanation, code, completion and persistence', () => {
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
  assert.deepEqual(JSON.parse(w.localStorage.getItem('oop-cards-progress-v1')), [0,1,2,3,4]);
  const restored = setup(w.localStorage.getItem('oop-cards-progress-v1'));
  assert.ok(restored.text().includes('5 / 5 concepts'));
  click('lesson:0'); click('play');
  for (const challenge of lessons[0].challenges) { click(`answer:${challenge.answer}`); click('check'); click('next'); }
  click('complete');
  assert.equal(JSON.parse(w.localStorage.getItem('oop-cards-progress-v1')).length, 5, 'Replays do not duplicate progress');
});

test('invalid saved progress is ignored; reference library links to lessons', () => {
  for (const value of ['invalid JSON', '{}', 'null']) assert.ok(setup(value).text().includes('0 / 5 concepts'));
  const { click, text } = setup('[0,0,99,-1,"2",null]');
  assert.ok(text().includes('1 / 5 concepts'));
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
