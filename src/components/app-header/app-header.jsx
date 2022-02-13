import React from "react";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Nav } from "../nav/nav";
import { NavItem } from "../nav-item/nav-item";
import { Link, useLocation } from "react-router-dom";

export const AppHeader = () => {
  const location = useLocation();
  const constructorActive = location.pathname === "/";
  const orderActive = location.pathname === "/profile/orders";
  const profileActive =
    location.pathname === "/profile" || location.pathname === "/profile/orders";

  return (
    <header className={`${styles.pageHeader}`}>
      <Nav>
        <ul className={styles.linksWrap}>
          <Link to="/" className={styles.link}>
            <li className="mr-2">
              <NavItem isActive={constructorActive} text="Конструктор">
                <BurgerIcon
                  type={constructorActive ? "primary" : "secondary"}
                />
              </NavItem>
            </li>
          </Link>
          <Link to="/profile/orders" className={styles.link}>
            <li>
              <NavItem text="Лента заказов" isActive={orderActive}>
                <ListIcon type={orderActive ? "primary" : "secondary"} />
              </NavItem>
            </li>
          </Link>
        </ul>
        <Link to="/" className={styles.link}>
        <span className={styles.logo}>
          <Logo />
        </span>
        </Link>
        <Link to="/profile" className={styles.link}>
          <NavItem text="Личный кабинет" isActive={profileActive}>
            <ProfileIcon type={profileActive ? "primary" : "secondary"} />
          </NavItem>
        </Link>
      </Nav>
    </header>
  );
};
