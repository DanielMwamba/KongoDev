import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import "./pages/css/blogStyle.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { store, persistedStore } from "./redux/store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <SpeedInsights framework="react" />
        <React.StrictMode>
          <main className="">
            <App />
          </main>
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </ThemeProvider>
);
