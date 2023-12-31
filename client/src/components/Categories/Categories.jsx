import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import './Categories.css';

function Categories(props) {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state);
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/categories`)
    .then((res) => res.json())
    .then(result => dispatch({
      type: 'INIT_CATEGORIES',
      payload: result
    }))
    .catch(err => console.log(err))
  },[dispatch]);
  
  return (
    <>
      <div className='category-container'>
        <div className='container'>
          <div className='category-box'>
            { categories && categories.map((category) =>
            <Link key={uuidv4()} className='category-link' to={`/categories/${category.id}`}>
              <div className="category-cart-wrapper">
                  <img className='category-img' width="30" height="30" src={`${process.env.REACT_APP_SERVER_URL}${category.icon}`} alt="icons" />
                  <h3 className='category-name'>{category.name}</h3>
              </div>
            </Link>
            )}
          </div>
        </div>
    </div>
   </>
  );
}

export default Categories;
