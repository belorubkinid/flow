import axios from 'axios';
import OrderList from './OrderList/OrderList';
import { useState, useEffect } from 'react';
import './Order.css';

function Order({user}) {
  
  const [order, setOrder] = useState([]);
  const [orderCart, setOrderCart] = useState([]);

  useEffect(() => {
    axios(`${process.env.REACT_APP_SERVER_URL}/order/${user?.user?.id}`)
    .then(({data}) => setOrder(data));
    axios(`${process.env.REACT_APP_SERVER_URL}/cart/${user?.user?.id}`)
    .then(({data}) => setOrderCart(data));
  }, [user]);

  return (
    <div className='container-orders'>
      <div className='orders-title'>Ваши заказы</div>
        {order && order?.map((element, index) => (
          <div key={index} className='orders'>
            <OrderList order={element} cart={orderCart.filter(cart => cart?.uuid === element?.uuid)} />
          </div>
        ))}
    </div>
  );
}

export default Order;
