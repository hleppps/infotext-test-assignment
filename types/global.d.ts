export type Character = {
  id: number | string;
  name: string;
  iconSrc: string;
  disabled?: boolean;
};

export type Player = {
  number: number;
  character: Character | null;
  selecting: boolean;
};
