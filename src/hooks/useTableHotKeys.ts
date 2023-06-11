import { useHotkeys } from 'react-hotkeys-hook';
import { Keys } from 'react-hotkeys-hook/dist/types';

import { HotkeysScopes } from '../utils/constants';

export const useTableHotKeys = (key: Keys, callback: () => void) => {
  useHotkeys(key, callback, {
    scopes: [HotkeysScopes.TABLE],
  });
};
