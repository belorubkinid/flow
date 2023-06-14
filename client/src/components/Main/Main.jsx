import Categories from '../Categories/Categories';
import Slider from '../Slider/Slider';
import YandexMap from '../YandexMap/YandexMap';
import BouquetListMain from '../BouquetListMain/BouquetListMain'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';

function Main() {
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])
  return (
    <>
      <Slider />
      <Categories />
      <BouquetListMain />
      <YandexMap />
    </>
  );
}

export default Main;
