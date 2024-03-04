import React, { useState, useEffect } from "react";
import "./style.css";

const getLocalData = () => {
    const lists = localStorage.getItem("todolist")

    if(lists){
        return JSON.parse(lists)
    }
    else{
        return []
    }
}

export default function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("")
  const [toggleButton, setToggleButton] = useState(false)

  const addItem = () => {
    if (inputData === "") {
      alert("no todos to add");
    } 
    else if(inputData && toggleButton){
        setItems(
            items.map((currElem) => {
                if(currElem.id === isEditItem){
                    return{...currElem, name: inputData}
                }
                return currElem
            })
        )
        setInputData([])
        setIsEditItem(null)
        setToggleButton(false)
    }
    else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, newInputData]);
      setInputData("");
    }
  };

  const editItem = (i) => {
    const editedTodo = items.find((currElem) => {
        return currElem.id === i
    })
    setInputData(editedTodo.name)
    setIsEditItem(i)
    setToggleButton(true)
  }

  const deleteItem = (i) => {
    const updatedItems = items.filter((currElem) => {
      return currElem.id !== i;
    });
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([])
  }

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(items))
  }, [items])

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todolist.svg" alt="todoLogo" />
            <figcaption>Add your list here</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="Add item"
              className="form-control"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? 
            (<i className="far fa-edit add-btn" onClick={addItem}></i>) : 
            (<i className="fa fa-plus add-btn" onClick={addItem}></i>)}
            
          </div>

          <div className="showItems">
            {items.map((currElem) => {
              return (
                <div className="eachItem" key={currElem.id}>
                  <h3>{currElem.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={() => editItem(currElem.id)}></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(currElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
