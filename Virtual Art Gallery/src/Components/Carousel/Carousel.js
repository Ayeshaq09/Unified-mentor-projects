import { useRef, useState } from "react";
import Modal from "../Modal/Modal";
import { Paintings } from "../../Data/Indian_Paintings";
import { Tooltip } from "react-tooltip";
import "./Carousel.css";

const Carousel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState({});
  const audioRef = useRef();

  // open the modal and play the sound effect
  const handleClick = (item) => {
    setIsOpen(true);
    setItem(item);
    audioRef.current.play();
  };

  return (
    <>
      {/* sound for opening the modal */}
      <audio
        ref={audioRef}
        type="mp3"
        src="/Music/card-flip-sound.mp3"
        controls={false}
        hidden
      ></audio>

      {/* modal to view image details */}
      {isOpen && <Modal item={item} setIsOpen={setIsOpen} isOpen={isOpen} />}

      <div className="banner">
        <div className="carousel" style={{ "--quantity": Paintings.length }}>
          {Paintings.map((item, index) => {
            return (
              <div className="item" style={{ "--position": index }} key={index}>
                <a data-tooltip-id={item.name} data-tooltip-content={item.name}>
                  <img
                    src={item.path}
                    alt=""
                    onClick={() => handleClick(item)}
                  />
                </a>

                {/* tooltip to display image name */}
                <Tooltip id={item.name} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Carousel;
