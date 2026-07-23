# ResumifyFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.32.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

Step 1: Install Tailwind CSS

Open your project terminal and run:

npm install tailwindcss @tailwindcss/postcss postcss --save-dev
Step 2: Create .postcssrc.json

In the project root (same level as package.json), create a file:

.postcssrc.json

Add:

# Resumify Frontend

Angular 20 + Tailwind CSS Project

---

# Prerequisites

Before starting, make sure you have installed:

- Node.js (Latest LTS Version)
- npm
- Angular CLI

Check versions:

```bash
node -v
npm -v
ng version
```

---

# Clone the Project

```bash
git clone <repository-url>
cd resumify-frontend
```

---

# Install Dependencies

```bash
npm install
```

---

# Install Tailwind CSS

Install the required Tailwind CSS packages:

```bash
npm install --save-dev tailwindcss @tailwindcss/postcss postcss
```

---

# Configure PostCSS

Create a file named:

```text
.postcssrc.json
```

Add the following content:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

---

# Configure Global Styles

Open:

```text
src/styles.css
```

Replace the contents with:

```css
@import 'tailwindcss';
```

> If your project uses `styles.scss`, use the same import inside `styles.scss`.

---

# Verify Angular Configuration

Open `angular.json` and ensure the global styles file is configured.

Example:

```json
"styles": [
  "src/styles.css"
]
```

or

```json
"styles": [
  "src/styles.scss"
]
```

---

# Run the Application

```bash
npm start
```

or

```bash
ng serve
```

Open your browser:

```
http://localhost:4200
```

---

# Verify Tailwind CSS

Replace the contents of `app.component.html` with:

```html
<div class="min-h-screen bg-slate-100 flex items-center justify-center">
  <div class="bg-white rounded-xl shadow-xl p-10">
    <h1 class="text-4xl font-bold text-blue-600">Tailwind CSS is Working 🎉</h1>

    <button class="mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
      Click Me
    </button>
  </div>
</div>
```

If the page is styled correctly, Tailwind CSS has been installed successfully.

---

# Optional: Install VS Code Extensions

Recommended extensions:

- Tailwind CSS IntelliSense
- Angular Language Service
- Prettier
- Error Lens
- Material Icon Theme

---

# Optional: Configure Prettier

Install:

```bash
npm install --save-dev prettier prettier-plugin-tailwindcss
```

Create a `.prettierrc` file:

```json
{
  "singleQuote": true,
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

This automatically sorts Tailwind CSS classes when formatting your code.

---

# Project Structure

```text
resumify-frontend/
│
├── src/
│   ├── app/
│   ├── assets/
│   └── styles.css
│
├── angular.json
├── package.json
├── .postcssrc.json
├── README.md
└── node_modules/
```

---

# Useful Commands

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm start
```

or

```bash
ng serve
```

Build project:

```bash
ng build
```

Run unit tests:

```bash
ng test
```

Watch mode:

```bash
ng build --watch
```

---

# Notes

- Angular Version: **20**
- Tailwind CSS Version: **4**
- No `tailwind.config.js` is required.
- No `postcss.config.js` is required.
- Only `.postcssrc.json` is needed for Tailwind CSS configuration.
