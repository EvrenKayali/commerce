import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Product } from "./routes/Product";
import Products from "./routes/Products";
import NavBar from "./layout/NavBar";
import Header from "./layout/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // @ts-ignore err: unknown -> err: AxiosError
      retry: (failureCount, err: AxiosError) => {
        if (err.response?.status === 401) {
          return false; // do not retry, trigger error
        }

        // otherwise, restore default
        const defaultRetry = new QueryClient().getDefaultOptions().queries
          ?.retry;

        return Number.isSafeInteger(defaultRetry)
          ? failureCount < (defaultRetry ?? 0)
          : false;
      },
      //@ts-ignore err: unknown -> err: AxiosError
      onError: (err: AxiosError) => {
        if (err.response?.status === 401) {
          window.location.href = `/Login?returnURL=${window.location}`;
        }
      },
    },
  },
});

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
