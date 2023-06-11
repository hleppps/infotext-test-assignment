import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/ui/Button';
import { Paths } from '../../utils/constants';
import styles from './styles.module.scss';

export const NotFoundScreen: FC = () => {
  const navigate = useNavigate();

  const handleNavigateToHomePage = () => {
    navigate(Paths.HOME);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Page does not exist!</h1>
      <Button onClick={handleNavigateToHomePage}>Go to home page</Button>
    </div>
  );
};
