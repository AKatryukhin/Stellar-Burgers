export type TIngredientType = 'bun' | 'sauce' | 'main';

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
  __v: number;
  key?: string;
  count?: number;
  index: number;
}

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

