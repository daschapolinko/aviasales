import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styles from './App.module.scss';
import Logo from './components/logo';
import MainFilter from './components/mainFilter';
import Tickets from './components/tickets';
import { fetchAllTickets } from './redux/ticketsSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);
  return (
    <div>
      <header className={styles.header}>
        <Logo />
      </header>
      <main>
        <MainFilter />
        <Tickets />
      </main>
    </div>
  );
}

export default App;
