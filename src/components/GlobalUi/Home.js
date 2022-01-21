import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductCard from "./Card/ProductCard";

const Home = () => {
  document.title = "AppStrom - Sign Up";
  return (
    <div>
      Home
      <ProductCard />
    </div>
  );
};

export default Home;
