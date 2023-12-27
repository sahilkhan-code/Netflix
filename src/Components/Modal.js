import React, { useState } from "react";
import { BarLoader } from "react-spinners";
import "./Modal.css"

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  margin: 0,
};

export default function Modal(props) {
  const { isLoading } = props;

  return (
    <div className="modalContainer">
      <BarLoader
        color={"red"}
        loading={isLoading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        width={"100%"}
      />
    </div>
  );
}
