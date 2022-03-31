import React from "react";
import InfoPage from "../../pages/info";

const BasePage = ({ isLoading, elements, ...props }) => {
  return (
    <>
      {
        isLoading ? (
            <InfoPage {...props}>
              <h1>Loading...</h1>
            </InfoPage>
          ) :
          (
            elements
          )
      }
    </>
  );
};

// export default BasePage;