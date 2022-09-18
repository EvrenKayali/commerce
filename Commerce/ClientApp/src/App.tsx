import { Box, Grid } from "@mui/material";
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
      <Grid container mt="2rem">
        <Grid item md={2} lg={2}>
          <NavBar />
        </Grid>
        <Grid item md={10} lg={9}>
          <Box mx="1rem">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product" element={<Product />} />
              <Route path="/product/:productId" element={<Product />} />
            </Routes>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
