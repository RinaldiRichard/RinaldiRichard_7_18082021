import { useState } from "react";
import Item from "./Item.js";
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
  const addTodo = (e) => {
    e.preventDefault();
    const newArr = [...dataArr];

    const newTodo = {};
    newTodo.texte = stateInput;
    newTodo.id = uuidv4();

    newArr.push(newTodo);
    setDataArr(newArr);
    setStateInput("");
  };

  const linkedInput = (e) => {
    setStateInput(e);
  };

  return (
    <div className=" px-4 col-12 col-sm-10 col-lg-6 w-100 mh-50">
      <form onSubmit={addTodo} className="mb-3">
        <label htmlFor="todo" className="form-label mt-3">
          Dites quelque chose : 
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
