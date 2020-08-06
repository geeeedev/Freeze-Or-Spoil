import React from "react";
import { Typography, Icon } from "@material-ui/core";

const Defrosting = () => {
  return (
    <Typography
      variant="h4"
      color="primary"
      paragraph
      style={{ padding: "25px" }}
    >
      {" "}
      defrosting {<Icon>ac_unit</Icon>} {<Icon>ac_unit</Icon>}{" "}
      {<Icon>ac_unit</Icon>}  ...
    </Typography>
  );
};
export default Defrosting;
