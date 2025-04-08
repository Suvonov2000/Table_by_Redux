import { createSlice } from "@reduxjs/toolkit";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
  {
    key: "5",
    name: "Alex",
    age: 22,
    address: "10 Downing Street",
  },
];

const tableSlice = createSlice({
  name: "table",
  initialState: {
    dataSource,
    selectedRow: null,
  },
  reducers: {
    onDelete: (state, { payload }) => {
      state.dataSource = state.dataSource.filter(
        (value) => value.key !== payload.key
      );
    },
    onSelect: (state, { payload }) => {
      state.selectedRow = payload;
    },
    onSave: (state) => {
      state.dataSource = state.dataSource.map((value) => {
        if (value.key === state.selectedRow.key) {
          return state.selectedRow;
        }
        return value;
      });
      state.selectedRow = null;
    },

    onChange: (state, { payload }) => {
      state.selectedRow = {
        ...state.selectedRow,
        ...payload,
      };
    },

    onAdd: (state, { payload }) => {
      (state.dataSource = [...state.dataSource, payload]), payload;
    },
  },
});

export default tableSlice.reducer;
export const { onDelete, onSelect, onSave, onChange, onAdd } =
  tableSlice.actions;
