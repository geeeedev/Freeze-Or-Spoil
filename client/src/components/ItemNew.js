import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import "../styles.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  TextField,
  Button,
  FormHelperText,
  FormControl,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import HeaderDate from "./HeaderDate";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles({
  errorText: {
    color: red,
  },
});



const ItemNew = (props) => {
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("");
  const [inDate, setInDate] = useState(null);
  const [outDate, setOutDate] = useState(null);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(`inDate: ${inDate}`);
    console.log(`outDate: ${outDate}`);
    //create new item obj
    const newItem = {
      category: category,
      item: item,
      qty,
      in_date: inDate, //model/db name must match!
      out_date: outDate ? outDate : "",
      comment,
    };


    //api to create item obj in db
    axios
      .post("http://localhost:8000/api/freezer/new", newItem)
      .then((res) => {
        console.log(`NewItem Response: `, res);
        navigate("/freezer");
      })
      .catch((err) => {
        console.log(`NewItem Err:`, err.response.data.errors);
        console.log(err.response);
        setErrors(err.response.data.errors);
      });
  };

  
  const muiStyles = useStyles();

  return (
    <>
      <HeaderDate />
      <form onSubmit={handleSubmit} className="item">
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <FormControl error={muiStyles.errorText}>
            {errors.category ? (
              <TextField
                error
                type="text"
                label="Category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
            ) : (
              <TextField
                type="text"
                label="Category"
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

          <FormControl error={muiStyles.errorText}>
            {errors.item ? (
              <TextField
                error
                type="text"
                label="What"
                onChange={(e) => {
                  setItem(e.target.value);
                }}
              />
            ) : (
              <TextField
                type="text"
                label="What"
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

          <FormControl error={muiStyles.errorText}>
            {errors.qty ? (
              <TextField
                error
                type="text"
                label="Quantity"
                onChange={(e) => {
                  setQty(e.target.value);
                }}
              />
            ) : (
              <TextField
                type="text"
                label="Quantity"
                onChange={(e) => {
                  setQty(e.target.value);
                }}
              />
            )}
            <div>
              {errors.qty ? (
                <FormHelperText>
                  {errors.qty.properties.message}
                </FormHelperText>
              ) : (
                ""
              )}
            </div>
          </FormControl>

          <FormControl error={muiStyles.errorText}>
            {errors.in_date ? (
              <KeyboardDatePicker
                error
                disableToolbar
                variant="inline"
                format="MM/DD/YYYY"
                disableFuture
                // maxDate={new Date()}
                value={inDate}
                margin="dense"
                label="In Date"
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
                value={inDate}
                margin="dense"
                label="In Date"
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
            value={outDate}
            margin="dense"
            label="Out Date"
            onChange={(date) => {
              setOutDate(date);
            }}
          />

          <TextField
            type="text"
            label="Comment"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />

          <br />
          <Button type="submit" variant="contained" color="primary">
            Add Item
          </Button>
        </MuiPickersUtilsProvider>
      </form>
    </>
  );
};
export default ItemNew;
