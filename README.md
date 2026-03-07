# Dynamic Details — Form App

A full-stack React application built with **TanStack Start**, **Ant Design**, and **TanStack Router**. It features a dynamic multi-section form with real-time postal pincode lookup, academic detail management, and SSR/SPA rendering demos.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Dev Server](#running-the-dev-server)
  - [Building for Production](#building-for-production)
  - [Preview Production Build](#preview-production-build)
  - [Running Tests](#running-tests)
- [Routes](#routes)
- [Form Features](#form-features)
- [Configuration](#configuration)

---

## Features

- **Dynamic Address Form** — Enter a 6-digit Indian postal pincode to auto-populate state, district, and city via the [Postal Pincode API](https://api.postalpincode.in).
- **Academic Details** — Add/remove academic entries with conditional marks input (CGPA or Percentage).
- **SSR & SPA Demos** — Example routes demonstrating TanStack Start SSR, full-SSR, SPA mode, and server functions.
- **File-based Routing** — Powered by TanStack Router with auto-generated route tree.
- **React Query** — Server-state management with caching and background refetching.
- **Tailwind CSS v4** — Utility-first styling.

---

## Tech Stack

| Category | Library / Tool |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) (React 19) |
| UI Components | [Ant Design v6](https://ant.design) |
| Routing | [TanStack Router v1](https://tanstack.com/router) |
| Data Fetching | [TanStack Query v5](https://tanstack.com/query) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Icons | [Ant Design Icons](https://ant.design/components/icon), [Lucide React](https://lucide.dev) |
| HTTP Client | [Axios](https://axios-http.com) |
| Build Tool | [Vite v7](https://vite.dev) |
| Language | TypeScript 5 |
| Testing | [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) |
| Server | [Nitro](https://nitro.build) |

---

## Project Structure

```
form-antd-/
├── public/
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── router.tsx              # Router factory
│   ├── routeTree.gen.ts        # Auto-generated route tree (do not edit)
│   ├── styles.css              # Global styles
│   ├── data/
│   │   └── demo.punk-songs.ts  # Demo data
│   └── routes/
│       ├── __root.tsx          # Root layout (head, shell)
│       ├── index.tsx           # Main form page (pincode + academic details)
│       ├── details.tsx         # Reusable Mark sub-form component
│       └── demo/               # SSR / API demo routes
│           ├── api.names.ts
│           ├── start.api-request.tsx
│           ├── start.server-funcs.tsx
│           ├── start.ssr.data-only.tsx
│           ├── start.ssr.full-ssr.tsx
│           ├── start.ssr.index.tsx
│           └── start.ssr.spa-mode.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9 (or pnpm / yarn)

### Installation

```bash
git clone <repo-url>
cd form-antd-
npm install
```

### Running the Dev Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Running Tests

```bash
npm test
```

---

## Routes

| Path | Description |
|---|---|
| `/` | Main form — address (pincode lookup) + academic details |
| `/demo/start.api-request` | Demo: API request via TanStack Start |
| `/demo/start.server-funcs` | Demo: Server functions |
| `/demo/start.ssr.data-only` | Demo: SSR data-only mode |
| `/demo/start.ssr.full-ssr` | Demo: Full SSR |
| `/demo/start.ssr.index` | Demo: SSR index |
| `/demo/start.ssr.spa-mode` | Demo: SPA mode |

---

## Form Features

### Address Section

1. Enter a **6-digit pincode** in the search box.
2. The app calls `https://api.postalpincode.in/pincode/{pin}` and populates:
   - **Post Office** dropdown with matching options.
   - **State**, **District**, and **City** auto-filled on selection.

### Academic Details Section

- Add multiple academic records dynamically.
- Each record supports:
  - **Board** name (text input)
  - **Marks Type** — `CGPA` or `Percentage`
  - Conditional input: **CGPA** (0–10) or **Percentage** (0–100)
- Records (except the first) can be removed individually.

---

## Configuration

### Path Aliases

`@` maps to `./src`:

```ts
// vite.config.ts
alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
```

### Vite Plugins

| Plugin | Purpose |
|---|---|
| `@tailwindcss/vite` | Tailwind CSS v4 integration |
| `@tanstack/devtools-vite` | TanStack devtools panel |
| `nitro/vite` | Nitro server engine |
| `vite-tsconfig-paths` | TypeScript path alias resolution |
| `@tanstack/react-start/plugin/vite` | TanStack Start SSR support |
| `@vitejs/plugin-react` | React fast refresh |
