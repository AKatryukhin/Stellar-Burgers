import { IIngredientData, TIngredientType } from "../../utils/common-types";

export interface ICreateOrLoginUserResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface IUpdateTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface IResetOrChangePasswordResponse {
  success: boolean;
  message: string;
}

export interface IGetUserInfoResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}

export interface IUpdateUserInfoResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}

export interface IAllIngredientsResponse {
  success: boolean;
  data: Array<TIngredientType>;
}

export interface IOrder {
  _id: string | undefined;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string | undefined;
  updatedAt: string | undefined;
  number: number;
}

export interface IOrders {
  ingredients: Array<IIngredientData>;
  _id: string | undefined;
  owner: {
    name: string;
    email: string;
    createdAt: string | null;
    updatedAt: string | null;
  }
  status: string;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
  number: number;
  price: number;
}

// export interface IResponseOrders {
//   success: boolean;
//   orders: Array<IOrder>;
//   total: number;
//   totalToday: number;
// };

export interface IResponseOrder{
  success: boolean;
  name: string;
  order: IOrders;
}
