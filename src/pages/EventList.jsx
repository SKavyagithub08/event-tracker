import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function EventList() {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents(storedEvents);
  }, []);

  const handleDelete = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-2">Date: {event.date}</p>
            <p className="text-gray-600 mb-2">Time: {event.time}</p>
            <p className="text-gray-600 mb-2">Venue: {event.venue}</p>
            <p className="text-gray-600 mb-4">{event.description}</p>
            {event.eventLink && (
              <a
                href={event.eventLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mb-2"
              >
                Event Link
              </a>
            )}
            {user?.role === 'admin' && (
              <button
                onClick={() => handleDelete(event.id)}
                className="block w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 mt-2"
              >
                Delete Event
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;