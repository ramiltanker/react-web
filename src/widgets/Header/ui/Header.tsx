import { Typography } from '@mui/material';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

interface Route {
  label: string;
  path: string;
}

const routes: Route[] = [
  {
    label: 'Создание PDF',
    path: '/create-user-card'
  },
  {
    label: 'Динамическая пагинация',
    path: '/dynamic-pagination'
  }
];

const Header = memo(() => {
  return (
    <header>
      <nav>
        <ul className={styles.navList}>
          {routes.map(({ label, path }) => {
            return (
              <Link to={path} key={path}>
                <Typography>{label}</Typography>
              </Link>
            );
          })}
        </ul>
      </nav>
    </header>
  );
});

export { Header };
