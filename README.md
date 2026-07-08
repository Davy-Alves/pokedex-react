# 📱 Pokédex Application

An interactive and responsive web application that replicates the functionality of a Pokédex, allowing users to search for Pokémon in detail by name or ID number. The project consumes real-time data from the public PokéAPI, featuring classic animations and dynamic loading states.

Built as part of my personal portfolio to demonstrate modern front-end development practices, efficient componentization, and utility-first styling.

---

## 🚀 Technologies Used

The project was developed using a modern JavaScript/TypeScript ecosystem:

- **[React](https://react.dev/):** Library for building component-based user interfaces and managing state (`useState`, `useEffect`).
- **[TypeScript](https://www.typescriptlang.org/):** Static typing to ensure greater predictability, safety, and auto-completion during development.
- **[Vite](https://vite.dev/):** Extremely fast build tool for the front-end ecosystem.
- **[Tailwind CSS](https://tailwindcss.com/):** Utility-first CSS framework for rapid, responsive styling focused on visual performance.
- **[PokéAPI](https://pokeapi.co/):** RESTful API used to consume up-to-date data from the Pokémon universe.

---

## ⚙️ Core Features

- **Flexible Search:** Direct search for any Pokémon using its name or Pokédex number.
- **Sequential Navigation:** Pagination buttons (`Prev` and `Next`) to smoothly advance or go back through the registry numbers.
- **Dynamic Visualization:** Display of animated sprites (classic Generation V: Black & White style) seamlessly integrated into the layout.
- **State Handling:**
  - Visual feedback display during data fetching (`Loading...`).
  - Graceful error handling when a searched term is not found (`Not found :(`).
- **Responsive Design:** Interface optimized via Tailwind using dynamic values (`clamp`) to adjust perfectly across different screen sizes.

---

## 📂 Project Structure

The file organization follows standard separation of concerns practices:

````text
pokedex/
├── public/                 # Global static files
└── src/
    ├── assets/             # Local images, logos, and vectors (e.g., logoPokedex.svg)
    ├── services/           # Communication layer with external APIs (fetch/axios)
    │   └── pokeApi.ts      # PokéAPI request and search handling function
    ├── App.tsx             # Main component, state control, and layout
    ├── index.css           # Global style configurations and Tailwind setup
    └── main.tsx            # React entry point and DOM tree rendering
````

---

## 🛠️ How to Run the Project Locally

Follow the steps below to run the application on your machine:

1. **Clone the repository:**

```bash
git clone https://github.com/Davy-Alves/pokedex-react.git
```

2. **Access the project directory:**

```bash
cd pokedex-react
```

3. **Install the necessary dependencies:**

```bash
npm install
```

4. **Start the development server:**

```bash
npm run dev
```

5. **Access it in your browser:**
   Open the local address indicated in your terminal (usually `http://localhost:5173`).

---

## 📄 License

This project is licensed under the MIT License. Feel free to use, study, and modify the code.
