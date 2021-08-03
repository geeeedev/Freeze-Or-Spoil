import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { 
  Typography, 
  // Paper 
} from "@material-ui/core";
import moment from "moment";

import ItemLinks from "./ItemLinks";

const HeaderDate = (props) => {
  // const today = new Date();
  // const currDate = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`;
  //Jan=0

  return (
    <>
        <div style={{padding: "15px"}}>
        <Typography variant="h4" color="primary" paragraph >
          {/* What's In the Freezer @ {currDate} */}
          What's In the Freezer @ {moment().format("l")}
        </Typography>
        <ItemLinks />
        </div>
    </>
  );
};
export default HeaderDate;
