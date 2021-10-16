import React from "react";
import { Link } from "react-router-dom";

class Events extends React.Component {
  render() {
    return (
      <main className="container">
        <div className="mt-5 ml-auto">
          <Link
            to="/events/create"
            className="px-4 py-2 text-sm font-medium text-white transition bg-black bg-opacity-50 rounded-md hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Create an Event
          </Link>
        </div>
      </main>
    );
  }
}

export default Events;
