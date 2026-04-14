# 2026-4-7 API Plan (Questionnaire / Scan / Community)

## Prompt For Frontend-Pipeline AI (paste this first)
Use this backend plan plus the frontend repository code to verify end-to-end data pipelines.

Please do the following:
1. Trace each page's data pipeline in frontend (request params, payload shape, response fields, error states).
2. Compare frontend needs with APIs listed in this document.
3. Add missing backend APIs under the section titled `###### Additional APIs Needed From Frontend Pipeline Review`.
4. For each added API, include: method, path, required params/body, auth (`Yes/No`), and why frontend needs it.
5. Mark whether existing API can be reused (`reuse`) or new API is required (`new`).

---

## Source Of Truth Used
- Excel planning sheet: `required-api-document.xlsx` (Backend sheet)
- Current branch implementation status checked on `api-docs-pr`

## Current Reality (as of 2026-04-07)
- Implemented and tested in current branch: Homescreen + Dining Hall
- Not yet implemented in current branch: Questionnaire, Scan, Community

---

## Planned API Scope From Excel

### 1) Questionnaire
| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/questionnaire` | Yes | Save initial preference/body/diet/allergen data |
| GET | `/users/me/preferences` | Yes | Fetch current user's preferences |
| PATCH | `/users/me/preferences` | Yes | Update current user's preferences |

### 2) Scan
| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/scan` | Yes | Analyze food image and return food/nutrition result |
| POST | `/scan/log` | Yes | Save recognized food + nutrition into meal log |

