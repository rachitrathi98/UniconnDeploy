import React from "react";

const Pagination = (props) => {
  const results = props.results;
  const limit = props.limit;

  return (
    <div className="col-12 d-flex justify-content-center">
      <nav aria-label="...">
        <ul className="pagination">
          <li className={props.page > 1 ? "page-item " : "page-item disabled"}>
            <button
              className="page-link "
              onClick={() => props.onClick("prev")}
            >
              Prev
            </button>
          </li>
          <li
            className={results === limit ? "page-item " : "page-item disabled"}
          >
            <button className="page-link" onClick={() => props.onClick("next")}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
