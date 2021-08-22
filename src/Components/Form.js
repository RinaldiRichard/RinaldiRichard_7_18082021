import { useState } from "react";
import Item from "./Item";
import { v4 as uuidv4 } from "uuid";

export default function Form() {
  const [dataArr, setDataArr] = useState([]);

  const [stateInput, setStateInput] = useState("");

  const deleteElement = (id) => {
    const filterState = dataArr.filter((item) => {
      return item.id !== id;
    });
    setDataArr(filterState);
  };
  const addComment = (e) => {
    e.preventDefault();
    const newArr = [...dataArr];

    const newComment = {};
    newComment.texte = stateInput;
    newComment.id = uuidv4();

    newArr.push(newComment);
    setDataArr(newArr);

    setStateInput('');
  };

  const linkedInput = (e) => {
    setStateInput(e);
  };

  return (
    <div className="m-auto px-4 col-12 col-sm-10 col-lg-6">
      <form onSubmit={addComment} className="mb-3">
        <label htmlFor="comment" className="form-label mt-3">
          Comments
        </label>
        <input
          value={stateInput}
          onInput={(e) => linkedInput(e.target.value)}
          type="text"
          className="form-control"
          id="todo"
        />
        <button className="mt-2 btn btn-primary d-block">Envoyer</button>
      </form>

    
      <ul className="list-group">
        {dataArr.map((item) => {
          return (
            <Item
              txt={item.texte}
              key={item.id}
              id={item.id}
              delFunc={deleteElement}
            />
          );
        })}
      </ul>
    </div>
  );
}
