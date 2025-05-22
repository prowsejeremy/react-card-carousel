import React from "react";
import { PaginationPropsInterface } from "../types.ts";

const Pagination = (props: PaginationPropsInterface) => {
  const { itemCount, currentIndex, goToCard } = props;

  const paginationItems = [];

  for (let index = 0; index <= itemCount; index++) {
    paginationItems.push(
      <button
        key={index}
        onClick={() => goToCard(index)}
        className={`cardCarousel-pagination-button ${currentIndex === index ? "active" : ""
          }`}
      />
    );
  }

  return <div className="cardCarousel-pagination">{paginationItems}</div>;
};

export default Pagination;
