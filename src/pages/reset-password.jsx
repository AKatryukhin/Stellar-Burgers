import styles from "./form.module.css";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import useFormAndValidation from "../hooks/useFormAndValidation";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_PASSWORD_REQUEST } from "../services/actions/types";


export const ResetPassword = () => {
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { password, code } = values;
  const changePasswordFailed = useSelector(
    (state) => state?.password.changePasswordFailed
  );
  const isChangePasswordSuccess = useSelector(
    (state) => state?.password.isChangePasswordSuccess
  );
  const { accessToken } = useSelector(
    (state) => state?.auth);

  useEffect(() => {
    changePasswordFailed || !isChangePasswordSuccess && navigate("/forgot-password", { replace: true });
    isChangePasswordSuccess && navigate("/", { replace: true });
  }, [changePasswordFailed, isChangePasswordSuccess]);

  useEffect(() => {
    accessToken && navigate("/");
  }, [accessToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: CHANGE_PASSWORD_REQUEST,
      password: password,
      code: code
    });
  };

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit} name="login-form">
        <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
        {/*<span className={`text text_type_main-default ${styles.inputError}`}>{errors.name}</span>*/}
        <div className={`mb-6 ${styles.inputWrap}`}>
          <Input
            type={"text"}
            placeholder={"Введите новый пароль"}
            value={password || ""}
            name={"name"}
            error={false}
            errorText={"Введите корректное значение"}
            onChange={handleChange}
          />
        </div>
        <div className={`mb-6 ${styles.inputWrap}`}>
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            value={code || ""}
            name={"code"}
            error={false}
            errorText={"Введите корректное значение"}
            onChange={handleChange}
          />
        </div>
        <div className="mb-20">
          <Button type="primary" size="medium">
            Сохранить
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
}