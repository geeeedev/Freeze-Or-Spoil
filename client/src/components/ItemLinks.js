import React from "react";
import { Link, Typography, Paper } from "@material-ui/core";
import { Link as RouterLink } from "@reach/router";

const ItemLinks = () => {
  return (
    <>
      <Typography color="primary" paragraph>
        <Link component={RouterLink} to="/main">
          Main/New
        </Link>{" "}
        {/* |{" "}
        <Link component={RouterLink} to="/freezer/new">
          New Item
        </Link>{" "} */}
        |{" "}
        <Link component={RouterLink} to="/freezer">
          List
        </Link>{" "}
        |{" "}
        <Link component={RouterLink} to="/freezer/muiTbl">
          MUI Table
        </Link>
      </Typography>
    </>
  );
};
export default ItemLinks;

/**
 * Note To Self:
 * creating a Link component to keep it in one place and apply to many
 * wrapped the Link inside Typography to apply theme consistently to ALL text and pipe
 * if activating paper evalation here will make it pop more by creating double paper-elevation with parent element and
 */
