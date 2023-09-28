import React from 'react';
import { useSelector } from 'react-redux';
import { add, format, parseISO } from 'date-fns';

import styles from './ticket.module.scss';

function Ticket({ carrier, price, segments }) {
  const changes = useSelector((state) => state.changesFilter.changes);
  const changesLabel = (f) => changes.find((filter) => filter.id === f).label;
  const flights = segments.map((f) => (
    <div className={styles.flight} key={f.origin}>
      <div className={styles.info}>
        <span className={styles.label}>
          {f.origin} – {f.destination}
        </span>
        {format(parseISO(f.date), 'kk:mm')} – {format(add(parseISO(f.date), { minutes: f.duration }), 'k:mm')}
      </div>
      <div className={styles.info}>
        <span className={styles.label}>В пути</span>
        {Math.floor(f.duration / 60)}ч {Math.floor(f.duration % 60)}м
      </div>
      <div className={styles.info}>
        <span className={styles.label}>{changesLabel(f.stops.length)}</span>
        {f.stops.join(', ')}
      </div>
    </div>
  ));
  return (
    <div className={styles.ticket}>
      <div className={styles.header}>
        {price} Р
        <img src={`https://pics.avs.io/110/36/${carrier}.png`} alt={carrier} />
      </div>
      {flights}
    </div>
  );
}

export default Ticket;
