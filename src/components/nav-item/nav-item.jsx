import styles from './nav-item.module.css';

export const NavItem = props => (
    <div className={`${styles.wrap}`}>
      <span className='mr-2'>{props.children}</span>
      <p className={`text text_type_main-default ${props.isActive ? '' : 'text_color_inactive'}`}>{props.text}</p>
    </div>
  );