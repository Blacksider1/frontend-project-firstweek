import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBasket } from "../../reducers/Slice/cartSlice";
import styles from "./basket.module.scss";

const CartItem = ({ index, id, amount }) => {
  const dispatch = useDispatch();

  const basket = useSelector((state) => state.cartSlice.basket);


//   const productImage = useSelector((state) =>
//     state.products?.filter((product) => product.id === id)
//   );

  const handleSetAmountInc = () => {
  };

  const handleSetAmountDec = () => {
  };

  const handleRemove = () => {
  };

  useEffect(() => {
    dispatch(getBasket())
  }, [dispatch])

  console.log(basket);

  return (
    <div className={styles.item}>
      <div className={styles.serialNumber}>{index + 1}</div>
      {/* <div className={styles.img}>
        <img src={productImage[0].image} alt="фото товара" />
      </div>
      <div className={styles.name}>{productImage[0].name}</div>
      <div className={styles.left}>{productImage[0].left - amount}</div> */}
      <div className={styles.amount}>
        <button onClick={handleSetAmountInc}>+</button>
        <span>{amount}</span>
        <button onClick={handleSetAmountDec}>-</button>
      </div>
      <button className={styles.delete} onClick={handleRemove}>
        X
      </button>
    </div>
  );
};

export default CartItem;