import { FC } from 'react';

import spinnerImage from '../../../assets/images/spinner.gif';
import styles from './styles.module.scss';

export const Spinner: FC = () => {
  return (
    <div className={styles.container}>
      <img src={spinnerImage} alt="Spinner" />
    </div>
  );
};
