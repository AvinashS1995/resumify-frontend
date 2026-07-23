# Resumify Frontend

Resumify Frontend is an Angular 20 resume builder UI with user and admin experiences. It includes authentication screens, a user dashboard, template selection, an AI-assisted resume builder, and admin analytics pages for dashboard insights, template management, and user tracking.

The app is built as a route-based Angular application with lazy-loaded standalone components for better initial load performance.

## Features

- User login and registration screens
- Google authentication and forgot-password modal UI
- User dashboard with resume summary cards and recent resume activity
- Resume template selection with filters, search, ratings, badges, and previews
- AI Builder screen with resume sections, quick suggestions, preview mode, and export action UI
- Admin dashboard with KPI cards, activity feed, and analytics charts
- Admin template management with upload modal, preview modal, search, filters, enable/disable toggles, and delete action
- Admin user tracking with search, filters, sortable table, score labels, pagination UI, and action menu
- Shared sticky navbar with notifications and profile settings
- Route-based navigation with lazy-loaded pages
- Tailwind CSS 4 design tokens and custom typography
- ApexCharts integration for admin analytics charts

## Tech Stack

- Angular 20
- Angular Router
- Angular Forms
- Standalone Angular components
- Tailwind CSS 4
- ApexCharts with `ng-apexcharts`
- TypeScript
- Karma and Jasmine for unit testing

## Project Structure

```text
src/
  app/
    app.config.ts
    app.html
    app.routes.ts
    app.ts
    screens.ts
    components/
      admin/
        admin-dashboard.*
        template-management.*
        user-tracking.*
      auth/
        login-screen.*
        register-screen.*
      shared/
        admin-sidebar.*
        navbar.*
        notifications-panel.*
        profile-settings-modal.*
        forgot-password-modal.ts
        google-auth-modal.ts
        notification.model.ts
      user/
        user-dashboard.*
        template-selection.*
        ai-builder.*
  styles.css
  main.ts
```

## Routes

The application uses Angular Router with lazy-loaded standalone components.

| Path | Screen |
| --- | --- |
| `/login` | Login screen |
| `/register` | Register screen |
| `/dashboard` | User dashboard |
| `/templates` | Template selection |
| `/ai-builder/:template` | AI resume builder |
| `/admin/dashboard` | Admin analytics dashboard |
| `/admin/templates` | Admin template management |
| `/admin/users` | Admin user tracking |
| `/` | Redirects to `/login` |
| `**` | Redirects to `/login` |

Example builder routes:

```text
/ai-builder/classic
/ai-builder/modern
/ai-builder/executive
```

## Prerequisites

Install:

- Node.js LTS
- npm
- Angular CLI

Check versions:

```bash
node -v
npm -v
ng version
```

## Installation

From the project folder:

```bash
npm install
```

## Development Server

Start the local development server:

```bash
npm start
```

or:

```bash
ng serve
```

Open:

```text
http://localhost:4200/
```

If port `4200` is busy, use another port:

```bash
ng serve --port 4201
```

## Build

Create a production build:

```bash
npm run build
```

Build output is generated in:

```text
dist/resumify-frontend/
```

## Tests

Run unit tests:

```bash
npm test
```

or:

```bash
ng test
```

## Styling

Global styling lives in:

```text
src/styles.css
```

The project uses Tailwind CSS with CSS variables for the design system:

- `--background`
- `--foreground`
- `--card`
- `--primary`
- `--secondary`
- `--muted`
- `--accent`
- `--border`
- `--ring`

Fonts are loaded globally:

- DM Sans for main UI text
- Fraunces for display headings
- JetBrains Mono for small metadata labels

## Charts

Admin dashboard charts use ApexCharts through `ng-apexcharts`.

Current chart areas:

- Growth Trends: area chart for resumes generated and new users
- User Industries: donut chart by user sector
- Template Usage: bar chart for template usage counts

## Notes

- Current data is static mock data inside the component files.
- There is no backend API integration yet.
- Authentication actions currently navigate between UI screens and do not call an auth service.
- Resume export, upload, and admin actions are UI-only placeholders ready for backend integration.

## Useful Commands

```bash
npm start
npm run build
npm test
ng generate component components/example/example-name
```

## Recommended Next Steps

- Connect authentication to a real backend service.
- Move static mock data into Angular services.
- Add route guards for user and admin pages.
- Add API integration for resumes, templates, analytics, and users.
- Add unit tests for route navigation and component interactions.
