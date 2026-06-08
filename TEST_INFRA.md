# E2E Test Infra: Chemistry & Biology ENT Training Website

## Test Philosophy
- **Opaque-box, requirement-driven**: We test the website by interacting with the DOM just like a real user would. We do not mock React state directly; instead, we interact with UI controls (inputs, buttons, toggles) and assert on changes in the DOM or `localStorage`.
- **Methodology**: Category-Partition + Boundary Value Analysis (BVA) + Pairwise + Real-World Workload Testing.

## Feature Inventory
| # | Feature | Source (requirement) | Tier 1 | Tier 2 | Tier 3 |
|---|---------|---------------------|:------:|:------:|:------:|
| 1 | Welcome Screen & Login Transition | R1. Welcome Screen | 5      | 5      | ✓      |
| 2 | Authenticated Roles & persistence | R1. Auth & Roles | 5      | 5      | ✓      |
| 3 | Subject Selection UI & Biology Lock| R2. Subject Selection | 5      | 5      | ✓      |
| 4 | Chemistry Lesson Plan Listing | R2. Lesson Plan | 5      | 5      | ✓      |
| 5 | Lesson Content Player & Text | R3. Lesson Flow | 5      | 5      | ✓      |
| 6 | Interactive Testing & Retakes | R3. Student Tests | 5      | 5      | ✓      |
| 7 | Textbook Integration (PDF Viewer)| R3. Textbooks | 5      | 5      | ✓      |
| 8 | Teacher Admin Controls | R3. Admin Panel | 5      | 5      | ✓      |
| 9 | Light/Dark Theme Switch | R4. Theme Styling | 5      | 5      | ✓      |

## Test Architecture
- **Test Runner**: Playwright (Node.js) or Cypress. Playwright is preferred for modern React + Vite apps on Windows as it has native multi-browser support and can easily verify localStorage state.
- **Invocation Command**: `npm run test:e2e` (runs Playwright tests headlessly)
- **Directory Layout**:
  ```
  tests/
  ├── e2e/
  │   ├── welcome-auth.spec.js
  │   ├── dashboard.spec.js
  │   ├── lesson-flow.spec.js
  │   ├── admin-panel.spec.js
  │   └── theme.spec.js
  └── fixtures/
      └── mock-lessons.json
  ```

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Student Full Learning Path | Welcome, Auth, Subject Selection, Lesson 1 text/video, Test completion, Score storage, next lesson unlock. | High |
| 2 | Teacher Lesson Editing & Unlock | Admin login, Student account creation, Lesson text modification, Video URL update, manual lesson unlock. | High |
| 3 | Theme Persistence & Session Restore | Theme switch, login, page navigation, page refresh, verification of persisted theme & login session. | Medium |
| 4 | Test Retake & Score History | Student takes quiz, fails, retakes, achieves higher score, verifies updated score and unlocked status. | High |
| 5 | Multi-Student Sandbox Isolation | Student A registers/logs in, takes test. Student B registers/logs in, verifies no leakage of Student A's scores. | High |

## Coverage Thresholds
- Tier 1: ≥45 total test cases (5 per feature)
- Tier 2: ≥45 total boundary/corner cases (5 per feature)
- Tier 3: ≥9 pairwise combination cases
- Tier 4: 5 realistic application scenarios
- **Total Minimum Test Cases**: 104
