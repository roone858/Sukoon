import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import FloatingWhatsAppButton from "./component/FloatingWsBtn";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
              <Home />
           }
        />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
      <FloatingWhatsAppButton />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
