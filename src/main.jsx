import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./style.css";

// Get app container
const appElement = document.querySelector("#app");

// Create root and render the React app
const root = createRoot(appElement);
root.render(<App />);
