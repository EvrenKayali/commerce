import { Typography, Button, Stack } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
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

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    Array.from(data.images).forEach((img) => {
      formData.append("images", img);
    });

    await fetch("Product/images", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    const { images, ...productDataWithoutImages } = data;

    await fetch("Product/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productDataWithoutImages),
    }).then((res) => res.json());
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        style={{ width: "900px", margin: "0 auto" }}
      >
        <Stack margin="0 auto" spacing={2}>
          <Typography variant="h5">Add Product</Typography>
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
