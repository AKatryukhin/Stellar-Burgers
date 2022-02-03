import React from "react";
import styles from "./register.module.css";
import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useFormAndValidation from "../hooks/useFormAndValidation";
import { Link } from "react-router-dom";

export const Register = () => {
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  const { name, email, password } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    isValid &&
      handleRegister({ name, email, password }, () => {
        setValues({});
      });
  };

  const handleRegister = () => {};

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit} name="sign_form">
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        {/*<span className={`text text_type_main-default ${styles.inputError}`}>{errors.name}</span>*/}
        <div className="mb-6">
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
        {/*<span className={`text text_type_main-default ${styles.inputError}`}>{errors.email}</span>*/}
        <div className="mb-6">
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
        <div className="mb-6">
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
          <Link to={"/login"} className={"text_color_link"}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};
