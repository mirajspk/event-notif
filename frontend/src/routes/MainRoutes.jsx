// src/routes/MainRoutes.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import EventsPage from "@/components/Rendering/EventPage";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/events" element={<EventsPage />} />
    </Routes>
  );
}

export default MainRoutes;
