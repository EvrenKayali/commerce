import useSWR from "swr";
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

export const addProduct = async (product: Product) => {
  try {
    await (
      await fetch("Product/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
    ).json();
  } catch (error) {
    console.log(error);
  }
};

export const uploadFileImages = async (images?: FileList, folder?: string) => {
  if (!Boolean(images?.length)) return;

  const formData = new FormData();

  Array.from(images as FileList).forEach((img) => {
    formData.append("images", img);
    formData.append("folder", folder!);
  });

  try {
    await (
      await fetch("Product/images", {
        method: "POST",
        body: formData,
      })
    ).json();
  } catch (err) {
    console.log(err);
  }
};

export const addProductWithImages = async (data: FormData) => {
  try {
    await (
      await fetch("Product/addWithImages", {
        method: "POST",
        body: data,
      })
    ).json();
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = async (data: FormData) => {
  try {
    await (
      await fetch("Product/update", {
        method: "POST",
        body: data,
      })
    ).json();
  } catch (err) {
    console.log(err);
  }
};

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export function useProducts() {
  const { data, error } = useSWR<Product[]>(`Products`, fetcher);

  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useProduct({ id }: { id: number | undefined }) {
  const { data, error } = useSWR<GetProductByIdResponse>(
    id ? `Product/${id}` : null,
    fetcher
  );

  return {
    product: data,
    isLoading: !error && !data,
    isError: error,
  };
}
