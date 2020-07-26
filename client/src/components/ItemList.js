import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Link } from "@material-ui/core";
import { Link as RouterLink } from "@reach/router";


const ItemList = (props) => {
  const [allItems, setAllItems] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/freezer")
      .then((res) => {
        console.log(res);
        setAllItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (allItems === null) {
    return <p className="mt-5"> Defrosting ...</p>;
  }

  return (
    <>
      <Paper style={{ height: "100vh" }}>
        <Link component={RouterLink} to="/main">
          Back to Main
        </Link>{" "}|{" "}
        <Link component={RouterLink} to="/freezer" > 
          List
        </Link>{" "}|{" "}
        <Link component={RouterLink} to="/freezer/new" > 
          New Item 
        </Link>

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
              <th scope="col">Created At</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((item, idx) => {
              return (
                <tr key={item._id}>
                  <th scope="row">{idx + 1}</th>
                  <td>{item.category}</td>
                  <td>{item.item}</td>
                  <td>{item.qty}</td>
                  <td>
                    {moment(item.in_date).format("l") === "Invalid date"
                      ? ""
                      : moment(item.in_date).format("l")}
                  </td>
                  <td>
                    {moment(item.out_date).format("l") === "Invalid date"
                      ? ""
                      : moment(item.out_date).format("l")}
                  </td>
                  <td>{item.comment}</td>
                  <td>{moment(item.createdAt).format("l")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Paper>
    </>
  );
};
export default ItemList;
