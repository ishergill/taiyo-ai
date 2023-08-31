export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export enum PageEnum {
  list,
  add,
  edit,
  chart,
  map,
}
