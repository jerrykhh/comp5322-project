import { Order, OrderItem, Product } from "../models"

export interface OrderDetails {
    order: Order;
    orderItem: OrderItem[];
    products: {[key:string]: Product};
}