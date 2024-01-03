import { createSlice } from "@reduxjs/toolkit";
import { StateObj, DemoItem } from "../types/demo";

const initialState: StateObj = { data: [] };
const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    addItem(state, action) {
      state.data.push(action.payload as DemoItem);
    },
    deleteGoal(state, action) {
      const i = state.data.findIndex((x) => x.id === action.payload);
      state.data.splice(i, 1);
    },
  },
});

export const addItemAsync = (data: DemoItem) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          dispatch(demoActions.addItem(data));
          resolve(null);
        }, 1000);
      } catch (err) {
        reject(err);
      }
    });
  };
};

export const demoActions = demoSlice.actions;
export default demoSlice;