### 3) Community
| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/community/posts` | No | Fetch community post feed |
| POST | `/community/posts` | Yes | Create community post |
| GET | `/community/posts/:postId` | No | Fetch one post detail |
| DELETE | `/community/posts/:postId` | Yes | Delete own post |

---

## Backend Development Plan

### Questionnaire API
- Router file: `app/routers/questionnaire.py`
- Service file: `app/services/questionnaire_service.py`
- Schema file: `app/schemas/questionnaire.py`
- Model usage: `app/models/tracking.py` (`UserPreference`)

Implementation notes:
- Use JWT current user context for all three endpoints.
- Validate diet/allergen/dislike formats consistently.
- Support partial updates in PATCH.

Acceptance criteria:
- POST creates or initializes preference record.
- GET returns full preference payload for current user.
- PATCH updates only provided fields and preserves others.

---

### Scan API
- Router file: `app/routers/scan.py`
- Service file: `app/services/scan_service.py`
- Schema file: `app/schemas/scan.py`
- Model usage: `MealLog`, `MealLogItem` in `app/models/tracking.py`

Implementation notes:
- Split scan result generation and log persistence into two endpoints.
- Define stable response schema for model output confidence + macros.
- For `/scan/log`, reuse meal logging logic pattern from homescreen.

Acceptance criteria:
- `/scan` returns deterministic response shape with recognized item + nutrition fields.
- `/scan/log` writes meal log rows correctly and returns created IDs/message.
- Invalid/missing image payload returns clear 4xx error.

---

### Community API
- Router file: `app/routers/community.py`
- Service file: `app/services/community_service.py`
- Schema file: `app/schemas/community.py`
- New model(s) expected: post table (+ optional media/comments later)

Implementation notes:
- Keep GET feed public.
- Require JWT for POST/DELETE and enforce ownership on delete.
- Start with minimal post fields (author, text, image_url, created_at).

Acceptance criteria:
- Feed endpoint returns list with stable pagination strategy (cursor or page/size).
- POST creates post and returns post id.
- DELETE denies non-owner and succeeds for owner.
- GET detail returns 404 for missing post id.

---

## Suggested Build Order (next iteration)
1. Questionnaire (fastest dependency unlock for personalization flows)
2. Community (straightforward CRUD and clear frontend mapping)
3. Scan (higher integration complexity: image input + recognition + logging)

---

## API/Test Deliverables Checklist
- [ ] Router + service + schema files created per domain
- [ ] Routes registered in `app/main.py`
- [ ] Integration test scripts added (similar style to homescreen/dining hall test scripts)
- [ ] Excel sheet updated with completion status and V mark when done
- [ ] API docs updated under `docs/api/*`

---

###### Additional APIs Needed From Frontend Pipeline Review
(Add new items below after frontend repo pipeline check)

Detailed pipeline review output has been added here:
- `md/2026-4-7-frontend-pipeline-api-additions.md`

Context copied below from the pipeline review so this file is self-contained.

| Status | Method | Endpoint | Auth | Reuse/New | Frontend Page/Flow | Required Params/Body | Why Needed |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Add | POST | `/users/me/consents/privacy-policy` | Yes | new | SetUp PrivacyPolicyScreen -> I Agree | body: `{ version, acceptedAt }` | Privacy agreement is an explicit user action and should be auditable separately from preference data. |
| Add | GET | `/users/me/onboarding` | Yes | new | Re-open questionnaire / edit flow | none | Current plan has preferences endpoints, but SetUp flow captures more than diet/allergen (birthday, gender, height, weight, goalWeight, favorite halls). |
| Add | PATCH | `/users/me/onboarding` | Yes | new | Future profile/edit onboarding flow | partial body: `{ birthday, gender, height, weight, goalWeight, diet, dislikes, allergens, favoriteDiningHallIds }` | Frontend needs partial updates for multi-step onboarding data after initial completion. |
| Keep (extend schema) | POST | `/questionnaire` | Yes | reuse | SetUp completion submit | full onboarding payload including body metrics + preferences + ranked hall IDs | Existing endpoint can be reused, but request schema must include all fields collected by 10-step SetUp flow. |
| Keep (extend schema) | GET | `/users/me/preferences` | Yes | reuse | Preferences hydration | response should include current values used by SetUp/Profile | Existing endpoint can be reused if backend includes onboarding-preference fields used by frontend. |
| Keep (extend schema) | PATCH | `/users/me/preferences` | Yes | reuse | Preference edits | partial body for diet/dislikes/allergens/favorite halls | Existing endpoint can be reused for preference-only edits. |
| Add | POST | `/community/posts/:postId/likes` | Yes | new | Community feed/detail -> like post | path: postId | Frontend supports toggling post likes in feed/detail; needs persisted like action. |
| Add | DELETE | `/community/posts/:postId/likes` | Yes | new | Community feed/detail -> unlike post | path: postId | Required to support unlike and consistent count sync. |
| Add | POST | `/community/replies/:replyId/likes` | Yes | new | Community detail -> like reply | path: replyId | Reply likes are interactive in UI and must persist. |
| Add | DELETE | `/community/replies/:replyId/likes` | Yes | new | Community detail -> unlike reply | path: replyId | Needed for reply unlike and count correction. |
| Add | POST | `/community/posts/:postId/replies` | Yes | new | Community detail -> add top-level reply | path: postId, body: `{ content }` | Users can write replies in thread view; current planned APIs do not include create-reply. |
| Add | POST | `/community/replies/:replyId/replies` | Yes | new | Community detail -> nested reply (reply to reply) | path: replyId, body: `{ content }` | UI supports nested replies via reply target; backend endpoint needed for thread tree. |
| Keep (extend query) | GET | `/community/posts` | No | reuse | Community feed/search/tag filter | query: `{ q?, hallTag?, cursor?/page?, limit? }` | Existing feed endpoint can be reused if backend supports search/tag filtering and pagination used by feed pipeline. |
| Keep (extend response) | POST | `/community/posts` | Yes | reuse | New post modal | body: `{ content, hallTag, imageUrl? }` | Existing create-post endpoint is reusable, but frontend requires hallTag in write/read shape. |
| Keep (extend response) | GET | `/community/posts/:postId` | No | reuse | Post detail modal | path: postId; response includes full reply tree and likedByMe flags | Existing detail endpoint can be reused if response includes thread + interaction state required by detail screen. |
| Keep | POST | `/scan` | Yes | reuse | ScanScreen shutter/gallery -> analyze | multipart image file or imageUrl | Existing planned scan endpoint matches pipeline. |
| Keep | POST | `/scan/log` | Yes | reuse | Scan result -> persist meal log (when save CTA is added) | body: recognized item + nutrition + timestamp/meal slot | Existing endpoint is sufficient; frontend currently needs a save trigger in UI wiring. |
