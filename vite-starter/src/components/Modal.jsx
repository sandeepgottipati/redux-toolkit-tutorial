import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { closeModal } from "../features/modal/modalSlice";

const Modal = () => {
  const dispatch = useDispatch();
  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>Remove all items from your shopping Cart?</h4>
        <button
          className="btn confirm-btn"
          style={{ marginRight: "10px" }}
          onClick={() => {
            dispatch(clearCart());
            dispatch(closeModal());
          }}
        >
          confirm
        </button>
        <button
          className="btn clear-btn"
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          Cancel
        </button>
      </div>
    </aside>
  );
};
export default Modal;
