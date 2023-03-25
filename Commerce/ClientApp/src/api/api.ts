import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Image } from "../components/SortableImageList";

export const queryClient = new QueryClient({
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

export interface ProductOption {
  name: string;
  values: string[];
}

export interface VariantOptionAttribute {
  name: string;
  value: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  slug: string;
  mainImageSrc?: string;
  images?: Image[];
  status: string;
}

export interface ProductFormModel {
  id: number;
  title: string;
  description: string;
  slug: string;
  imageFiles?: File[] | null;
  images?: Image[];
  options?: ProductOption[];
  variants?: Variant[];
  price?: number;
  compareAtPrice?: number;
  costPerItem?: number;
}

export interface Variant {
  id?: number;
  name: string;
  attributes?: VariantOptionAttribute[];
  imageSrc?: string;
  key: string;
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
    refetchOnWindowFocus: false,
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

  return useMutation(updateProduct, {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function productLoader() {
  const getProducts = async () => {
    return (await axios.get<Product[]>("Products")).data;
  };
  return queryClient.fetchQuery(["products"], getProducts);
}
