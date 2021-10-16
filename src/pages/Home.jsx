import React from "react";
import Content from "../components/Content";
import InterViewPrep from "../components/InterViewPrep";

const Home = () => {
  return (
    <main role="main">
      <Content />
      <div className="container">
        <InterViewPrep />
      </div>
    </main>
  );
};

export default Home;
