import { FC } from 'react';

import styles from './styles.module.scss';

export type CharacterTileProps = {
  imageSrc: string;
};

export const CharacterTile: FC<CharacterTileProps> = ({ imageSrc }) => {
  return (
    <div className={styles.tile}>
      <img className={styles.tileImage} src={imageSrc} alt="Character" />
    </div>
  );
};
