import React, { useState, createContext } from 'react';

export const OrderContext = createContext();

export function OrderProvider(props) {
  const [orderData, setOrderData] = useState([]);
  const [fetchOrders, setFetchOrders] = useState(true);
  return (
    <OrderContext.Provider value={{ orderData, setOrderData, fetchOrders, setFetchOrders }}>
      {props.children}
    </OrderContext.Provider>
  );
}
