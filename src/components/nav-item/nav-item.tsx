import styles from './nav-item.module.css';
import { FC } from "react";
import { INavItemProps } from "./nav-item.props";

export const NavItem: FC<INavItemProps> = props => (
    <div className={`${styles.wrap}`}>
      <span className='mr-2'>{props.children}</span>
      <p className={`text text_type_main-default ${props.isActive ? '' : 'text_color_inactive'}`}>{props.text}</p>
    </div>
  );