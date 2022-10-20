import { useParams } from "react-router-dom";
import { useProduct } from "../../api/api";

import { ProductForm } from "./ProductForm";

export const Product: React.FC = () => {
  let params = useParams();
  const productId = parseInt(params.productId as string);

  const { data: product } = useProduct({ id: productId });

  console.log(product);

  return !productId || product ? (
    <ProductForm
      productId={productId}
      formData={product}
      header={productId ? "Edit Product" : "Add Product"}
    />
  ) : null;
};
