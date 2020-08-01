import React from "react";
import HeaderDate from "./HeaderDate";
import ItemNew from "./ItemNew";       
import ItemList from "./ItemMuiTbl";
import { Paper } from "@material-ui/core";

const Main = (props) => {
  return (
    <>
    <Paper style={{height:"100vh"}}>
      <HeaderDate  darkMode={props.dkMode} setDarkMode={props.setDkMode}/>
      <ItemNew />
      <ItemList />
    </Paper>
    </>
  );
};
export default Main;
