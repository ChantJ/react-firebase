import React, { useState, useEffect } from "react";
import "./style.css";
import { FaPlus, FaPen, FaSave, FaTimes } from "react-icons/fa";
import { addData, deleteData, updateData } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import results from "../actions/axios";

const RealtimeDatabae = () => {
  const [children, setChildren] = useState([]);
  const childrens = useSelector((state) => state.childrens);
  const dispatch = useDispatch();
  const [id, setId] = useState(0);

  useEffect(() => {
    results
      .get("/.json")
      .then((res) => dispatch({ type: "add", payload: res.data }));
  }, [dispatch]);
  const addSubChild = (rowId, index) => {
    let newArray = [
      ...children,
      { id: id, name: "", value: "", parent: rowId, childrenNum: 0 },
    ];
    newArray[index].childrenNum = newArray[index].childrenNum + 1;
    newArray[index].value = "";
    setChildren(newArray);
    setId(id + 1);
  };

  const deleteSubChild = (rowParent, index) => {
    let newArray = [...children];
    newArray.forEach((row) => {
      if (row.id === rowParent) {
        row.childrenNum = row.childrenNum - 1;
      }
    });
    newArray.splice(index, 1);
    setChildren(newArray);
    if (index === 0) {
      setChildren([]);
    }
  };

  const onChange = (text, label, index) => {
    let newArray = [...children];
    newArray[index][label] = text;
    setChildren(newArray);
  };

  const getNestedChildren = (arr, parent) => {
    var children = {};
    for (var i = 0; i < arr.length; ++i) {
      if (arr[i].parent === parent) {
        var grandChildren = getNestedChildren(arr, arr[i].id);
        if (JSON.stringify(grandChildren) !== "{}") {
          arr[i].value = grandChildren;
        }
        let name = arr[i].name;
        children[name] = arr[i].value;
      }
    }

    return children;
  };
  const onSubmit = async () => {
    let payload={}
    if(children[0].childrenNum===0){
      let obj={}
      obj[children[0].name]=children[0].value
      payload = await updateData( obj,"/");

    }
    else{
      var nest = getNestedChildren(children, null);
      let [first] = Object.keys(nest);
      payload = await addData(first, nest[Object.keys(nest)[0]]);
    }
    setId(0);
    setChildren([]);
    dispatch({ type: "add", payload: payload.data });
  };

  const deleteChild = async (data) => {
    let payload = await deleteData(data);
    dispatch({ type: "add", payload: payload.data });
  };

  const updateChild = async (key, pathname) => {
    let obj = {};
    obj[key] = document.getElementById(pathname + key).value;
    if (!document.getElementById(pathname + key).disabled) {
      let payload = await updateData(obj, pathname);
      dispatch({ type: "add", payload: payload.data });
    }
    document.getElementById(pathname + key).disabled = true;
  };

  const displayChildrens = (data, pathname) => {
    return (
      <ul>
        {Object.keys(data).map((key) => {
          return (
            <li style={{ margin: "1rem" }}>
              <label>{key}:</label>
              {typeof data[key] === "string" ? (
                <>
                  <input
                    id={pathname + key}
                    placeholder={data[key]}
                    disabled={true}
                  />
                  <FaPen
                    size={12}
                    onClick={() =>
                      (document.getElementById(
                        pathname + key
                      ).disabled = !document.getElementById(pathname + key)
                        .disabled)
                    }
                    style={{ marginLeft: "10px", alignSelf: "center" }}
                  />

                  <FaSave
                    size={12}
                    disabled={true}
                    style={{ marginLeft: "10px", alignSelf: "center" }}
                    onClick={() => updateChild(key, pathname)}
                  />
                  <FaTimes
                    size={12}
                    onClick={() => deleteChild(pathname + key + ".json")}
                    style={{ marginLeft: "10px", alignSelf: "center" }}
                  />
                </>
              ) : (
                <>
                  <FaTimes
                    size={12}
                    onClick={() => deleteChild(pathname + key + ".json")}
                    style={{ marginLeft: "10px", alignSelf: "center" }}
                  />
                  {displayChildrens(data[key], pathname + key + "/")}
                </>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const addChild = (parentID) => {
    return (
      <div style={{ margin: "1rem" }}>
        {children.map((row, index) => {
          if (parentID === row.parent) {
            return (
              <>
                <div>
                  <label>Name:</label>
                  <input
                    value={row.name}
                    onChange={(e) => onChange(e.target.value, "name", index)}
                  ></input>
                  {row.childrenNum === 0 && (
                    <>
                      <label>Value:</label>
                      <input
                        value={row.value}
                        onChange={(e) =>
                          onChange(e.target.value, "value", index)
                        }
                      ></input>
                    </>
                  )}
                  <FaPlus
                    size={12}
                    onClick={() => addSubChild(row.id, index)}
                  />
                  <FaTimes
                    size={12}
                    onClick={() => deleteSubChild(row.parent, index)}
                  />
                </div>
                <div style={{ marginLeft: "3rem", marginTop: "1rem" }}>
                  {addChild(row.id)}
                </div>
              </>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="maincontent">
      <div style={{ margin: "1rem" }}>
        {JSON.stringify(childrens) !== "{}" && displayChildrens(childrens, "/")}

        {children.length > 0 ? (
          addChild(null)
        ) : (
          <button
            style={{ margin: "2rem", height: "30px" }}
            onClick={() => {
              setChildren([
                { id: id, name: "", value: [], parent: null, childrenNum: 0 },
              ]);
              setId(id + 1);
            }}
          >
            <FaPlus size={12} />
            Add Child
          </button>
        )}
        {children.length > 0 && (
          <div style={{ margin: "2rem" }}>
            <button onClick={() => setChildren([])}>Cancel</button>
            <button onClick={() => onSubmit()}>Add</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default RealtimeDatabae;
