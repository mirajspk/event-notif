// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import axios from "axios";
import "./EventPage.css"

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(""); // For filtering by event type
  const [selectedHost, setSelectedHost] = useState(""); // For filtering by host

  // Fetch events from backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/Api/event-list/")
      .then((response) => {
        setEvents(response.data);
        setFilteredEvents(response.data); // Initialize filtered events
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  // Filter events based on selected filters
  useEffect(() => {
    let filtered = events;

    // Apply Event Type filter
    if (selectedType) {
      filtered = filtered.filter((event) => event.type.toLowerCase() === selectedType.toLowerCase());
    }

    // Apply Host filter
    if (selectedHost) {
      filtered = filtered.filter((event) => event.host.toLowerCase() === selectedHost.toLowerCase());
    }

    setFilteredEvents(filtered);
  }, [selectedType, selectedHost, events]);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleHostChange = (e) => {
    setSelectedHost(e.target.value);
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (events.length === 0) {
    return <div>No events available at the moment.</div>;
  }

  // Extract unique hosts for the Host filter dropdown
  const hosts = [...new Set(events.map((event) => event.host))];

  return (
    <div className="events-page">
      <h1>Upcoming Events & Workshops</h1>

      {/* Filters */}
      <div className="filters">
        <select value={selectedType} onChange={handleTypeChange} className="filter-dropdown">
          <option value="">All Types</option>
          <option value="Event">Event</option>
          <option value="Workshop">Workshop</option>
        </select>

        <select value={selectedHost} onChange={handleHostChange} className="filter-dropdown">
          <option value="">All Hosts</option>
          {hosts.map((host, index) => (
            <option key={index} value={host}>
              {host}
            </option>
          ))}
        </select>
      </div>

      {/* Event Cards */}
      <div className="events-grid">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default EventsPage;
