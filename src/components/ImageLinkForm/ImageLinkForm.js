import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
  return (
    <div>
      <p className="f3">
        {"This Magic Brain will detect faces in your pictures, give it a try"}
      </p>
      <div className="flexCenter">
        <div className="form pa4 br3 shadow-5 ui action input fluid">
          <input
            type="text"
            placeholder="Paste URL here"
            onChange={onInputChange}
          />
          <button className="w-30 ui red button" onClick={onPictureSubmit}>
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
