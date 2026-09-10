import './style.css';
import { lessons as englishLessons } from './lessons';
import { estonianLessons } from './lessons.et';
import { createTranslator, getInitialLanguage, type Language } from './i18n';

let language = getInitialLanguage();
let t = createTranslator(language);
let lessons = language === 'et' ? estonianLessons : englishLessons;

const app = document.querySelector<HTMLDivElement>('#app')!;
const storageKey = 'oop-cards-progress-v1';
let completed: number[] = [];
let storageAvailable = true;
try {
  const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
  if (Array.isArray(saved)) completed = [...new Set(saved.filter((x): x is number => Number.isInteger(x) && x >= 0 && x < lessons.length))];
} catch { storageAvailable = false; }
let current = 0;
let round = 0;
let screen: 'home' | 'theory' | 'play' | 'code' | 'done' | 'glossary' = 'home';
let selected: number | null = null;
let checked = false;
let resetPrompt = false;
const escape = (text: string) => text.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]!));
const button = (label: string, action: string, cls = 'primary') => `<button class="${cls}" data-action="${action}">${label}</button>`;
function save() { try { localStorage.setItem(storageKey, JSON.stringify(completed)); } catch { storageAvailable = false; } }
function header() {
  return `<header class="header"><button class="brand" data-action="home" aria-label="${t("OOP Cards home")}"><span class="brand-icon">▧</span> oop<span class="brand-light">cards</span><span class="beta">${t("LEARN BY PLAYING")}</span></button><nav aria-label="${t("Main navigation")}"><button class="nav-link ${screen !== 'glossary' ? 'active' : ''}" data-action="home">${t("Your learning path")}</button><button class="nav-link ${screen === 'glossary' ? 'active' : ''}" data-action="glossary">${t("Concept library")}</button></nav><span class="header-progress"><span>✦</span> ${t('conceptCount', { count: completed.length })}</span><div class="language-switch" role="group" aria-label="${t('Language')}">${(['en', 'et'] as const).map(locale => `<button data-action="language:${locale}" lang="${locale}" aria-pressed="${language === locale}" class="${language === locale ? 'selected' : ''}">${locale === 'en' ? 'English' : 'Eesti'}</button>`).join('')}</div></header>`;
}
function home() {
  const next = lessons.findIndex((_, i) => !completed.includes(i));
  return `<section class="hero"><div class="hero-copy"><div class="eyebrow"><span class="tiny-dot"></span> ${t("A SMALL GAME FOR BIG IDEAS")}</div><h1>${t("Get to know OOP.")}<br><span>${t("One card at a time.")}</span></h1><p>${t("Classes, objects, and those other mysterious words.")}<br class="desktop-break">${t(" Make them click with bite-sized lessons and playful challenges.")}</p><div class="hero-actions">${button(next < 0 ? t("Play again <span>↗</span>") : completed.length ? t("Continue learning <span>↗</span>") : t("Let’s start learning <span>↗</span>"), `lesson:${next < 0 ? 0 : next}`)}<span class="hero-note">${t("No coding experience needed")}</span></div><div class="hero-tags"><span>◷ &nbsp; ${t("At your own pace")}</span><span>⌘ &nbsp; ${t("TypeScript examples")}</span><span>♡ &nbsp; ${t("No lives. No pressure.")}</span></div></div><div class="card-illustration" aria-label="${t("A class blueprint creates an object")}"><div class="decor-star star-one">✳</div><div class="illustration-card blueprint"><div class="card-top">01 <span>${t("THE BLUEPRINT")}</span> ▧</div><div class="blueprint-art"><span>◇</span><div>name: string<br>energy: number<br><hr>bark()</div></div><h3>Dog</h3><p>${t("CLASS")}</p></div><div class="illustration-card instance"><div class="card-top">02 <span>${t("ONE OF A KIND")}</span> ✦</div><div class="dog-art">🐶</div><h3>${t("Meet Max.")}</h3><p>${t("OBJECT")}</p></div><span class="curved-arrow">↝</span><span class="illustration-note">${t("one blueprint, many possibilities")}</span><div class="decor-star star-two">✧</div></div></section><section class="path-section"><div class="section-heading"><div><div class="eyebrow">${t("YOUR LEARNING PATH")}</div><h2>${t("Small steps. Solid foundations.")}</h2></div><span class="pill">${t("5 concepts · 25 challenges")}</span></div><div class="lesson-grid">${lessons.map((lesson, i) => `<button class="lesson-card ${lesson.color}" data-action="lesson:${i}"><div class="lesson-card-top"><span class="lesson-icon">${lesson.icon}</span><span class="lesson-number">${completed.includes(i) ? t("✓ COMPLETED") : `0${i + 1}`}</span></div><h3>${lesson.title}</h3><p>${lesson.subtitle}</p><div class="lesson-card-bottom"><span>${t("5 challenges")}</span><span class="circle-arrow">↗</span></div></button>`).join('')}</div></section><section class="bottom-strip"><div class="strip-icon">✧</div><div><h3>${t("Understand the idea. Then meet the code.")}</h3><p>${t("Read a little, play a little, and see each concept come to life in TypeScript.")}</p></div><div class="mini-steps"><span>01 &nbsp; ${t("Learn")}</span><i>→</i><span>02 &nbsp; ${t("Play")}</span><i>→</i><span>03 &nbsp; ${t("Connect")}</span></div></section>`;
}
function lessonShell(content: string, step: number) {
  return `<section class="lesson-view"><div class="lesson-toolbar">${button(t("← Learning path"),'home','text-button')}<span class="lesson-label">0${current + 1} &nbsp; ${lessons[current].title}</span><span class="pill">${completed.includes(current) ? t("✓ Completed · reviewing") : t("Take your time")}</span></div><div class="stepper" aria-label="${t("Lesson stages")}">${[t("Learn the idea"),t("Play the cards"),t("Meet the code")].map((s,i) => `<span class="${i === step ? 'current' : i < step ? 'finished' : ''}"><b>${i < step ? '✓' : i + 1}</b>${s}</span>`).join('<i></i>')}</div>${content}</section>`;
}
function theory() {
  const l = lessons[current];
  return lessonShell(`<div class="theory-layout"><article class="theory-card ${l.color}"><div class="eyebrow">${t("THE IDEA")} · ${l.title.toUpperCase()}</div><span class="large-icon">${l.icon}</span><h1>${l.question}</h1><p class="theory-text">${l.theory}</p><div class="analogy"><span>${t("↳ THINK OF IT THIS WAY")}</span><p>${l.analogy}</p></div></article><aside class="lesson-aside"><div class="eyebrow">${t("TWO THINGS TO REMEMBER")}</div>${l.terms.map(([term,def],i)=>`<div class="term"><span>0${i+1}</span><h3>${term}</h3><p>${def}</p></div>`).join('')}<div class="aside-bottom"><p>${t("You don’t need to memorize it all.")}<br>${t("You’ll learn by trying.")}</p>${button(t("Got it. Let’s play ↗"),'play')}</div></aside></div>`,0);
}
function play() {
  const c = lessons[current].challenges[round];
  const correct = selected === c.answer;
  return lessonShell(`<div class="play-heading"><div class="eyebrow">${t('cardCount', { current: round + 1, total: lessons[current].challenges.length })}</div><h1>${c.prompt}</h1><div class="round-dots" aria-label="${t('challengeCount', { current: round + 1, total: lessons[current].challenges.length })}">${lessons[current].challenges.map((_,i)=>`<span class="${i < round ? 'done' : i === round ? 'current' : ''}"></span>`).join('')}</div></div><div class="play-area"><article class="playing-card ${lessons[current].color}"><div class="card-top">0${round + 1}<span>OOP CARDS</span>✧</div><span class="challenge-icon">${c.icon}</span><h2>${escape(c.card)}</h2><span class="card-caption">${round < 4 ? t("A LITTLE THOUGHT EXPERIMENT") : t("CONNECT THE DOTS")}</span></article><div class="answer-panel"><div class="eyebrow">${t("CHOOSE YOUR ANSWER")}</div><div class="options" role="group" aria-label="${t("Answer choices")}">${c.options.map((o,i)=>`<button class="option ${selected === i ? 'selected' : ''} ${checked && selected === i ? correct ? 'correct' : 'incorrect' : ''}" data-action="answer:${i}" aria-pressed="${selected === i}" ${checked ? 'disabled' : ''}><span class="option-letter">${String.fromCharCode(65+i)}</span>${escape(o)}<span class="option-check">${selected === i ? '●' : '○'}</span></button>`).join('')}</div><div class="feedback ${checked ? correct ? 'success' : 'retry' : ''}" role="status">${checked ? `<strong>${correct ? t("✦ Exactly right.") : t("Let’s think about it.")}</strong><p>${correct ? c.explanation : t("Not quite. ") + c.explanation}</p>` : t("<p>No timer, no lost lives. Just give it a go.</p>")}</div>${checked ? button(correct ? round === 4 ? t("See it in TypeScript →") : t("Next card →") : t("Try this card again ↺"),correct ? 'next' : 'retry') : `<button class="primary" data-action="check" ${selected === null ? 'disabled' : ''}>${t("Check answer")} <span>→</span></button>`}${button(t("↗ Revisit the theory"),'revisit','text-button theory-link')}</div></div>`,1);
}
function code() {
  const l = lessons[current];
  return lessonShell(`<div class="code-heading"><div class="eyebrow">${t("THE IDEA, IN TYPESCRIPT")}</div><h1>${t("Now the code makes a little more sense.")}</h1><p>${t("You’ve played with the concept. Here’s what it looks like in a real class.")}</p></div><div class="code-layout"><div class="code-window"><div class="code-bar"><span><i></i><i></i><i></i></span><span>example.ts</span><b>TS</b></div><pre><code>${escape(l.code)}</code></pre></div><aside class="code-explanation"><span class="lesson-icon ${l.color}">${l.icon}</span><h2>${l.title}</h2><p>${l.takeaway}</p><div class="code-note">${t("This is a read-only example. You don’t need to write or run code to finish the lesson.")}</div>${button(t("Complete this concept ✦"),'complete')}</aside></div>`,2);
}
function done() {
  const next = lessons.findIndex((_,i)=>!completed.includes(i));
  return `<section class="completion"><div class="completion-icon">✦</div><div class="eyebrow">${t("ANOTHER IDEA CLICKED")}</div><h1>${next < 0 ? t("A solid foundation. All yours.") : t("That’s a concept in your pocket.")}</h1><p>${t("You’ve completed")} <strong>${lessons[current].title}</strong>.<br>${next < 0 ? t("You’ve explored all five concepts and solved 25 challenges. Revisit any lesson whenever you like.") : t("Little by little, you’re learning to think in objects.")}</p><div class="completion-progress">${lessons.map((l,i)=>`<span class="${completed.includes(i)?'earned':''}" title="${l.title}">${completed.includes(i)?'✓':l.icon}</span>`).join('')}</div><p class="muted">${t('completedCount', { count: completed.length })}${storageAvailable ? t(" · Progress saved on this device") : t(" · Progress is available for this session")}</p><div class="completion-actions">${button(next < 0 ? t("Explore the concept library →") : t('nextLesson', { title: lessons[next].title }),next < 0 ? 'glossary' : `lesson:${next}`)}${button(t("Back to learning path"),'home','secondary')}</div></section>`;
}
function glossary() {
  return `<section class="library"><div class="eyebrow">${t("YOUR POCKET REFERENCE")}</div><h1>${t("A few words. A lot of possibilities.")}</h1><p>${t("Come back whenever a concept needs a little refresh.")}</p><div class="library-grid">${lessons.map((l,i)=>`<article class="library-card"><span class="lesson-icon ${l.color}">${l.icon}</span><h2>${l.title}</h2><p>${l.theory}</p><dl>${l.terms.map(([term,def])=>`<dt>${term}</dt><dd>${def}</dd>`).join('')}</dl>${button(t("Play this lesson ↗"),`lesson:${i}`,'text-button')}</article>`).join('')}</div></section>`;
}
function render(focus = true) {
  document.documentElement.lang = language;
  document.title = t('pageTitle');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('pageDescription'));
  app.innerHTML = `${header()}<main id="main" tabindex="-1">${({home,theory,play,code,done,glossary}[screen])()}</main><footer><span><b>oop cards</b> &nbsp; ${t("Little cards. Big ideas.")}</span><div>${storageAvailable ? t("Your progress stays on this device.") : t("Progress cannot be saved in this browser.")} ${button(t("Reset progress"),'reset','footer-button')}</div></footer>${resetPrompt ? `<dialog open aria-labelledby="reset-title"><h2 id="reset-title">${t("Start fresh?")}</h2><p>${t("This clears completed lessons on this device.")}</p><div>${button(t("Keep my progress"),'cancel-reset','secondary')}${button(t("Reset progress"),'confirm-reset')}</div></dialog><div class="dialog-backdrop"></div>` : ''}`;
  if (focus) { document.querySelector<HTMLElement>('main')?.focus({preventScroll:true}); window.scrollTo(0,0); }
}
app.addEventListener('click', (event) => {
  const target = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-action]');
  if (!target || target.disabled) return;
  const action = target.dataset.action!;
  if (action.startsWith('language:')) {
    language = action.split(':')[1] as Language;
    t = createTranslator(language);
    lessons = language === 'et' ? estonianLessons : englishLessons;
    try { localStorage.setItem('oop-cards-language', language); } catch { /* Language still works for this session. */ }
    render(false);
    document.querySelector<HTMLButtonElement>(`[data-action="${action}"]`)?.focus();
    return;
  }
  if (action.startsWith('lesson:')) { current = Number(action.split(':')[1]); round=0; selected=null; checked=false; screen='theory'; }
  else if (action.startsWith('answer:')) { selected=Number(action.split(':')[1]); render(false); document.querySelector<HTMLButtonElement>(`[data-action="${action}"]`)?.focus(); return; }
  else if (action === 'home') screen='home';
  else if (action === 'glossary') screen='glossary';
  else if (action === 'play') screen='play';
  else if (action === 'revisit') screen='theory';
  else if (action === 'check' && selected !== null) checked=true;
  else if (action === 'retry') { checked=false; selected=null; }
  else if (action === 'next' && checked && selected === lessons[current].challenges[round].answer) { if(round === 4) screen='code'; else round++; selected=null; checked=false; }
  else if (action === 'complete') { if(!completed.includes(current)) completed.push(current); save(); screen='done'; }
  else if (action === 'reset') { resetPrompt=true; render(false); const dialog=document.querySelector('dialog')!; dialog.close(); dialog.showModal(); document.querySelector<HTMLButtonElement>('[data-action="cancel-reset"]')?.focus(); dialog.addEventListener('cancel',()=>{resetPrompt=false;render(false);}); return; }
  else if (action === 'cancel-reset') resetPrompt=false;
  else if (action === 'confirm-reset') { completed=[]; save(); resetPrompt=false; screen='home'; }
  render();
});
render(false);
