import React from 'react'

const StandardModal = ({title, handleClick, customClass, cartItem}) => {
    return (
        <div>
            <div className="custom-modal modal fade" id="standardmodal" tabIndex="-1" aria-labelledby="standardmodal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content text-center">
                    <div className={`modal-header ${customClass}`}>
                        <h5 className= "modal-title" id="standardmodal">{title}</h5>
                        <button type="button" className="btn-close modal-no-outline" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Do you want to delete this item from your cart?
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary modal-no-outline" data-bs-dismiss="modal">Close</button>  
                        <button onClick = {() => {handleClick(cartItem._id, cartItem.quantity)}} type="button" className="modal-no-outline btn custom-button outline-primary2-button" data-bs-dismiss="modal">Yes</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StandardModal
