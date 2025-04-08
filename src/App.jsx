import { Table, Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  onAdd,
  onChange,
  onDelete,
  onSave,
  onSelect,
} from "./redux/slices/table";
import { useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const { dataSource, selectedRow } = useSelector((state) => state.tableSlice);
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        if (record.key === selectedRow?.key) {
          return (
            <Input
              value={selectedRow.name}
              onChange={(e) => {
                dispatch(
                  onChange({
                    ...selectedRow,
                    name: e.target.value,
                  })
                );
              }}
            />
          );
        }
        return record.name;
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (text, record, index) => {
        if (record.key === selectedRow?.key) {
          return (
            <Input
              value={selectedRow.age}
              onChange={(e) => {
                dispatch(
                  onChange({
                    ...selectedRow,
                    age: e.target.value,
                  })
                );
              }}
            />
          );
        }
        return record.age;
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text, record, index) => {
        if (record.key === selectedRow?.key) {
          return (
            <Input
              value={selectedRow.address}
              onChange={(e) => {
                dispatch(
                  onChange({
                    ...selectedRow,
                    address: e.target.value,
                  })
                );
              }}
            />
          );
        }
        return record.address;
      },
    },
    {
      title: "Actions",
      render: (record) => {
        if (record.key === selectedRow?.key) {
          return (
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                danger
                onClick={() => {
                  dispatch(onSelect(null));
                }}
              >
                Cancel
              </Button>
              <Button onClick={() => dispatch(onSave())}>Save</Button>
            </div>
          );
        }
        return (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button onClick={() => dispatch(onDelete(record))} danger>
              Delete
            </Button>{" "}
            <Button onClick={() => dispatch(onSelect(record))}>Edit</Button>
          </div>
        );
      },
    },
  ];
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", gap: "8px" }}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <Input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
        />
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <Button
          onClick={() => {
            dispatch(
              onAdd({
                key: Math.random(),
                name,
                age,
                address,
              })
            );
            setName("");
            setAge("");
            setAddress("");
          }}
        >
          Add
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};
export default App;
