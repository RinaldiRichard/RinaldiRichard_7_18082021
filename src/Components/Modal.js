import React, { useState } from "react";
import "./Modal.css";
import Form from "../Components/Form";

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        {" "}
        Open
      </button>
      {modal && (
        <div className="overlay">
            <Form/>
          <div className="modal">
            <div className="modal-content">
              <h2>hello Modal</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
                esse odio possimus suscipit aspernatur atque ut, ex odit. Id
                molestiae rem vel aliquam rerum eos voluptatum, maxime in neque.
                Iusto quisquam ipsam quae qui quis recusandae explicabo quia
                vero delectus est itaque harum eius deleniti maiores, laudantium
                voluptatum ullam vel quidem adipisci?
              </p>
              <button onClick={toggleModal} className="close-modal">
                Close
              </button>
            </div>
          </div>
        </div>
        
      )}
    </>
    
  );
}
