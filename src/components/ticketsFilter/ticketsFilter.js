import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { switchTypeOfTicketFilter } from '../../redux/ticketTypeFilterSlice';
import { renewTicketsCount } from '../../redux/ticketsSlice';

import styles from './ticketsFilter.module.scss';

function TicketsFilter() {
  const filterButtons = useSelector((state) => state.ticketTypeFilter.filterButtons);
  const active = useSelector((state) => state.ticketTypeFilter.active);
  const dispatch = useDispatch();
  const onFilterChange = (name) => {
    dispatch(renewTicketsCount());
    dispatch(switchTypeOfTicketFilter(name));
  };
  const filters = filterButtons.map(({ name, label }) => (
    <li key={name}>
      <button
        type="button"
        className={name === active ? `${styles.filter} ${styles.selected}` : `${styles.filter}`}
        onClick={() => onFilterChange(name)}
      >
        {label}
      </button>
    </li>
  ));

  return <ul className={styles.ticketsFilter}>{filters}</ul>;
}

export default TicketsFilter;
