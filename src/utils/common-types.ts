export type TIngredientType = "bun" | "sauce" | "main" | string;

export interface IIngredientData {
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number | null;
  key?: string;
  count?: number | null;
  index?: number;
}

export interface ILocationState {
  from: {
    pathname: string;
  };
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: undefined;
  background: ILocationState;
}
