export interface Creative {
  name: string;
  device: string;
  size: string;
  id: string;
}

export interface Creatives {
  creatives: Creative[];
  addMode: Boolean;
}
