import { useState } from 'react';
import ButtonBuy from '../ButtonBuy/ButtonBuy';
import { Link } from 'react-router-dom';
import ModalBuy from '../Modal/ModalBuy';
import "./Card.css";
import { useSelector } from 'react-redux';
import ModalRegistration from '../Modal/ModalRegistration';

function Card({ bouquet }) {
  const [switchBtn, setSwitchBtn] = useState(false);
  const { user } = useSelector((store) => store);

  if(switchBtn) {
    setTimeout(() => setSwitchBtn(false), 1500);
  }
  
  return (
    <div className="card-wrapper">
      <Link to={`/card/${bouquet.id}`}>
      <div className="card-box-img">
        <img className="card-img" width="100%" height="100%" src={`${process.env.REACT_APP_SERVER_URL}/${bouquet.img}`} alt="b-main"></img>
      </div>
      </Link>
      <div className='card-info-content'>
        <p className="card-title">{bouquet.title}</p>
        <h4 className="card-description">{bouquet.description}</h4>
        <p className="card-price">{bouquet.price} руб.</p>
      </div>
     {user ? switchBtn && <ModalBuy/> : switchBtn && <ModalRegistration />}
      <div className="card-button-wrapper">
        <ButtonBuy key={bouquet.id} setSwitchBtn={setSwitchBtn} bouquet={bouquet} />
      </div>
    </div>
  );
}

export default Card;
