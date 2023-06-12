export type Character = {
  id: number | string;
  name: string;
  iconSrc: string;
  disabled?: boolean;
};

export type Player = {
  id: number | string;
  character: Character | null;
};
