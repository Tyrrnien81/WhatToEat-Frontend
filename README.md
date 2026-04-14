# WhatToEat — Frontend

A React Native / Expo app for discovering dining hall menus and food recommendations.

## Tech Stack

- **React Native** with **Expo**
- **TypeScript**
- **Zustand** for state management
- **React Navigation** for routing

## Project Structure

```
src/
├── components/          # Shared UI components
├── constants/           # Colors, theme values
├── context/             # Auth context (user session)
├── navigation/          # Bottom tab navigator
├── screens/
│   ├── Auth/            # Login / signup
│   ├── Community/       # Community feed
│   ├── DiningHall/      # Dining hall menus
│   ├── HomeScreen/      # Main home screen
│   ├── Profile/         # User profile
│   ├── Scan/            # Food scanning
│   └── SetUp/           # Onboarding setup
├── services/
│   ├── api.ts                 # Base URL, dev user id, optional JWT, auth query helper
│   ├── communityService.ts  # Community feed + create post
│   ├── diningHalls.ts         # Dining hall API calls
│   ├── homescreenService.ts # Home screen API calls
│   ├── profileService.ts    # GET /users/me, food-log summary
│   ├── questionnaireService.ts  # POST /questionnaire, GET preferences
│   └── scanService.ts       # POST /scan, POST /scan/log
├── stores/
│   └── onboardingDraftStore.ts  # SetUp → POST /questionnaire payload
├── store/               # Zustand global state (legacy / other)
└── types/               # Shared TypeScript types
```

## Configuration

Primary config is **`src/services/api.ts`** (defaults + env overrides).

| Variable | Purpose |
|----------|---------|
| `EXPO_PUBLIC_API_BASE_URL` | Backend origin, e.g. `http://192.168.1.10:8000` |
| `EXPO_PUBLIC_DEV_USER_ID` | UUID for `?user_id=` when not using a JWT |
| `EXPO_PUBLIC_API_ACCESS_TOKEN` | Supabase **access** JWT (`Authorization: Bearer …`). When set, `user_id` query is omitted. |

**Local backend with `ALLOW_QUERY_USER_ID=true`:** leave `EXPO_PUBLIC_API_ACCESS_TOKEN` unset; the app sends `?user_id=EXPO_PUBLIC_DEV_USER_ID` (or the default in `api.ts`) on protected routes.

**Production / staging:** set `EXPO_PUBLIC_API_ACCESS_TOKEN` from your auth layer after sign-in (wire `AuthContext` when ready); never enable `ALLOW_QUERY_USER_ID` on the server.

## Getting Started

### Prerequisites

- Node.js
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (same Wi-Fi network as your machine)

### Install dependencies

```bash
npm install
```

### Start the app

```bash
npm start
```

`npm start` runs `env -u CI expo start` so Expo’s terminal UI (including the **ASCII QR**) is not disabled when `CI` is set in your shell (Cursor tasks, some CI-like environments).

The QR only appears when the process has a real TTY (`stdout.isTTY`). If you still see only “Waiting on http://localhost:8081”:

1. Run **`npm start`** in **Terminal.app**, **iTerm**, or the VS Code / Cursor **integrated terminal** (not a piped or headless task).
2. Widen the terminal (narrow columns break the QR).
3. Or start Metro as usual, then in a **second** terminal run **`npm run qr`** to print the same-style QR for `exp://<LAN-IP>:8081` (uses Metro’s `/status` check).

Clear cache when needed: `npx expo start --clear` (still omit `CI=1` if you want the QR).

## Backend

The backend repo is **WhatToEat-Backend** (FastAPI + Supabase). Start it with:

```bash
cd ../WhatToEat-Backend
source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0
```

Make sure the IP in `src/services/api.ts` matches your machine's local IP.

## Branch Structure

| Branch | Purpose |
|--------|---------|
| `fix/merge` | Main working branch |
| `merging/diningHall` | Dining hall feature (merged into fix/merge) |
| `fix/emergency` | Backend emergency fixes |
