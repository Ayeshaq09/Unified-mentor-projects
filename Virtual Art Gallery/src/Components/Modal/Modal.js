import { useRef, useState } from "react";
import "./Modal.css";
import ZoomImageModal from "./ZoomImageModal";

const Modal = (props) => {
  const { item, setIsOpen } = props;
  const [isClosing, setIsClosing] = useState(false);
  const [zoomModalOpen, setZoomModalOpen] = useState(false);
  const [image, setImage] = useState("");
  const audioRef = useRef();

  // close the modal and add sound effect on closing, setTimeout for the animation to have enough time to run.
  const handleClick = () => {
    setIsClosing(true);
    audioRef.current.play();
    setTimeout(() => {
      setIsClosing(false);
      setIsOpen(false);
    }, 500);
  };

  // Open the zoomed image in zoom-modal
  const handleImgClick = (img) => {
    setZoomModalOpen(true);
    setImage(img);
  };
  return (
    <>
    {/* aound effect for closing the modal*/}
      <audio
        ref={audioRef}
        type="mp3"
        src="/Music/card-flip-sound.mp3"
        controls={false}
        hidden
      ></audio>
      {/* zoom modal to show the zoomed image */}
      {zoomModalOpen && (
        <ZoomImageModal image={image} setZoomModalOpen={setZoomModalOpen} />
      )}
      <div className="modal-container">
        <div className={`modal-content ${isClosing ? "close-animation" : ""}`}>
          <div className="header">
            <h3 className="image-name">{item.name}</h3>
            <span onClick={handleClick}>&times;</span>
          </div>
          <img
            src={item.path}
            alt=""
            className="modal-img"
            onClick={() => handleImgClick(item.path)}
          />
          {/* description of the image opened */}
          {item.description &&
            item.description.map((point) => {
              return <p className="img-desc">{point}</p>;
            })}
        </div>
      </div>
    </>
  );
};

export default Modal;
