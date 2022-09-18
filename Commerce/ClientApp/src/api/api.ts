export interface Product {
  id: number;
  title: string;
  description: string;
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

export const uploadFileImages = async (images?: FileList) => {
  if (Boolean(images?.length)) return;

  const formData = new FormData();

  Array.from(images as FileList).forEach((img) => {
    formData.append("images", img);
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
    return await (await fetch(`Products`)).json();
  } catch (err) {
    console.log(err);
  }
};
