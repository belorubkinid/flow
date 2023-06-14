import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './CartItem.css';
import { 
  incrementItemToCart, 
  decrementItemToCart, 
  DeleteItemToCart } from '../../redux/actionCreate/userActionCreate';


function CartItem({ item }) {

  const dispatch = useDispatch();
  const [ stateId ] = useState(item.bouquet.id);


  function incrementItem(id) {
    dispatch(incrementItemToCart(id));
  }

  function decrementItem(id) {
    dispatch(decrementItemToCart(id));
  }
  function deleteItem(id) {
    dispatch(DeleteItemToCart(id));
  }

  return (
    <div className='cart-item-card'>

      <div className='cart-item-card-img-box'>
        <img className='cart-item-card-img' src={`${process.env.REACT_APP_SERVER_URL}/${item.bouquet.img}`} alt="bouquet" />
      </div>

      <div className='cart-item-card-content'>
        <div className='cart-item-card--name'>{item.bouquet.title}</div>
        <div className='cart-item-card--price'>{item.bouquet.price} руб.</div>
        <div className='cart-item-card--id'>id товара: {item.bouquet.id}</div>
        
        <div className='box-counter-delete'>
          <div data-min="1" className="counter-cart">

            <button className="minus" type="button" onClick={() => decrementItem(stateId)}>
              <svg width="16" height="1" viewBox="0 0 16 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="0.5" x2="16" y2="0.5" stroke="#292929">
                </line>
              </svg>
            </button>
            
            <input className="counter_input-fild" value={item.count} readOnly />

            <button className="plus" type="button" onClick={() => incrementItem(stateId)}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="7.5" x2="15" y2="7.5" stroke="#292929"></line>
                <line x1="7.5" y1="2.18557e-08" x2="7.5" y2="15" stroke="#292929"></line>
              </svg>
            </button>

          </div>
          <button className="cart-item-btn-delete" onClick={() => deleteItem(stateId)}>Удалить</button>
        </div>
      </div>

    </div>
  );
}

export default CartItem;
