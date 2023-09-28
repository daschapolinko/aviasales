import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';

import TicketsFilter from '../ticketsFilter';
import Ticket from '../ticket';
import { addTicketsToPage } from '../../redux/ticketsSlice';

import styles from './tickets.module.scss';

const Filters = {
  cheap: (data) => data.sort((a, b) => a.price - b.price),
  fast: (data) =>
    data.sort(
      (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
    ),
  optimal: (data) =>
    data.sort(
      (a, b) =>
        (a.segments[0].duration + a.segments[1].duration) / a.price -
        (b.segments[0].duration + b.segments[1].duration) / b.price
    ),
};

function Tickets() {
  return (
    <div className={styles.tickets}>
      <TicketsFilter onChange={() => {}} />
      <DisplayTickets />
    </div>
  );
}

function Button({ onClick }) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      Показать еще 5 билетов!
    </button>
  );
}

function DisplayTickets() {
  const dispatch = useDispatch();

  const tickets = useSelector((state) => state.tickets.tickets);
  const ticketsCount = useSelector((state) => state.tickets.count);
  const changes = useSelector((state) => state.changesFilter.values);
  const type = useSelector((state) => state.ticketTypeFilter.active);
  const filterFunction = Filters[type];
  const status = useSelector((state) => state.tickets.status);

  const arr = tickets.filter((e) =>
    changes.includes(e.segments[0].stops.length) && changes.includes(e.segments[1].stops.length) ? e : null
  );
  if (arr.length === 0) {
    return 'Рейсов, подходящих под заданные фильтры, не найдено';
  }
  const sortArr = filterFunction(arr)
    .slice(0, ticketsCount)
    .map((ticket) => <Ticket key={ticket.id} {...ticket} />);
  return (
    <>
      {status === 'loading' ? <LinearProgress /> : null}
      {sortArr}
      {arr.length > ticketsCount && <Button onClick={() => dispatch(addTicketsToPage())} />}
    </>
  );
}

export default Tickets;
