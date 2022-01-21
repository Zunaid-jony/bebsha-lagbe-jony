import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Category.css";
function Category() {
  const dispatch = useDispatch();
  const history = useHistory();
  const store = useSelector((state) => state.products);

  const filterCategory = (param) => {
    const filterCategory = store.filter((item) => item.category === param);
    dispatch({ type: "SETFILTERCATEGORY", payload: filterCategory });
    history.push(`/category/${param}`);
  };
  return (
    <div className="category__Main">
      <p onClick={() => history.push("/")}>সকল ক্যাটাগরি </p>
      <p onClick={() => filterCategory("জমি-জমা")}>জমি-জমা</p>
      <p onClick={() => filterCategory("পশু-পাখি")}>পশু-পাখি</p>
      <p onClick={() => filterCategory("খামার")}>খামার</p>
      <p onClick={() => filterCategory("কারখানা")}>কারখানা</p>
      <p onClick={() => filterCategory("হোটেল-মোটেল")}>হোটেল-মোটেল</p>
      <p onClick={() => filterCategory("গাড়ি-ট্র্যাক")}>গাড়ি-ট্রাক</p>
      <p onClick={() => filterCategory("বাসা-বাড়ি")}>বাসা-বাড়ি</p>
      <p onClick={() => filterCategory("উকিল-নামা ")}>উকিল-নামা </p>
     
    </div>
  );
}

export default Category;
