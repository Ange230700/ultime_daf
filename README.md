<!-- README.md -->

# Ultime DAF

<!-- ![Project Logo](public/logo.png) Replace with your logo if you have one -->

Ultime DAF is a fast, modern, and responsive single-page app for browsing, filtering, and visualizing FBI Wanted person data.
Built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, and **PrimeReact**.
Key features include live filtering, pagination, detailed item pages, a statistics dashboard with charts, theming, and a clean, modular architecture.

---

## Table of Contents

<!-- * [Demo](#demo) -->

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
  <!-- * [Contributing](#contributing) -->
  <!-- * [License](#license) -->
  <!-- * [Acknowledgements](#acknowledgements) -->
- [Contact](#contact)

<!-- ---

## Demo

Try it live: **\[coming soon]**
Or run locally at: [http://localhost:5173](http://localhost:5173)

![Screenshot](public/screenshot.png) Add or replace with your screenshot -->

---

## Tech Stack

**Frontend:**

- React 19
- PrimeReact
- Tailwind CSS
- React Router

**Backend:**

- FBI Wanted Public API (remote)

**Database:**

- N/A (API-only frontend)

**Tools:**

- Vite (build/dev server)
- Chart.js (visualization)
- ESLint, Prettier, Husky, lint-staged

---

## Getting Started

### Prerequisites

- Node.js (>=20.x)
- npm / yarn / pnpm
<!-- * \[Optional] Docker (for local deployments) -->

### Installation

```bash
git clone https://github.com/Ange230700/ultime_daf.git
cd ultime_daf
npm install
```

---

## Running the Project

Start the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
├── src/
│   ├── api/             # API abstraction for FBI endpoints
│   ├── components/      # Shared React components (Navbar, Footer, Spinner, etc.)
│   ├── contexts/        # Context definitions (theme, filter, toast)
│   ├── providers/       # Context Providers (ThemeProvider, FilterProvider, ToastProvider)
│   ├── hooks/           # Custom React hooks
│   ├── constants/       # Static values (classifications, etc.)
│   ├── pages/           # Main pages (Home, Details, Stats)
│   ├── types/           # TypeScript types
│   └── index.css        # Tailwind CSS base
├── public/              # Static assets (logo, themes, favicon)
├── .env.sample          # Example env file
├── package.json
├── vite.config.ts
├── tsconfig.json
└── ...
```

---

## API Documentation

This app consumes the [FBI Wanted API](https://api.fbi.gov/@wanted).
Main API functions (see `src/api/api.ts`):

- `GET /@wanted` — Search and filter wanted persons (with pagination, classification, and title)
- `GET /@wanted-person/:uid` — Get detailed data for a specific person

Parameters:

- `title` (string) — search by name/title
- `poster_classification` (string) — filter by classification
- `page` (number) — current page
- `pageSize` (number) — items per page

> For more, see the code or [FBI API documentation](https://api.fbi.gov/docs).

---

## Testing

To run code linting and formatting:

```bash
npm run lint
```

> **Note:** Unit and end-to-end tests are not yet included.
> To add tests: use [React Testing Library](https://testing-library.com/) or [Cypress](https://cypress.io/).

---

## Deployment

1. Set up your environment (see below).
2. Build for production:

   ```bash
   npm run build
   ```

3. Preview the production build locally:

   ```bash
   npm run preview
   ```

4. Deploy the `dist/` directory to your static host (Vercel, Netlify, Render, etc).

---

## Environment Variables

Create a `.env` file with:

```env
VITE_API_URL=https://api.fbi.gov
```

You may use any compatible backend or public API.

<!-- ---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

Code linting and formatting are enforced via Prettier, ESLint, and Husky hooks. -->

<!-- ---

## License

MIT License -->

<!-- ---

## Acknowledgements

Special thanks to the following libraries, frameworks, and contributors:

* [React](https://reactjs.org/)
* [PrimeReact](https://primereact.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Chart.js](https://www.chartjs.org/)
* [FBI Public API](https://api.fbi.gov/) -->

---

## Contact

Ange KOUAKOU – [kouakouangeericstephane@gmail.com](mailto:kouakouangeericstephane@gmail.com)

[Project Link](https://github.com/Ange230700/ultime_daf)
