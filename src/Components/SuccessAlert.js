import React from "react";
import "./SuccessAlert.css";
import images from "../images/images";

function SuccessAlert(props) {
  const { visible } = props;

  return (
    <div
      className={`success-alert ${visible ? "visible" : ""}`}
    >
     <img className="check" src={images.checked} />
     <div style={{marginTop:20,fontWeight:600,fontSize:18}}>Added to WatchList</div>
    </div>
  );
}

export default SuccessAlert;
