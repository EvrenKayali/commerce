import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Product } from "./Product";
import Products from "./Products";
import NavBar from "./layout/NavBar";
import Header from "./layout/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Box display="flex">
        <Box mr="2rem" mt="1rem">
          <NavBar />
        </Box>
        <Box mt="1rem" width="100%" mr="2rem">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/new" element={<Product />} />
            <Route path="/products/:productId" element={<Product />} />
          </Routes>
        </Box>
      </Box>
    </QueryClientProvider>
  );
}

export default App;
