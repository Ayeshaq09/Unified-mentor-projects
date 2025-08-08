import { useState } from "react";
import { PagesData } from "../../data/PagesData";
import "./Book.css";
import { Tooltip } from "react-tooltip";

const Book = () => {
  const [pageIndex, setPageIndex] = useState(0);

  // go to next page
  const nextPage = () => {
    if (pageIndex < PagesData.length - 1) {
      setPageIndex(pageIndex + 1);
    }
  };

  // go to previous page
  const prevPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  return (
    <>
      <div className="wrapper">
        {/* map all pages from PagesData */}
        {PagesData.map((page, index) => {
          return (
            <div
              key={index}
              className={`book-page ${index === pageIndex ? "active" : ""}`}
            >
              <div>{page}</div>
            </div>
          );
        })}
      </div>
      <div className="btn-container">
        {/* prev button */}
        <button
          onClick={prevPage}
          className={`flip-btn ${pageIndex === 0 ? "disabled" : ""}`}
          disabled={pageIndex === 0}
          data-tooltip-id="tooltip-prev"
          data-tooltip-content="Previous"
        >
          <box-icon name="chevron-left" className="icon"></box-icon>
        </button>
        <Tooltip id="tooltip-prev" />
        {/* profile button */}
        <button
          onClick={() => setPageIndex(1)}
          className={`flip-btn profile-btn ${
            pageIndex !== PagesData.length - 1 ? "disabled" : ""
          }`}
          disabled={pageIndex !== PagesData.length - 1}
        >
          <p>Profile</p>
          <box-icon name="user" className="icon"></box-icon>
        </button>
        {/* next button */}
        <button
          onClick={nextPage}
          className={`flip-btn ${
            pageIndex === PagesData.length - 1 ? "disabled" : ""
          }`}
          disabled={pageIndex === PagesData.length - 1}
          data-tooltip-id="tooltip-next"
          data-tooltip-content="Next"
        >
          <box-icon name="chevron-right" className="icon"></box-icon>
        </button>
        <Tooltip id="tooltip-next" />
      </div>
    </>
  );
};

export default Book;
