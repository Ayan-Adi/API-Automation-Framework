# API Test Automation Framework

**Reliable API testing. Built to scale. Ready for your pipeline.**

A production-ready API automation framework built with **Playwright** and **TypeScript** — designed for teams who need fast feedback, clean reports, and confidence before every release.

This is not a collection of one-off scripts. It is a structured, maintainable test suite that mirrors how real applications are tested in professional QA environments: environment-aware, data-driven, and orchestrated end-to-end.

---

## Why This Matters for Your Project

When APIs break, everything downstream breaks — mobile apps, dashboards, integrations, and customer trust.

This framework gives you:

- **Faster releases** — Automated checks run in minutes, not hours of manual regression.
- **Lower risk** — Critical user journeys (signup → login → create → read → update → delete) are validated on every run.
- **Clear visibility** — HTML reports and structured assertions make failures easy to diagnose.
- **Easy handoff** — Clean separation of tests, test data, API clients, and configuration so any engineer can extend it.
- **CI/CD ready** — Environment switching (QA / Stage), retries, and GitHub Actions support out of the box.

Whether you are launching a new product or stabilizing an existing API, this framework provides a solid foundation you can grow with — without rewriting from scratch every sprint.

---

## What Gets Tested

Full end-to-end API coverage against the [Expand Testing Notes API](https://practice.expandtesting.com/notes/api):

| Flow | Endpoint | What We Verify |
|------|----------|----------------|
| User Registration | `POST /users/register` | Account creation, response schema, user data integrity |
| User Login | `POST /users/login` | Authentication, token issuance |
| Create Notes | `POST /notes` | Authenticated note creation (multiple notes) |
| Get All Notes | `GET /notes` | List retrieval, data consistency |
| Update Note | `PUT /notes/{id}` | Partial/full updates with auth |
| Delete Note | `DELETE /notes/{id}` | Removal and post-delete validation |

Tests run in a **defined dependency order** — each step only executes after the previous one succeeds — so flows behave like real user sessions, not isolated calls.

```
Register → Login → Create Notes → Get Notes → Update Note → Delete Note
```

---

## Architecture Highlights

Built with patterns clients and engineering leads expect to see:

### Layered & Maintainable
```
tests/          → Test scenarios (what we validate)
testData/       → Externalized payloads & expected responses
helpers/        → API client layer (Users, Notes)
fixtures/       → Reusable Playwright fixtures
config/         → Environment setup (QA, Stage)
types/          → TypeScript contracts for API responses
.auth/          → Session & token persistence across dependent tests
```

### Environment-Aware
Switch between **QA** and **Stage** with a single command — no code changes required.

### Data-Driven
Test inputs and expected outcomes live in JSON files, making updates simple for non-developers and keeping tests readable.

### Stateful Flow Orchestration
Authentication tokens and created resources are persisted across dependent test projects — enabling realistic multi-step scenarios without hardcoded credentials.

### Type-Safe
Full TypeScript coverage for request payloads and API responses reduces false positives and catches contract drift early.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Playwright](https://playwright.dev/) | API request execution, assertions, reporting |
| TypeScript | Type safety and maintainability |
| cross-env | Cross-platform environment switching |
| GitHub Actions | CI pipeline integration |

---

## Project Structure

```
API/
├── config/
│   ├── environment.ts           # Environment loader
│   └── environments/
│       ├── qa.env
│       └── stage.env
├── testData/                    # Centralized test data
│   ├── signup.json
│   ├── login.json
│   ├── note.json
│   ├── get-notes.json
│   ├── update-note.json
│   └── delete-note.json
├── helpers/
│   ├── users.api.ts             # User API client
│   ├── notes.api.ts             # Notes API client
│   └── auth.store.ts            # Token & session management
├── fixtures/
│   └── api.fixture.ts           # Custom Playwright fixtures
├── types/
│   └── api.types.ts             # API response interfaces
├── tests/api/
│   ├── user-auth.spec.ts
│   ├── create-note.spec.ts
│   ├── get-all-notes.spec.ts
│   ├── update-note.spec.ts
│   └── delete-note.spec.ts
├── playwright.config.ts
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
npm install
npx playwright install
```

### Run the Full Suite
```bash
# QA environment (default)
npm run test:api:qa

# Stage environment
npm run test:api:stage
```

### Run Individual Flows
```bash
npm run test:api          # All API tests
npm run test:qa           # Full suite on QA
npm run test:stage        # Full suite on Stage
```

### View Report
```bash
npm run report
```

---

## How Test Dependencies Work

Playwright projects enforce execution order:

```
auth-qa  →  notes-qa  →  get-notes-qa  →  update-note-qa  →  delete-note-qa
```

Each project depends on the previous one. If authentication fails, downstream tests do not run — saving time and surfacing the root cause immediately.

---

## Extending the Framework

Adding a new API is straightforward:

1. **Add test data** → `testData/your-feature.json`
2. **Add types** → `types/api.types.ts`
3. **Add API client method** → `helpers/`
4. **Write the test** → `tests/api/your-feature.spec.ts`
5. **Wire dependencies** → `playwright.config.ts`

This pattern keeps the suite scalable as your API grows.

---

## Ideal For

- Startups shipping fast and needing regression safety nets
- Agencies delivering QA automation to clients
- Teams migrating from manual API testing to automation
- Products with authenticated, multi-step API workflows
- CI/CD pipelines requiring reliable pre-deploy gates

---

## Deliverables You Can Expect

When this framework is applied to your product, you receive:

- Automated API regression on every build
- Environment-specific test runs (QA / Stage / Production-ready pattern)
- Clear HTML reports for stakeholders and developers
- Documented, extensible codebase your team can own
- A foundation for API contract testing, negative scenarios, and performance hooks

---

## Let's Build Something Reliable Together

This repository demonstrates how I approach API test automation: **structured, client-focused, and built for the long term** — not quick hacks that break after the first sprint.

If you need API automation, CI integration, or a QA strategy that scales with your product, this framework is proof of how I deliver — clean code, clear communication, and tests that actually protect your releases.

**Ready to automate your API testing? Let's talk.**
