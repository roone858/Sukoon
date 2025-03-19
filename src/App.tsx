import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Navbar from "./component/Navbar/navbar";
import Footer from "./component/Footer";
import FloatingWhatsAppButton from "./component/FloatingWsBtn";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ShippingPolicy from "./pages/ShippingPolicy";
import ProductsPage from "./pages/ProductsPage";
import AboutUsPage from "./pages/AboutUsPage";
import { StoreProvider } from "./context/providers/StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      offset: 0, // Start animation 100px before the element appears
      easing: "ease-in-out",
      once: false, // ❌ False = animation happens every scroll (not just once)
      mirror: true, // the delay on throttle used while scrolling the page (advanced)
    });
    setTimeout(() => {
      // After content is loaded
      AOS.refresh();
    }, 1000);
  }, []);
  return (
    <StoreProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          ShippingPolicy
        </Routes>
        <FloatingWhatsAppButton />
        <Footer />
      <ToastContainer />
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
