import { PaypalPayment } from "../..";

const PaypalModal = ({ customClass, totalPrice, manageAddOrder }) => {
  return (
    <div>
      <div
        className="custom-modal modal fade"
        id="paypalmodal"
        tabIndex="-1"
        aria-labelledby="paypalmodal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-center">
            <div className={`modal-header ${customClass}`}>
              <h5 className="modal-title" id="paypalmodal">
                Paypal Payment (Tea Store)
              </h5>
              <button
                type="button"
                className="btn-close modal-no-outline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <PaypalPayment
                manageAddOrder={manageAddOrder}
                totalPrice={totalPrice}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary modal-no-outline"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaypalModal;
