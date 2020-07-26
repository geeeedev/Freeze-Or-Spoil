import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Icon, IconButton } from "@material-ui/core";
import moment from "moment";
import { Switch } from "@material-ui/core";

const HeaderDate = (props) => {
  // const today = new Date();
  // const currDate = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`;
  //Jan=0

  return (
    <>
      <Paper elevation={3}>
        <Switch
          checked={props.darkMode}
          onChange={() => props.setDarkMode(!props.darkMode)}
          label="Dark Mode"
        />
        <IconButton onClick={() => props.setDarkMode(!props.darkMode)}>
          {props.darkMode ? (
            <Icon color="primary">brightness_5</Icon>
          ) : (
            <Icon color="primary">brightness_4</Icon>
          )}
        </IconButton>
        <Typography variant="h5" color="primary" paragraph>
          {/* What's In the Freezer @ {currDate} */}
          What's In the Freezer @ {moment().format("l")}
        </Typography>
      </Paper>
    </>
  );
};
export default HeaderDate;
