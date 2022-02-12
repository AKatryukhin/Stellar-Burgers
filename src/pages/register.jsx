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
import { getCookie, setCookie } from "../utils/cookie";
import { createUser } from "../services/actions/actionsAuth";

export const Register = () => {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
  const { name, email, password } = values;
  const navigate = useNavigate();
  const { isRegisterSuccess, refreshToken, accessToken } = useSelector(
    (state) => state?.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (isRegisterSuccess) {
      setCookie("refreshToken", refreshToken);
      setCookie("accessToken", accessToken);
      navigate("/login");
    }
  }, [isRegisterSuccess]);

  useEffect(() => {
    accessToken && navigate("/");
  }, [accessToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    isValid && handleRegister({ name, email, password });
  };

  const handleRegister = ({ name, email, password }) => {
    dispatch(createUser(name, email, password));
    setValues({});
  };
  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit} name="sign-form">
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <div className={`mb-6 ${styles.inputWrap}`}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            value={name || ""}
            name={"name"}
            error={false}
            errorText={"Введите корректное значение"}
            onChange={handleChange}
          />
        </div>
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
            Зарегистрироваться
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{" "}
          <Link to={"/login"} className={styles.link}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};
