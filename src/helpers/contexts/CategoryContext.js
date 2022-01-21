import { createContext, useState, useEffect } from "react";
import { fetchCategories, removeCategory } from "../../api/category";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState({
    cat: [],
    notEmptyCat: [],
    count: 0,
    errorMessage: "",
    successMessage: "",
    loading: false,
  });

  const fetchCat = () => {
    fetchCategories()
      .then((response) => {
        if (response.data.catList.length === 0) {
          setCategories({
            ...categories,
            errorMessage: "No categories found.",
          });
        } else {
          setCategories({
            cat: response.data.catList,
            notEmptyCat: response.data.notEmptyCatList,
            count: response.data.count,
            errorMessage: "",
          });
        }
      })
      .catch((error) => {
        setCategories({
          ...categories,
          errorMessage: error.toString(),
        });
      });
  };

  useEffect(() => {
    fetchCat();
  }, []);

  //DELETE CATEGORY

  const removingCategory = (id) => {
    setCategories({ ...categories, loading: true });
    let data = { categoryId: id };

    removeCategory(data)
      .then((response) => {
        setCategories({ ...categories, loading: false });
        window.scrollTo(0, 0);
        setCategories({
          ...categories,
          successMessage: response.data.successMessage,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        window.scrollTo(0, 0);
        setCategories({
          ...categories,
          errorMessage: error.toString(),
          loading: false,
        });
      });
  };

  return (
    <CategoryContext.Provider
      value={{
        categoryList: [categories, setCategories],
        removingCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
