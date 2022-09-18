import { Container, Grid } from "@mui/material";
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
        <Grid item md={1}>
          <NavBar />
        </Grid>
        <Grid item md={5}>
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product" element={<Product />} />
              <Route path="/product/:productId" element={<Product />} />
            </Routes>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
