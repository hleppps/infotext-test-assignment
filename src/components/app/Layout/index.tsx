import { FC, ReactNode } from 'react';

import styles from './styles.module.scss';

export interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
