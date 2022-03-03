import styles from "./form.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import React, { FC, FormEvent, useEffect } from "react";
import useFormAndValidation from "../hooks/useFormAndValidation";
import { useDispatch, useSelector } from "react-redux";
import { fetchResetPassword } from "../services/actions/actionsPassword";

export const ForgotPassword: FC = () => {
  const { values, handleChange} =
    useFormAndValidation();

  const dispatch = useDispatch();

  // @ts-ignore
  const { email } = values;

  const navigate = useNavigate();

  const isResetPasswordSuccess = useSelector(
    // @ts-ignore
    (state) => state?.password.isResetPasswordSuccess
  );

  const { accessToken } = useSelector(
    // @ts-ignore
    (state) => state?.auth);


  useEffect(() => {
    isResetPasswordSuccess && navigate("/reset-password");
  }, [isResetPasswordSuccess]);

  useEffect(() => {
    accessToken && navigate("/");
  }, [accessToken]);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(fetchResetPassword(email));
  };

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit} name="login-form">
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>
        <div className={`mb-6 ${styles.inputWrap}`}>
          <Input
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
