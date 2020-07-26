import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
// import { ItemNew } from "./components/ItemNew" //use with export const
import ItemNew from "./components-NoDB/ItemNew-NoDB-StateLift";       //use with export default
import ItemList from "./components-NoDB/ItemList-NoDB-StateLift";
import HeaderDate from "./components/HeaderDate";


function App() {
  //item obj before db storage - state lifting
  const [itemList, setItemList] = useState([]);
  const addItemToList = (newItem) => {
    setItemList([...itemList, newItem]);
  };

  return (
    <div className="App">
      <HeaderDate />
      <ItemNew addItem={addItemToList} />
      <ItemList itemList={itemList} />
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
