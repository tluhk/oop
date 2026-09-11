# Course companion implementation plan

Status: planned; implementation of this expansion has not started.

## Objective

Expand the OOP card game into a course companion that takes students from TypeScript fundamentals to building and testing a small API. Update the learning resources in the sibling `../Programmeerimine_II` repository alongside the game when explanations, examples, or assignments need alignment.

The starting application has 11 bilingual lessons and 55 challenges. This plan covers the next expansion, not the already completed additions.

## Working agreements

- Preserve English and Estonian support, existing progress, and the low-pressure learning style.
- Keep lessons freely accessible while recommending a learning sequence.
- Use the course materials and assignments to guide scope and terminology.
- Distinguish illustrative snippets from runnable examples.
- Start code repair activities with reliably checked, structured answers. Use the local project and its tests for open-ended coding; an in-browser execution environment is a separate feature.
- Support keyboard and touch interaction without requiring drag-and-drop.
- Preserve existing assignment requirements unless a change is explicitly documented.
- Complete and verify stages in order. Record results, changed files, limitations, and any scope decisions below before marking a stage complete.

## Stage A — Curriculum map and application structure

### Curriculum audit

- [ ] Review all six lectures, assignments, concept pages, and current game lessons.
- [ ] Map course learning outcomes to lessons and exercises.
- [ ] Identify missing prerequisites, duplicated explanations, and incomplete or inconsistent examples.
- [ ] Define the recommended sequence and distinguish core material from optional extensions.
- [ ] Choose a consistent posts/categories API example aligned with course assignments.
- [ ] Save a curriculum map connecting resources, game lessons, and practical tasks.

### Application foundations

- [ ] Introduce stable lesson IDs and migrate existing saved progress.
- [ ] Define modules, lesson order, prerequisites, and course-resource links.
- [ ] Support multiple exercise types and variable challenge counts.
- [ ] Track lesson completion separately from practical activities.
- [ ] Make navigation manageable as the curriculum grows and show a recommended next step.
- [ ] Preserve the current position and answer state when switching languages.

Acceptance: the curriculum map is reviewable; the expanded lesson structure works; migration preserves existing completions; navigation and language switching pass verification.

## Stage B — Setup, TypeScript, practical OOP, and code repair

### Learning content

- [ ] Add Node.js, npm, package scripts, and TypeScript project configuration.
- [ ] Explain running code versus type-checking and introduce imports/exports.
- [ ] Expand practice with functions, objects, arrays, optional values, unions, and narrowing.
- [ ] Teach students to interpret compiler errors.
- [ ] Deepen constructors, `this`, `implements`, visibility, and `readonly`.
- [ ] Add composition-versus-inheritance decisions and examples of when a function is sufficient.

### Exercises

- [ ] Implement structured code repair with explanations for incorrect answers.
- [ ] Cover wrong types, incorrect access modifiers, and relevant OOP mistakes.
- [ ] Add result-prediction activities for typed functions and object behavior.
- [ ] Update corresponding course resources and links.

Acceptance: new content and exercises work in both languages; runnable examples type-check; keyboard and touch interaction work.

## Stage C — HTTP, Express, validation, and request flow

### Learning content

- [ ] Add request/response anatomy, methods, paths, parameters, bodies, status codes, and CRUD.
- [ ] Add Express setup, routers, JSON parsing, middleware order, and controller binding.
- [ ] Explain not-found handling and centralized error middleware.
- [ ] Teach validation of unknown input, missing versus invalid values, IDs, and request bodies.
- [ ] Establish consistent error responses and explain the boundary between static types and runtime validation.

### Exercises

- [ ] Implement request-flow ordering and trace successful and failed requests.
- [ ] Implement responsibility sorting across router, controller, service, repository, and middleware.
- [ ] Add HTTP response and error-path prediction.
- [ ] Extend code repair to missing `await`, middleware mistakes, and misplaced responsibilities.
- [ ] Update corresponding course resources and links.

Acceptance: students can follow a request through the layers, identify responsibilities, and distinguish type-checking from input validation; all new exercise flows pass verification.

