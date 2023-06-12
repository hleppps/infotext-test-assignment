import { Endpoints } from '../constants';
import { client } from './client';

export const getCharacters = () => {
  return client
    .get(Endpoints.GET_CHARACTERS)
    .then((response) => response.data)
    .then((data) => data.items)
    .catch((error) => error.data);
};
