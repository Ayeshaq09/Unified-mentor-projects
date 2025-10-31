import "./Modal.css";

const ZoomImageModal = (props) => {
  const { image, setZoomModalOpen } = props;

  // close the modal
  const handleClick = () => {
    setZoomModalOpen(false);
  };

  return (
    <div className="zoom-modal-container">
      <div className="zoom-modal-content" onClick={handleClick}>
        <img src={image} alt="" className="zoomed-img"/>
      </div>
    </div>
  );
};

export default ZoomImageModal;
