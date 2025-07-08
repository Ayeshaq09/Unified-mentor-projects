import { useState } from "react";
import cylinderImage from "../Images/cylinder.jpeg";

const ImageCard = () => {
  return (
      <>
        <h2 className="main-heading">Book Gas Online</h2>
        <img src={cylinderImage} alt="animated cylinder icon" />
      </>
  );
};

export default ImageCard;