import { configureStore } from '@reduxjs/toolkit';

import ticketTypeFilterReducer from './ticketTypeFilterSlice';
import changesFilterReducer from './changesFilterSlice';
import ticketsSlice from './ticketsSlice';

const store = configureStore({
  reducer: {
    ticketTypeFilter: ticketTypeFilterReducer,
    changesFilter: changesFilterReducer,
    tickets: ticketsSlice,
  },
});

export default store;
