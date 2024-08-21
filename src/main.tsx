
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./Providers/UserContext.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
const querClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={querClient}>
      <UserProvider>
        <App />
      </UserProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
