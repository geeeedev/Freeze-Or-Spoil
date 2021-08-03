import React, { useState, useEffect } from "react";
import axios from "axios";
// import moment from "moment";
// import { makeStyles } from "@material-ui/core/styles";
// import { Typography, Icon, Paper } from "@material-ui/core";
import HeaderDate from "./HeaderDate";
import MaterialTable from "material-table";
// import { green, purple, red, blue, blueGrey } from "@material-ui/core/colors";
// import { Link } from "@reach/router";
import Defrosting from "./Defrosting";

const api_url = "http://localhost:8000/api";
const ItemMuiTbl = (props) => {
  const [allItems, setAllItems] = useState(null);

  //Initial API Data Read/Load
  useEffect(() => {
    axios
      // .get("http://localhost:8000/api/freezer")
      .get(`${api_url}/freezer`)
      .then((res) => {
        console.log(res);
        setAllItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //API Data Add
  const handleDBadd = (newData) => {
    axios
      // .post(`http://localhost:8000/api/freezer/new`, newData)
      .post(`${api_url}/freezer/new`, newData)
      .then((res) => {
        console.log(`MTbl DB Add Success: `, res);
        // navigate("/freezer");
      })
      .catch((err) => {
        console.log(`MTbl DB Add Err:`, err.response.data.errors);
        console.log(err.response);
        // setErrors(err.response.data.errors);
      });
  };

  //API Data Update
  const handleDBupdate = (id, newData) => {
    axios
      // .put(`http://localhost:8000/api/freezer/${id}`, newData)
      .put(`${api_url}/freezer/${id}`, newData)
      .then((res) => {
        console.log(`MTbl DB Update Success: `, res);
      })
      .catch((err) => {
        console.log(`MTbl DB Update Err:`, err.response.data.errors);
        console.log(err.response);
        // setErrors(err.response.data.errors);
      });
  };

  //API Data Delete
  const handleDBdelete = (id) => {
    axios
      // .delete(`http://localhost:8000/api/freezer/${id}`)
      .delete(`${api_url}/freezer/${id}`)
      .then((res) => {
        console.log(`MTbl DB Delete Success: `, res);
        // const listWithoutDeleted = allItems.filter((item, idx) => {
        //   return item._id !== res.data._id; //or id
        // });
        // setAllItems(listWithoutDeleted);
      })
      .catch((err) => {
        console.log(`MTbl DB Delete Err:`, err.response.data.errors);
        console.log(err.response);
        // setErrors(err.response.data.errors);
      });
  };

  const columns = [
    { title: "Category", field: "category" },
    { title: "What", field: "item" },
    { title: "Qty", field: "qty" },
    { title: "In Date", field: "in_date", type: "date" },
    { title: "Out Date", field: "out_date", type: "date" },
    { title: "Comment", field: "comment" },
    { title: "Created At", field: "createdAt", type: "date" },
    // { title: "#", field: "_id", export: false },
  ];

  if (allItems === null) {
    return (
      <Defrosting />
    );
  }

  return (
    <>
      <HeaderDate />
      <div style={{ paddingLeft: "80px", paddingRight: "80px", paddingBottom: "30px"}}>
      <MaterialTable 
        // style={{ paddingLeft: "115px", paddingRight: "115px"}}
        title="Freezer Storage Update with Material Table "
        columns={columns}
        data={allItems}
        // {[
        //   {eachItem key:'value', key:'value'},
        //   {eachItem},
        // ]}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setAllItems([...allItems, newData]);
                console.log(`addedData: ${JSON.stringify(newData)}`);
                handleDBadd(newData);
                resolve();
              }, 1000);
            }),

          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...allItems];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setAllItems([...dataUpdate]);
                console.log(`updatedData: ${JSON.stringify(newData)}`);
                console.log(`updatedData: ${newData._id}`);
                handleDBupdate(newData._id, newData);
                resolve();
              }, 1000);
            }),

          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...allItems];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setAllItems([...dataDelete]);
                console.log(`deletedData: ${JSON.stringify(oldData)}`);
                console.log(`deletedData: ${oldData._id}`);
                handleDBdelete(oldData._id);
                resolve();
              }, 1000);
            }),
        }}
        options={{
          exportButton: true,
          grouping: false,
          // headerStyle: {
          //   color: "#ffb74d"
          // },
          // cellStyle: {
          //   color: "#ffb74d"
          // },
          // rowStyle: {
          //   color: "#ffb74d"
          // }
        }}
        // actions={[
        //   {
        //     icon: "save_alt",
        //     tooltip: "Export Data",
        //   },
        // ]}
      />
      </div>

      {/* No Longer Needed: old bootstrap table for data checking  */}
      {/* <div style={{ padding: "55px"}}>
        <table className="table table-dark ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category</th>
              <th scope="col">What</th>
              <th scope="col">Qty</th>
              <th scope="col">In Date</th>
              <th scope="col">Out Date</th>
              <th scope="col">Comment</th>
              <th scope="col">Created At</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((item, idx) => {
              return (
                <tr key={item._id}>
                  <th scope="row">{idx + 1}</th>
                  <td>{item.category}</td>
                  <td><Link to={`/freezer/${item._id}/edit`}>{item.item}</Link></td>
                  <td>{item.qty}</td>
                  <td>
                    {moment(item.in_date).format("l") === "Invalid date"
                      ? ""
                      : moment(item.in_date).format("l")}
                  </td>
                  <td>
                    {moment(item.out_date).format("l") === "Invalid date"
                      ? ""
                      : moment(item.out_date).format("l")}
                  </td>
                  <td>{item.comment}</td>
                  <td>{moment(item.createdAt).format("l")}</td>
                  <td>{item._id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> */}
    </>
  );
};
export default ItemMuiTbl;
