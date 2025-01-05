import React, { useEffect, useState } from "react";
import axios from "axios";

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the API
    axios
      .get("http://127.0.0.1:8000/api/events-list/") // Replace with your backend URL
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  return (
    <div>
      <h1>All Events and Workshops</h1>
      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h2>{event.name}</h2>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Date:</strong> {event.date}
              </p>
              <p>
                <strong>Host:</strong> {event.host}
              </p>
              <p>
                <strong>Type:</strong> {event.type}
              </p>
              {event.image && (
                <img
                  src={event.image}
                  alt={event.name}
                  style={{ maxWidth: "300px" }}
                />
              )}
              <p>
                <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
                  Register Here
                </a>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventsPage;
