import React, { useEffect } from "react";
import styles from "./form.module.css";
import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useFormAndValidation from "../hooks/useFormAndValidation";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../utils/cookie";
import { GET_LOGIN_REQUEST, GET_REGISTRATION_REQUEST } from "../services/actions/types";

export const Login = () => {
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password } = values;
  const token = getCookie("accessToken");

  useEffect(() => {
    token && navigate('/');
  }, [token])

  const handleSubmit = (e) => {
    e.preventDefault();
    isValid &&
    handleLogin({ email, password });
    setValues({});
  };

  const handleLogin = () => {
    dispatch({
      type: GET_LOGIN_REQUEST,
      email: email,
      password: password,
    });
  };

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit} name="login-form">
        <h1 className="text text_type_main-medium mb-6">Вход</h1>
        {/*<span className={`text text_type_main-default ${styles.inputError}`}>{errors.name}</span>*/}
        <div className={`mb-6 ${styles.inputWrap}`}>
          <EmailInput
            type={"email"}
            placeholder={"E-mail"}
            value={email || ""}
            name={"email"}
            error={false}
            errorText={"Введите корректное значение"}
            onChange={handleChange}
          />
        </div>
        {/*<span className={`text text_type_main-default ${styles.inputError}`}>{errors.password}</span>*/}
        <div className={`mb-6 ${styles.inputWrap}`}>
          <PasswordInput
            value={password || ""}
            name={"password"}
            size={"default"}
            type={"password"}
            error={false}
            errorText={"Введите корректное значение"}
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
