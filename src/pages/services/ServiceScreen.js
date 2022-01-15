import React from "react";
import { useParams } from "react-router-dom";

const ServiceScreen = () => {
  const { slug } = useParams();
  return (
    <div>
      <h1>Service Screen {slug}</h1>
    </div>
  );
};

export default ServiceScreen;
