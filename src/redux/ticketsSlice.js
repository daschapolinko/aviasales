/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = 'https://aviasales-test-api.kata.academy/';
const initialCount = 5;

export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${url}search`);
    if (!response.ok) throw new Error('Server Error!');
    const data = await response.json();
    return data.searchId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (searchId, { rejectWithValue, getState }) => {
    try {
      const { ticketsCount } = getState().tickets;
      const response = await fetch(`${url}tickets?searchId=${searchId}`);
      if (response.status >= 500 && response.status < 600) return { isMoreTickets: true, tickets: false };
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (!data.stop) {
        const ticketsWithId = data.tickets.map((t, index) => {
          t.id = ticketsCount + index;
          return t;
        });
        return { isMoreTickets: true, tickets: ticketsWithId };
      }
      return { isMoreTickets: false, tickets: false };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllTickets = createAsyncThunk(
  'tickets/fetchAllTickets',
  async (_, { rejectWithValue, getState, dispatch }) => {
    let { searchId } = getState((state) => state.tickets);
    if (!searchId) searchId = (await dispatch(fetchSearchId())).payload;
    let isMoreTickets = true;
    try {
      while (isMoreTickets) isMoreTickets = (await dispatch(fetchTickets(searchId))).payload.isMoreTickets;
      return 0;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    ticketsCount: 0,
    count: initialCount,
    searchId: null,
    status: null,
    error: null,
  },
  reducers: {
    addTicketsToPage: (state) => {
      state.count += initialCount;
    },
    renewTicketsCount: (state) => {
      state.count = initialCount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTickets.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllTickets.fulfilled, (state) => {
        state.status = 'resolved';
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        if (action.payload.tickets) {
          state.tickets = [...state.tickets, ...action.payload.tickets];
          state.ticketsCount += 500;
        }
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          console.error('error', action.type, action.payload, action);
          state.status = 'rejected';
          state.error = action.payload;
        }
      );
  },
});

export const { addTicketsToPage, renewTicketsCount } = ticketsSlice.actions;

export default ticketsSlice.reducer;
