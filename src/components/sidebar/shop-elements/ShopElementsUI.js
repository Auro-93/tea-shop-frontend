import React from "react";
import Alert from "../../../helpers/alert/Alert";
import { removePunctuation } from "../../../helpers/regex/Regex";

const ShopElementsUI = ({
  categories,
  settingCategoriesFilter,
  handleSidebarClosure,
}) => {
  const { notEmptyCat, errorMessage } = categories;

  const [categoriesFilter, setCategoriesFilter] = settingCategoriesFilter;

  const showCategoryList = (categories) => {
    let catList = [];
    for (let category of categories) {
      catList.push(
        <div key={category._id}>
          {category.children.length < 1 ? (
            <div className="accordion-item accordion-item-custom">
              <h2 className="accordion-header accordion-header-custom collapsed">
                <button
                  id={category._id}
                  className="accordion-button accordion-button-no-items collapsed nav-item sidebar-item"
                  type="button"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  onClick={() => {
                    setCategoriesFilter(category.name);
                    handleSidebarClosure();
                  }}
                >
                  {category.name}
                </button>
              </h2>
            </div>
          ) : (
            <div className="accordion-item accordion-item-custom">
              <h2
                className="accordion-header accordion-header-custom collapsed"
                id={"heading" + removePunctuation(category.slug)}
              >
                <button
                  className="accordion-button accordion-button-items collapsed nav-item sidebar-item"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#" + removePunctuation(category.slug)}
                  aria-expanded="false"
                  aria-controls={removePunctuation(category.slug)}
                >
                  <div
                    onClick={() => {
                      setCategoriesFilter(category.name);
                      handleSidebarClosure();
                    }}
                  >
                    {category.name}
                  </div>
                </button>
              </h2>
              <div
                id={removePunctuation(category.slug)}
                className="accordion-collapse collapse "
                aria-labelledby={"heading" + removePunctuation(category.slug)}
                data-bs-parent="#sidebarAccordion"
              >
                <ul className="accordion-body pb-4">
                  {category.children.map((el) => (
                    <li
                      key={el._id}
                      id={el._id}
                      onClick={() => {
                        setCategoriesFilter(el.name);
                        handleSidebarClosure();
                      }}
                    >
                      <i className="fab fa-pagelines p-2 leaf-sidebar"></i>

                      {el.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      );
    }
    return catList;
  };

  return (
    <>
      <div className="accordion sidebar-menu" id="sidebarAccordion">
        {errorMessage && (
          <Alert alertType="alert-danger" message={errorMessage} />
        )}
        {showCategoryList(notEmptyCat)}
      </div>
    </>
  );
};

export default ShopElementsUI;
