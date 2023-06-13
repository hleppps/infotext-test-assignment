import { FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { VersusCode } from '../../../types/global';
import { SelectedCharacterSection } from '../../components/unsorted/SelectedCharacterSection';
import { VersusCodeSelector } from '../../components/unsorted/VersusCodeSelector';
import { PlayersContext } from '../../context/playersContext';
import { getVersusCodes } from '../../utils/api/versusCodeService';
import { Paths } from '../../utils/constants';
import styles from './styles.module.scss';

export const VersusScreen: FC = () => {
  const navigate = useNavigate();
  const { players, charactersSelected } = useContext(PlayersContext);
  const [versusCodes, setVersusCodes] = useState<VersusCode[]>([]);

  useEffect(() => {
    getVersusCodes().then((fetchedVersusCodes) => {
      setVersusCodes(fetchedVersusCodes);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Battle</h1>
      <h2 className={styles.subtitle}>Loading...</h2>
      <div className={styles.content}>
        <SelectedCharacterSection
          title="Player 1"
          character={{
            imageSrc: players[0]?.character?.iconSrc,
            name: players[0]?.character?.name,
          }}
        />
        <div className={styles.versusCodeSelector}>
          <h1 className={styles.title}>VS</h1>
          <VersusCodeSelector versusCodes={versusCodes} />
        </div>
        <SelectedCharacterSection
          title="Player 2"
          character={{
            imageSrc: players[1]?.character?.iconSrc,
            name: players[1]?.character?.name,
          }}
        />
      </div>
    </div>
  );
};
