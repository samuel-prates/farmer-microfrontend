# Farm React Microfrontend

A microfrontend application built with **React 19**, **TypeScript**, **Redux Toolkit**, **Styled Components**, and **Vite**.  
This project is designed to manage and display farmers and their farms, following atomic design principles and supporting robust testing with Jest and React Testing Library.

---

## Features

- ⚛️ **React 19** with TypeScript
- 🗂️ **Redux Toolkit** for state management
- 🎨 **Styled Components** for CSS-in-JS
- 🧪 **Jest** and **React Testing Library** for unit and integration tests
- 🧬 **Atomic Design** component structure
- ⚡ **Vite** for fast development and builds
- 🧩 Ready for microfrontend architecture

---

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

### Test

```bash
npm run test
```

---

## Project Structure

```
src/
  app/                # Redux store setup
  components/         # Atomic design components (atoms, molecules, organisms)
  features/           # Redux slices and business logic
  pages/              # Page components
  styles/             # Theme and global styles
  main.tsx            # App entry point
  App.tsx             # Root component
```

---

## Technologies

- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Styled Components](https://styled-components.com/)
- [Vite](https://vitejs.dev/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [TypeScript](https://www.typescriptlang.org/)

---

## License

MIT