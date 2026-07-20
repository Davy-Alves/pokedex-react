# 📱 Pokédex Application

An interactive and responsive web application that replicates the functionality of a Pokédex, allowing users to search for Pokémon in detail by name or ID number. The project consumes real-time data from the public PokéAPI, featuring classic animations, dynamic loading states, and type-based visual theming.

Built as part of my personal portfolio to demonstrate modern front-end development practices, efficient componentization, custom hooks, and utility-first styling.

---

## 🚀 Technologies Used

The project was developed using a modern JavaScript/TypeScript ecosystem:

- **[React](https://react.dev/):** Library for building component-based user interfaces and managing state (`useState`, `useEffect`, custom hooks).
- **[TypeScript](https://www.typescriptlang.org/):** Static typing to ensure greater predictability, safety, and auto-completion during development.
- **[Vite](https://vite.dev/):** Extremely fast build tool for the front-end ecosystem.
- **[Tailwind CSS](https://tailwindcss.com/):** Utility-first CSS framework for rapid, responsive styling focused on visual performance.
- **[PokéAPI](https://pokeapi.co/):** RESTful API used to consume up-to-date data from the Pokémon universe.

---

## ⚙️ Core Features

- **Flexible Search:** Direct search for any Pokémon using its name or Pokédex number.
- **Autocomplete Search:** Real-time suggestions as you type, filtered from the full list of Pokémon names.
- **Sequential Navigation:** Pagination buttons (`Prev` and `Next`) to smoothly advance or go back through the registry numbers.
- **Dynamic Visualization:** Display of animated sprites (classic Generation V: Black & White style) seamlessly integrated into the layout.
- **Type Icons:** Visual badges displaying each Pokémon's type(s), with custom icons and type-accurate colors.
- **Shiny Toggle:** A dedicated button to switch between a Pokémon's default and shiny sprite on demand.
- **Dynamic Background:** The Pokédex screen background changes based on the Pokémon's primary type, using custom-illustrated pixel art scenes.
- **State Handling:**
  - Visual feedback display during data fetching (`Loading...`).
  - Graceful error handling when a searched term is not found (`Not found :(`), with a dedicated fallback background.
- **Responsive Design:** Interface optimized via Tailwind using dynamic values (`clamp`, custom breakpoints) to adjust perfectly across different screen sizes.

---

## 🏗️ Architecture Notes

The project follows a clear separation of concerns:

- **Hooks** (`src/hooks/`) encapsulate state and business logic — data fetching, shiny toggling, and autocomplete filtering — independent of any UI.
- **Components** (`src/components/`) are purely presentational, receiving data and callbacks via props.
- **`App.tsx`** acts as an orchestrator, composing hooks and components without owning complex logic itself.

This structure keeps each piece independently readable and testable, and made it easy to extend the app with new features (like the shiny toggle) without bloating a single file.

---

## 📂 Project Structure

The file organization follows standard separation of concerns practices:

````text
pokedex/
├── public/                    # Global static files
└── src/
    ├── assets/
    │   ├── logoPokedex.svg    # Main Pokédex illustration
    │   ├── shinyIcon.svg      # Shiny toggle icon
    │   ├── types/             # Type icon SVGs (fire, water, grass, etc.)
    │   └── backgrounds/       # Type-based background scenes
    ├── components/            # Reusable, presentational UI components
    │   ├── TypeBadges.tsx
    │   ├── PokedexBackground.tsx
    │   ├── PokemonName.tsx
    │   ├── ShinyToggle.tsx
    │   └── SearchSuggestions.tsx
    ├── hooks/                 # Custom hooks for state and business logic
    │   ├── usePokemon.ts      # Fetching, navigation, current Pokémon state
    │   ├── useShiny.ts        # Shiny display state and auto-reset
    │   └── useAutocomplete.ts # Full name list and live search filtering
    ├── services/
    │   └── pokeApi.ts         # PokéAPI request and search handling functions
    ├── utils/
    │   ├── typeIcons.ts       # Type → icon/color mapping
    │   └── typeBackgrounds.ts # Type → background scene mapping
    ├── App.tsx                # Main component, orchestrates hooks and layout
    ├── index.css               # Global style configurations and Tailwind setup
    └── main.tsx                # React entry point and DOM tree rendering
````

---

## 🛠️ How to Run the Project Locally

Follow the steps below to run the application on your machine:

1. **Clone the repository:**

````bash
git clone https://github.com/Davy-Alves/pokedex-react.git
````

2. **Access the project directory:**

````bash
cd pokedex-react
````

3. **Install the necessary dependencies:**

````bash
npm install
````

4. **Start the development server:**

````bash
npm run dev
````

5. **Access it in your browser:**
   Open the local address indicated in your terminal (usually `http://localhost:5173`).

---

## 🗺️ Roadmap & Next Steps

This project is continuously evolving. Here is the planned roadmap:

- **[x] Phase 1:** Front-end Architecture Refactoring (Custom Hooks & Componentization)
- **[ ] Phase 2:** Node.js Express Server Setup
- **[ ] Phase 3:** Database Integration (SQLite + Prisma ORM)
- **[ ] Phase 4:** Fullstack Integration (Capture button & User metrics dashboard)
- **[ ] Phase 5:** Classic Generation toggles

## 📄 License

This project is licensed under the MIT License. Feel free to use, study, and modify the code.