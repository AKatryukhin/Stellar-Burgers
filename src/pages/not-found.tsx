import { FC } from "react";
import styles from "./not-found.module.css";
import { Link } from "react-router-dom";

export const NotFound: FC = () => {

  return (
    <section className={styles.wrap}>
      <div className={styles.container}>
        <p className="text text_type_main-large mb-4"
           style={{fontSize: 150}}
        >
          404 Error
        </p>
        <p className="text text_type_main-large mb-4">
          такой страницы не существует
        </p>
        <p>проверьте адрес или перейдите на Главную   <Link to='/' className={styles.link}>Homepage</Link></p>
      </div>
    </section>
  );
}

//   const pathSegmentsToKeep = 1;
//   const l = window.location;
// {l.href === 'https://akatryukhin.github.io/stellar-burgers/' &&
//   l.replace(
//   l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
//   l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
//   l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
//   (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
//   l.hash
//   );}