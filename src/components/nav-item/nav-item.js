import styles from './nav-item.module.css';

export const NavItem = (props) => {
  return (
    <div className={`${styles.wrap} pl-5 pr-5 pb-4 pt-4`}>
      <span className='mr-2'>{props.children}</span>
      <p className={`text text_type_main-default ${props.styleInactive} mt-0 mb-0`}>{props.text}</p>
    </div>
  );
};