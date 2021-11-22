import React, { useEffect, useState } from "react";
import "./ToDo.css";
import image from "./do.png";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
const getLocalData = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const ToDo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("text box is empty");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((curItem) => {
          if (curItem.id === isEditItem) {
            return { ...curItem, name: inputData };
          }
          setInputData("");
          setToggleSubmit(true);
          return curItem;
        })
      );
    } else {
      const allData = { id: new Date().getTime().toString(), name: inputData }; // adding in all data
      setItems([...items, allData]);
      setToggleSubmit(true);
      setInputData("");
    }
  };
  const deleteItem = (id) => {
    // console.log("value is   "+id);
    const dlt = items.filter((cData) => {
      // console.log(cData);
      return id !== cData.id;
    });
    setItems(dlt);
  };
  const editItem = (ids) => {
    const edit = items.find((cData) => {
      return ids === cData.id;
    });
    setInputData(edit.name);
    setIsEditItem(ids);
    setToggleSubmit(false);
  };
  //hooks
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="mainDiv  container-fluid">
        <div className="row  text-center pt-5">
          <div className="d-flex border border-danger py-4 flex-column mx-auto col-lg-4 col-md-8 col-10 ">
            <figure className="text-center">
              <img src={image} alt="" srcSet="" width="80px" height="auto" />
              <figcaption className="text-white">Add your wish list</figcaption>
            </figure>

            <div className="">
              <input
                className="text-center noteText"
                placeholder="✍️ Add item"
                type="text"
                name=""
                value={inputData}
                onChange={(e) => {
                  setInputData(e.target.value);
                }}
              />
              {toggleSubmit ? (
                <i
                  className="fas fa-plus btnAdd btn mb-1 text-success"
                  onClick={addItem}
                  title="Add item"
                ></i>
              ) : (
                <i
                  className="far fa-edit edit btnAdd btn mb-1 text-warning"
                  onClick={addItem}
                  title="Edit Items"
                ></i>
              )}
            </div>
            {items.map((curData) => {
              return (
                <div
                  className="displayList mb-2 bg-white d-flex flex-row mx-auto justify-content-between"
                  key={curData.id}
                >
                  <h5>{curData.name} </h5>
                  <div className="justify-content-end  delEdit">
                    <i
                      className="far fa-edit text-warning edit"
                      title="Edit item"
                      onClick={() => editItem(curData.id)}
                    ></i>
                    <i
                      className="fas fa-trash-alt    delete "
                      title="Delete item"
                      onClick={() => {
                        return deleteItem(curData.id);
                      }}
                    ></i>
                  </div>
                </div>
              );
            })}

           
            <Button
              className=" text-start mx-auto mt-1  buttonDlt"
              data-sm-link-text="Remove All"
              size="small"
              onClick={() => setItems([])}
              variant="contained"
              width="100px"
            > 
              <DeleteIcon  />Erase all
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
