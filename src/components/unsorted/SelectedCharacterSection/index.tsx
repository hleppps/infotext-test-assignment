import { FC } from 'react';

import pedestalImage from '../../../assets/images/pedestal.svg';
import pedestalActiveImage from '../../../assets/images/pedestal-active.svg';
import styles from './styles.module.scss';

export type SelectedCharacterSectionProps = {
  character: { imageSrc?: string; name?: string };
  title?: string;
};

export const SelectedCharacterSection: FC<SelectedCharacterSectionProps> = ({
  character,
  title,
}) => {
  const { name, imageSrc } = character;
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        {title && <h3 className={styles.title}>{title}:</h3>}
        {name && <h4 className={styles.characterName}>({name})</h4>}
      </div>
      <div className={styles.content}>
        {imageSrc && (
          <div className={styles.characterContainer}>
            <img className={styles.character} src={imageSrc} alt="Character" />
          </div>
        )}
        <img
          src={imageSrc ? pedestalActiveImage : pedestalImage}
          alt="Pedestal"
        />
      </div>
    </div>
  );
};
