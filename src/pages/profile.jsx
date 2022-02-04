import styles from "./profile.module.css";
import {
  Link,
  useNavigate,
  useRouteMatch,
  Navigate,
  useMatch,
} from "react-router-dom";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import useFormAndValidation from "../hooks/useFormAndValidation";

export const Profile = () => {
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  const { name, email, password } = values;

  // const navigate = useNavigate();
  // const { path } = useMatch(path);

  const onSubmit = () => {};

  return (
    <section className={styles.wrap}>
      <div className={`mr-15 ${styles.menu}`}>
        <nav>
          <ul className={styles.list}>
            <li className="pt-6 pb-4">
              <Link to="/profile" className={styles.link}>
                <p className={`text text_type_main-medium ${styles.textColor}` } >
                  {/*className={`text text_type_main-medium ${path !== "/profile" && 'text_color_inactive'}`}>*/}
                  Профиль
                </p>
              </Link>
            </li>
            <li className="pt-6 pb-4">
              <Link to="/profile/orders" className={styles.link}>
                <p
                  className={`text text_type_main-medium text_color_inactive`}
                  // className={`text text_type_main-medium ${path !== "/profile/orders" && 'text_color_inactive'}`}
                >
                  История заказов
                </p>
              </Link>
            </li>
            <li className="pt-6 pb-4">
              <Link to="/profile" className={styles.link}>
                <p
                  // onClick={}
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
      </form>
    </section>
  );
};
