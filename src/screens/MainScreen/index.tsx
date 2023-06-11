import { FC, useMemo } from 'react';

import { SelectableTable } from '../../components/unsorted/SelectableTable';
import { TableTile } from '../../components/unsorted/SelectableTable/types';
import { dummyCharacters } from '../../utils/dummyCharacters';

export const MainScreen: FC = () => {
  const tableItems: TableTile[] = useMemo(
    () =>
      dummyCharacters.map((character) => ({
        id: character.id,
        icon: character.iconSrc,
      })),
    [dummyCharacters],
  );
  return (
    <div>
      <h1>Select your fighter</h1>
      <div>
        <div>Left character</div>
        {/* <SelectableTable
          items={tableItems}
          columns={2}
          activeCell={{ rowIndex: 0, cellIndex: 1 }}
        /> */}
        <div>Right character</div>
      </div>
      <div>Kombat zone: soul chamber</div>
    </div>
  );
};
