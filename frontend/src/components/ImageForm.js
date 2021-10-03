import React, { useEffect, useState } from "react";

import { uploadAction } from "./uploadAction";

const ImageForm = ({ handleNewImage }) => {
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(false);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
    setPreview(true);
  };
  const clearImage = () => {
    setPreview(false);
    setImage("");
  };
  const handleSubmit = () => {
    uploadAction(image);
    setPreview(false);
    setImage(false);
    handleNewImage();
  };
  return (
    <div>
      {preview ? (
        <>
          <button style={{
                        width: "25px",
                        height: "fit-content",
                        
                      }} onClick={clearImage}>x</button>
          <h5>Image preview</h5>
          <img src={URL.createObjectURL(image)} alt="preview of upload" width="250" height="300" />
          <button style={{
                        width: "fit-content",
                        height: "auto",
                        marginLeft: "1em",
                      }} onClick={handleSubmit}>Upload !</button>
        </>
      ) : (
        <>
          <input
            type="file"
            onChange={handleImageUpload}
            accept="png jpg jpeg"
          />
        </>
      )}
    </div>
  );
};

export default ImageForm