import { FC } from 'react';

import { VersusCode } from '../../../../types/global';
import styles from './styles.module.scss';

export type VersusCodeSelectorProps = {
  versusCodes: VersusCode[];
};

export const VersusCodeSelector: FC<VersusCodeSelectorProps> = ({
  versusCodes,
}) => {
  const getVersusCodeTiles = (versusCodes: VersusCode[]) =>
    versusCodes.map((versusCode) => (
      <li className={styles.tableCell} key={versusCode.id}>
        <img src={versusCode.iconSrc} alt={versusCode.name} />
      </li>
    ));
  return <ul className={styles.table}>{getVersusCodeTiles(versusCodes)}</ul>;
};
