import { useRef, useState } from "react";
import "./Modal.css";
import Carousel from "../Carousel/Carousel";

const StartModal = () => {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const audioRef = useRef();
  const btnClickRef = useRef();

  // play the audio for button click and open the image carousal
  const handleClick = () => {
    setIsCarouselOpen(true);
    btnClickRef.current.play();
    audioRef.current.play();
  };

  return (
    <>
      {/* music for the gallery */}
      <audio
        ref={audioRef}
        type="m4a"
        src="/Music/Music.m4a"
        autoPlay
        loop
        controls={false}
        hidden
      ></audio>

      {/* sound effect for button click */}
      <audio
        ref={btnClickRef}
        type="wav"
        src="/Music/btn-click.wav"
        controls={false}
        hidden
      ></audio>

      {/* show image Carousel */}
      {isCarouselOpen && <Carousel />}

      {!isCarouselOpen &&<div className="modal-container">
        <button className="start-btn" onClick={handleClick}>
          View the Indian Art Gallery
        </button>
      </div>}
    </>
  );
};

export default StartModal;