## Stage D — Connected project, persistence, and security

### Guided project checkpoints

Each checkpoint needs instructions, starter code, expected behavior, and verification steps. Students must be able to resume at a checkpoint without completing every earlier activity.

- [ ] Checkpoint 1: set up the TypeScript project.
- [ ] Checkpoint 2: define data types and domain behavior.
- [ ] Checkpoint 3: implement repository contracts and in-memory storage.
- [ ] Checkpoint 4: add services using constructor injection.
- [ ] Checkpoint 5: expose CRUD operations through Express.
- [ ] Checkpoint 6: add validation and consistent error responses.
- [ ] Checkpoint 7: introduce database persistence.
- [ ] Checkpoint 8: add authentication and ownership rules.

### Supporting lessons

- [ ] Cover repository contracts, in-memory and SQL implementations, and parameterized queries.
- [ ] Distinguish missing records from database failures.
- [ ] Teach authentication versus authorization, password hashing, and token verification.
- [ ] Teach ownership checks and excluding sensitive fields from responses.
- [ ] Add checkpoint setup and troubleshooting guidance to the course resources.
- [ ] Align lectures and assignments with the project without silently changing assignment requirements.

Acceptance: checkpoints 1–8 are independently usable and verified; relevant validation, persistence, and permission failure cases are covered.

## Stage E — Testing, OpenAPI, and mixed review

### Learning content and project

- [ ] Expand service tests, controlled dependencies, and async failure assertions.
- [ ] Add endpoint tests for status codes, response bodies, validation failures, and permissions.
- [ ] Checkpoint 9: test service and endpoint behavior.
- [ ] Teach OpenAPI operations, request/response schemas, and error responses.
- [ ] Checkpoint 10: document the API and verify documentation matches behavior.

### Exercises

- [ ] Add test-selection challenges that distinguish meaningful assertions from mere method calls.
- [ ] Add mixed review rounds combining previously studied topics.
- [ ] Include explanations and links back to relevant lessons.
- [ ] Update corresponding course resources and links.

Acceptance: the complete project is tested and documented; mixed review and test-selection activities work in both languages.

## Stage F — Full verification and course-resource review

- [ ] Review all learning objectives against the curriculum map.
- [ ] Verify each lesson has concise theory, explained challenges, a checked example, and relevant course-resource links.
- [ ] Check English and Estonian content alignment.
- [ ] Type-check runnable teaching examples and verify expected outputs where relevant.
- [ ] Test answer checking, retries, navigation, language switching, and progress migration.
- [ ] Verify new interactions on mobile and with keyboard navigation.
- [ ] Run project checkpoint tests, including relevant failure cases.
- [ ] Correct remaining incomplete or invalid course examples.
- [ ] Check documentation links, setup instructions, and troubleshooting guidance.
- [ ] Run the application tests and production build.
- [ ] Record remaining limitations or explicitly deferred features.

Acceptance: every planned topic has aligned resources and practice; project checkpoints work; existing users retain progress; verification results are recorded.

## Per-stage verification checklist

Apply as relevant before closing each stage:

- [ ] Content and terminology align with the course.
- [ ] English and Estonian versions are complete.
- [ ] Runnable examples and checkpoint code pass appropriate checks.
- [ ] Changed game behavior has meaningful regression coverage.
- [ ] Keyboard, touch, and mobile behavior are verified for changed interactions.
- [ ] Resource links and documentation are updated.
- [ ] Application tests and build pass.
- [ ] Stage results and scope decisions are recorded.

## Progress log

| Stage | Status | Results, verification, and decisions |
| --- | --- | --- |
| A | Not started | Next stage: curriculum audit, then application foundations. |
| B | Not started | |
| C | Not started | |
| D | Not started | |
| E | Not started | |
| F | Not started | |

## Definition of complete

Every planned topic has aligned learning material and practice, the connected project's checkpoints work, both languages are supported, and existing users retain their progress. Deployment is not part of this plan unless separately requested.
