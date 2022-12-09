import ContactsComponent from "../components/Contacts";
import SideMenuMainPage from "../components/SideMenuMainPage";
import Footer from "../MainMenu/footer/Footer";
import style from "./StylesPage/ProductPage.module.scss";
import logoUser from "../MainMenu/files/logoUser.svg";
import logoBasket from "../MainMenu/files/logoBasket.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCategory } from "../reducers/Slice/categorySlice";
import { fetchProducts } from "../reducers/Slice/productSlice";
import Menu from "../MainMenu/OpenMenu/Menu";
import Basket from '../components/Basket'
import { addBasket, getBasket } from "../reducers/Slice/cartSlice";
import ProductCart from "./ProductCart";



function ProductPage() {

  const dispatch = useDispatch();
  const category = useSelector((state) => state.reducerCategory.category);
  const products = useSelector((state) => state.reducerProduct.products);
  const error = useSelector((state) => state.reducerProduct.error);



  const [menuWindow, setMenuWindow] = useState(false);
  const [modalWindow, setModalWindow] = useState(false);
  const [basketWindow, setbasketWindow] = useState(false)
  console.log(products);

  if (error) {
    <h1>{error}</h1>;
  }
  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchProducts());
    dispatch(getBasket())
  }, [dispatch]);


  return (
    <>
      <div className={style.mainProductPage}>
       
       <SideMenuMainPage  setMenuWindow={setMenuWindow}
          menuWindow={menuWindow} />
        
        <div className={style.openMenuWindow}>
          {" "}
          {menuWindow ? (
            <Menu setMenuWindow={setMenuWindow} menuWindow={menuWindow} />
          ) : null}
        </div>
        <div className={style.content}>
          <div className={style.categories}>
            {category.map((item) => (
              <button className={style.category}>{item.name}</button>
            ))}
          </div>
          <div className={style.products}>
            {products.map((item) => <ProductCart item={item}/>)}
          </div>
        </div>
        <header className={style.contentMenuProduct}>
          <img src={logoUser} alt="d" />
          {/* <img src={logoBasket} alt="d" onClick={handleOpenBasket} /> */}
          <Basket/>
        </header>
      </div>

      <div>
        <ContactsComponent />
      </div>
      <Footer />
      <div></div>
    </>
  );
}

export default ProductPage;
