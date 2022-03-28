import React from "react";
import ErrorPage from "../../pages/error";

const GridItemsList = ({ items, isLoading, descriptionNotFound, Element }) => {
  return (
    <>
      {items && items.length > 0 ? (
        items.map((item, i) => <Element key={item.id ? item.id : i} data={item} />)
      ) : !isLoading ? (
        <ErrorPage>
          <h1>{descriptionNotFound}</h1>
        </ErrorPage>
      ) : null}
    </>
  );
};

export default GridItemsList;
