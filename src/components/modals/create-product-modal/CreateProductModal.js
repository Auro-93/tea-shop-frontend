import React, { useState, useEffect } from "react";
import CreateProductModalUI from "./CreateProductModalUI";
import { postProduct, editProduct } from "../../../api/product.js";

const CreateProductModal = ({
  categories,
  selectedProdEditModal,
  id,
  originalImg,
}) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [productErrorMessage, setProductErrorMessage] = useState("");
  const [productSuccessMessage, setProductSuccessMessage] = useState("");
  const [productLoading, setProductLoading] = useState(false);

  useEffect(() => {
    if (selectedProdEditModal.prod && selectedProdEditModal.edit) {
      setName(selectedProdEditModal.prod.name);
      setQuantity(selectedProdEditModal.prod.quantity);
      setPrice(selectedProdEditModal.prod.price);
      setDiscount(selectedProdEditModal.prod.discount);
      setDescription(selectedProdEditModal.prod.description);
    }
  }, [selectedProdEditModal]);

  const setChangeData = [
    setName,
    setQuantity,
    setPrice,
    setDiscount,
    setDescription,
    setImage,
    setCategory,
  ];
  const changeData = [
    name,
    quantity,
    price,
    discount,
    description,
    image,
    category,
    productErrorMessage,
    productSuccessMessage,
    productLoading,
  ];

  const data = new FormData();
  id && data.append("id", id);
  originalImg && data.append("originalImg", originalImg);
  data.append("name", name);
  data.append("quantity", quantity);
  data.append("price", price);
  data.append("discount", discount);
  data.append("description", description);
  data.append("image", image);

  data.append("category", JSON.stringify(category));

  const resetForm = () => {
    const form = document.querySelector("#productForm");
    form.reset();
  };

  const resetStateOnModalClose = () => {
    setProductErrorMessage("");
    setProductLoading(false);
    resetForm();
    setName("");
    setQuantity("");
    setPrice("");
    setDescription("");
    setDiscount("");
    setProductSuccessMessage("");
    setImage("");
    setCategory("");

    resetForm();
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setCategory([
        ...category,
        {
          _id: e.target.id,
          name: e.target.getAttribute("data-name"),
          slug: e.target.getAttribute("data-slug"),
        },
      ]);
    } else {
      if (Array.isArray(category)) {
        setCategory(category.filter((el) => el._id !== e.target.id));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let modalContainer = document.querySelector("#createProductModal");

    if (
      !name ||
      !quantity ||
      !price ||
      !description ||
      !image ||
      category.length < 1
    ) {
      setProductSuccessMessage("");
      setProductErrorMessage(
        'Fill in all required fields ( only "discount" is optional).'
      );
    } else if (
      image.type != "image/jpeg" &&
      image.type != "image/png" &&
      image.type != "image/jpg"
    ) {
      setProductSuccessMessage("");
      setProductErrorMessage("Only JPEG and PNG files are allowed");
    } else {
      setProductLoading(true);

      if (!selectedProdEditModal.edit) {
        postProduct(data)
          .then((response) => {
            modalContainer.scrollTo(0, 0);
            setProductLoading(false);
            setProductSuccessMessage("");
            setProductErrorMessage("");
            setProductSuccessMessage(response.data.successMessage);

            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })
          .catch((error) => {
            modalContainer.scrollTo(0, 0);
            setProductLoading(false);
            setProductSuccessMessage("");
            if (error.response.status === 409) {
              setProductErrorMessage(error.response.data.errorMessage);
            } else if (error.response.status === 422) {
              setProductErrorMessage(error.response.data.errorMessage);
            } else {
              setProductErrorMessage(error.toString());
            }
          });
      } else {
        editProduct(data)
          .then((response) => {
            modalContainer.scrollTo(0, 0);
            setProductErrorMessage("");
            setProductLoading(false);
            setProductSuccessMessage(response.data.successMessage);

            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })
          .catch((error) => {
            modalContainer.scrollTo(0, 0);
            setProductLoading(false);
            setProductSuccessMessage("");
            if (error.response.status === 409) {
              setProductErrorMessage(error.response.data.errorMessage);
            } else if (error.response.status === 422) {
              setProductErrorMessage(error.response.data.errorMessage);
            } else {
              setProductErrorMessage(error.toString());
            }
          });
      }
    }
  };

  return (
    <CreateProductModalUI
      categories={categories}
      changeData={changeData}
      setChangeData={setChangeData}
      handleCheckboxChange={handleCheckboxChange}
      handleSubmit={handleSubmit}
      resetStateOnModalClose={resetStateOnModalClose}
      selectedProdEditModal={selectedProdEditModal}
    />
  );
};

export default CreateProductModal;
