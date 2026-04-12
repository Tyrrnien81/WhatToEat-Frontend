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
│   ├── api.ts           # Base URL + shared config (single source of truth)
│   ├── diningHalls.ts   # Dining hall API calls
│   └── homescreenService.ts  # Home screen API calls
├── store/               # Zustand global state
└── types/               # Shared TypeScript types
```

## Configuration

All API config lives in **`src/services/api.ts`**. Update your IP here when your local network changes:

```ts
export const BASE_URL = 'http://<YOUR_IP>:8000';
export const DEFAULT_USER_ID = '<YOUR_USER_ID>';
```

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
npx expo start --clear
```

Scan the QR code with Expo Go on your phone.

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
