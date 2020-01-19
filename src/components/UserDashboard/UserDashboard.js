import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserServices } from '../../services/userServices/userServices';
import Paper from '@material-ui/core/Paper';
import Orders from './Orders';
import { OrderContext } from '../Context/OrderContext';

const endpoint = 'nerbcrmwp/v1/orders/';
const CancelToken = axios.CancelToken;

export default function UserDashboard(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { orderData, setOrderData, fetchOrders, setFetchOrders } = useContext(OrderContext);
  const [error, setError] = useState('');
  const source = CancelToken.source();
  useEffect(() => {
    if (fetchOrders) {
      UserServices.getByEmail(source.token, endpoint)
        .then(response => {
          if (response.data.length) {
            setOrderData(response.data);
          }
          // disable fetching of orders on re-render
          setFetchOrders(false);
          setIsLoading(false);
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            console.log('request cancelled');
          } else {
            console.log(error);
            setError('Failed to fetch data. Please contact support.');
            setIsLoading(false);
          }
        });
    } else {
      setIsLoading(false);
    }
    return () => {
      source.cancel();
    };
  }, [fetchOrders, setFetchOrders, setOrderData, source]);

  return (
    <>
      {isLoading ? (
        <div>
          <p>Retrieving orders...</p>
        </div>
      ) : (
        <div>
          {error || (
            <Paper>
              <Orders />
            </Paper>
          )}
        </div>
      )}
    </>
  );
}
