import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '../CartItem/CartItem';
import { clearCart } from '../../redux/actionCreate/userActionCreate';
import ModalOrder from '../Modal/ModalOrder'
import ModalError from '../Modal/ModalError';
import { v4 as uuidv4 } from "uuid";
import './Cart.css';
import '../Modal/ModalOrder.css';


function Cart() {

  const { user, cart: {cart} } = useSelector((state) => state)
  const [method, setMethod] = useState(false)
  const [uniqId, setUniqId] = useState('')
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [today] = useState(new Date());

  
  const dispatch = useDispatch();

  const inputDate = useRef();
  const inputStreet = useRef();
  const inputHouse = useRef();
  const inputApartment = useRef();

  const handleOpen = () => setOpen(true);
  const handleOpenError = () => setError(true);
  const handleClose = () => setOpen(false);
  const handleCloseError = () => setError(false);

  useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart))
      setUniqId(uuidv4())
  }, [cart])
  
  const total = cart.reduce((sum, el) => sum + el.bouquet.price * el.count, 0);

  const sendOrderDelivery = () => {
    
    fetch(`${process.env.REACT_APP_SERVER_URL}/order/`, {
      method: 'POST',
      body: JSON.stringify({
        date: inputDate?.current?.value || today.toLocaleDateString('en-US'),
        street: inputStreet?.current?.value,
        house: inputHouse?.current?.value,
        apartment: inputApartment?.current?.value,
        user_id: user?.user?.id,
        uuid: uniqId,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(res => {
      if(res.ok) {
        cartFormation()
        setTimeout(deleteCart, 3000)
        handleOpen()
      } else {
        console.log('error');
        handleOpenError()
      }
    });
  }

  const cartFormation = () => {

    cart.map(item => fetch(`${process.env.REACT_APP_SERVER_URL}/cart`, {
      method: 'POST',
      body: JSON.stringify({ item, id: user?.user.id, uuid: uniqId}),
      headers: {
        'Content-Type': 'application/json',
      }
    }));
  }

  function deleteCart() {
    dispatch(clearCart());
  }

  return (
    <div className='container'>
      <h2 className='cart-header'>Ваша корзина { !cart.length && 'пуста'}</h2>
      <div className='cart-container'>
        <div className='cart-list-wrapper'>
          <div className='cart_item-list'>
            {cart ? cart.map((elem) =>
             <CartItem key={elem.bouquet.id} item={elem}/>) : 'Корзина пуста'}
          </div>
          {cart.length > 0 && <button className='cart-btn-clear' onClick={() => deleteCart()}>Очистить корзину</button>}
        </div>

        { cart.length >= 1 &&
          <div className='cart-wrapper'>
            <h3 className='cart-delivery-title'>Выберите способ доставки</h3>
            <div className="cart-delivery-method-box">
              <div className="cart-delivery-method" onClick={() => setMethod(0)}>Доставка</div>
              <div className="cart-delivery-method" onClick={() => setMethod(1)}>Самовывоз</div>
            </div>
            
            {method === 0 && 
              <div className="cart-box-delivery">
                <div className="cart-delivery-time-date">
                <input className="cart-delivery-date" ref={inputDate} type="datetime-local" autoComplete='off' required />
                </div>

                <div className="cart-delivery-fild">
                  <label htmlFor="street" className="cart-delivery-label">Улица</label>
                  <input className='cart-delivery-fild-street' id="street" ref={inputStreet} placeholder="" name="street" autoComplete='off' required/>
                </div>

                <div className="cart-delivery-fild">
                  <label htmlFor="house" className="cart-delivery-label">Дом</label>
                  <input className='cart-delivery-fild-house' id="house" ref={inputHouse} placeholder="" name="house" autoComplete='off' required/>
                </div>

                <div className="cart-delivery-fild">
                  <label htmlFor="apartment" className="cart-delivery-label">Квартира</label>
                  <input className='cart-delivery-fild-apartment' ref={inputApartment} placeholder="" id="apartment" name="apartment" autoComplete='off' required/>
                </div>
              </div>
            }
            <div className="cart-summ-order-title">Сумма заказа</div>

            <h3 className="cart-summ-order">{total} руб.</h3>

            <div className='cart-btns-box'>
              {open ? <ModalOrder handleClose={handleClose} setOpen={setOpen}/> : <></>}
              {error ? <ModalError handleClose={handleCloseError} setError={setError}/> : <></>}
              <button  className='cart-btn-order' onClick={() => sendOrderDelivery()}>Заказать</button>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Cart;
