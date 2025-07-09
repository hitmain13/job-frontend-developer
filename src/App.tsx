import "./global.css";

import { createRoot } from "react-dom/client";
import { AppRoutes } from "./routes/app";

export const App = () => <AppRoutes />;

createRoot(document.getElementById("root")!).render(<App />);
