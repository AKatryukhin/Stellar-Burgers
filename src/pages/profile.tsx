import styles from "./profile.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useFormAndValidation from "../hooks/useFormAndValidation";
import { useDispatch, useSelector } from "react-redux";
import { FC, FormEvent, SyntheticEvent, useEffect } from "react";
import { getCookie } from "../utils/cookie";
import Preloader from "../components/preloader/preloader";
import {
  getInfoUser,
  logout,
  updateInfoUser,
} from "../services/actions/actionsAuth";

export const Profile: FC = () => {
  const { values, handleChange, isValid, setValues } =
    useFormAndValidation();

  // @ts-ignore
  const { name, email, password } = values;
  const dispatch = useDispatch();
  const location = useLocation();
  const refreshToken = getCookie("refreshToken");
  const accessToken = getCookie("accessToken");
  const navigate = useNavigate();
  // @ts-ignore
  const stateName = useSelector((state) => state?.auth.name);
  // @ts-ignore
  const stateEmail = useSelector((state) => state?.auth.email);
  useEffect(() => {
    setValues({
      name: stateName,
      email: stateEmail,
    });
  }, [stateName, stateEmail]);

  useEffect(() => {
    dispatch(getInfoUser(accessToken, refreshToken));
  }, []);

  useEffect(() => {
    !accessToken && navigate("/login", { replace: true });
  }, [accessToken]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateInfoUser(name, email, accessToken, refreshToken));
  };

  const onReset = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    setValues({
      name: stateName,
      email: stateEmail,
      password: "",
    });
  };
  const handleLogout = () => {
    dispatch(logout(refreshToken));
  };


  const { getUserInfoRequest, updateUserRequest } = useSelector(
    // @ts-ignore
    (state) => state?.auth
  );

  return (
    <section className={styles.wrap}>
      {getUserInfoRequest && <Preloader />}
      {updateUserRequest && <Preloader />}
      {!getUserInfoRequest && !updateUserRequest && (
        <div className={styles.container}>
          <div className={`mr-15 ${styles.menu}`}>
            <nav>
              <ul className={styles.list}>
                <li className="pt-6 pb-4">
                  <Link to="/profile" className={styles.link}>
                    <p
                      className={`text text_type_main-medium ${
                        location.pathname !== "/profile"
                          ? "text_color_inactive"
                          : `${styles.textColor}`
                      }`}
                    >
                      Профиль
                    </p>
                  </Link>
                </li>
                <li className="pt-6 pb-4">
                  <Link to="/profile/orders" className={styles.link}>
                    <p
                      className={`text text_type_main-medium ${
                        location.pathname !== "/profile/orders"
                          ? "text_color_inactive"
                          : `${styles.textColor}`
                      }`}
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
            <p
              className={`text text_type_main-default text_color_inactive mt-20`}
            >
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
                name={"password"}
                error={false}
                disabled={false}
                errorText={"Ошибка"}
                size={"default"}
              />
            </div>
            {isValid && (
              <div className={`${styles.buttons} mt-6`}>
                <Button type="primary" size="medium" onClick={onReset}>
                  Отмена
                </Button>
                <Button type="primary" size="medium" onClick={onSubmit}>
                  Сохранить
                </Button>
              </div>
            )}
          </form>
        </div>
      )}
    </section>
  );
};
