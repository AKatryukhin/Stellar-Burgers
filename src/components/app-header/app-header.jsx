import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Nav } from '../nav/nav';
import { NavItem } from '../nav-item/nav-item';
import { Link } from "react-router-dom";

export const AppHeader = () => {
  return (
    <header className={`${styles.pageHeader}`}>
      <Nav>
        <ul className={ styles.linksWrap }>
          <li className='mr-2'><NavItem text = 'Конструктор' ><BurgerIcon type="primary"/></NavItem></li>
          <li><NavItem text='Лента заказов' styleInactive='text_color_inactive'><ListIcon type="secondary" /></NavItem></li>
        </ul>
        <span className={styles.logo}>
          <Logo />
        </span>
        <Link to="/profile">
          <NavItem text='Личный кабинет' styleInactive='text_color_inactive'><ProfileIcon type="secondary" /></NavItem>
        </Link>

      </Nav>
    </header>
  )
};