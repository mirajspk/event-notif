import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchFilters from "./SearchFilters";
import EventList from "./EventList";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    timeFilter: "7days",
    isOnline: true,
    isFreeEntry: true,
    selectedClub: "",
    searchTerm: "",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/events");
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    if (filters.searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.selectedClub) {
      filtered = filtered.filter(event => event.club === filters.selectedClub);
    }

    if (filters.isOnline) {
      filtered = filtered.filter(event => event.isOnline);
    }

    if (filters.isFreeEntry) {
      filtered = filtered.filter(event => event.isFreeEntry);
    }

    if (filters.timeFilter === "7days") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      filtered = filtered.filter(event => new Date(event.date) >= sevenDaysAgo);
    } else if (filters.timeFilter === "30days") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filtered = filtered.filter(event => new Date(event.date) >= thirtyDaysAgo);
    }

    setFilteredEvents(filtered);
  }, [events, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <SearchFilters onFilterChange={handleFilterChange} />
      <EventList events={filteredEvents} />
    </div>
  );
};

export default EventPage;
