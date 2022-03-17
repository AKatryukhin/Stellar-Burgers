import React, {FC} from 'react';
import style from "./order-list.module.css"
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import { OrderListProps } from "./order-list.props";


export const OrderList: FC<OrderListProps> = ({children,link}) => {

  const Order: FC = (elem) => {

    return (
      // @ts-ignore
      <Link to={{ pathname: `/${link}/${elem._id}`}}>
        <div className={style.order__container}>
          <div className={style.info}>
            <p className="text text_type_digits-default">number</p>
            <p className={`text text_type_main-default text_color_inactive ${style.date}`}>10</p>
          </div>
          <h3 className='text text_type_main-medium' style={{marginLeft: 24}}>name</h3>
          <div className={style.desc}>
            <div className={style.images}>
                    <div className={style.last}>
                      <img src={''} className={`${style.image}`} style={{opacity: 0.3}}/>
                      <p className={`text text_type_main-default ${style.amt}`}>11</p>
                    </div>
            </div>
            <div className={style.finalPrice}>
              <p className="text text_type_digits-default">
                Price
              </p>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
        </div>
      </Link>
    )
  }
  return (
    <div className={style.feed}>
        <Order />
    </div>
  )
}