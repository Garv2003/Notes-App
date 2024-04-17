import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "./context/auth.tsx";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
      <Toaster />
      <AuthProvider>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </AuthProvider>
    </BrowserRouter>
  </ClerkProvider>
);
