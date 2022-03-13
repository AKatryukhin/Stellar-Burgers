import store from "../store";
import { TAuthActions } from "../actions/actionsAuth";
import { TIngredientsActions } from "../actions/actionsIngredient";
import { TOrderActions } from "../actions/actionsOrder";
import { TPasswordActions } from "../actions/actionsPassword";
import { TSelectIngredientsActions } from "../actions/actionsSelectIngredient";

export type RootState = ReturnType<typeof store.getState>;
export type TApplicationActions =
  | TAuthActions
  | TIngredientsActions
  | TOrderActions
  | TPasswordActions
  | TSelectIngredientsActions;
