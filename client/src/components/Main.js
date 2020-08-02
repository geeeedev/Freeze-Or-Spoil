import React from "react";
import HeaderDate from "./HeaderDate";
import ItemNew from "./ItemNew";
import { Switch } from "@material-ui/core";
import { Paper, IconButton, Icon } from "@material-ui/core";

const Main = (props) => {
  return (
    <>
      {/* <Switch
          checked={props.dkMode}
          onChange={() => props.setDkMode(!props.dkMode)}
          label="Dark Mode"
        /> */}
      <IconButton disableRipple onClick={() => props.setDkMode(!props.dkMode)}>
        {props.dkMode ? (
          <Icon color="primary">brightness_5</Icon>
        ) : (
          <Icon color="primary">brightness_4</Icon>
        )}
      </IconButton>

      <ItemNew />
    </>
  );
};
export default Main;
