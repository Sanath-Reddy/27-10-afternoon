# React Hands-On Lab: Four Core Patterns

A modern, interactive React learning platform and hands-on laboratory implementing the concepts described in `react hands-on.docx`.

---

## 📚 Overview & Table of Contents

| # | Lesson | Problem Solved | Key APIs |
|---|--------|----------------|----------|
| 1 | **[Lifting State Up](#lesson-1-lifting-state-up)** | Sibling components need to share & synchronize the same data | `useState`, `props` |
| 2 | **[React Router](#lesson-2-react-router)** | Multi-page experience without full browser reloads | `BrowserRouter`, `Routes`, `Route`, `Link` |
| 3 | **[useContext](#lesson-3-usecontext)** | Eliminating prop drilling across deeply nested trees | `createContext`, `useContext`, `Provider` |
| 4 | **[useCallback](#lesson-4-usecallback)** | Preserving function reference stability to prevent unnecessary re-renders | `useCallback`, `React.memo` |

---

## 🚀 Running the Project

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5174/` in your browser.

3. Build production bundle:
   ```bash
   npm run build
   ```

---

## 📁 File Structure

```text
src/
├── App.jsx                         # Master hands-on learning lab & tab switcher
├── index.css                       # Premium Vanilla CSS design system
├── ThemeContext.js                 # Standalone context module (prevents circular imports)
├── components/
│   ├── NameInput.jsx               # Lesson 1: Student name input (writer)
│   ├── NameDisplay.jsx             # Lesson 1: Student name greeting (reader)
│   ├── Toolbar.jsx                 # Lesson 3: Theme toggle consuming ThemeContext
│   ├── Child.jsx                   # Lesson 4: Memoized button component
│   └── CodeViewer.jsx              # Tabbed source code viewer with copy feature
├── pages/
│   ├── Home.jsx                    # Lesson 2: Home route view
│   ├── About.jsx                   # Lesson 2: About route view
│   └── Contact.jsx                 # Lesson 2: Contact route view
├── lessons/
│   ├── Lesson1LiftingState.jsx     # Interactive Lesson 1 demo & state visualizer
│   ├── Lesson2ReactRouter.jsx      # Interactive Lesson 2 router sandbox & route table
│   ├── Lesson3UseContext.jsx       # Interactive Lesson 3 theme playground & architecture tree
│   ├── Lesson4UseCallback.jsx      # Interactive Lesson 4 console monitor & memo toggle
│   ├── QuickReference.jsx          # Searchable pattern decision matrix & summary
│   └── standalone/
│       ├── Lesson1App.jsx          # Verbatim isolated App from Lesson 1
│       ├── Lesson2App.jsx          # Verbatim isolated App from Lesson 2
│       ├── Lesson3App.jsx          # Verbatim isolated App from Lesson 3
│       └── Lesson4App.jsx          # Verbatim isolated App from Lesson 4
```

---

## 📖 Pattern Deep Dives

### Lesson 1: Lifting State Up
- **Goal:** Share data between siblings (`NameInput` and `NameDisplay`).
- **Mechanism:** State lives in the common parent (`App.jsx`). Parent passes `name` and `setName` as props to `NameInput`, and passes `name` to `NameDisplay`.
- **Teaching Point:** State flows downwards via props; events flow upwards via setter callbacks.

### Lesson 2: React Router
- **Goal:** Multi-page client-side navigation without refreshing the document.
- **Components:**
  - `BrowserRouter`: Synchronizes UI with the browser history and URL.
  - `Link`: Renders anchor links that intercept navigation and prevent full reloads.
  - `Routes` & `Route`: Matches the current pathname to the appropriate component (`<Home />`, `<About />`, `<Contact />`).

### Lesson 3: useContext
- **Goal:** Provide global/shared state (e.g., dark/light theme) to nested components without passing props through every layer.
- **Mechanism:**
  - `createContext()` creates the context.
  - `<ThemeContext.Provider value={{ dark, setDark }}>` broadcasts the value to the subtree.
  - `useContext(ThemeContext)` in `<Toolbar />` reads and updates the value directly.
- **Architectural Tip:** Context is placed in `src/ThemeContext.js` to avoid circular dependency between `App.jsx` and `Toolbar.jsx`.

### Lesson 4: useCallback
- **Goal:** Keep function references stable between renders so memoized child components (`memo(Child)`) skip re-rendering when unrelated state changes.
- **Mechanism:**
  - Normal React re-renders recreate new function closures every time.
  - `useCallback(fn, [])` returns the identical function reference across renders.
  - `memo(Child)` performs shallow prop comparison and skips rendering because the `onClick` prop has not changed.
- **Demo Tip:** The live app features an interactive "With useCallback" vs "Without useCallback" toggle with a live console activity monitor.

---

## 📊 Quick Reference Table

| Concept | Use it when | Avoid it when |
|---|---|---|
| **Lifting state up** | Two or more components must share the same data | Only one component uses the data |
| **React Router** | The app needs several pages or URLs | A single view with no navigation is enough |
| **useContext** | Many nested levels need the same data (theme, user, language) | Data passes through only 1 or 2 levels, where props are simpler |
| **useCallback** | A function goes to a memo child or a hook dependency array | The function is only used locally or the child isn't memoized |
