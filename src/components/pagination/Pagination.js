import React from "react";
import "./style.css";

const Pagination = ({ page, pages, changePage, style }) => {
  let middlePagination;

  if (pages <= 5) {
    middlePagination = [...Array(pages)].map((_, index) => (
      <button
        key={index + 1}
        onClick={() => changePage(index + 1)}
        disabled={page === index + 1}
        className="custom-button standard-secondary-button"
      >
        {index + 1}
      </button>
    ));
  } else {
    const startValue = Math.floor((page - 1) / 5) * 5;
    middlePagination = (
      <>
        {[...Array(5)].map((_, index) => (
          <button
            key={startValue + index + 1}
            disabled={page === startValue + index + 1}
            onClick={() => changePage(startValue + index + 1)}
            className="custom-button standard-secondary-button"
          >
            {startValue + index + 1}
          </button>
        ))}
        <button className="custom-button standard-secondary-button">...</button>
        <button
          className="custom-button standard-secondary-button"
          onClick={() => changePage(pages)}
        >
          {pages}
        </button>
      </>
    );

    if (page > 5) {
      if (pages - page >= 5) {
        middlePagination = (
          <>
            <button
              className="custom-button standard-secondary-button"
              onClick={() => changePage(1)}
            >
              1
            </button>
            <button className="custom-button standard-secondary-button">
              ...
            </button>
            <button
              className="custom-button standard-secondary-button"
              onClick={() => changePage(startValue)}
            >
              {startValue}
            </button>
            {[...Array(5)].map((_, index) => (
              <button
                key={startValue + index + 1}
                disabled={page === startValue + index + 1}
                onClick={() => changePage(startValue + index + 1)}
                className="custom-button standard-secondary-button"
              >
                {startValue + index + 1}
              </button>
            ))}
            <button className="custom-button standard-secondary-button">
              ...
            </button>
            <button
              className="custom-button standard-secondary-button"
              onClick={() => changePage(pages)}
            >
              {pages}
            </button>
          </>
        );
      } else {
        let amountLeft = pages - page + 5;
        middlePagination = (
          <>
            <button
              className="custom-button standard-secondary-button"
              onClick={() => changePage(1)}
            >
              1
            </button>
            <button className="custom-button standard-secondary-button">
              ...
            </button>
            <button
              className="custom-button standard-secondary-button"
              onClick={() => changePage(startValue)}
            >
              {startValue}
            </button>
            {[...Array(amountLeft)].map((_, index) => (
              <button
                className="custom-button standard-secondary-button"
                key={startValue + index + 1}
                style={
                  pages < startValue + index + 1 ? { display: "none" } : null
                }
                disabled={page === startValue + index + 1}
                onClick={() => changePage(startValue + index + 1)}
              >
                {startValue + index + 1}
              </button>
            ))}
          </>
        );
      }
    }
  }

  return (
    pages > 1 && (
      <div className="pagination" style={style}>
        <button
          onClick={() => changePage((page) => page - 1)}
          className="pagination-prev custom-button standard-secondary-button"
          disabled={page === 1}
        >
          &#171;
        </button>
        {middlePagination}
        <button
          onClick={() => changePage((page) => page + 1)}
          className="pagination-next  custom-button standard-secondary-button"
          disabled={page === pages}
        >
          &#187;
        </button>
      </div>
    )
  );
};

export default Pagination;
