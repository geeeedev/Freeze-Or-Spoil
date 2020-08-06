import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  Icon,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import HeaderDate from "./HeaderDate";
import { navigate } from "@reach/router";
// import { Link as RouterLink } from "@reach/router";
import { Link } from "@reach/router";
import Defrosting from "./Defrosting";

const useStyles = makeStyles({
  table: {
    maxWidth: "85%",
    margin: "auto",
    maxHeight: 350,
  },
});

const ItemList = (props) => {
  const muiClass = useStyles();

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
      <Defrosting />
    );
  }

  return (
    <>
      <HeaderDate />
      <div>
        <TableContainer className={muiClass.table}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" >#</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">What</TableCell>
                <TableCell align="center">Qty</TableCell>
                <TableCell align="center">In Date</TableCell>
                <TableCell align="center">Out Date</TableCell>
                <TableCell align="center">Comment</TableCell>
                <TableCell align="center">Created At</TableCell>
                <TableCell align="center">#</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allItems.map((item, idx) => {
                return (
                  <TableRow key={item._id} hover>
                    <TableCell align="center" component="th" scope="row">
                      {idx + 1}
                    </TableCell>
                    <TableCell align="center">{item.category}</TableCell>
                    <TableCell align="center">
                      <Link to={`/freezer/${item._id}/edit`}>{item.item}</Link>
                    </TableCell>
                    {/* <TableCell>{item.item}</TableCell> */}
                    <TableCell align="center">{item.qty}</TableCell>
                    <TableCell align="center">
                      {moment(item.in_date).format("l") === "Invalid date"
                        ? ""
                        : moment(item.in_date).format("l")}
                    </TableCell>
                    <TableCell align="center">
                      {moment(item.out_date).format("l") === "Invalid date"
                        ? ""
                        : moment(item.out_date).format("l")}
                    </TableCell>
                    <TableCell align="center">{item.comment}</TableCell>
                    <TableCell align="center">
                      {moment(item.createdAt).format("l")}
                    </TableCell>
                    <TableCell align="center">{item._id}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
export default ItemList;


/**
 * Nxt on THIS list: 
 *    Delete
 *    Sort
 */