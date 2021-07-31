import React from "react";
import useAuth from "../lib/auth";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="container">
      Hi {user?.name}
      <pre>{user ? JSON.stringify(user, undefined, 4) : null}</pre>
    </div>
  );
};

export default Dashboard;
