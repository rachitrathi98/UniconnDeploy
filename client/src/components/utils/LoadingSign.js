import React from "react";
import uniconn from "../../assets/images/finImage.svg";
const Loading = () => {
  return (
    <main id="updatedloading" style={{ zIndex: "20" }}>
      <div id="spin"></div>
      <img id="imgStyle" src={uniconn} alt={"loading"} />
    </main>
  );
};
export default Loading;
