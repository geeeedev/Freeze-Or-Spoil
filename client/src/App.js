import React, { useState } from "react";
import { Redirect, Router, Link, Navigate } from "@reach/router";
import "./App.css";
import ItemMuiTbl from "./components/ItemMuiTbl";
import Main from "./components/Main";
import ItemNew from "./components/ItemNew";       //use with export default
// import { ItemNew } from "./components/ItemNew" //use with export const
// import ItemEdit from "./components/ItemEdit";  //edit
// import ItemList from "./components/ItemList";  //List All + Delete
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { MuiThemeProvider } from "material-table";

function App() {
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#ffb74d",
      }
    },
  });

  const lightTheme = createMuiTheme({});
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="App">
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Router>
          <Redirect from="/" to="/main" noThrow="true" />
          <Main path="/main" dkMode={darkMode} setDkMode={setDarkMode} />
          <ItemNew path="/freezer/new" />
          {/* <ItemEdit path="/freezer/edit" /> */}
          {/* <ItemList path="/freezer" />  */}
          <ItemMuiTbl path="/freezerMuiTbl" />
        </Router>
      </ThemeProvider>
    </div>
  );
}
export default App;

// return (
//   <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <p>
//         Edit <code>src/App.js</code> and save to reload.
//       </p>
//       <a
//         className="App-link"
//         href="https://reactjs.org"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Learn React
//       </a>
//     </header>
//   </div>
// );
