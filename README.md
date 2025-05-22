# ultime_daf

## 📦 Prerequisites

- **Node.js** v16 or higher
- **npm** (or Yarn/PNPM)
- A running API server (or use the FBI public API URL)

---

## ⚙️ Environment

Rename (or copy) the sample file and fill in your API URL:

```bash
cp .env.sample .env
```

Then edit `.env` to set your backend endpoint.

> **Note:** Vite only exposes vars prefixed with `VITE_`—so if your code reads `import.meta.env.VITE_API_URL`, your `.env` should contain:

```dotenv
VITE_API_URL=https://your.api.url
```

---

## 🚀 Install & Run (Dev)

1. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Start the dev server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   This invokes Vite (with `--host`), so it will:

   - Spin up a local server (default [http://localhost:5173](http://localhost:5173))
   - Watch & hot-reload on file changes

3. **Open in browser**
   Navigate to

   ```
   http://localhost:5173
   ```

---

## 🛠️ Other Useful Scripts

- **Build for production:**

  ```bash
  npm run build
  ```

- **Preview production build locally:**

  ```bash
  npm run preview
  ```

- **Lint & format:**

  ```bash
  npm run lint
  ```

---

With that in place, new contributors can clone the repo, set their `.env`, and be up and running in seconds.

**Project Overview**
“ultime_daf” is a modern, responsive single-page application built with Vite, React, TypeScript, Tailwind CSS and PrimeReact. It connects to the FBI’s public Wanted API to display, filter, paginate, and analyze data on wanted persons. The app emphasizes fast client-side performance, themeable UI, and a modular, context-driven state architecture.

---

## Key Features

- **Search & Filtering**
  Users can search by name/title and filter by FBI “poster classification” (e.g., Missing persons, Terrorist, Endangered children). Filters reset pagination automatically.

- **Pagination**
  Large result sets are split into pages. Users can choose how many items per page and navigate back and forth without full page reloads.

- **Detail View**
  Clicking a thumbnail opens a details page (‘/details/\:uid’) showing large images, description, caution, and structured biographical fields in a data table.

- **Statistics Dashboard**
  A dedicated “Stats” page aggregates up to 1,000 records to display:

  - **Pie chart** of poster classifications
  - **Bar chart** of case counts by FBI field office
  - **Line chart** of publications over time

- **Theming & Dark Mode**
  A toggle switches between light/dark themes. The choice is persisted to `localStorage` and applied via a `<link>` to PrimeReact theme CSS and Tailwind’s `dark:` utility classes.

- **Global Notifications**
  Toast messages surface API errors or user feedback. A `ToastProvider` and `useToast` hook power consistent, centralized notifications.

- **Responsive Layout**
  Tailwind CSS ensures layouts adapt from mobile to large screens. A PrimeReact Carousel on category sections and a grid for thumbnails adjust based on breakpoints.

---

## Architecture & State Management

1. **Vite + React + TypeScript**

   - Fast bundling/dev server via Vite
   - Full typing for components, hooks, and API layer

2. **Context Providers**

   - **FilterContext** drives search text, classification, page, pageSize
   - **ThemeContext** toggles and persists dark/light mode
   - **ToastContext** centralizes notification logic

3. **API Abstraction**

   - `axios.create` instance with `VITE_API_URL` fallback
   - Typed request helpers (`fetchWantedList`, `fetchItemDetails`)

4. **Component Layers**

   - **Pages**: `Home`, `Details`, `Stats` handle data fetching & layout
   - **Shared Components**: `Thumbnail`, `Pagination`, `Spinner`, `SafeHtml` sanitize and render common UI
   - **Charts**: Leveraging Chart.js + `chartjs-plugin-datalabels` for visualizations

---

## Technology Stack

| Layer                | Technology                                 |
| -------------------- | ------------------------------------------ |
| Build Tool           | Vite                                       |
| Framework            | React (v19) & TypeScript                   |
| Styling              | Tailwind CSS                               |
| UI Components        | PrimeReact & PrimeIcons                    |
| State Management     | React Context + Hooks                      |
| HTTP Client          | Axios                                      |
| Charting             | Chart.js + ChartDataLabels plugin          |
| Theming              | Tailwind dark mode + PrimeReact CSS themes |
| Linting & Formatting | ESLint, Prettier, Husky + lint-staged      |

---

## Future Enhancements

- **Debounced Search** to reduce API calls on rapid typing.
- **Abortable Fetches** with `AbortController` to avoid race conditions.
- **Server-Side Rendering** (SSR) or Static Generation for faster first paint and SEO.
- **Unit & E2E Tests** (e.g., React Testing Library, Cypress) integrated into CI.
- **Accessibility Audit** to ensure full keyboard & screen-reader support.

---

This description captures the app’s purpose, structure, and technology choices, providing a clear snapshot for documentation, README, or project portfolio. Let me know if you’d like it expanded or tailored for a specific audience!

Here’s a high-level code review covering project structure, configuration, patterns, and some concrete suggestions for improvement:

---

## 1. Project Structure & Organization

**What’s good:**

- **Logical grouping:** You’ve separated `api/`, `components/`, `pages/`, `contexts/`, `providers/`, `hooks/`, and `constants/`.
- **Type safety:** Use of TypeScript everywhere is great.

**Opportunities:**

- **Unify “providers” placement.**

  - You have `src/contexts/ToastProvider.tsx` but then import it as `./providers/ToastProvider.tsx` in `main.tsx`. Either:

  1. Move `ToastProvider.tsx` into `src/providers/`, or
  2. Change your import to `import { ToastProvider } from "./contexts/ToastProvider";`

- **Consistent folders.** Consider co-locating each context with its provider (e.g. under `src/providers/`) and keeping plain “contexts” just for the `createContext` calls.

---

## 2. HTML Entrypoint (`index.html`)

```html
<body className="flex min-h-screen flex-col antialiased"></body>
```

- **Issue:** In plain HTML you must use `class="…"` not React’s `className`.
- **Fix:**

  ```html
  <body class="flex min-h-screen flex-col antialiased"></body>
  ```

---

## 3. Context & Provider Patterns

- **Stable values:** You’re using `useCallback` + `useMemo` in providers—excellent for preventing unnecessary re-renders.
- **Toast context:**

  ```ts
  export const ToastContext = createContext<ToastContextType | undefined>(
    undefined,
  );
  ```

  but you import it as `from "../contexts/ToastContext"`—just verify your path matches your folder layout.

**Enhancements:**

- Consider moving the file that defines `ToastContext` (`ToastContext.tsx`) and the file that implements `ToastProvider` into the same directory under `src/providers`.
- Add PropTypes or explicit return types on your functional components for clarity.

---

## 4. API Layer (`src/api/api.ts`)

```ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "https://api.fbi.gov",
});
```

- **Good separation.**
- **Suggestion:** Centralize error‐handling via an Axios interceptor so you don’t have to `.catch` in every component:

  ```ts
  api.interceptors.response.use(
    (res) => res,
    (err) => {
      // e.g. show toast, log to Sentry
      return Promise.reject(err);
    },
  );
  ```

- **Type definitions:** Your `WantedItem` covers many fields; consider splitting into smaller sub‐interfaces if it grows further.

---

## 5. Pages & Components

### Home Page (`Home.tsx`)

- **Filtering logic:**

  ```ts
  useEffect(() => {
    setPage(1);
  }, [title, posterClassification, pageSize]);
  ```

  – resets page correctly. Good!

- **Suggestion:** Use an [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) in your fetch effect so stale requests don’t update state after unmount.

### Stats Page (`Stats.tsx`)

- **Data processing:** Your loop building `posterCounts`, `officeCounts`, `byYear` is clear.
- **UX improvement:** Swap `<p>Loading stats…</p>` for a `<Spinner />` so it’s consistent with your other loading states.

### Details Page (`Details.tsx`)

- You render a `<DataTable>` of key/value pairs—nice.
- **Edge case:** If `fetchItemDetails` errors out, consider catching and showing a toast instead of leaving the UI hanging.

---

## 6. Styling & Theming

- **Dynamic theme CSS:** In `ThemeStyles.tsx`, you remove+append a `<link>` each time. That works, but you might also:

  - Use CSS variables everywhere and just toggle a `data-theme="dark"` attribute on `<html>`, eliminating multiple stylesheet loads.

- **Tailwind dark mode:** Since you already toggle `class="dark"` on `<html>`, you can lean on Tailwind’s built-in dark mode classes (`dark:bg-gray-800` etc.) instead of separate PrimeReact theme files.

---

## 7. Build & Deployment

- **`postinstall` script:**

  ```json
  "postinstall": "cp -R node_modules/primereact/resources/themes public/themes"
  ```

  – ensure that `public/themes` exists in Git, and that `cp` works cross‐platform (on Windows, you may need `xcopy` or use an npm package like `cpy`).

- **Environment variables:** Document in a `.env.example` which keys (e.g. `VITE_API_URL`) are needed.

---

## 8. Testing & CI

- You have Husky + lint-staged set up—great for code quality.
- **Next steps:**

  - Add unit tests for your context providers (e.g. with React Testing Library).
  - Add end-to-end tests (e.g. Cypress) to verify that your filtering, pagination, and details pages behave as expected.
  - Integrate tests into a CI workflow (GitHub Actions) to run on every push.

---

## 9. Miscellaneous

- **Accessibility:**

  - You’ve done well using `alt={item.title}` and ARIA labels on your theme-toggle `<Button>`.
  - Consider keyboard navigation testing for your carousel, menus, and tabs.

- **Performance:**

  - Lazy-load heavy components (e.g. Stats charts) with `React.lazy`.
  - Debounce the filter input so you don’t fire API calls on every keystroke.

- **Documentation:**

  - Add a `README.md` that explains how to start, test, and build the project.
  - Document your context and provider APIs.

---

### Summary

Overall, this is a solid, well-typed React + Vite + Tailwind project with clear separation of concerns. The biggest quick wins are:

**Improve error handling** in your data-fetching effects (abort controllers, interceptors).
