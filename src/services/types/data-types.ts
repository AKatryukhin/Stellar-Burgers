import { TIngredientType } from "../../utils/common-types";

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
};