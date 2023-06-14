import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Card from "../Card/Card";

function Category() {

const { bouquets, categories } = useSelector((state) => state);
const { id } = useParams();

const category = categories.find((el) => el.id === +id);
const bouquetsArray = bouquets.filter((bouquet) => bouquet.category_id === +id);

  return (
    <div className='category-container'>
      <div className='container'>
        <h1>{category?.name}</h1>
        <div className='category-box'>
        { bouquetsArray && bouquetsArray.map((bouquet) => <Card key={bouquet.id} bouquet={bouquet}/>)}
        </div>
     </div>
    </div>
  );
}

export default Category;
