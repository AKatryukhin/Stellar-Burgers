import styles from "./burger-constructor-list.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { itemPropTypes } from "../../utils/types";
import bunImage from "../../images/bun-02.png";
import { useDispatch } from "react-redux";
import {
  DECREASE_COUNT,
  DELETE_SELECTED_INGREDIENT,
} from "../../services/actions/types";

export const BurgerConstructorList = ({ bun, otherIngredients }) => {
  const dispatch = useDispatch();
  const onClose = (item) => {
    dispatch({
      type: DELETE_SELECTED_INGREDIENT,
      payload: item,
    });
    dispatch({
      type: DECREASE_COUNT,
      ingredient: item,
    });
  };

  return (
    <div className={`${styles.wrap} mt-25 mb-10`}>
      <div className={`${styles.itemWrap} ml-8 no-sroll`}>
        {bun ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            key={bun.key}
          />
        ) : (
          <ConstructorElement
            className="mt-4"
            type="top"
            isLocked={true}
            text="Выберите булку"
            price=""
            thumbnail={bunImage}
          />
        )}
      </div>
      {otherIngredients.length > 0 ? (
        <ul className={`${styles.list} custom-scroll`}>
          {otherIngredients.map((i) => (
            <li key={i.key}>
              <div className={`${styles.itemWrap}`}>
                <span className="mr-3">
                  <DragIcon type="primary" className="mr-6" />
                </span>
                <ConstructorElement
                  text={i.name}
                  price={i.price}
                  thumbnail={i.image}
                  handleClose={() => onClose(i)}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={`${styles.messageWrap}`}>
          <p
            className={`${styles.message} text text_type_main-default text_color_inactive`}
          >
            Выберите начинку
          </p>
        </div>
      )}
      <div className={`${styles.itemWrap} ml-8`}>
        {bun ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        ) : (
          <ConstructorElement
            className="mt-4"
            type="bottom"
            isLocked={true}
            text="Выберите булку"
            price=""
            thumbnail={bunImage}
          />
        )}
      </div>
    </div>
  );
};

BurgerConstructorList.propTypes = {
  otherIngredients: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
  bun: itemPropTypes,
};
