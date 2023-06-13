import { VersusCode } from '../../../types/global';
import { Endpoints } from '../constants';
import { client } from './client';

export const getVersusCodes = (): Promise<VersusCode[]> => {
  return client
    .get(Endpoints.VERSUS_CODES)
    .then((response) => response.data)
    .then((data) => data.items)
    .catch((error) => error.data);
};
