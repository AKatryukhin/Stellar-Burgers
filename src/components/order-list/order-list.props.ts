import { IOrders, IOrdersFeed } from "../../services/types/data-types";
import React from "react";

export interface OrderListProps {
    link?: string;
    orders: Array<IOrders>;
    children?:  React.ReactNode
}

export type TOrder = {
    elem: IOrdersFeed;
};
