import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Product } from "./Product";
import Products from "./Products";
import NavBar from "./layout/NavBar";
import Header from "./layout/Header";

function App() {
  return (
    <>
      <Header />
      <Box display="flex">
        <Box mr="2rem" mt="1rem">
          <NavBar />
        </Box>
        <Box mt="1rem" width="100%" mr="2rem">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:productId" element={<Product />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}

export default App;
