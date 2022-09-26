import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Image } from "../components/SortableImageList";

export interface ProductImage {
  id: number;
  folder: string;
  fileName: string;
  order: number;
  src?: string;
}
export interface Product {
  id: number;
  title: string;
  description: string;
  slug: string;
  mainImageSrc?: string;
  images?: ProductImage[];
}

export interface GetProductByIdResponse {
  id: number;
  title: string;
  description: string;
  slug: string;
  imageFiles?: File[] | null;
  images?: Image[];
}

export function useProducts() {
  const getProducts = async () => {
    return (await axios.get<Product[]>("Products")).data;
  };
  return useQuery(["products"], getProducts);
}

export function useProduct({ id }: { id: number | undefined }) {
  const getProduct = async (id: number | undefined) => {
    return (await axios.get<GetProductByIdResponse>(`Product/${id}`)).data;
  };

  return useQuery(["product", id], () => getProduct(id), {
    enabled: Boolean(id),
  });
}
export function useAddProductMutation() {
  const addProduct = async (product: FormData) => {
    return (await axios.post<{ id: number }>("Product/addWithImages", product))
      .data;
  };

  return useMutation(addProduct);
}

export function useUpdateProductMutation() {
  const addProduct = async (product: FormData) => {
    return (await axios.post<{ id: number }>("Product/update", product)).data;
  };

  return useMutation(addProduct);
}
