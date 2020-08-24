import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import "../styles.css";
import { Autocomplete } from "@material-ui/lab";
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
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => {
        console.log(res);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const handleDropdown = (e, newVal) => {
      console.log(newVal);
      setCategory(newVal);
  }

  const muiStyles = useStyles();
  // use {categories.map((category)={category.category ...in option and value})}

  return (
    <>
      <HeaderDate />
      <form onSubmit={handleSubmit} className="item">
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <FormControl error={muiStyles.errorText}>
            {errors.category ? (
              <Autocomplete
                options={categories}
                // getOptionLabel={(option) => option.category}   //needed when categories is an array of OBJECTS - looks for value of key category
                freeSolo
                onChange={(e, newVal) => {                  //thru dropdown selection
                  setCategory(newVal);
                }}
                onInputChange={(e, newInputValue) => {      //thru type-in input
                  setCategory(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error
                    type="text"
                    label="Category"
                    // onChange={(e) => {                   //using that of AutoComplete X2 instead of this of TextField
                    //   setCategory(e.target.value);
                    // }}
                  />
                )}
              />
            ) : (
              <Autocomplete
                options={categories}
                // getOptionLabel={(option) => option.category}   //needed when categories is an array of OBJECTS - looks for value of key category
                getOptionLabel={(option) => option}
                freeSolo
                onChange={(e, newVal) => {
                  setCategory(newVal);
                }}
                onInputChange={(e, newInputValue) => {
                  setCategory(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    type="text"
                    label="Category"
                    // onChange={(e) => {
                    //   setCategory(e.target.value);
                    // }}
                  />
                )}
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
                <FormHelperText>{errors.qty.properties.message}</FormHelperText>
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
