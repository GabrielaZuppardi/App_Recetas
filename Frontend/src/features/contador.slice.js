import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cuenta: 4,
};

export const contadorSlice = createSlice({
  name: "contador",
  initialState,
    reducers: {
    incrementar: (state) => {
        //immer 
        state.cuenta ++;
    }
}
});

export const { incrementar } = contadorSlice.actions;

export default contadorSlice.reducer;