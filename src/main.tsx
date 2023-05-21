import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.module.scss";
import SettingsManager from "./managers/SettingsManager";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import English from "./lang/en";
import Slovenian from "./lang/sl";

SettingsManager.load();

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: English },
        sl: { translation: Slovenian },
    },
    lng: SettingsManager.get<string>("language"),
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
);
