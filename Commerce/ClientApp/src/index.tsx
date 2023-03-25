import { CssBaseline, GlobalStyles } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { productLoader, queryClient } from "./api/api";
import App from "./App";
import Home from "./Home";
import reportWebVitals from "./reportWebVitals";
import { Product } from "./routes/product/Product";
import Products from "./routes/Products";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const defaultStyles = {
  body: { backgroundColor: "#e6e3e3" },
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
        loader: productLoader,
      },

      {
        path: "products/new",
        element: <Product />,
      },
      {
        path: "/products/:productId",
        element: <Product />,
      },
    ],
  },
]);



root.render(
<React.StrictMode>
<QueryClientProvider client={queryClient}>
    <CssBaseline>
      <GlobalStyles styles={defaultStyles} />
      <RouterProvider router={router} />
    </CssBaseline>
    </QueryClientProvider>
    </React.StrictMode>

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
