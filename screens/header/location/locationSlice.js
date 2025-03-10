import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pin: '',
  city: [],
  validPin: false,
  message: '',
  selectedCity: ''
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.pin = action.payload.pin;
      state.city = action.payload.city;
      state.validPin = action.payload.validPin;
      state.message = action.payload.message;
    },
    generalUpdate: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    reSetState: (state, action) => {
      state.pin = "";
      state.city = [];
      state.validPin = false;
      state.message = "";
      state.selectedCity = "";
    }
  }
});

export const { setLocation, generalUpdate,reSetState } = locationSlice.actions;

export default locationSlice.reducer;
