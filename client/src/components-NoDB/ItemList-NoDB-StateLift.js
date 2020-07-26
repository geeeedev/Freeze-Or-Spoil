import React, { useState } from "react";

const ItemList = (props) => {
    
  
    return (
      <>
        <table className="table table-dark mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category</th>
              <th scope="col">What</th>
              <th scope="col">Qty</th>
              <th scope="col">In Date</th>
              <th scope="col">Out Date</th>
              <th scope="col">Comment</th>
            </tr>
          </thead>
          <tbody>
            {props.itemList.map((item,idx)=>{
              return (
                <tr key={idx+1}>
                  <th scope="row">{idx+1}</th>
                  <td>{item.category}</td>
                  <td>{item.item}</td>
                  <td>{item.qty}</td>
                  <td>{item.inDate}</td>
                  <td>{item.outDate}</td>
                  <td>{item.comment}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    );
  };
  export default ItemList;