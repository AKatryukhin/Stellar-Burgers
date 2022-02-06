import styles from "./form.module.css";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import useFormAndValidation from "../hooks/useFormAndValidation";
import { useDispatch, useSelector } from "react-redux";
import { RESET_PASSWORD_REQUEST } from "../services/actions/types";

export const ForgotPassword = () => {
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  const dispatch = useDispatch();

  const { email } = values;

  const navigate = useNavigate();
  const isResetPasswordSuccess = useSelector(
    (state) => state?.password.isResetPasswordSuccess
  );

  useEffect(() => {
    isResetPasswordSuccess && navigate("/reset-password");
  }, [isResetPasswordSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: RESET_PASSWORD_REQUEST,
      payload: email,
    });
  };

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit} name="login-form">
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>
        {/*<span className={`text text_type_main-default ${styles.inputError}`}>{errors.name}</span>*/}
        <div className={`mb-6 ${styles.inputWrap}`}>
          <EmailInput
            type={"email"}
            placeholder={"Укажите E-mail"}
            value={email || ""}
            name={"email"}
            error={false}
            errorText={"Введите корректное значение"}
            onChange={handleChange}
          />
        </div>
        <div className="mb-20">
          <Button type="primary" size="medium">
            Восстановить
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <Link to={"/login"} className={styles.link}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};
