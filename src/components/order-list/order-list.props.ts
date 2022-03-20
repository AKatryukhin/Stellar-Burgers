import { IOrders, IOrdersFeed } from "../../services/types/data-types";

export interface OrderListProps {
    link: string;
    orders: Array<IOrders>
}

export type TOrder = {
    elem: IOrdersFeed;
};
