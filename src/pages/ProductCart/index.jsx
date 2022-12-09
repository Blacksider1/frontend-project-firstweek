import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBasket } from '../../reducers/Slice/cartSlice';
import style from "../StylesPage/ProductPage.module.scss";


const ProductCart = ({item}) => {

    const dispatch = useDispatch();
    const basketId = useSelector((state) => state.cartSlice.basket._id);
    const basket = useSelector((state) => state.cartSlice.basket);

    const addToBasket = (id) => {
        dispatch(addBasket({basketId, id}))
       }

       const onCart = basket.products?.find(el => el.productId === item._id)
       console.log('ONCART',onCart)

    return (
        <div className={style.itemProduct}>
        <div>
          <img className={style.img} src={item.img} alt="f" />
        </div>
        <p className={style.ItemName}>{item.name}</p>
        <div className={style.priceAndButton}>
          {" "}
          <p className={style.ItemPrice}>{item.price}₽</p>{" "}
          <button disabled={onCart} onClick={() => addToBasket(item._id)} className={style.basketButton}>{onCart ? 'В корзине' : "В корзину"}</button>
        </div>
      </div>
    );
};

export default ProductCart;