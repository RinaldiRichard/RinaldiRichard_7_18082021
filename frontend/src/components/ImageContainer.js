import React, { useEffect, useState } from "react";
import axios from "axios";


const ImageContainer = ({ newImage }) => {
  const [images, setImages] = useState([]);
  const [fallback, setFallback] = useState("");
  const getImages = async () => {
    try {
      const res = await axios.get ("http://localhost:3001/images");
      if (!res.data.files) {
        setFallback(res.data.msg);
        return;
      } else {
        setImages(res.data.files);
      }
    } catch (err) {
      console.log(err.messages);
    }
  };
  useEffect(() => {
    getImages();
  }, [newImage]);
  
  const configureImage = (image) => {
    return "http://localhost:3001/" + image;
  };
  console.log(images);
  
  return (
      <div>
          {images.length > 0 ?
          (
              images.map(image => (
                  <img src={configureImage(image)} key={image} alt={image} width="200" height="200" className="image"/>
              ))
          ) 
          :
          <>
          <h1>
              {fallback}
          </h1>
          <hr/>
          <h3>Cliquez pour uploader une image</h3>
          </>
          
          }
      </div>
  )
};

export default ImageContainer


    