import React, { useState } from "react";
import CreateCategoryModalUI from "./CreateCategoryModalUI";
import { postCategory } from "../../../api/category";

const CreateCategoryModal = ({ categories }) => {
  const [createCategoryData, setCreateCategoryData] = useState({
    name: "",
    parentId: "",
    errorMessage: "",
    successMessage: "",
    loading: false,
  });

  const { name, parentId, successMessage, errorMessage, loading } =
    createCategoryData;

  const handleChange = (e) => {
    if (e.target.type == "text") {
      setCreateCategoryData({
        ...createCategoryData,
        name: e.target.value,
        successMessage: "",
        errorMessage: "",
      });
    } else {
      setCreateCategoryData({
        ...createCategoryData,
        parentId: e.target.value,
        errorMessage: "",
        successMessage: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setCreateCategoryData({
        ...createCategoryData,
        errorMessage: "Category name field is required.",
      });
    } else {
      const data = { name, parentId };
      console.log(data);
      setCreateCategoryData({
        ...createCategoryData,
        loading: true,
      });

      postCategory(data)
        .then((response) => {
          setCreateCategoryData({
            name: "",
            parentId: "",
            errorMessage: "",
            successMessage: response.data.successMessage,
            loading: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          if (error.response.status === 409) {
            setCreateCategoryData({
              ...createCategoryData,
              errorMessage: "Category already exists",
              loading: false,
            });
          } else {
            setCreateCategoryData({
              ...createCategoryData,
              errorMessage: error.toString(),
              loading: false,
            });
          }
        });
    }
  };

  return (
    <CreateCategoryModalUI
      createCategoryData={createCategoryData}
      categories={categories}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateCategoryModal;
