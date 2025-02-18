import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootNode: HTMLElement | null = document.getElementById("root");

rootNode &&
  createRoot(rootNode).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
