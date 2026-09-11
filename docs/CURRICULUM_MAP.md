# Curriculum map and resource audit

Stage A • 11 September 2026

## Scope and source of truth

This map connects the 11 existing game lessons to the six lecture outlines, their slide topic lists, all six homework briefs, the blog project description, and the concept-page inventory in `../Programmeerimine_II`.

The local directory is named `Programmeerimine_II`, but its Git origin is `https://github.com/tluhk/Tagarakendused.git`, on `master`. New game resource links use that canonical repository. Existing links using older repository names are tracked for cleanup. The audit covers local Markdown; recordings, PDF rendering, external references, and archived starter ZIP execution are not verified in Stage A.

The course prerequisite is prior web application development. The game offers a gentle introduction, but project activities will assume basic JavaScript, terminal use, and Git.

## Assessment constraints

[Homework 1](../../Programmeerimine_II/homeworks/homework_01.md) requires a student's own structured, testable API, authentication and authorization, CRUD for at least four resource types, installation/API documentation, and at least 50% test coverage. Students must defend their design choices. The lecture API explicitly cannot be submitted as homework. The Issue → branch → linked PR → reviewer workflow remains part of the course.

The guided project will therefore be a **practice blog API**, starting with categories, then posts, users, and comments, consistent with the [lecture project](../../Programmeerimine_II/project/README.md). Each checkpoint will ask students to transfer the idea to their own domain. Game completion and self-reported practice are not grades, test coverage, or evidence of assignment completion.

## Sequence and learning outcomes

| Sequence | Outcome | Current game coverage | Source and course timing | Planned practice / stage |
| --- | --- | --- | --- | --- |
| 1 | Set up, run, type-check, and organize a TypeScript project | Setup missing | `typescriptigaAlustamine`, `moodulid`, `tooriistad`; lecture 1 / homework 1 | Setup and import repair; checkpoint 1; B |
| 2 | Describe values, functions, collections, optional data, and unions | `typescript-basics`, `interfaces-unions` | `typescript`, `tyybid`; lecture 1 | Compiler-error repair; Category DTO; checkpoint 2; B |
| 3 | Create objects and explain constructors, state, methods, and visibility | `classes-objects`, `properties-methods`, `encapsulation` | `oop`; preparation for lecture 2 | Constructor / this / access repair; B |
| 4 | Choose inheritance, polymorphism, interfaces, or composition deliberately | `inheritance`, `polymorphism`, `composition-contracts` | `oop`; lecture 2 structure | Repository contract and fake; checkpoints 3–4; B/D |
| 5 | Explain HTTP and expose CRUD through routers and controllers | `api-layers` introduces responsibilities; HTTP/Express lessons missing | `express`, `router`, `struktureerimine`; lectures 1–2 / homework 1–2 | Request ordering, responsibility sorting; checkpoint 5; C |
| 6 | Validate external input and handle async results and errors | `async-errors`; validation only introductory | `middleware`, `errors`, `notFound`; lectures 2 and 5 / homework 2 and 5 | Invalid ID/body and rejected Promise repair; checkpoint 6; C |
| 7 | Persist resources using parameterized SQL and appropriate configuration | Repository concept only | `database`, `docker`, `keskkonnamuutujad`; lecture 4 / homework 4 | In-memory → SQL repository; checkpoint 7; D |
| 8 | Authenticate users and enforce access to individual resources | Missing | `auth`, `hash`, `bcrypt`, `jwt`, `owasp`; lectures 3 and 5 / homework 3 | Ownership and sensitive-field cases; checkpoint 8; D |
| 9 | Test services and HTTP behavior, including failures | `testable-services` introduces fakes/assertions | `testimine`, `mocha`, `chai`, `supertest`, `APITestimine`; lecture 6 / homework 6 | Assertion selection, isolated fixtures, coverage; checkpoint 9; E |
| 10 | Document the API and installation so another student can use it | Missing | `swagger`; homework 1, 3, 4, 6 | OpenAPI schemas, authentication and errors; checkpoint 10; E |

This learning sequence does not change lecture dates or homework requirements. Authentication appears before SQL in lecture 3; the staged project may first demonstrate it with in-memory storage when aligning the final checkpoints with lectures.

## All six lecture/homework pairs

| Pair | Lecture focus | Assignment requirement to retain | Game implementation |
| --- | --- | --- | --- |
| [1](../../Programmeerimine_II/lessons/loeng_01/README.md) / [HW1](../../Programmeerimine_II/homeworks/homework_01.md) | Node, TS, API, HTTP, tools | Choose own project; document resources, functionality and models; at least two routes per resource | Setup, types, HTTP; project transfer prompts |
| [2](../../Programmeerimine_II/lessons/loeng_02/README.md) / [HW2](../../Programmeerimine_II/homeworks/homework_02.md) | Modules, API structure, middleware | Per-resource controllers/routers/services, create/list/get-by-ID, at least one middleware | Layer exercises, validation, constructor injection |
| [3](../../Programmeerimine_II/lessons/loeng_03/README.md) / [HW3](../../Programmeerimine_II/homeworks/homework_03.md) | Creating resources, auth, hashing, JWT | POST with JSON middleware, auth/authorization, documented login/token usage | Middleware order and access-control practice |
| [4](../../Programmeerimine_II/lessons/loeng_04/README.md) / [HW4](../../Programmeerimine_II/homeworks/homework_04.md) | Environment, MySQL/Docker, CRUD | MySQL/MariaDB integration, reproducible SQL setup/seed, installation docs | Repository swap, configuration, persistence |
| [5](../../Programmeerimine_II/lessons/loeng_05/README.md) / [HW5](../../Programmeerimine_II/homeworks/homework_05.md) | Ownership/filtering, query parameters, errors, factory | Update/delete, central errors for all controllers, route-not-found middleware | Error-path tracing and ownership tests |
| [6](../../Programmeerimine_II/lessons/loeng_06/README.md) / [HW6](../../Programmeerimine_II/homeworks/homework_06.md) | Testing, test DB, pagination count, environment | Automated tests with at least 50% coverage and testing instructions | Test selection, checkpoints and review |

