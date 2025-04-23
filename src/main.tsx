import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PersonalInfoPage from "./steps/personal-info/page.tsx";
import React from "react";
import MainLayout from "./layouts/main-layout.tsx";
import ReviewPage from "./steps/review/page.tsx";
import PreferencesPage from "./steps/preferences/page.tsx";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode >
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/steps/personal-info" element={<PersonalInfoPage />} />
          <Route path="/steps/preferences" element={<PreferencesPage />} />
          <Route path="/steps/review" element={<ReviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
