/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const ticketTypeFilterSlice = createSlice({
  name: 'ticketTypeFilter',
  initialState: {
    filterButtons: [
      { name: 'cheap', label: 'Самый дешевый' },
      { name: 'fast', label: 'Самый быстрый' },
      { name: 'optimal', label: 'Оптимальный' },
    ],
    active: 'cheap',
  },
  reducers: {
    switchTypeOfTicketFilter: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { switchTypeOfTicketFilter } = ticketTypeFilterSlice.actions;

export default ticketTypeFilterSlice.reducer;
