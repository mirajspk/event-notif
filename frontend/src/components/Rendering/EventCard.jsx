// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import "./EventCard.css"; // Optional: Add CSS for styling

function EventCard({ event }) {
  return (
    <div className="event-card">
      <h2 className="event-title">{event.title}</h2>
      <p className="event-type">
        <strong>Type:</strong> {event.type}
      </p>
      <p className="event-club">
        <strong>Club:</strong> {event.club}
      </p>
      <p className="event-description">{event.description}</p>
      <p className="event-date-time">
        <strong>Date:</strong> {event.date} | <strong>Time:</strong> {event.time}
      </p>
    </div>
  );
}

// Define prop types for the EventCard component
EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    club: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
