//   TSX   Type Script using JSX syntax
//   JSX   Java Script XML   JSX allows to write HTML

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AboutPage from "../../features/about/AboutPage";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import BasketPage from "../../features/basket/BasketPage";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Orders from "../../features/orders/Orders";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import { useAppDispatch } from "../store/configureStore";
import { getCookie } from "../util/util";
import Header from "./Header";
import LoadingComponent from "./LoadingComponent";
import RequireAuth from "./RequireAuth";


function App() {      //our COMPONENT just a Funciton returns something div.,.

  //const {setBasket} = useStoreContext();  { what we NEED from CONTEXT }  is setBasket
  const dispatch = useAppDispatch(); //INSTEAD setBasket(bskt) from StoreContext dispatch(setBasket(bskt))
  const [loading, setLoading] = useState(true);


  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    initApp().then(() => setLoading(false));
  }, [initApp])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message="Initialising app..." />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/catalog/:id' element={<ProductDetails />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/server-error' element={<ServerError />} />
          <Route path='/basket' element={<BasketPage />} />
          <Route
            path='/checkout'
            element={
              <RequireAuth>
                < CheckoutWrapper/>
              </RequireAuth>
            }
          />
          <Route
            path='/orders'
            element={
              <RequireAuth>
                < Orders/>
              </RequireAuth>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/*' element={<NotFound />} /> {/*//sirayla calisiyor en altta olmasi lazim*/}
        </Routes>

      </Container>

    </ThemeProvider>
  );
}

export default App;
