import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleAllChanges, switchOneChangesFilter } from '../../redux/changesFilterSlice';
import { renewTicketsCount } from '../../redux/ticketsSlice';

import styles from './mainFilter.module.scss';

const mainFilter = () => {
  const changes = useSelector((state) => state.changesFilter.changes);
  const dispatch = useDispatch();
  const onChange = (item) => {
    dispatch(renewTicketsCount());
    if (item.id > -1) {
      return dispatch(switchOneChangesFilter(item.id));
    }
    return dispatch(toggleAllChanges(item.id));
  };
  const changesCheckBox = changes.map((item) => (
    <div className={styles.filter} key={item.id}>
      <input
        type="checkbox"
        id={item.id}
        name="changes"
        value={item.id}
        checked={item.checked}
        onChange={() => onChange(item)}
      />
      <label htmlFor={item.id}>{item.label}</label>
    </div>
  ));
  return (
    <div className={styles.mainFilter}>
      <span className={styles.title}>Количество пересадок</span>
      <div className={styles.filters}>{changesCheckBox}</div>
    </div>
  );
};

export default mainFilter;
