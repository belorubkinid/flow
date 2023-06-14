import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CardOrderList.css';

function CartOrderList({cart}) {

  const [bouquet, setBouquet] = useState(null);

useEffect(() => {
  fetch(`${process.env.REACT_APP_SERVER_URL}/cart/bouquet`, {
    method: 'POST',
    body: JSON.stringify({ id : cart.bouquet_id }),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
  .then(res => setBouquet(res.bouquet));
}, [cart.bouquet_id]);

  return (
    <div className='order-bouquet'>
      <div className='order-bouquet-box'>
        <p className='order-bouquet-number'>Заказ: <span className='uuid'>{cart?.uuid.slice(-5)}</span></p> 
        <p className='order-bouquet-title'>{bouquet?.title}</p>
        <Link to={`/card/${bouquet?.id}`}>
          {bouquet ? <img width="100" src={`${process.env.REACT_APP_SERVER_URL}/${bouquet?.img}`} alt="dsa" /> : <></>}
        </Link>
        <p className='order-bouquet-count'>{cart?.count} шт.</p>
      </div>
    </div>
  );
}

export default CartOrderList;
