import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "../store/index.ts";
import DemoContextProvider from "./context/demoContext.tsx";
import SocketContextProvider from "./context/socketContext.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../query/index.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SocketContextProvider>
        <Provider store={store}>
          <DemoContextProvider>
            <App />
          </DemoContextProvider>
        </Provider>
      </SocketContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
