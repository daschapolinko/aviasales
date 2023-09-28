/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialValues = [0, 1, 2, 3];

const changesFilterSlice = createSlice({
  name: 'changesFilter',
  initialState: {
    changes: [
      { id: -2, label: 'Все', checked: true },
      { id: 0, label: 'Без пересадок', checked: true },
      { id: 1, label: '1 пересадка', checked: true },
      { id: 2, label: '2 пересадки', checked: true },
      { id: 3, label: '3 пересадки', checked: true },
    ],
    values: initialValues,
  },
  reducers: {
    switchOneChangesFilter: (state, action) => {
      const editingChange = state.changes.find((filter) => filter.id === action.payload);
      if (state.values.length === 4) state.changes[0].checked = false;
      !editingChange.checked
        ? (state.values = state.values.concat(action.payload))
        : state.values.splice(state.values.indexOf(action.payload), 1);
      editingChange.checked = !editingChange.checked;
      if (state.values.length === 4) state.changes[0].checked = true;
    },
    toggleAllChanges: (state) => {
      state.changes = state.changes.map((filter) => ({ ...filter, checked: !state.changes[0].checked }));
      state.values = !state.changes[0].checked ? [] : initialValues;
    },
  },
});

export const { switchOneChangesFilter, toggleAllChanges } = changesFilterSlice.actions;

export default changesFilterSlice.reducer;
