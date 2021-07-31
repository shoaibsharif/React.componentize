import React from "react";
import Content from "../components/Content";
import Jumbo from "../components/Jumbo";
import useAuth from "../lib/auth";

const Home = () => {
  const { user } = useAuth();
  console.log({ user });
  return (
    <main role="main">
      <Jumbo />
      <Content />
    </main>
  );
};

export default Home;
