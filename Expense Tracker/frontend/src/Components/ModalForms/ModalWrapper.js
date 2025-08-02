import AddModal from "./AddModal";
import "./ModalWrapper.css";

const ModalWrapper = (props) => {
  const { setIsModalOpen, title, budgetItem } = props;
  return (
    <div className="modal-container">
      <AddModal
        setIsModalOpen={setIsModalOpen}
        title={title}
        budgetItem={budgetItem}
      />
    </div>
  );
};

export default ModalWrapper;