## Core versus extensions

Core: setup/modules, basic types and narrowing, constructors/visibility/interfaces, encapsulation, simple inheritance and polymorphism, composition/injection, HTTP/CRUD, Express/middleware, validation, async/error handling, SQL repositories, configuration, auth/ownership, meaningful tests and documentation.

Extensions: bigint/symbol details, advanced type-level programming, deeper inheritance hierarchies, dependency-injection frameworks, factory pattern beyond a small error example, advanced pagination, deployment, and extensive ESLint customization. Pagination/filtering remain recorded lecture topics; a basic query-parameter exercise belongs in C, while advanced pagination can follow the core project. Docker is one database setup option, not a new assessment requirement. Deployment is explicitly optional in the lecture project and is outside this implementation plan.

## Resource correction queue

These are observations from the local files, not claims that archived examples have been executed. Fix each alongside its corresponding stage and check the complete example against the selected project configuration.

| Resource | Finding / change needed | Stage |
| --- | --- | --- |
| `typescript` | `interface Person = { ... }` is invalid; align the introductory syntax with `tyybid`. | B |
| `typescriptigaAlustamine`, `moodulid` | Setup uses NodeNext; module examples use extensionless relative imports. Select and test a consistent module configuration, explain type-checking separately, and avoid implying all packages need separate `@types`. Modules page also has `@types/Express`, a placeholder install command, and a malformed closing fence. | B |
| `oop` | Several examples are partial implementations of full interfaces; label excerpts or provide complete runnable versions. Controller methods annotated `Promise<void>` return response objects. The missing-post test catches its own sentinel failure; replace with an assertion that fails if no error occurs. | B/E |
| `struktureerimine`, `oop`, `database` | Earlier structure puts database work in services; OOP chapter introduces repositories. Explain this progression explicitly rather than teaching contradictory responsibilities. | C/D |
| `errors` | Error class writes `code`, handler reads `statusCode`; align the property. Review unexpected-error disclosure and async propagation with the chosen Express version. | C |
| `notFound` | Wildcard registration needs verification against the chosen Express version. Prefer a documented, tested final middleware pattern. | C |
| `middleware`, `router`, `express` | Standardize runnable imports/setup, explain middleware order, and connect the scattered validation material to one focused lesson. Router prose overstates the inability to use app-level middleware with routers. | C |
| `auth`, `jwt`, `owasp`, `project` | Align email/username naming and `req.user` versus `res.locals.user`; explain verified token claims versus resource authorization. Add malformed/expired token and ownership failure examples. | D |
| `hash`, `bcrypt` | Consolidate overlapping explanations; clarify password comparison and the distinction between salt and work factor. | D |
| `database` | SQL setup links point to absent `code/neljasLoeng/sql` paths in this checkout. The “bad query” example uses `email = email`; make its intended lesson explicit. Distinguish connection failure from absence. | D |
| `docker`, `keskkonnamuutujad` | Clarify `-p` port mapping and named volumes; environment prose mixes `python` and `node` and overgeneralizes process environment visibility. Verify commands across supported platforms. | D |
| `mocha`, `chai`, `supertest`, `APITestimine` | Repeated configurations use `ts-node/register` without consistently installing it and differ from the TS setup page. Align package/module choices, fixtures, cleanup, and test commands. Avoid relying on `--exit` to conceal resource leaks. | E |
| `swagger` | Current minimal spec only describes GET /posts; expand request/response/error schemas and auth with checkpoint 10. | E |
| Lecture outlines / project links | Empty homework-code link in lecture 1, missing code directories and SQL paths, and starter-path discrepancies need local link cleanup. Do not fabricate missing archives. | B–F |

Overlapping material should use one canonical runnable example with links from the short concept pages. Keep the game’s animal analogies for initial OOP recognition, then explicitly transfer the same ideas to Category and Post.

## Concept inventory

All 27 concept pages are mapped to an implementation stage:

- B: `typescript`, `tyybid`, `typescriptigaAlustamine`, `moodulid`, `oop` (foundations).
- C: `express`, `tooriistad`, `struktureerimine`, `middleware`, `router`, `errors`, `notFound`.
- D: `auth`, `hash`, `bcrypt`, `jwt`, `owasp`, `database`, `docker`, `keskkonnamuutujad`, `oop` (repositories).
- E: `testimine`, `mocha`, `chai`, `supertest`, `APITestimine`, `swagger`, `oop` (tests).
- Optional tooling reference: `eslint` (review during F).

## Stage A application decisions

- Lesson IDs are explicit and language-independent; display order comes from `src/curriculum.ts`.
- `src/progress.ts` migrates the frozen v1 numeric mapping to a v2 record containing separate `lessons` and `activities` arrays. The old record stays untouched as a backup; v2 takes precedence, including after reset.
- Suggested prerequisites are links, never locks. Module filters preserve access to every lesson and the global next-step recommendation.
- Exercise metadata supports choice, prediction, and structured repair presentation with shared answer checking and variable lengths. The existing prediction cards demonstrate the new presentation. Full repair content arrives in B; ordering/sorting arrive in C.
- Three small, self-reported practice prompts establish independent activity tracking. They are not the runnable project checkpoints scheduled for D/E.
- Resource links open the existing Estonian course material in a separate tab and are labeled as Estonian in both interface languages.
