import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ButtonBuy from '../ButtonBuy/ButtonBuy';
import AccordionList from '../Accordion/AccordionList';
import "./CardPage.css";
import { useState } from 'react';
import ModalBuy from '../Modal/ModalBuy';

function CardPage() {
  const [switchBtn, setSwitchBtn] = useState(false);
  if(switchBtn) {
    setTimeout(() => setSwitchBtn(false), 1500);
  }

  const { id } = useParams();
  const { bouquets } = useSelector((state) => state);
  const bouquet = bouquets.find((el) => el.id === +id);
 
  return (
    <div className='card-container'>
      <div className='container'>
          <div className="cardPage-wrapper">
            <div className="cardPage-box-img">
              <img className="cardPage-img" width="100%" height="100%" src={`${process.env.REACT_APP_SERVER_URL}/${bouquet?.img}`} alt="b-main"></img>
            </div>
            <div className="cardPage-info-content">
              <p className="cardPage-title">{bouquet?.title}</p>
              <p className="cardPage-price">{bouquet?.price} руб.</p>
              <p className='cardPage-description-title'>Описание</p>
              <h4 className="cardPage-description">{bouquet?.description}</h4>
              <p className='cardPage-description-instruction'>Инструкция свежести</p>
              <AccordionList />
              <div className="cardPage-button-wrapper">
              {switchBtn && <ModalBuy />}
              <ButtonBuy key={bouquet.id} setSwitchBtn={setSwitchBtn} bouquet={bouquet} />
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default CardPage;
