export interface ProductImage {
  id: number;
  folder: string;
  fileName: string;
  order: number;
}
export interface Product {
  id: number;
  title: string;
  description: string;
  slug?: string;
  mainImageSrc?: string;
  productImage?: ProductImage[];
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

export const getProduct = async (id: number) => {
  try {
    return await (await fetch(`Product/${id}`)).json();
  } catch (err) {
    console.log(err);
  }
};

export const getProducts = async () => {
  try {
    return (await (await fetch(`Products`)).json()) as Product[];
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
