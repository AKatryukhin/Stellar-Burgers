import React, { FC, FormEvent, useEffect } from "react";
import styles from "./form.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useFormAndValidation from "../hooks/useFormAndValidation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "../services/hooks";
import { login } from "../services/actions/actionsAuth";

export const Login: FC = () => {
  const { values, handleChange, isValid, setValues } =
    useFormAndValidation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password } = values;
  const location = useLocation();
  const { accessToken } = useSelector((state) => state?.auth);
  useEffect(() => {
    location.state
      // @ts-ignore
      ? accessToken && navigate(location.state.from)
      : accessToken && navigate("/");
  }, [accessToken]);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    isValid && handleLogin({ email, password });
    setValues({});
  };
//TODO
  // @ts-ignore
  const handleLogin = ({ email, password }) => {
    dispatch(login(email, password));
  };

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit} name="login-form">
        <h1 className="text text_type_main-medium mb-6">Вход</h1>
        <div className={`mb-6 ${styles.inputWrap}`}>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            value={email || ""}
            name={"email"}
            error={false}
            errorText={"Введите корректное значение"}
            onChange={handleChange}
          />
        </div>
        <div className={`mb-6 ${styles.inputWrap}`}>
          <PasswordInput
            value={password || ""}
            name={"password"}
            size={"default"}
            onChange={handleChange}
          />
        </div>
        <div className="mb-20">
          <Button type="primary" size="medium">
            Войти
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вы — новый пользователь?{" "}
          <Link to={"/register"} className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{" "}
          <Link to={"/forgot-password"} className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </form>
    </div>
  );
};
