import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Icon } from "@material-ui/core";
import HeaderDate from "./HeaderDate";
import { navigate } from "@reach/router";
// import { Link as RouterLink } from "@reach/router";
import { Link } from "@reach/router";

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
    return (
      <p className="mt-5">
        {" "}
        Defrosting {<Icon>ac_unit</Icon>} {<Icon>ac_unit</Icon>}{" "}
        {<Icon>ac_unit</Icon>} ...
      </p>
    );
  }

  return (
    <>
      <HeaderDate />
      <div>
        <table className="table table-dark ">
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
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((item, idx) => {
              return (
                <tr key={item._id}>
                  <th scope="row">{idx + 1}</th>
                  <td>{item.category}</td>
                  <td><Link to={`/freezer/${item._id}/edit`}>{item.item}</Link></td>
                  {/* <td>{item.item}</td> */}
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
                  <td>{item._id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ItemList;
