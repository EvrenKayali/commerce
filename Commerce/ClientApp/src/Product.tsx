import { Typography, Button, Stack } from "@mui/material";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { addProduct, getProduct, uploadFileImages } from "./api/api";
import BasicInfo from "./product/BasicInfo";
import Images from "./product/Images";
import Pricing from "./product/Pricing";
import Variants from "./product/Variants";

type FormValues = {
  title: string;
  description: string;
  images: FileList;
  variants: {
    name: string;
    value: string;
  }[];
};

export const Product: React.FC = () => {
  const methods = useForm<FormValues>({
    mode: "onBlur",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProduct(1);
    };

    fetchData();
  }, []);
  const onSubmit = async (data: FormValues) => {
    await uploadFileImages(data.images);

    const { images, ...productDataWithoutImages } = data;

    await addProduct(productDataWithoutImages);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        style={{ width: "900px", margin: "0 auto" }}
      >
        <Stack margin="0 auto" spacing={2}>
          <Typography variant="h5">Add Product</Typography>
          {/* <img
            src="http://127.0.0.1:10000/devstoreaccount1/products/title/3K28Store_1daba9ceba57054246aa5680fae63d04.jpeg"
            alt=""
          /> */}
          <BasicInfo />
          <Images />
          <Pricing />
          <Variants />
        </Stack>
        <Button type="submit">Save</Button>
      </form>
    </FormProvider>
  );
};
