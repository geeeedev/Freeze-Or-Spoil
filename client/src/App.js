import React, { useState } from "react";
import { 
  Redirect, 
  Router, 
  // Link, 
  // navigate 
} from "@reach/router";
import "./App.css";
// import { ItemNew } from "./components/ItemNew" //use with export const
import ItemNew from "./components/ItemNew";       //use with export default
import ItemEdit from "./components/ItemEdit";     //edit
import ItemList from "./components/ItemList";     //List All + Delete
import ItemMuiTbl from "./components/ItemMuiTbl";
import Main from "./components/Main";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
// import { MuiThemeProvider } from "material-table";
import { Paper } from "@material-ui/core";

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
      <Paper square style={{ height: "150vh", maxWidth: '100%', margin: "auto", padding: "15px"}}>
        <Router>
          <Redirect from="/" to="/main" noThrow="true" />
          <Main path="/main" dkMode={darkMode} setDkMode={setDarkMode} />
          <ItemNew path="/freezer/new" />
          <ItemEdit path="/freezer/:id/edit" />
          <ItemList path="/freezer" /> 
          <ItemMuiTbl path="/freezer/muiTbl" />
        </Router>
        </Paper>
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
