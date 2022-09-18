import { Box } from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import { Product } from "./Product";

function App() {
  return (
    <>
      <Box
        mb="2rem"
        sx={{
          "& > *": {
            marginRight: "1rem",
          },
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/product">product</Link>
      </Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:productId" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
