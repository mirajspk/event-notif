

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventsPage from "./components/Rendering/EventPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/events" element={<EventsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
