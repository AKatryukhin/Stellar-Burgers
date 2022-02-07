import styles from "./profile.module.css";
import {
  Link,
  useNavigate,
  useLocation,
  useMatch
} from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import useFormAndValidation from "../hooks/useFormAndValidation";
import {
  CHANGE_PASSWORD_REQUEST,
  GET_LOGIN_REQUEST,
  GET_LOGOUT_REQUEST,
  GET_USER_INFO_REQUEST
} from "../services/actions/types";
import { useDispatch, useSelector } from "react-redux";
import { deleteCookie, getCookie, setCookie } from "../utils/cookie";
import { useEffect } from "react";
// import { useMatch } from "react-location";

export const Profile = () => {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const { name, email, password } = values;
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);
  // const navigate = useNavigate();
  // console.log(navigate)

  const refreshToken = getCookie('refreshToken');
  const accessToken = getCookie('accessToken');
  const { tokenUpdateSuccess } = useSelector(state => state?.auth);
  const stateName = useSelector(state => state?.auth.name);
  const stateEmail = useSelector(state => state?.auth.email);
  useEffect(() => {
    setValues(
      {
        name: stateName,
        email: stateEmail
      }
    );
  }, [stateName, stateEmail]);

  useEffect(() => {
    tokenUpdateSuccess &&
    setCookie("refreshToken", refreshToken);
    setCookie("accessToken", accessToken);
  }, [tokenUpdateSuccess]);

  useEffect(() => {
    dispatch({
      type: GET_USER_INFO_REQUEST,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });

  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: CHANGE_PASSWORD_REQUEST,
      payload: email,
    });
  };
  const onReset = (e) => {
    e.preventDefault();
    resetForm();
  }
  const handleLogout = () => {
    dispatch({
      type: GET_LOGOUT_REQUEST,
      token: refreshToken,
    });
    deleteCookie("accessToken");
    deleteCookie("refreshToken")
  };

  return (
    <section className={styles.wrap}>
      <div className={`mr-15 ${styles.menu}`}>
        <nav>
          <ul className={styles.list}>
            <li className="pt-6 pb-4">
              <Link to="/profile" className={styles.link}>
                  <p className={`text text_type_main-medium ${location.pathname !== "/profile" ? 'text_color_inactive' : `${styles.textColor}`}`}>
                  Профиль
                </p>
              </Link>
            </li>
            <li className="pt-6 pb-4">
              <Link to="/profile/orders" className={styles.link}>
                <p
                  className={`text text_type_main-medium ${location.pathname !== "/profile/orders" ? 'text_color_inactive' : `${styles.textColor}`}`}
                >
                  История заказов
                </p>
              </Link>
            </li>
            <li className="pt-6 pb-4">
              <Link to="/profile" className={styles.link}>
                <p
                  onClick={handleLogout}
                  className={`text text_type_main-medium text_color_inactive`}
                >
                  Выход
                </p>
              </Link>
            </li>
          </ul>
        </nav>
        <p className={`text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете &nbsp; изменить свои персональные данные
        </p>
      </div>
      <form
        noValidate
        onSubmit={onSubmit}
        className={styles.form}
        name="profile-form"
      >
        <div className={`mb-6 ${styles.inputWrap}`}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            icon={"EditIcon"}
            value={name || ""}
            name={"name"}
            error={false}
            disabled={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className={`mb-6 ${styles.inputWrap}`}>
          <Input
            type={"email"}
            placeholder={"Логин"}
            onChange={handleChange}
            icon={"EditIcon"}
            value={email || ""}
            name={"email"}
            error={false}
            disabled={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className={`mb-6 ${styles.inputWrap}`}>
          <Input
            type={"password"}
            placeholder={"Пароль"}
            onChange={handleChange}
            icon={"EditIcon"}
            value={password || ""}
            name={"name"}
            error={false}
            disabled={true}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        {
          isValid &&
          <div className={`${styles.buttons} mt-6`}>
            <Button type="primary" size="medium" onClick={onReset}>Отмена</Button>
            <Button type="primary" size="medium" onClick={onSubmit}>Сохранить</Button>
          </div>
        }

      </form>
    </section>
  );
};
