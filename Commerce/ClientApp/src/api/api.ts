import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Image } from "../components/SortableImageList";

export interface Product {
  id: number;
  title: string;
  description: string;
  slug: string;
  mainImageSrc?: string;
  images?: Image[];
}

export interface ProductFormModel {
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
    return (await axios.get<ProductFormModel>(`Product/${id}`)).data;
  };

  return useQuery(["Product", id], () => getProduct(id), {
    enabled: Boolean(id),
  });
}
export function useAddProductMutation() {
  const addProduct = async (product: FormData) => {
    return (await axios.post<{ id: number }>("Product/add", product)).data;
  };

  return useMutation(addProduct);
}

export function useUpdateProductMutation() {
  const updateProduct = async (product: FormData) => {
    return (await axios.post<{ id: number }>("Product/update", product)).data;
  };

  return useMutation(updateProduct);
}
