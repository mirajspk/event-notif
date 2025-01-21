// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import "./EventCard.css";

function EventCard({ event }) {
  return (
    <div className="event-card">
      <div className="event-header">
        {/* Name of the Event (Large, Bold, and Prominent) */}
        <h2 className="event-title">{event.name}</h2>
        {/* Event Type (workshop or event) */}
        <span className={`event-type ${event.type.toLowerCase()}`}>
          {event.type}
        </span>
      </div>
      <div className="event-details">
        {/* Display other event details */}
        <p>
          <strong>Date:</strong> {event.date}
        </p>
        <p>
          <strong>Time:</strong> {event.time || "TBD"}
        </p>
        <p>
          <strong>Location:</strong> {event.location || "To be announced"}
        </p>
        <p>
          <strong>Host:</strong> {event.host || "Unknown"}
        </p>
        <p>
          <strong>Description:</strong> {event.description || "No description provided"}
        </p>
      </div>
      <div className="event-footer">
        {/* Check if registration link is provided */}
        {event.registration_link ? (
          <a
            href={event.registration_link}
            target="_blank"
            rel="noopener noreferrer"
            className="register-button"
          >
            Register Now
          </a>
        ) : (
          <span className="no-registration">No registration required</span>
        )}
      </div>
    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string.isRequired, // Event name now instead of title
    type: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string,
    location: PropTypes.string,
    host: PropTypes.string,
    description: PropTypes.string,
    registration_link: PropTypes.string,
  }).isRequired,
};

export default EventCard;

