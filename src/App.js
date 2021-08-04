import React, { useState, useEffect } from 'react';
import './App.css';
import MaterialTable from 'material-table'


function App() {

  const [data, setData] = useState([])
  const columns = [
    { title: "ID", field: "id", editable: false },
    { title: "Name", field: "name" },
    { title: "Username", field: "username" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone", },
    { title: "Website", field: "website", },
  ]

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        setData(resp)
      })
  }, [])


  return (
    <div className="box">
      <h1 align="center">React-App</h1>
      <h4 align='center'>Software Company & owner</h4>
      <MaterialTable
        title="Software Employee Details"
        data={data}
        columns={columns}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            const updateRows = [...data, { id: Math.floor(Math.random() * 100), ...newRow }]
            setTimeout(() => {
              setData(updateRows)
              resolve()
            }, 2000)
          }),
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            const updatedRows = [...data]
            updatedRows.splice(index, 1)
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
            const index = oldRow.tableData.id;
            const updatedRows = [...data]
            updatedRows[index] = updatedRow
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onBulkUpdate: selectedRows => new Promise((resolve, reject) => {
            const rows = Object.values(selectedRows)
            const updatedRows = [...data]
            let index;
            rows.map(emp => {
              index = emp.oldData.tableData.id
              updatedRows[index] = emp.newData
            })
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)

          })
        }}
        options={{
          actionsColumnIndex: -1, addRowPosition: "first"
        }}
      />
    </div>
  );
}

export default App;
