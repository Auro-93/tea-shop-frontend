import React from "react";

const ItemQtInput = ({
  maxValue,
  inputClass,
  inputId,
  prodQuantity,
  setProdQuantity,
  stockItem,
  setErrorQt,
  cartItem,
}) => {
  const handleChange = (e) => {
    if (e.target.value > maxValue) {
      setProdQuantity(Number(maxValue));
      setErrorQt("");
    } else {
      if (e.target.value.toString().startsWith("0")) {
        setProdQuantity("");
      } else {
        setProdQuantity(Number(e.target.value));
        setErrorQt("");
      }
    }
  };

  const addProdQuantity = () => {
    let newProdQt;
    if (cartItem) {
      newProdQt =
        prodQuantity + 1 <= stockItem.quantity + cartItem.quantity
          ? prodQuantity + 1
          : stockItem.quantity + cartItem.quantity;
    } else {
      newProdQt =
        prodQuantity + 1 <= stockItem.quantity
          ? prodQuantity + 1
          : stockItem.quantity;
    }
    setProdQuantity(Number(newProdQt));
    setErrorQt("");
  };

  const subtractProdQuantity = () => {
    let newProdQt = prodQuantity - 1 > 0 ? prodQuantity - 1 : 1;
    setProdQuantity(Number(newProdQt));
    setErrorQt("");
  };

  return (
    <div className="d-flex">
      <input
        value={prodQuantity}
        onChange={handleChange}
        name="quantity"
        type="number"
        min={1}
        max={maxValue}
        className={inputClass}
        id={inputId}
      />

      <div className="arrows-container">
        <div className="d-flex justify-content-center align-items-center">
          <i
            onClick={addProdQuantity}
            className="fas fa-sort-up arrow-icon"
          ></i>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <i
            onClick={subtractProdQuantity}
            className="fas fa-sort-down arrow-icon"
          ></i>
        </div>
      </div>
    </div>
  );
};

export default ItemQtInput;
