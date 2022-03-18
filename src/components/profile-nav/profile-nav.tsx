import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "../../services/hooks";

import styles from "./ProfileNav.module.css";
import { getCookie } from "../../utils/cookie";
import { logout } from "../../services/actions/actionsAuth";


const ProfileNav: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const refreshToken = getCookie("refreshToken") || '';

  const handleLogout = () => {
    refreshToken &&
    dispatch(logout(refreshToken));
  };

  return (
    <div className={`mr-15 ${styles.menu}`}>
      <nav>
        <ul className={styles.list}>
          <li className="pt-6 pb-4">
            <Link to="/profile" className={styles.link}>
              <p
                className={`text text_type_main-medium text_color_inactive ${
                  location.pathname === "/profile" && styles.textActive
                }`}
              >
                Профиль
              </p>
            </Link>
          </li>
          <li className="pt-6 pb-4">
            <Link to="/profile/orders" className={styles.link}>
              <p
                className={`text text_type_main-medium text_color_inactive ${
                  location.pathname === "/profile/orders" && styles.textActive
                }`}
              >
                История заказов
              </p>
            </Link>
          </li>
          <li className="pt-6 pb-4">
            <p
              onClick={() => handleLogout()}
              className={`${styles.link} text text_type_main-medium text_color_inactive`}
            >
              Выход
            </p>
          </li>
        </ul>
      </nav>
      <p className={`text text_type_main-default text_color_inactive mt-20`}>
        В этом разделе вы можете &nbsp; изменить свои персональные данные
      </p>
    </div>
  );
};

export default ProfileNav;