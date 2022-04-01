import React, { useEffect } from "react";
import InfoPage from "../../pages/info";

const GridItemsList = ({ items, isLoading, descriptionNotFound, Element }) => {
  return (
    <>
      {items && items.length > 0 ? (
        items.map((item, i) => <Element key={item.id ? item.id : i} data={item} />)
      ) : !isLoading && descriptionNotFound ? (
        <InfoPage>
          <h1>{descriptionNotFound}</h1>
        </InfoPage>
      ) : null}
    </>
  );
};

export default GridItemsList;
