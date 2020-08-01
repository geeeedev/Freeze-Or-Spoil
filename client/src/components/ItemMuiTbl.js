import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Icon, Paper, Link } from "@material-ui/core";
import { Link as RouterLink } from "@reach/router";
import MaterialTable from "material-table";
import { green, purple, red, blue, blueGrey } from "@material-ui/core/colors";



const ItemMuiTbl = (props) => {
  const [allItems, setAllItems] = useState(null);

  //Initial API Data Read/Load
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/freezer")
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
      .post(`http://localhost:8000/api/freezer/new`, newData)
      .then((res) => {
        console.log(`DB Add Success: `, res);
        // navigate("/freezer");
      })
      .catch((err) => {
        console.log(`DB Add Err:`, err.response.data.errors);
        console.log(err.response);
        // setErrors(err.response.data.errors);
      });
  };

  //API Data Update
  const handleDBupdate = (id, newData) => {
    axios
      .put(`http://localhost:8000/api/freezer/${id}`, newData)
      .then((res) => {
        console.log(`DB Update Success: `, res);
        // navigate("/freezer");
      })
      .catch((err) => {
        console.log(`DB Update Err:`, err.response.data.errors);
        console.log(err.response);
        // setErrors(err.response.data.errors);
      });
  };

  //API Data Delete
  const handleDBdelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/freezer/${id}`)
      .then((res) => {
        console.log(`DB Delete Success: `, res);
        // const listWithoutDeleted = allItems.filter((item, idx) => {
        //   return item._id !== res.data._id; //or id
        // });
        // setAllItems(listWithoutDeleted);
      })
      .catch((err) => {
        console.log(`DB Delete Err:`, err.response.data.errors);
        console.log(err.response);
        // setErrors(err.response.data.errors);
      });
  };

  const columns = [
    { title: "#", field: "_id", export: false, },
    { title: "Category", field: "category" },
    { title: "What", field: "item" },
    { title: "Qty", field: "qty" },
    { title: "In Date", field: "in_date", type: "date" },
    { title: "Out Date", field: "out_date", type: "date" },
    { title: "Comment", field: "comment" },
    { title: "Created At", field: "createdAt", type: "date" },
  ];

  if (allItems === null) {
  return <p className="mt-5"> Defrosting {<Icon>ac_unit</Icon>} {<Icon>ac_unit</Icon>} {<Icon>ac_unit</Icon>} ...</p>;
  }

  return (
    <>
      <Paper style={{ height: "100vh", maxWidth: '80%', margin: "auto" }}>
      {/* <Paper style={{ height: "100vh" }}> */}
        <Link component={RouterLink} to="/main">
          Back to Main
        </Link>{" "}
        |{" "}
        <Link component={RouterLink} to="/freezer">
          List
        </Link>{" "}
        |{" "}
        <Link component={RouterLink} to="/freezer/new">
          New Item
        </Link>
        <MaterialTable 
          title="Material Table For Freezer Storage :) "
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
            exportButton:true,
            grouping: false,
            headerStyle: {
              color: "#ffb74d"
            },
            cellStyle: {
              color: "#ffb74d"
            },
            rowStyle: {
              color: "#ffb74d"
            }
          }}
          // actions={[
          //   {
          //     icon: "save_alt",
          //     tooltip: "Export Data",
          //   },
          // ]}
        />
        <table className="table table-dark mt-5">
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
            </tr>
          </thead>
          <tbody>
            {allItems.map((item, idx) => {
              return (
                <tr key={item._id}>
                  <th scope="row">{idx + 1}</th>
                  <td>{item.category}</td>
                  <td>{item.item}</td>
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
                  {/* <td>{item.comment}</td> */}
                  <td>{item._id}</td>
                  <td>{moment(item.createdAt).format("l")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Paper>
    </>
  );
};
export default ItemMuiTbl;
