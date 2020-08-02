import React, { useEffect, useState } from "react";
import { Redirect, Router, Link, navigate } from "@reach/router";
import axios from "axios";
import "../styles.css";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Icon,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import HeaderDate from "./HeaderDate";
import { red } from "@material-ui/core/colors";

const ItemEdit = (props) => {
  // const [editItem, setEditItem] = useState(null);
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("");
  const [inDate, setInDate] = useState(null);
  const [outDate, setOutDate] = useState(null);
  const [comment, setComment] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/freezer/${props.id}`)
      .then((res) => {
        console.log(res);
        // setEditItem(res.data);
        setCategory(res.data.category);
        setItem(res.data.item);
        setQty(res.data.qty);
        setInDate(res.data.in_date);
        setOutDate(res.data.out_date);
        setComment(res.data.comment);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedItem = {
      category,
      item,
      qty: qty,
      in_date: inDate,
      out_date: outDate ? outDate : "",
      comment,
    };

    axios
      .put(`http://localhost:8000/api/freezer/${props.id}`, updatedItem)
      .then((res) => {
        console.log(`DB Update Success: `, res);
        navigate("/freezer");
      })
      .catch((err) => {
        console.log(`DB Update Err:`, err.response.data.errors);
        console.log(err.response);
        setErrors(err.response.data.errors);
      });
  };

  // if (editItem === null) {
  //   return (
  //     <p className="mt-5">
  //       {" "}
  //       Defrosting {<Icon>ac_unit</Icon>} {<Icon>ac_unit</Icon>}{" "}
  //       {<Icon>ac_unit</Icon>} ...
  //     </p>
  //   );
  // }

  return (
    <>
      <HeaderDate />
      <form onSubmit={handleUpdate} className="item">
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <FormControl error={red}>
            {errors.category ? (
              <TextField
                error
                type="text"
                label="Category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
            ) : (
              <TextField
                type="text"
                label="Category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
            )}
            <div>
              {errors.category ? (
                // <span className="text-danger">
                <FormHelperText>
                  {errors.category.properties.message}
                </FormHelperText>
              ) : (
                ""
              )}
            </div>
          </FormControl>

          <FormControl error={red}>
            {errors.item ? (
              <TextField
                error
                type="text"
                label="What"
                value={item}
                onChange={(e) => {
                  setItem(e.target.value);
                }}
              />
            ) : (
              <TextField
                type="text"
                label="What"
                value={item}
                onChange={(e) => {
                  setItem(e.target.value);
                }}
              />
            )}
            <div>
              {errors.item ? (
                <FormHelperText>
                  {errors.item.properties.message}
                </FormHelperText>
              ) : (
                ""
              )}
            </div>
          </FormControl>

          <FormControl error={red}>
            {errors.qty ? (
              <TextField
                error
                type="text"
                label="Quantity"
                value={qty}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
              />
            ) : (
              <TextField
                type="text"
                label="Quantity"
                value={qty}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
              />
            )}
            <div>
              {errors.qty ? (
                <FormHelperText>{errors.qty.properties.message}</FormHelperText>
              ) : (
                ""
              )}
            </div>
          </FormControl>

          <FormControl error={red}>
            {errors.in_date ? (
              <KeyboardDatePicker
                error
                disableToolbar
                variant="inline"
                format="MM/DD/YYYY"
                disableFuture
                // maxDate={new Date()}
                margin="dense"
                label="In Date"
                value={inDate}
                // InputLabelProps={{
                //   shrink: true,
                // }}
                onChange={(date) => setInDate(date)}
              />
            ) : (
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/DD/YYYY"
                disableFuture
                // maxDate={new Date()}
                margin="dense"
                label="In Date"
                value={inDate}
                // InputLabelProps={{
                //   shrink: true,
                // }}
                onChange={(date) => setInDate(date)}
              />
            )}
            <div>
              {errors.in_date ? (
                <FormHelperText>
                  {errors.in_date.properties.message}
                </FormHelperText>
              ) : (
                ""
              )}
            </div>
          </FormControl>

          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/DD/YYYY"
            // disablePast
            // minDate={new Date()}
            margin="dense"
            label="Out Date"
            value={outDate}
            onChange={(date) => {
              setOutDate(date);
            }}
          />

          <TextField
            type="text"
            label="Comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />

          <br />
          <Button type="submit" variant="contained" color="primary">
            Update Item
          </Button>
        </MuiPickersUtilsProvider>
      </form>
    </>
  );
};
export default ItemEdit;
