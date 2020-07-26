import React, { useState } from "react";
import "../styles.css"

// export const ItemNew = () => {
const ItemNew = (props) => {
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("");
  const [inDate, setInDate] = useState("");
  const [outDate, setOutDate] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //create new item obj
    const newItem = {
      category: category,
      item: item,
      qty: qty,
      inDate,
      outDate,
      comment
    };

    //NoDB-StateLift
    props.addItem(newItem);

};

  return (
    <>
        <form onSubmit={handleSubmit} className="item">
            <label>Category:</label>
            <input type="text" 
            onChange={(e)=>{setCategory(e.target.value)}} />

            <label>What:</label>
            <input type="text" 
            onChange={(e)=>{setItem(e.target.value)}} />

            <label>Qty:</label>
            <input type="text" 
            onChange={(e)=>{setQty(e.target.value)}} />

            <label>In Date:</label>
            <input type="text" 
            onChange={(e)=>{setInDate(e.target.value)}} />

            <label>Out Date:</label>
            <input type="text" 
            onChange={(e)=>{setOutDate(e.target.value)}} />

            <label>Comments:</label>
            <input type="text" 
            onChange={(e)=>{setComment(e.target.value)}} />

            <br />
            <button type="submit" >Add Item</button>
        </form>
    </>
  )
};
export default ItemNew;
